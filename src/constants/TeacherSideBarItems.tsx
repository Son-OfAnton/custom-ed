import { SideBarItem } from '@/types/SideNavItems'
import {
	BarChart3,
	Megaphone,
	MessageSquare,
	MessagesSquare,
	School,
	TabletSmartphone,
	User,
	Users,
} from 'lucide-react'

export const TeacherSideBarItems: SideBarItem[] = [
	{
		id: '1',
		text: 'Classroom',
		icon: <School size={30} />,
		path: '/teacher/classroom/classroom-list',
	},
	{
		id: '2',
		text: 'Profile',
		icon: <User size={30} />,
		path: '/',
	},
	{
		id: '3',
		text: 'Messages',
		icon: <MessagesSquare size={30} />,
		path: '/',
	},
]
export const TeacherRightSideBarItems: SideBarItem[] = [
	{
		id: '1',
		text: 'Announcement',
		icon: <Megaphone size={30} />,
		path: '/',
	},
	{
		id: '2',
		text: 'Forum',
		icon: <MessageSquare size={30} />,
		path: '/',
	},
	{
		id: '3',
		text: 'Test Center',
		icon: <TabletSmartphone size={30} />,
		path: '/',
	},
	{
		id: '4',
		text: 'Analytics',
		icon: <BarChart3 size={30} />,
		path: '/',
	},
	{
		id: '5',
		text: 'Student',
		icon: <Users size={30} />,
		path: '/',
	},
]
