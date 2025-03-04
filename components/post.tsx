'use client'

import Image from "next/image";
import { IPostDocument } from '@/mongoDB/models/post'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import moment from 'moment';
import PostOptions from "./postOptions";
import deletePostAction from "@/action/deletePostAction";


export default function Post({ post }: { post: IPostDocument }) {
  const { user } = useUser()


  const isAuthor = user?.id == post.user.userId




  return (
    <>
      <div className="bg-white rounded-md border">
        <div className="p-4 flex space-x-2">
          <div>
            <Avatar>
              <AvatarImage src={post.user.userImage} />
              <AvatarFallback>
                {post.user.firstName?.charAt(0)}
                {post.user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex justify-between flex-1">
            <div>
              <div className="font-semibold">
                {post.user.firstName} {post.user.lastName}{" "}
                {isAuthor && (
                  <Badge className="ml-2" variant="secondary">
                    Author
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-400">
                @{post.user.firstName}
                {post.user.firstName}-{post.user.userId.toString().slice(-4)}
              </p>

              <span className="text-xs text-gray-400">
                {/* <ReactTimeago date={new Date(post.createdAt)} /> */}
                {/* <ReactTimeAgo date={new Date(post.createdAt)} /> */}
                {moment(new Date(post.createdAt)).fromNow()}
              </span>
            </div>

            {isAuthor && (
              <Button
                variant="outline"
                onClick={() => {
                  const promise = deletePostAction(String(post._id));
                  // toast.promise(promise, {
                  //   loading: "Deleting post...",
                  //   success: "Post deleted!",
                  //   error: "Error deleting post",
                  // });
                }}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        </div>

        <div className="">
          <p className="px-4 pb-2 mt-2">{post.text}</p>

          {/* If image uploaded put it here... */}
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="Post Image"
              width={500}
              height={500}
              className="w-full mx-auto"
              priority
            />
          )}
        </div>

        <PostOptions postId={String(post._id)} post={post} />
      </div>
    </>
  )
}
