import connectDB from "@/mongoDB/db";
import { ICommentBase } from "@/mongoDB/models/comment";
import { Post } from "@/mongoDB/models/post";
import { IUser } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

interface prams {
  post_id: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {

  // const x = await params
  try {
    await connectDB();

    // const postId = params.params.post_id as string;

    const post = await Post.findById((await params).post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comments = await post.getAllComments();
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}

export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {

  const { user, text }: AddCommentRequestBody = await request.json();
  try {
    const post = await Post.findById((await params).post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment: ICommentBase = {
      user,
      text,
    };

    await post.commentOnPost(comment);
    return NextResponse.json({ message: "Comment added successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while unliking the post${error}` },
      { status: 500 }
    );
  }
}
