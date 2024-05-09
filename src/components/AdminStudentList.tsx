import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface AdminStudentListProps {
    name: string;
}
const AdminStudentList = ({name}: AdminStudentListProps) => {
	return (
		<div>
			<Card className="md:w-6/12 z-50 md:mx-auto mx-2 ">
				<CardContent className='flex items-center space-x-3 pr-10 py-2'>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>{name}</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default AdminStudentList