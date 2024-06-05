import TeacherClassroomNavbar from '@/components/layout/TeacherClassroomNavbar'

interface LayoutProps {
	role: string
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ role = 'teacher', children }) => {
	return (
		<div>
			<TeacherClassroomNavbar />
			<div>
				{children}
				{/* <RightSidebar role='teacher' classname='Data structures' />
			<div>{children}</div> */}
			</div>
		</div>
	)
}

export default Layout
