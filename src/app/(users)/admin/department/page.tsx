import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FolderTree } from 'lucide-react';
import AdminCard from '@/components/AdminCard';
const Page = () => {
	return (
        <div>
		<div className='flex items-center space-x-3 justify-end pr-10 pt-10'>
		 <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar> 
    <div> Dibora</div>
		</div>
        <div className='flex items-center justify-center space-x-5 font-bold my-20'>
            <FolderTree className="w-10 h-10"/>
            <span className='text-4xl'>Department</span>
            </div>
            <div className='mx-auto w-8/12 pl-10'>
            <div className="grid grid-cols-12">
            <div className="col-span-6 mr-6">
            <AdminCard/>
            </div>
            <div className="col-span-6 ">
            <AdminCard/>
            </div>
            </div>
            </div>
        </div>

		
	)
}

export default Page