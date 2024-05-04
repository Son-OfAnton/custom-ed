import { SideBarItem } from '@/types/SideNavItems'
import {
	Megaphone,
	MessageSquare,
	School,
	TabletSmartphone,
	User,
	Waypoints,
} from 'lucide-react'

export const StudentSideBarItems: SideBarItem[] = [
	{
		id: '1',
		text: 'Classroom',
		icon: <School size={25} />,
		path: '/',
	},
	{
		id: '2',
		text: 'Learning Paths',
		icon: <Waypoints size={25} />,
		path: '/',
	},
	{
		id: '3',
		text: 'Profile',
		icon: <User size={25} />,
		path: '/',
	},
]
export const StudentRightSideBarItems: SideBarItem[] = [
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
]
