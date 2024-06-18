import { SideBarItem } from '@/types/SideNavItems'
import {
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
	{
		id: '2',
		text: 'Message',
		icon: <MessageSquare size={25} />,
		path: '/message',
	},
]
export const AdminRightSideBarItems: SideBarItem[] = [
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
		id: '2',
		text: 'Student',
		icon: <UsersRound size={25} />,
		path: '/',
	},
]
