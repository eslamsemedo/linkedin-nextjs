'use client'
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowBigUp, ImageIcon, XIcon } from "lucide-react";
import createPostAction from "@/action/createPostAction";
import { useRef, useState } from "react";
import Image from "next/image";

export default function PostForm() {
  const { user } = useUser()
  const ref = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handlePostAction = async (formData: FormData): Promise<void> => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text) {
      throw new Error("You must provide a post input");
    }

    setPreview(null);

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.error(`Error creating post: ${error}`);

      // Display toast
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-2">
      <form
        className="p-3 bg-white rounded-lg border"
        ref={ref}
        action={(formData) => {
          handlePostAction(formData);
        }}
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}

          />
          <Button className="bg-slate-500 rounded-xl h-10" type="submit">
            <ArrowBigUp />
          </Button>
        </div>

        {/* preview */}

        {preview && (
          <div className="mt-2">
            <Image src={preview} alt="Preview"
              width={500}
              height={500}
              className="w-full object-cover" />
          </div>
        )}

        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant={preview ? "secondary" : "outline"}
          >
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "change" : "add"} image
          </Button>

          {preview && (
            <Button
              type="button"
              onClick={() => setPreview(null)}
              variant="outline"
              className="ml-2"
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              remove
            </Button>
          )}
        </div>

      </form>
      <hr className="mt-2 border-gray-300" />
    </div>
  )
}
