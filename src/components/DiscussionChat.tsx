import { useEffect, useRef, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { RootState } from '@/store'
import {
	useCreateMessageMutation,
	useGetAllMessagesQuery,
} from '@/store/discussion/discussionApi'
import { selectCurrClassroomId } from '@/store/features/classroomSlice'
import { addMessage, setMessages } from '@/store/features/discussionSlice'
import { MessageType } from '@/types/Message'
import { SendHorizonal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Message from './Message'
import Typing from './Typing'

interface ChatProps {
	typing: boolean
}

const DiscussionChat = ({ typing }: ChatProps) => {
	const messages = useSelector((state: RootState) => state.discussion.messages)
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement>(null)
	const endOfMessagesRef = useRef<HTMLDivElement>(null)
	const currClassroomId = useSelector(selectCurrClassroomId)
	const { getItem: getCurrUser } = useLocalStorage('currUser')
	const currUser = getCurrUser()

	const {
		data: allMessages,
		error: allMessagesError,
		isLoading: isLoadingAllMesages,
		isFetching: isFetchingAllMessages,
	} = useGetAllMessagesQuery({
		classroomId: currClassroomId,
		page: 1,
		pageSize: 1,
	})
	const [createMessage, { isLoading: isSending }] = useCreateMessageMutation()

	useEffect(() => {
		if (allMessages?.data) {
			dispatch(setMessages(allMessages.data))
		}
	}, [allMessages, dispatch])

	const sendHandler = async () => {
		const currMessage = inputRef.current?.value
		if (currMessage === undefined || currMessage?.trim() === '') return

		try {
			const newMessage = await createMessage({
				classroomId: currClassroomId,
				content: currMessage!,
				senderId: currUser.id,
				senderRole: currUser.role,
				threadParent: '',
			}).unwrap()

			dispatch(addMessage(newMessage.data))
			inputRef.current!.value = ''
			endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendHandler()
		}
	}

	return (
		<div className='flex h-screen flex-col'>
			<main className='flex-1 overflow-y-auto p-4'>
				{isLoadingAllMesages ? (
					<div className='flex items-center justify-center h-full'>
						<p className='font-semibold text-2xl text-gray-500'>
							Loading messages...
						</p>
					</div>
				) : allMessagesError ? (
					<div className='flex items-center justify-center h-full'>
						<p className='font-semibold text-2xl text-gray-500'>
							Failed to load messages
						</p>
					</div>
				) : (
					<div className='flex flex-col gap-4'>
						{messages.map((message: MessageType, index: number) => (
							<Message
								key={index}
								text={message.text}
								sender={message.sender}
							/>
						))}
						{typing && <Typing />}
						<div ref={endOfMessagesRef} />
					</div>
				)}
			</main>
			<div className='flex items-center gap-2 border-t bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950'>
				<Input
					ref={inputRef}
					className='flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm focus:outline-none dark:bg-gray-800'
					placeholder='Type your message...'
					type='text'
					disabled={isSending}
					onKeyDown={(e) => handleKeyDown(e)}
				/>
				<Button
					className='rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
					size='icon'
					variant='ghost'
					onClick={() => sendHandler()}
					disabled={isSending}
				>
					<SendHorizonal />
					<span className='sr-only'>Send message</span>
				</Button>
			</div>
		</div>
	)
}

export default DiscussionChat
