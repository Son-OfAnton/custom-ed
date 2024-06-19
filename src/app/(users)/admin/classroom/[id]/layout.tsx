import AdminClassroomNavbar from '@/components/AdminClassroomNavbar'

interface LayoutProps {
	role: string
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ role = 'admin', children }) => {
	return (
		<div>
			<AdminClassroomNavbar />
			<div>{children}</div>
		</div>
	)
}

export default Layout
