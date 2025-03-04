import React from 'react'
import Image from 'next/image'
import { SearchIcon, HomeIcon, UserIcon, Briefcase, MessagesSquare } from 'lucide-react'
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Button } from "@/components/ui/button"

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function headerr() {
  return (
    <>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center p-2 sm:px-6 lg:px-8">
        {/* LinkedIn Logo (replace src with your own) */}
        <Image
          className="rounded-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"
          width={40}
          height={40}
          alt="logo"
        // priority
        />

        {/* Search Bar */}
        <div className="flex-1">
          <form action="" className='flex items-center space-x-1 rounded-md flex-1 mx-2 max-w—96 bg-gray-100 p-2'>
            <SearchIcon className='h-4 text-gray-600' />
            <Input
              type="text"
              placeholder="Search"
              className=" bg-transparent flex-1 outline-none"
            />
          </form>
        </div>

        <div className='flex items-center space-x-4 px-6'>
          <Link href="" className='icon'>
            <HomeIcon className='h-5' />
            <p>eslam</p>
          </Link>

          <Link href="" className='icon hidden md:flex'>
            <UserIcon className='h-5' />
            <p>Home</p>
          </Link>

          <Link href="" className='icon hidden md:flex'>
            <Briefcase className='h-5' />
            <p>Home</p>
          </Link>

          <Link href="" className='icon hidden md:flex'>
            <MessagesSquare className='h-5' />
            <p>Home</p>
          </Link>

          {/* user signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* user signed out */}
          <SignedOut>
            <Button asChild variant="outline">
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </>
  )
}
