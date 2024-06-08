'use client'

import { useState } from 'react'

import {
	useAssessmentAnalyticsByIdQuery,
	useCrossAssessmentAnalyticsQuery,
	useGetAssessmentsQuery,
} from '@/store/assessment/assessmentApi'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const data = [
	{
		name: 'Page A',
		uv: 4000,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		amt: 2100,
	},
]

const metrics: string[] = [
	'Mean Score',
	'Median Score',
	'Mode Score',
	'Standard Deviation',
	'Variance',
	'Highest Score',
	'Lowest Score',
	'Range',
	'Interquartile Range',
	'Skewness',
	'Kurtosis',
	'Coefficient Of Variation',
	'Mean Absolute Deviation',
	'Median Absolute Deviation',
	'Mode Absolute Deviation',
]

const chapters: string[] = Array.from(
	{ length: 10 },
	(_, i) => `Chapter ${i + 1}`,
)

const AnalyticsPage = () => {
	const currClassroomId = usePathname().split('/').at(-2)
	const {
		data: fetchedAssessments,
		isLoading: isLoadingFetchedAssessments,
		isError: isErrorFetchedAssessments,
		error: errorFetchedAssessments,
		isFetching: isFetchingFetchedAssesments,
	} = useGetAssessmentsQuery(currClassroomId)

	const {
		data: crossAssessmentAnalytics,
		isLoading: isLoadingCrossAssessmentAnaytics,
		isFetching: isFetchingCrossAssessmentAnalytics,
		isError: isErrorCrossAssessmentAnalytics,
		error: errorCrossAssessmentAnalytics,
	} = useCrossAssessmentAnalyticsQuery(currClassroomId!)

	const assessments =
		fetchedAssessments?.data?.map((assessment) => ({
			id: assessment.id,
			name: assessment.name,
		})) || []

	const [selectedMetric, setSelectedMetric] = useState({
		label: 'Mean Score',
		isOpen: false,
	})
	const [selectedChapter, setSelectedChapter] = useState({
		label: 'Chapter 1',
		isOpen: false,
	})

	// console.log(assessments)
	const [selectedAssessment, setSelectedAssessment] = useState({
		label: assessments.length > 0 ? assessments[0].name : 'No assessments',
		id: assessments.length > 0 ? assessments[0].id : '',
		isOpen: false,
	})

	console.log(selectedAssessment.id)

	const {
		data: singleAssessmentAnalytics,
		isLoading: isLoadingSingleAssessmentAnaytics,
		isFetching: isFetchingSinlgeAssessmentAnalytics,
		isError: isErrorSingleAssessmentAnalytics,
		error: errorSingleAssessmentAnalytics,
	} = useAssessmentAnalyticsByIdQuery({
		classroomId: currClassroomId!,
		assessmentId: selectedAssessment.id,
	}, {skip: selectedAssessment.id === ''})

	const handleMetricChange = (selectedLabel: string) => {
		setSelectedMetric({ label: selectedLabel, isOpen: false })
	}

	const handleChapterhange = (selectedLabel: string) => {
		setSelectedChapter({ label: selectedLabel, isOpen: false })
	}

	const handleAssessmentChange = (selectedLabel: string) => {
		setSelectedAssessment({
			label: selectedLabel,
			isOpen: false,
			id: assessments.find((assessment) => assessment.name === selectedLabel)
				?.id!,
		})
	}

	return (
		<div className='ml-72 mr-10 mt-10 h-screen'>
			<div className='flex flex-row justify-between'>
				<DropdownMenu
					open={selectedMetric.isOpen}
					onOpenChange={(isOpen) =>
						setSelectedMetric({ ...selectedMetric, isOpen })
					}
				>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='lg' className='mb-10 ml-16'>
							{selectedMetric.label}
							{selectedMetric.isOpen ? (
								<ChevronUp className='ml-6 h-4 w-4' />
							) : (
								<ChevronDown className='ml-6 h-4 w-4' />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Analytic metrics</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={selectedMetric.label}
							onValueChange={(value) => handleMetricChange(value)}
						>
							<div className='w-56 max-h-60 overflow-auto'>
								{metrics.map((metric) => (
									<DropdownMenuRadioItem key={metric} value={metric}>
										{metric}
									</DropdownMenuRadioItem>
								))}
							</div>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Chapter dropdown */}
				<DropdownMenu
					open={selectedChapter.isOpen}
					onOpenChange={(isOpen) =>
						setSelectedChapter({ ...selectedChapter, isOpen })
					}
				>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='lg' className='mb-10 mr-8'>
							{selectedChapter.label}
							{selectedChapter.isOpen ? (
								<ChevronUp className='ml-6 h-4 w-4' />
							) : (
								<ChevronDown className='ml-6 h-4 w-4' />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Analyze chapter</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={selectedChapter.label}
							onValueChange={(value) => handleChapterhange(value)}
						>
							<div className='w-56 max-h-60 overflow-auto'>
								{chapters.map((chapter) => (
									<DropdownMenuRadioItem key={chapter} value={chapter}>
										{chapter}
									</DropdownMenuRadioItem>
								))}
							</div>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Graph */}
			<ResponsiveContainer width='100%' height={300}>
				<BarChart
					width={400}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar
						dataKey='uv'
						fill='#0F172A'
						activeBar={<Rectangle fill='#0F172A' />}
					/>
				</BarChart>
			</ResponsiveContainer>

			{/* Assessment Dropdown */}
			<DropdownMenu
				open={selectedAssessment.isOpen}
				onOpenChange={(isOpen) =>
					setSelectedAssessment({ ...selectedAssessment, isOpen })
				}
			>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='lg'>
						{selectedAssessment.label}
						{selectedAssessment.isOpen ? (
							<ChevronUp className='ml-6 h-4 w-4' />
						) : (
							<ChevronDown className='ml-6 h-4 w-4' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Analyze assessment</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={selectedAssessment.label}
						onValueChange={(value) => handleAssessmentChange(value)}
					>
						<div className='w-56 max-h-60 overflow-auto'>
							{assessments?.map((assessment) => (
								<DropdownMenuRadioItem
									key={assessment.id}
									value={assessment.name}
								>
									{assessment.name}
								</DropdownMenuRadioItem>
							))}
						</div>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Metrics cards */}
			<div className='grid md:grid-cols-3 gap-6 mt-10'>
				<Card className='flex flex-col justify-center items-center'>
					<CardContent className='flex flex-col items-center justify-center gap-2 mt-4'>
						<div className='flex items-center justify-center w-20 h-20 rounded-full bg-accent'>
							<span className='text-4xl text-accent-foreground font-bold'>
								{singleAssessmentAnalytics?.data?.meanScore || 'N/A'}
							</span>
						</div>
						<div className='text-sm text-primary'>Mean Grade</div>
					</CardContent>
				</Card>
				<Card className='flex flex-col justify-center items-center'>
					<CardContent className='flex flex-col items-center justify-center gap-2 mt-4'>
						<div className='flex items-center justify-center w-20 h-20 rounded-full bg-accent'>
							<span className='text-4xl text-accent-foreground font-bold'>
							{singleAssessmentAnalytics?.data?.medianScore || 'N/A'}
							</span>
						</div>
						<div className='text-sm text-primary'>Median Grade</div>
					</CardContent>
				</Card>
				<Card className='flex flex-col justify-center items-center'>
					<CardContent className='flex flex-col items-center justify-center gap-2 mt-4'>
						<div className='flex items-center justify-center w-20 h-20 rounded-full bg-accent'>
							<span className='text-4xl text-accent-foreground font-bold'>
							{singleAssessmentAnalytics?.data?.totalSubmissions || 'N/A'}
							</span>
						</div>
						<div className='text-sm text-primary'>Total Submissions</div>
					</CardContent>
				</Card>

				{/* High - low students */}
			</div>
			<div className='flex flex-row flex-wrap justify-between w-full mt-10'>
				<Card>
					<CardHeader>
						<CardTitle>Top 5 Students</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-y-4 w-96'>
						{Array.from({ length: 5 }, (_, i) => (
							<>
								<div className='flex items-center gap-4'>
									<Avatar>
										<Image
											width={100}
											height={100}
											src='/placeholder.svg'
											alt='@jaredpalmer'
										/>
										<AvatarFallback>JP</AvatarFallback>
									</Avatar>
									<div className='flex-1'>
										<div className='font-medium'>Jared Palmer</div>
										<div className='text-sm text-gray-500 dark:text-gray-400'>
											Grade: 92
										</div>
									</div>
								</div>
							</>
						))}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Bottom 5 Students</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-y-4 w-96'>
						{Array.from({ length: 5 }, (_, i) => (
							<>
								<div className='flex items-center gap-4'>
									<Avatar>
										<Image
											width={100}
											height={100}
											src='/placeholder.svg'
											alt='@jaredpalmer'
										/>
										<AvatarFallback>JP</AvatarFallback>
									</Avatar>
									<div className='flex-1'>
										<div className='font-medium'>Jared Palmer</div>
										<div className='text-sm text-gray-500 dark:text-gray-400'>
											Grade: 92
										</div>
									</div>
								</div>
							</>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
export default AnalyticsPage
