'use client'

import React, { useEffect, useRef, useState } from 'react'

import { SideBarItem } from '@/types/SideNavItems'
import { LogOut, Menu, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

import { AdminSideBarItems } from '../constants/AdminSideBarItems'
import { StudentSideBarItems } from '../constants/StudentSideBarItems'
import { TeacherSideBarItems } from '../constants/TeacherSideBarItems'

interface Props {
	role: string
}

const LeftSideBar: React.FC<Props> = ({ role }: Props) => {
	let items: SideBarItem[] = []
	if (role === 'teacher') {
		items = TeacherSideBarItems
	} else if (role === 'student') {
		items = StudentSideBarItems
	} else {
		items = AdminSideBarItems
	}

	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

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

	const handleLogout = () => {
		localStorage.removeItem('currUser')
		router.replace('/')
	}

	return (
		<>
			<div className='h-screen fixed justify-between shadow-md hidden md:flex z-50 bg-white'>
				<div className='flex flex-col justify-between h-full w-full'>
					<div>
						<Link
							href='/'
							className='flex flex-row mx-6 items-center justify-center md:justify-start md:px-6   h-12 w-full'
						>
							<span className='font-bold text-2xl hidden md:flex mt-20'>
								CustomEd
							</span>
						</Link>

						<div className='flex flex-col space-y-7 xl:space-y-10  justify-center mt-20 py-10 md:px-6'>
							{items.map((item, idx) => {
								return <MenuItem key={idx} item={item} />
							})}
						</div>
					</div>
					<div className='flex flex-col space-y-7 xl:space-y-10 justify-center md:px-6 ml-4 mb-6'>
						<div className='flex items-center  p-2 rounded-lg cursor-pointer hover:bg-primary hover:text-primary-foreground '>
							<Settings size={24} className='mr-4' />
							<span className='font-semibold text-md flex'>Settings</span>
						</div>
						<div className='flex items-center  p-2 rounded-lg cursor-pointer hover:bg-primary hover:text-primary-foreground'>
							<LogOut size={24} className='mr-4' />
							<span
								className='font-semibold text-md flex'
								onClick={() => router.replace('/')}
							>
								Logout
							</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				{!isOpen && (
					<div className='md:hidden fixed top-4 left-4 z-50'>
						<Menu
							size={32}
							className='cursor-pointer bg-white shadow-sm'
							onClick={toggle}
						/>
					</div>
				)}
				{isOpen && (
					<div
						className='md:hidden fixed top-0 left-0 w-10/12 h-full z-50 bg-white justify-between'
						ref={menuRef}
					>
						<div className='flex flex-col  justify-between w-full h-full'>
							<div>
								<div className='flex justify-between items-center p-4 mt-8'>
									<div className='text-lg font-bold mx-6'>CustomEd</div>
									<X size={24} className='cursor-pointer' onClick={toggle} />
								</div>
								<div className='flex flex-col space-y-10 justify-center mt-10 py-10 md:px-6 mx-6'>
									{items.map((item, idx) => {
										return <MenuItem key={idx} item={item} />
									})}
								</div>
							</div>
							<div className='flex flex-col space-y-10 justify-end my-20 mx-12  md:px-6'>
								<div
									className='flex items-center p-2 cursor-pointer hover:bg-zinc-100 hover:bg-primary hover:text-primary-foreground  py-2 pl-2 rounded-lg'
									onClick={() => handleLogout()}
								>
									<LogOut size={24} className='mr-4' />
									<span className='font-semibold text-lg'>Logout</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default LeftSideBar

const MenuItem = ({ item }: { item: SideBarItem }) => {
	const pathname = usePathname()

	return (
		<div className='flex justify-between items-center w-full px-4'>
			<Link
				href={item.path}
				className={cn(
					'flex flex-row space-x-4 items-center py-2 pl-2 pr-10 rounded-lg hover:bg-primary hover:text-primary-foreground',
					{
						'bg-primary text-primary-foreground': pathname.includes(
							item.text.replace(/\s/g, '').toLowerCase(),
						),
					},
				)}
			>
				{item.icon}
				<span className='font-semibold text-md flex'>{item.text}</span>
			</Link>
		</div>
	)
}
