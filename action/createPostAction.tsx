'use server'

import { AddPostRequestBody } from "@/app/api/posts/route"
import { uploadImage } from "@/lib/uploadImage"
import { IPostDocument, Post } from "@/mongoDB/models/post"
import { IUser } from "@/types/user"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export default async function createPostAction(formData: FormData) {
  const user = await currentUser()

  const postInput = formData.get("postInput") as string
  const image = formData.get("image") as File
  // let image: string | undefined
  let image_url = undefined;

  // console.log(image)

  if (!user) {
    throw new Error("User not authenticated")
  }
  if (!postInput) {
    throw new Error("Post input is required")
  }


  // define user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  }


  try {
    if (image.size > 0) {
      try {
        console.log("loading file")
        // 1. upload image
        const result = await uploadImage(image);
        image_url = result.url || null

        // 2. create post in database
        const postBody: AddPostRequestBody = {
          user: userDB,
          text: postInput,
          imageUrl: image_url
        }
        await Post.create(postBody)

        console.log("file uploaded successfully")


      } catch (error) {
        console.log("error in uploading post", error)
      }

    } else {
      // 1. create post in database
      const postBody: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      }
      await Post.create(postBody)

    }
  } catch (error) {
    console.log("error in create post", error)
  }


  // revalidatePath "/" - home page
  revalidatePath("/")

}
