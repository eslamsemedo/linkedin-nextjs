'use server'

import { currentUser } from "@clerk/nextjs/server"

export default async function createPostAction(formData: FormData) {
  const user = currentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const postInput = formData.get("postInput") as string
  const img = formData.get("image") as File
  let image: string | undefined

  if (!postInput) {
    throw new Error("Post input is required")
  }


  // define user
  // upload image
  // create post in database
  // revalidatePath "/" - home page

}
