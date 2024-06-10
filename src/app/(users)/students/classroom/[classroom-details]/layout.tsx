'use client'

import React from 'react'

import { selectCurrClassroomName } from '@/store/features/classroomSlice'
import { useSelector } from 'react-redux'

import RightSidebar from '@/components/RightSideBar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const classroomName = useSelector(selectCurrClassroomName)
	console.log(classroomName)

	return (
		<div className='flex'>
			<RightSidebar role='student' classname={classroomName} />
			<div className='flex-1 relative'>{children}</div>
		</div>
	)
}

export default Layout
