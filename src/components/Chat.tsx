/* eslint-disable react/display-name */
/* eslint-disable react/no-children-prop */
// import { useRef } from 'react'

// import { RootState } from '@/store'
// import { addMessage } from '@/store/features/chatbotSlice'
// import { SendHorizonal } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux'

// import { cn } from '@/lib/utils'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// import Message from './Message'

// const Chat = () => {
// 	const messages = useSelector((state: RootState) => state.chat.messages)
// 	const dispatch = useDispatch()
// 	const inputRef = useRef<HTMLInputElement>(null)
// 	const endOfMessagesRef = useRef<HTMLDivElement>(null)
// 	const pathname = usePathname()

// 	const sendHandler = () => {
// 		const currMessage = inputRef.current?.value
// 		if (currMessage?.trim() === '') return
// 		dispatch(addMessage({ text: currMessage, sender: 'me' }))
// 		inputRef.current!.value = ''
// 		endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
// 	}

// 	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (e.key === 'Enter') {
// 			sendHandler()
// 		}
// 	}

// 	return (
// 		<div className='flex h-screen flex-col'>
// 			<main className='flex-1 overflow-y-auto p-4'>
// 				{messages.length === 0 ? (
// 					<div className='flex items-center justify-center h-full'>
// 						<p className='font-semibold text-2xl text-gray-500'>No messages yet</p>
// 					</div>
// 				) : (
// 					<div className='flex flex-col gap-4'>
// 						{messages.map((message, index) => (
// 							<Message
// 								key={index}
// 								text={message.text}
// 								sender={message.sender}
// 							/>
// 						))}
// 						<div ref={endOfMessagesRef} />
// 					</div>
// 				)}
// 			</main>
// 			<div
// 				className={cn(
// 					'flex items-center gap-2 border-t bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950',
// 					{
// 						hidden: pathname.includes('announcement'),
// 					},
// 				)}
// 			>
// 				<Input
// 					ref={inputRef}
// 					className='flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm focus:outline-none dark:bg-gray-800'
// 					placeholder='Type your message...'
// 					type='text'
// 					onKeyDown={(e) => handleKeyDown(e)}
// 				/>
// 				<Button
// 					className='rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
// 					size='icon'
// 					variant='ghost'
// 				>
// 					<SendHorizonal onClick={() => sendHandler()} />
// 					<span className='sr-only'>Send message</span>
// 				</Button>
// 			</div>
// 		</div>
// 	)
// }

// export default Chat

import { forwardRef, useRef } from 'react'

import { RootState } from '@/store'
import { addMessage } from '@/store/features/chatbotSlice'
import { SendHorizonal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Message from './Message'
import Typing from './Typing'

interface ChatProps {
	typing: boolean
}

const Chat = ({ typing }: ChatProps) => {
	const messages = useSelector((state: RootState) => state.chat.messages)
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement>(null)
	const endOfMessagesRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	const sendHandler = () => {
		const currMessage = inputRef.current?.value
		if (currMessage?.trim() === '') return
		dispatch(addMessage({ text: currMessage, sender: 'me' }))
		inputRef.current!.value = ''
		endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendHandler()
		}
	}

	return (
		<div className='flex h-screen flex-col'>
			<main className='flex-1 overflow-y-auto p-4'>
				{messages.length === 0 ? (
					<div className='flex items-center justify-center h-full'>
						<p className='font-semibold text-2xl text-gray-500'>
							No messages yet
						</p>
					</div>
				) : (
					<div className='flex flex-col gap-4'>
						{messages.map((message, index) => (
							<Message
								key={index}
								text={message.text}
								sender={message.sender}
							/>
						))}
						{typing && (
							// <div className='flex items-center text-gray-500'>
							//   <p>Typing...</p>
							// </div>
							<Typing />
						)}
						<div ref={endOfMessagesRef} />
					</div>
				)}
			</main>
			<div
				className={cn(
					'flex items-center gap-2 border-t bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950',
					{
						hidden: pathname.includes('announcement'),
					},
				)}
			>
				<Input
					ref={inputRef}
					className='flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm focus:outline-none dark:bg-gray-800'
					placeholder='Type your message...'
					type='text'
					onKeyDown={(e) => handleKeyDown(e)}
				/>
				<Button
					className='rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
					size='icon'
					variant='ghost'
				>
					<SendHorizonal onClick={() => sendHandler()} />
					<span className='sr-only'>Send message</span>
				</Button>
			</div>
		</div>
	)
}

export default Chat
