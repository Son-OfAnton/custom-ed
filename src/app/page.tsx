'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Waypoints } from 'lucide-react'
import { CandlestickChart } from 'lucide-react'
import { FolderKanban } from 'lucide-react'
import { BookCheck } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import analytics from '../../public/assets/analytics.svg'
import filemanager from '../../public/assets/file_manager.svg'
import landingPage from '../../public/assets/landing-page.svg'
import announcement from '../../public/assets/news.svg'
import forum from '../../public/assets/online_discussion.svg'
import path from '../../public/assets/personalized path.svg'
import assesments from '../../public/assets/questions.svg'
import HomepageCard from '@/components/HomepageCard'

export default function Home() {
	return (
		<>
			<div className='relative overflow-hidden text-primary h-full'>
				<div className='md:flex block h-screen w-screen md:justify-center justify-between items-center  md:bg-cover md:bg-center md:bg-no-repeat md:bg-[url(../../public/assets/background-home.svg)]'>
					<div className='z-30 h-fill justify-between'>
						<NavBar />

						<div className='md:grid md:grid-cols-12 block gap-4 md:mt-8 mt-20 items-center'>
							<div className='col-span-5 md:ml-20 ml-0 mx-auto'>
								<h1 className='md:text-4xl text-2xl  font-bold mb-5 md:ml-0 ml-4 md:pt-0 pt-9'>
									Discover Your Unique Path to Learning.
								</h1>
								<p className='mt-2 md:text-small mb-10 md:ml-0 mx-4'>
									Unlock Your Potential, With our Personalized Learning
									platform.
								</p>
								<div className='flex md:justify-start justify-center'>
									<Button asChild>
										<Link href='/'>Join us</Link>
									</Button>
								</div>
							</div>
							<div className='col-span-7 md:flex md:justify-end md:mt-5 mt-20'>
								<div className='flex justify-center md:justify-end'>
									<div className='max-w-screen-md'>
										<Image
											src={landingPage}
											alt='discovery'
											width={1000}
											height={600}
											className='md:object-cover object-cover'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="bg-gray-900 text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
	<div className="mx-auto max-w-lg text-center">
	  <h2 className="text-3xl font-bold sm:text-4xl">Our Service</h2>

	  <p className="mt-4 text-gray-300">
		Our innovative platform is designed to revolutionize the traditional education system, making learning more personalized, inclusive, and effective.
	  </p>
	</div>

	<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	<HomepageCard title="Personalized Learning Path" description="Our platform generates tailor-made learning paths for each student based on their unique queries and needs. By leveraging AI, we ensure that every learner receives a customized education experience that aligns with their personal learning style and pace." icon={<Waypoints/>} />
	<HomepageCard title="Interactive Assessments" description="Students can take assessments directly within their virtual classrooms, benefiting from instant feedback and progress tracking. Teachers can create recurring checkpoint quizzes with automatic grading, helping to efficiently evaluate and enhance student performance." icon={<BookCheck/>} />
	 <HomepageCard title="Classroom Management" description="Teachers have comprehensive control over their classrooms. They can create, manage, and delete classrooms, monitor student activities, and oversee the learning process. This robust management system ensures a structured and effective teaching environment." icon={<FolderKanban/>} />
	 <HomepageCard title="Detailed Learning Analytics" description="Teachers gain valuable insights into student performance through detailed classroom statistics. Metrics such as mean, maximum, and range scores on assessments help identify areas where students excel or need additional support." icon={<CandlestickChart/>} />
	  <HomepageCard title="Administrative Oversight" description="Administrators have the ability to oversee all classrooms, monitor student and teacher activities, and maintain a high level of organization within the educational system. They can also communicate privately with teachers." icon={<ShieldCheck/>} />
	 <HomepageCard title="Collaborative Communication" description="Students and teachers can engage in dynamic discussions through our integrated forum. This feature promotes collaboration, allowing for the exchange of ideas, resources, and support, enhancing the overall learning experience." icon={<MessageCircle/>} />
	</div>

	<div className="mt-12 text-center">
	  <a
		href="#"
		className="inline-block rounded bg-blue-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
	  >
		Get Started Today
	  </a>
	</div>
  </div>
</section>
			
		</>
	)
}
