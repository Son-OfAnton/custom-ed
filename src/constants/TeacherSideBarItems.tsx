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
		icon: <School size={25} />,
		path: '/teacher/classroom/classroom-list',
	},
	{
		id: '2',
		text: 'Profile',
		icon: <User size={25} />,
		path: '/teacher/profile',
	},
	{
		id: '3',
		text: 'Messages',
		icon: <MessagesSquare size={25} />,
		path: '/',
	},
]
export const TeacherRightSideBarItems: SideBarItem[] = [
	{
		id: '1',
		text: 'Announcement',
		icon: <Megaphone size={25} />,
		path: '/',
	},
	{
		id: '2',
		text: 'Forum',
		icon: <MessageSquare size={25} />,
		path: '/',
	},
	{
		id: '3',
		text: 'Test Center',
		icon: <TabletSmartphone size={25} />,
		path: '/',
	},
	{
		id: '4',
		text: 'Analytics',
		icon: <BarChart3 size={25} />,
		path: '/',
	},
	{
		id: '5',
		text: 'Student',
		icon: <Users size={25} />,
		path: '/',
	},
]
