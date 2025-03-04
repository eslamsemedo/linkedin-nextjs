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

    const likes = post.likes;
    return NextResponse.json(likes);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}

export interface LikePostRequestBody {
  userId: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  await connectDB();

  const { userId }: LikePostRequestBody = await request.json();

  try {
    const post = await Post.findById((await params).post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.likePost(userId);
    return NextResponse.json({ message: "Post liked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}
