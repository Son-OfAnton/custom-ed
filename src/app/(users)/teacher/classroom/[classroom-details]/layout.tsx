import React from 'react'
import RightSidebar from '@/components/RightSideBar'

interface LayoutProps {
	role: string
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ role = 'teacher', children }) => {
	return (
		<div className='layout'>
			<RightSidebar role="teacher"  classname="Data structures" />
			<div className='content'>{children}</div>
		</div>
	)
}

export default Layout
