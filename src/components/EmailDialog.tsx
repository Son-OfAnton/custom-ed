'use client'

import { useEmailTeacherMutation } from '@/store/admin/adminApi'
import {
	closeDialog,
	selectAdminDialog,
  selectTeacherId,
} from '@/store/features/adminDialogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const EmailDialog = () => {
	const dispatch = useDispatch()
	const isOpen = useSelector(selectAdminDialog)
  const teacherId = useSelector(selectTeacherId)
	const [sendEmail, { isLoading }] = useEmailTeacherMutation()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

	const handleSubmit = () => {
		sendEmail({ subject: subject, message: message, teacherIds: [teacherId]})
			.unwrap()
			.then((res) => {
				if (res.isSuccess) {
					dispatch(closeDialog())
					toast.success('Email sent successfully')
				} else {
					toast.error('Failed to send email')
				}
			})
			.catch(() => {
				toast.error('Failed to send email')
			})
	}

	return (
		<Dialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Send your feedback for the teacher</DialogTitle>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid items-center grid-cols-4 gap-4'>
						<Label htmlFor='subject' className='text-right'>
							Subject
						</Label>
						<Input
							id='subject'
							placeholder='Enter a subject'
							className='col-span-3'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className='grid items-start grid-cols-4 gap-4'>
						<Label htmlFor='message' className='text-right'>
							Message
						</Label>
						<Textarea
							id='message'
							placeholder='Share your feedback here...'
							className='col-span-3 min-h-[150px]'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={() => handleSubmit()}>Send</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EmailDialog
