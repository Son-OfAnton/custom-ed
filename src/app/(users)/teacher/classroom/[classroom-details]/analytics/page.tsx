'use client'

import React from 'react'

import { BarChart, CategoryBar, Color } from '@tremor/react'
import { Hash } from 'lucide-react'

import GradientBar from '@/components/GradientBar'
import ScoreProfile from '@/components/ScoreProfile'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const barData = [
	{
		name: 'Min',
		'Stack and queue': 2,
	},
	{
		name: 'Avg',
		'Stack and queue': 10,
	},
	{
		name: 'Max',
		'Stack and queue': 15,
	},
]

const dataFormatter = (number: number) =>
	Intl.NumberFormat('us').format(number).toString()

const page = () => {
	return (
		<div>
			<div className='flex md:ml-40 lg:ml-0 lg:w-11/12 xl:w-full text-3xl justify-center'>
				<div className='flex items-center space-x-2 font-bold my-20'>
					<Hash />
					<span>Stack and Queue</span>
				</div>
			</div>

			<div className='md:flex md:justify-end  lg:w-10/12 lg:justify-center 2xl:mx-24  lg:ml-14 md:pr-3'>
				<Card className='xl:w-6/12  2xl:w-8/12 md:w-8/12 lg:w-6/12 '>
					<CardContent>
						<h3 className='text-lg font-medium text-tremor-content-strong text-dark-tremor-content-strong my-4 text-center'>
							Stack and queue assesment overview
						</h3>
						<BarChart
							className='mt-6'
							data={barData}
							index='name'
							categories={['Stack and queue']}
							valueFormatter={dataFormatter}
							yAxisWidth={48}
						/>
					</CardContent>
				</Card>
			</div>
			<div className='md:flex lg:justify-center  md:justify-end lg:w-10/12  2xl:mx-24  lg:ml-14 items-center my-6  md:pr-3'>
				<div className='lg:w-6/12 md:w-8/12 2xl:w-8/12'>
					<div className='justify-center items-center w-full'>
						<div>
							<Card className='2xl:mx-auto pt-3 mb-6'>
								<CardContent>
									<GradientBar />
									<div className='flex justify-between w-full mt-4'>
										<div>5</div>
										<div>20</div>
									</div>
									<div className='pt-5 font-bold'>Range: 15</div>
								</CardContent>
							</Card>
						</div>
						<div>
							<Card className='mx-auto py-7'>
								<CardContent>
									<GradientBar />
									<div className='pt-5 font-bold'>Mean: 15</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
			<div className='md:flex lg:w-10/12  lg:justify-center lg:mx-14  2xl:mx-24 md:justify-end md:pr-3'>
				<div className='lg:w-6/12 md:w-8/12 2xl:w-8/12'>
					<Card>
						<CardHeader>
							<CardTitle className='text-center'>Top Five</CardTitle>
						</CardHeader>
						<CardContent>
							{[0, 1, 2, 3, 5].map((index: number) => (
								<ScoreProfile key={index} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
			<div className='md:flex lg:w-10/12 lg:justify-center my-6 lg:mx-14 2xl:mx-24 md:justify-end md:pr-3'>
				<div className='lg:w-6/12 md:w-8/12 2xl:w-8/12'>
					<Card>
						<CardHeader>
							<CardTitle className='text-center'>Bottom Five</CardTitle>
						</CardHeader>
						<CardContent>
							{[0, 1, 2, 3, 5].map((index: number) => (
								<ScoreProfile key={index} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default page
