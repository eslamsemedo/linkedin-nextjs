import { IPostDocument } from '@/mongoDB/models/post'
import React from 'react'
import Post from './post'

export default function PostFeed({ posts }: { posts: IPostDocument[] }) {

  // posts?.map((post) => (
  //   // <Post key={post._id as string} post={post} />
  //   // <div key={post._id as string}>e</div>
  //   console.log(post._id.toString())
  // ))

  return (
    <div className="space-y-2 pb-20">
      {posts?.map((post) => (
        <Post key={post._id.toString()} post={post} />
        // <div key={post._id as string}>e</div>
      ))}
    </div>
  )
}
