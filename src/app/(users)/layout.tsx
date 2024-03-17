import React from 'react'

import LeftSidebar from '@/components/LeftSideBar'

interface LayoutProps {
	role: string
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ role = 'teacher', children }) => {
	return (
		<div className='layout'>
			<LeftSidebar role={role} />
			<div className='content'>{children}</div>
		</div>
	)
}

export default Layout
