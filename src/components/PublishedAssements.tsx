import {
	useCreateAssessmentMutation,
	useGradeStudentsMutation,
} from '@/store/assessment/assessmentApi'
import { useGetClassroomByIdQuery } from '@/store/classroom/classroomApi'
import { selectCurrClassroomId } from '@/store/features/classroomSlice'
import { GetAssessmentResponseData } from '@/types/assessment/assessment.type'
import { CalendarClock } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { makeDateReadable } from '@/lib/helpers'

import { Button } from './ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card'

interface Props {
	assessments: GetAssessmentResponseData[] | undefined
}

const PublishedAssements = ({ assessments }: Props) => {
	const currClassroomId = useSelector(selectCurrClassroomId)
	const { data: classroomData } = useGetClassroomByIdQuery(currClassroomId)
	const studentIds = classroomData?.data?.members?.map((member) => member.id)

	const [grade, {}] = useGradeStudentsMutation()

	const handleGrade = (assessmentId: string) => {
		console.debug('Grading ...')
		grade({
			classRoomId: currClassroomId,
			assessmentId,
			studentIds,
		})
		.unwrap()
		.then((res) => {
			toast.success('Grading is successful')
		})
		.catch((err) => {
			toast.error('Grading is failed')
		})
	}

	return (
		<>
			{assessments?.length == 0 ? (
				<div className='flex justify-center items-center'>
					<p className='text-2xl font-bold text-gray-400'>
						No assessment is found
					</p>
				</div>
			) : (
				<div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{assessments?.map((assessment, i) => (
						<Card key={i} className='relative'>
							<div className='absolute inset-0 border rounded-xl border-transparent hover:border-primary transition duration-300'></div>
							<CardHeader>
								<CardTitle>{assessment.name}</CardTitle>
							</CardHeader>
							<CardContent>
								{/* Description */}
								<div className='mb-8'>
									<p className='text-sm line-clamp-3'>
										{assessment.description}
									</p>
								</div>

								{/* Tag pills */}
								<div>
									{assessment.tag.split(',').map((chapter, i) => (
										<span
											key={i}
											className='inline-block px-2 py-1 text-xs bg-accent rounded-full mr-2'
										>
											{`Chapter ${chapter}`}
										</span>
									))}
								</div>
							</CardContent>
							<CardFooter className='flex flex-row justify-between'>
								<div className='flex'>
									<CalendarClock className='w-4 h-4' />
									<p className='ml-1 text-xs'>
										{makeDateReadable(assessment.deadline)}
									</p>
								</div>
								<Button
									variant='link'
									className='z-50'
									onClick={() => handleGrade(assessment.id)}
								>
									Grade
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</>
	)
}

export default PublishedAssements
