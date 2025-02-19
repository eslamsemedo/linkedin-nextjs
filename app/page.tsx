import Image from "next/image";
import UserInfo from "@/components/userInfo"
import PostForm from "@/components/postForm";

export default function Home() {
  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">{/* user information */}
        <UserInfo />
      </section>
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        {/* post form */}
        <PostForm />
        {/* post feed */}

      </section>
      <section className="hidden xl:inline justify-center col-span-2">
        <div className="bg-red-400">eslam</div>
        {/* widget */}

      </section>
    </div>
  );
}
