import UserInfo from "@/components/userInfo"
import PostForm from "@/components/postForm";
import PostFeed from "@/components/postFeed";
import { Post } from "@/mongoDB/models/post";
import connectDB from "@/mongoDB/db";
import { SignedIn } from "@clerk/nextjs";

export const revalidate = 0;

export default async function Home() {
  await connectDB();
  const posts = await Post.getAllPosts();

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">

      {/* user information */}
      <section className="hidden md:inline md:col-span-2">
        <UserInfo posts={posts} />
      </section>

      {/* POSTS */}
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        {/* post form */}
        <SignedIn>
          <PostForm />
        </SignedIn>
        {/* post feed */}
        <PostFeed posts={posts} />

      </section>



      <section className=" hidden xl:inline justify-center col-span-2 h-28 pl-4">

        <div className="bg-gray-800 text-white text-lg font-semibold px-6 py-4 rounded-lg shadow-lg">
          Developed by Eslam Mokhtar
        </div>
      </section>
    </div>
  );
}


// {/* <section className="  hidden xl:inline justify-center col-span-2 h-28">
//   <div className="bg-slate-500 flex rounded-2xl justify-center text-center">developed by eslam</div>
//   {/* widget */}
// </section> */}