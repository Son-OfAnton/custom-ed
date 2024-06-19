'use client'

import React from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import LeftSidebar from '@/components/LeftSideBar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { getItem: getCurrUser } = useLocalStorage('currUser')
	const currUser = getCurrUser()
	const role = currUser?.role === 0 ? 'student' : currUser?.role === 1 ? 'teacher' : 'admin';

	return (
		<div>
			<LeftSidebar role={role} />
			<div>{children}</div>
		</div>
	)
}

export default Layout
