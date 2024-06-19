import { SideBarItem } from '@/types/SideNavItems'
import {
	BarChart3,
	Megaphone,
	MessageSquare,
	School,
	User,
	UsersRound,
} from 'lucide-react'

export const AdminSideBarItems: SideBarItem[] = [
	{
		id: '1',
		text: 'Classroom',
		icon: <School size={25} />,
		path: '/admin/classroom/classroom-list',
	},
]
export const AdminRightSideBarItems: SideBarItem[] = [
	{
		id: '1',
		text: 'Announcement',
		icon: <Megaphone size={25} />,
		path: '/announcement',
	},
	{
		id: '2',
		text: 'Discussion',
		icon: <MessageSquare size={25} />,
		path: '/discussion',
	},
	{
		id: '3',
		text: 'Analytics',
		icon: <BarChart3 size={25} />,
		path: '/analytics',
	},
	{
		id: '4',
		text: 'Student',
		icon: <UsersRound size={25} />,
		path: '/students',
	},
]
