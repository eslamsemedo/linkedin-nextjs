import connectDB from "@/mongoDB/db";
import { Post } from "@/mongoDB/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  await connectDB();

  try {
    const post = await Post.findById((await params).post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}

export interface DeletePostRequestBody {
  userId: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  //   auth().protect();

  await connectDB();
  const { userId }: DeletePostRequestBody = await request.json();

  try {
    const post = await Post.findById((await params).post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.user.userId !== userId) {
      throw new Error("Post does not belong to the user");
    }

    await post.removePost();

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}
