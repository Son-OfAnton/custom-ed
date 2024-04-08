'use client'

import React from 'react'

import { Hash } from 'lucide-react'
import { CircularProgressbar } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

import ProgressBar from '@ramonak/react-progress-bar'

import LineChartComponent from '@/components/LineChartComponent'
import ScoreProfile from '@/components/ScoreProfile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const percentage = 66

export default function Page() {
	return (
		<div>
			<div className='flex md:ml-40 lg:ml-0 lg:w-11/12 xl:w-full text-3xl justify-center'>
				<div className='flex items-center space-x-2 font-bold my-20'>
					<Hash />
					<span>Stack and Queue</span>
				</div>
			</div>
			<div className='lg:mr-24 lg:ml-3 xl:ml-0 xl:mr-20 mb-6 md:ml-64'>
				<Card className='py-10 2xl:w-8/12  xl:w-7/12 lg:mx-auto lg:w-6/12'>
					<CardContent>
						<div className='w-full z-50'>
							<LineChartComponent />
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='lg:mr-24 lg:ml-3 xl:ml-0 xl:mr-20 md:ml-64'>
				<Card className='2xl:w-8/12 xl:w-7/12 lg:w-6/12 mx-auto'>
					<div className='flex  justify-around xl:mr-20 my-7'>
						<div className='flex w-3/12 flex-col justify-center'>
							<CircularProgressbar
								value={percentage}
								text={`Min: ${percentage}`}
								styles={{
									root: {},
									path: {
										stroke: `rgba(255, 0, 0, ${percentage / 100})`,
									},
									text: {
										fill: '#FF0000',

										fontSize: '16px',
									},
								}}
							/>
						</div>
						<div className='flex w-3/12 flex-col justify-center'>
							<CircularProgressbar
								value={90}
								text={`Max: ${90}`}
								styles={{
									root: {},
									path: {
										stroke: `rgba(75, 181, 67, ${percentage / 100})`,
									},
									text: {
										fill: '#4BB543',

										fontSize: '16px',
									},
								}}
							/>
						</div>
						<div className='flex w-3/12 flex-col justify-center'>
							<CircularProgressbar
								value={50}
								text={`Avg: ${50}`}
								styles={{
									root: {},
									path: {
										stroke: `rgba(0, 0, 0, ${percentage / 100})`,
									},
									text: {
										fill: '#000000',

										fontSize: '16px',
									},
								}}
							/>
						</div>
					</div>
				</Card>
			</div>
			<div className='lg:mr-24 lg:ml-3 xl:ml-0 xl:mr-20 md:ml-64'>
				<Card className='mx-auto 2xl:w-8/12 xl:w-7/12 lg:w-6/12 my-6 p-10'>
					<div className='xl:text-3xl text-xl font-bold mb-6'>
						Number of Students attended
					</div>
					<ProgressBar
						completed='60'
						bgColor='#000000'
						height='40px'
					></ProgressBar>
				</Card>
			</div>

			<div className='xl:flex xl:mr-20 lg:ml-60 xl:ml-0  xl:pl-0 justify-center md:ml-64'>
				<div className='xl:flex block 2xl:w-8/12 xl:w-7/12   lg:w-12/12 xl:pl-0    xl:justify-between'>
					<div className='xl:w-6/12 2xl:mr-3 xl:mr-1 lg:w-7/12 mb-6'>
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
					<div className='xl:w-6/12 lg:w-7/12'>
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
		</div>
	)
}
