import { selectCurrClassroomId } from '@/store/features/classroomSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { closeDialog } from '@/store/features/classroomDialogSlice'

import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'
import { selectClassroomDialogType, selectClassroomIdTobeDeleted } from '@/store/features/classroomDialogSlice'
import { useDeleteClassroomMutation } from '@/store/classroom/classroomApi'

const ClassroomDeleteDialog = () => {
	const dialogType = useSelector(selectClassroomDialogType)
  const classroomIdTobeDeleted = useSelector(selectClassroomIdTobeDeleted)
	console.log(`DIALOG_TYPE ${dialogType}`)
	const dispatch = useDispatch()
	const currClassroomId = useSelector(selectCurrClassroomId)
	console.log(`CURR_CLASSROOM_ID ${currClassroomId}`)
	const [deleteClassroom, { isLoading, isSuccess, isError, error }] =
		useDeleteClassroomMutation()

	const onClassroomDeletion = () => {
		deleteClassroom(classroomIdTobeDeleted)
			.then((res) => {
				dispatch(closeDialog())
				toast.success('Classroom deleted successfully')
			})
			.catch((err) => {
				toast.error('Failed to delete classroom')
			})
	}

	return (
		<Dialog
			open={dialogType === 'delete'}
			onOpenChange={() => dispatch(closeDialog())}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Classroom</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Are you sure you want to delete this classroom?
				</DialogDescription>
				<DialogFooter>
					<Button
						variant='destructive'
						onClick={() => onClassroomDeletion()}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
export default ClassroomDeleteDialog
