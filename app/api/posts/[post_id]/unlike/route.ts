import connectDB from "@/mongoDB/db";
import { Post } from "@/mongoDB/models/post";
import { NextRequest, NextResponse } from "next/server";

export interface UnlikePostRequestBody {
  userId: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  await connectDB();

  const { userId }: UnlikePostRequestBody = await request.json();
  try {
    const post = await Post.findById((await params).post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.unlikePost(userId);
    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}
