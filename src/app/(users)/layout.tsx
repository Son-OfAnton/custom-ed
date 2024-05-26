import React from 'react'

import LeftSidebar from '@/components/LeftSideBar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const role = "teacher"
	return (
		<div>
			<LeftSidebar role={role} />
			<div className='md:ml-64'>{children}</div>
		</div>
	)
}

export default Layout
