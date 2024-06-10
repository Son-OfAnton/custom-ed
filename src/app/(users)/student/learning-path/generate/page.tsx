'use client'

import { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { RootState } from '@/store'
import {
	useDetailMutation,
	useGenerateMutation,
	useGreetMutation,
	useSaveMutation,
} from '@/store/chatbot/chatbotApi'
import { addMessage } from '@/store/features/chatbotSlice'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import Chat from '@/components/Chat'
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

type currStateType = 'greet' | 'detail' | 'generate' | 'save' | null

const GenerateLearningPathPage = () => {
	const { getItem: getCurrUser } = useLocalStorage('currUser')
	const messages = useSelector((state: RootState) => state.chat.messages)
	const dispatch = useDispatch()
	const [currState, setCurrState] = useState<currStateType>(null)
	const [typing, setTyping] = useState(false)
	const [showGenerateButton, setShowGenerateButton] = useState(true)
	const [showTitleDialog, setShowTitleDialog] = useState(false)
	const [learningPathTitle, setLearningPathTitle] = useState('')
	const router = useRouter()

	const currUserId = getCurrUser().id
	const [
		greet,
		{
			data: greetData,
			isLoading: isGreetLoading,
			isSuccess: isSuccessGreet,
			isError: isErrorGreet,
			error: greetError,
		},
	] = useGreetMutation()

	const [
		detail,
		{
			data: detailData,
			isLoading: isDetailLoading,
			isSuccess: isSuccessDetail,
			isError: isErrorDetail,
			error: detailError,
		},
	] = useDetailMutation()

	const [
		generate,
		{
			data: generateData,
			isLoading: isGenerateLoading,
			isSuccess: isSuccessGenerate,
			isError: isErrorGenerate,
			error: generateError,
		},
	] = useGenerateMutation()

	const [
		save,
		{
			data: saveData,
			isLoading: isSaveLoading,
			isSuccess: isSuccessSave,
			isError: isErrorSave,
			error: saveError,
		},
	] = useSaveMutation()

	const runGreetMutation = async () => {
		try {
			setTyping(true)
			const greetResponse = await greet({ studentId: currUserId }).unwrap()
			dispatch(addMessage({ text: greetResponse.aiResponse, sender: 'other' }))
			setTyping(false)
			setCurrState('detail')
		} catch (error) {
			setTyping(false)
			toast.error('CustomEd bot is currently unavailable')
			console.error('Error in greet mutation:', error)
			router.back()
		}
	}

	const runDetailMutation = async () => {
		try {
			setTyping(true)
			const detailResponse = await detail({
				studentId: currUserId,
				studentResponse: messages[messages.length - 1].text,
			}).unwrap()
			dispatch(addMessage({ text: detailResponse.aiResponse, sender: 'other' }))
			setTyping(false)
			setCurrState('generate')
		} catch (error) {
			setTyping(false)
			toast.error('CustomEd bot is currently unavailable')
			console.error('Error in detail mutation:', error)
			router.back()
		}
	}

	const runGenerateMutation = async () => {
		try {
			setTyping(true)
			const generateResponse = await generate({
				studentId: currUserId,
				studentResponse: messages[messages.length - 1].text,
			}).unwrap()
			dispatch(
				addMessage({ text: generateResponse.aiResponse, sender: 'other' }),
			)
			setTyping(false)
			setCurrState('save')
		} catch (error) {
			setTyping(false)
			toast.error('CustomEd bot is currently unavailable')
			router.back()
			console.error('Error in generate mutation:', error)
		}
	}

	const runSaveMutation = async () => {
		try {
			const saveResponse = await save({
				studentId: currUserId,
				learningPathTitle: learningPathTitle,
			}).unwrap()
			console.log('Learning path saved successfully')
			toast.success('Learning path saved successfully')
		} catch (error) {
			toast.error('CustomEd bot is currently unavailable')
			router.back()
			console.error('Error in save mutation:', error)
		}
	}

	useEffect(() => {
		if (currState === 'greet') {
			runGreetMutation()
		}
	}, [currState])

	useEffect(() => {
		if (
			currState === 'detail' &&
			messages.length > 0 &&
			messages[messages.length - 1].sender === 'me'
		) {
			runDetailMutation()
		}
	}, [currState, messages])

	useEffect(() => {
		if (
			currState === 'generate' &&
			messages.length > 0 &&
			messages[messages.length - 1].sender === 'me'
		) {
			runGenerateMutation()
		}
	}, [currState, messages])

	const onSave = () => {
		runSaveMutation()
		router.back()
	}

	const onDiscard = () => {
		router.back()
	}

	return (
		<div className='ml-72'>
			<Dialog
				open={showTitleDialog}
				onOpenChange={() => setShowTitleDialog(false)}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Learning path title</DialogTitle>
						<DialogDescription>
							Please provide a name for this learning path
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='name' className='text-right'>
								Title
							</Label>
							<Input
								id='name'
								value={learningPathTitle}
								onChange={(e) => setLearningPathTitle(e.target.value)}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={() => onSave()}>Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Chat typing={typing} />
			{showGenerateButton && (
				<Button
					className='w-full mt-4'
					onClick={() => {
						setCurrState('greet')
						setShowGenerateButton(false)
					}}
				>
					Generate
				</Button>
			)}
			{currState === 'save' && (
				<div className='w-full flex flex-row gap-x-4'>
					<Button className='w-4/5' onClick={() => setShowTitleDialog(true)}>
						Save
					</Button>
					<Button className='w-4/5' onClick={() => onDiscard()}>
						Discard
					</Button>
				</div>
			)}
		</div>
	)
}

export default GenerateLearningPathPage
