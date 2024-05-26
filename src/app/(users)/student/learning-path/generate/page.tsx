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
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import Chat from '@/components/Chat'

type currStateType = 'greet' | 'detail' | 'generate' | 'save'

const GenerateLearningPathPage = () => {
	const { getItem: getCurrUser } = useLocalStorage('currUser')
	const messages = useSelector((state: RootState) => state.chat.messages)
	const dispatch = useDispatch()
	const [currState, setCurrState] = useState<currStateType>('greet')

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
			const greetResponse = await greet({ studentId: currUserId }).unwrap()
			dispatch(addMessage({ text: greetResponse.aiResponse, sender: 'other' }))
			setCurrState('detail')
		} catch (error) {
			console.error('Error in greet mutation:', error)
		}
	}

	const runDetailMutation = async () => {
		try {
			const detailResponse = await detail({
				studentId: currUserId,
				studentResponse: messages[messages.length - 1].text,
			}).unwrap()
			dispatch(addMessage({ text: detailResponse.aiResponse, sender: 'other' }))
			setCurrState('generate')
		} catch (error) {
			console.error('Error in detail mutation:', error)
		}
	}

	const runGenerateMutation = async () => {
		try {
			const generateResponse = await generate({
				studentId: currUserId,
				studentResponse: messages[messages.length - 1].text,
			}).unwrap()
			dispatch(addMessage({ text: generateResponse.aiResponse, sender: 'other' }))
			setCurrState('save')
		} catch (error) {
			console.error('Error in generate mutation:', error)
		}
	}

	const runSaveMutation = async () => {
		try {
			const saveResponse = await save({
				studentId: currUserId,
				learningPathTitle: 'Temp title',
			}).unwrap()
			console.log('Learning path saved successfully')
			toast.success('Learning path saved successfully')
		} catch (error) {
			console.error('Error in save mutation:', error)
		}
	}

	useEffect(() => {
		if (currState === 'greet') {
			runGreetMutation()
		}
	}, [currState])

	useEffect(() => {
		if (currState === 'detail' && messages.length > 0 && messages[messages.length - 1].sender === 'me') {
			runDetailMutation()
		}
	}, [currState, messages])

	useEffect(() => {
		if (currState === 'generate' && messages.length > 0 && messages[messages.length - 1].sender === 'me') {
			runGenerateMutation()
		}
	}, [currState, messages])

	useEffect(() => {
		if (currState === 'save') {
			runSaveMutation()
		}
	}, [currState])

	return (
		<div className='h-screen'>
			<Chat />
		</div>
	)
}

export default GenerateLearningPathPage
