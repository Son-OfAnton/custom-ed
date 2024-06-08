'use client'

import { useState } from 'react'

import { useGetQuestionsQuery, useSubmitAssessmentMutation } from '@/store/assessment/assessmentApi'
import { AssessmentQuestion } from '@/types/assessment/assessment.type'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { toast } from 'sonner'

const TakeAssessment = () => {
	const currPath = usePathname().split('/')
	const currClassroomId = currPath[3]
	const currAssessmentId = currPath[5]
	const {getItem: getCurrUser} = useLocalStorage('currUser')
	const studentId = getCurrUser().id

	const { data, isLoading, isFetching, isError, error } = useGetQuestionsQuery({
		classroomId: currClassroomId,
		assessmentId: currAssessmentId,
	})
	const [submit, {}] = useSubmitAssessmentMutation()

	const fetchedQuestions: AssessmentQuestion[] = data?.data?.questions || []
	const [answers, setAnswers] = useState<string[]>(
		Array(fetchedQuestions.length).fill(''),
	)

	const handleAnswerChange = (questionIndex: number, answerIndex: string) => {
		const updatedAnswers = [...answers]
		updatedAnswers[questionIndex] = answerIndex
		setAnswers(updatedAnswers)
	}

	const handleSubmit = () => {
		console.log(answers)
		console.log('studentId', studentId)
		for (let i = 0; i < answers.length; i++) {
			if (answers[i] === '') {
				toast.error('Please answer question ' + (i + 1))
				return
			}
		}
		submit({
			classroomId: currClassroomId,
			body: {
				assessmentId: currAssessmentId,
				answers: answers,
				studentId: studentId,
			}
		})
		.unwrap()
		.then((res) => {
			if (res.isSuccess) {
				toast.success('Assessment submitted successfully')
			} else {
				toast.error('Failed to submit assessment')
			}
		})
		.catch((err) => {
			toast.error('Failed to submit assessment')
		})
	}

	return (
		<div className='ml-72 mr-10 mt-10 h-screen'>
			<div className='flex flex-col h-screen'>
				<div className='w-full p-8 overflow-auto'>
					<h1 className='text-3xl font-bold mb-6 text-center'>
						{data?.data?.name}
					</h1>
					<div className='space-y-8'>
						{fetchedQuestions.map((question, questionIndex) => (
							<>
								<div key={question.id}>
									<p className='mb-4'>
										<span className='font-semibold mr-2'>{questionIndex + 1}.</span>
										{question.text}
									</p>
									<RadioGroup
										value={String(answers[questionIndex])}
										onValueChange={(value) =>
											handleAnswerChange(questionIndex, value)
										}
									>
										{question.answers.map((answer, answerIndex) => (
											<div key={answer.id} className='flex items-center mb-2'>
												<RadioGroupItem
													value={answer.id}
													id={`option${answer.id}`}
													className='mr-2'
												/>
												<label
													htmlFor={`option${answer.id}`}
													className='text-gray-700 dark:text-gray-300'
												>
													{answer.text}
												</label>
											</div>
										))}
									</RadioGroup>
								</div>
							</>
						))}
						<div className='text-center'>
							<Button size='lg' onClick={handleSubmit}>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TakeAssessment
