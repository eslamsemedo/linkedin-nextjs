"use client"
import createCommentAction from '@/action/createCommentAction';
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useRef } from 'react';
import { Button } from './ui/button';
import { ArrowBigUp } from 'lucide-react';


export default function CommentForm({ postId }: { postId: string }) {

  const { user } = useUser()

  const ref = useRef<HTMLFormElement>(null);

  const createCommentActionWithPostId = createCommentAction.bind(null, postId);


  const handleCommentAction = async (formData: FormData): Promise<void> => {
    const formDataCopy = formData;
    ref.current?.reset();

    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      await createCommentActionWithPostId(formDataCopy);
    } catch (error) {
      console.error(`Error creating comment: ${error}`);

      // Display toast
    }
  }


  return (
    <form
      ref={ref}
      action={(formData) => {
        const promise = handleCommentAction(formData);
        // toast.promise(promise, {
        //   loading: "Posting comment...",
        //   success: "Comment Posted!",
        //   error: "Error creating comment",
        // });
      }}
      className="flex items-center space-x-1"
    >
      <Avatar className='w-10'>
        <AvatarImage className='rounded-md' src={user?.imageUrl} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 bg-white border rounded-full px-3 py-2">
        <input
          type="text"
          name="commentInput"
          placeholder="Add a comment..."
          className="outline-none flex-1 text-sm bg-transparent"
        />
        <Button className="bg-slate-500 rounded-xl h-10" type="submit">
          <ArrowBigUp />
        </Button>
      </div>
    </form>
  )
}
