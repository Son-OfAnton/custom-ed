'use client'

import { useGetAnnouncementsQuery } from '@/store/announcement/announcementApi'
import { openDialog } from '@/store/features/announcementDialogSlice'
import { selectCurrClassroomId } from '@/store/features/classroomSlice'
import { useDispatch, useSelector } from 'react-redux'

import Announcement from '@/components/Announcement'
import AnnouncementCreatingDialog from '@/components/AnnouncementCreatingDialog'
import { Button } from '@/components/ui/button'
import AnnouncementDeleteDialog from '@/components/AnnouncementDeleteDialog'
import AttachmentDialog from '@/components/AttachmentDialog'

const StudentAnnouncementPage = () => {
	const dispatch = useDispatch()
	const currClassroomId = useSelector(selectCurrClassroomId)
	const {
		data: announcements,
		error,
		isLoading,
		isError,
		isFetching,
	} = useGetAnnouncementsQuery(currClassroomId)

	return (
		<div className='ml-72 mr-24 mt-10 flex flex-col h-screen'>
			<div className='flex-1 overflow-y-auto no-scrollbar'>
				{announcements?.data
					?.slice(0)
					.reverse()
					.map((announcement) => (
						<Announcement
							key={announcement.id}
							announcement={announcement}
							className='mb-4'
						/>
					))}
			</div>
		</div>
	)
}
export default StudentAnnouncementPage
