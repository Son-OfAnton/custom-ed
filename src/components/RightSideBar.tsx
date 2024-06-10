'use client';

import React, { useEffect, useRef, useState } from 'react';



import { AdminRightSideBarItems } from '@/constants/AdminSideBarItems';
import { StudentRightSideBarItems } from '@/constants/StudentSideBarItems';
import { TeacherRightSideBarItems } from '@/constants/TeacherSideBarItems';
import { SideBarItem } from '@/types/SideNavItems';
import { ChevronLeft, ChevronRight, Settings, Shapes } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



import { cn } from '@/lib/utils';





interface Props {
	role: string
	classname: string
}

const RightSideBar: React.FC<Props> = ({ role, classname }: Props) => {
	const pathname = usePathname()
	const id = pathname.split('/')[3]
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	let items: SideBarItem[]

	if (role === 'teacher') {
		items = TeacherRightSideBarItems
	} else if (role === 'student') {
		items = StudentRightSideBarItems
	} else {
		items = AdminRightSideBarItems
	}

	const toggle = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='relative flex h-screen'>
			<div
				className={cn(
					'bg-white z-40 h-screen w-55 fixed top-0 right-0 shadow-md',
					{
						flex: isOpen,
						hidden: !isOpen,
					},
				)}
				ref={menuRef}
			>
				<div className='flex flex-col justify-between w-full h-full'>
					<div>
						<Link
							href=''
							className='flex flex-row mx-6 items-center justify-center md:justify-start md:px-6 h-12 w-full'
						>
							<span className='font-bold text-3xl hidden md:flex mt-20'>
								{/* profile component */}
							</span>
						</Link>

						<div className='flex flex-col space-y-10 justify-center mt-20 py-10 md:px-6 max-h-[calc(100vh-160px)] overflow-y-auto'>
							{items.map((item, idx) => {
								return <MenuItem key={idx} item={item} />
							})}
							{role == 'teacher' && (
								<div className='flex justify-between items-center w-full px-4'>
									<Link
										href={`/teacher/classroom/${id}/settings`}
										className='flex flex-row items-center py-2 pl-2 pr-10 rounded-lg hover:bg-primary hover:text-primary-foreground'
									>
										<Settings size={24} className='mr-4' />
										<span className='font-semibold text-md flex'>Settings</span>
									</Link>
								</div>
							)}
						</div>
					</div>
					<div>
						<div className='flex flex-col space-y-10 justify-center mt-20 py-10 md:px-6 max-h-[calc(100vh-160px)] overflow-y-auto '>
							<div className='flex justify-between items-center mx-6'>
								<Shapes size={30} />
								<span className='font-bold w-65 fixed text-lg ml-10 text-center'>
									{classname}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={cn(
					'fixed bg-primary px-1 py-1 rounded-sm shadow-md cursor-pointer chevron-button top-20 right-0 z-50',
					{
						'right-60': isOpen,
					},
				)}
				onClick={toggle}
			>
				{isOpen ? (
					<ChevronRight className='text-white' />
				) : (
					<ChevronLeft className='text-white' />
				)}
			</div>
		</div>
	)
}

export default RightSideBar

const MenuItem = ({ item }: { item: SideBarItem }) => {
	const pathname = usePathname()

	return (
		<div className='flex justify-between items-center w-full px-4'>
			<Link
				href={item.path}
				className={cn(
					'flex flex-row space-x-4 items-center py-2 pl-2 pr-10 rounded-lg hover:bg-primary hover:text-primary-foreground',
					{
						'bg-zinc-100': item.path === pathname,
					},
				)}
			>
				{item.icon}
				<span className='font-semibold text-md flex'>{item.text}</span>
			</Link>
		</div>
	)
}