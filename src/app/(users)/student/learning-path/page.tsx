'use client'

import LearningPathCard from '@/components/LearningPathCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const content =
	'**Learning Path Title:** Algorithms for Beginners with Hands-on Approach\n\n**Prerequisites:**\n\n- [Data Structures and Algorithms in Python](https://www.coursera.org/specializations/data-structures-algorithms-python)\n- [Introduction to Algorithms](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)\n\n**Path:**\n\n**Week 1:**\n\n- Introduction to algorithms and their analysis\n- Hands-on exercise: Implement a simple sorting algorithm (e.g., bubble sort)\n- Hands-on exercise: Implement a basic search algorithm (e.g., linear search)\n\n**Week 2:**\n\n- Trees and their applications\n- Hands-on exercise: Implement a binary search tree\n- Hands-on exercise: Solve a problem using a tree-based algorithm (e.g., finding the lowest common ancestor)\n\n**Week 3:**\n\n- Graphs and their applications\n- Hands-on exercise: Implement a graph data structure\n- Hands-on exercise: Solve a problem using a graph-based algorithm (e.g., finding the shortest path)\n\n**Week 4:**\n\n- Heaps and their applications\n- Hands-on exercise: Implement a heap data structure\n- Hands-on exercise: Solve a problem using a heap-based algorithm (e.g., finding the median of a stream of numbers)\n\n**Additional Resources:**\n\n- [Algorithms, 4th Edition](https://www.amazon.com/Algorithms-4th-Edition-Robert-Sedgewick/dp/0321573519)\n- [Introduction to Algorithms and Data Structures with Python](https://www.udacity.com/school-of-computer-science/nanodegree/nd089/syllabus)\n- [Algorithms and Data Structures YouTube Channel](https://www.youtube.com/channel/UCEJzJio23mH4m6x0XUY-4sQ)'

const LearningPathPage = () => {
	return (
		<div className='ml-72'>
			<Tabs defaultValue='Ongoing' className='mx-4 my-4'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='Ongoing'>Ongoing</TabsTrigger>
					<TabsTrigger value='Completed'>Completed</TabsTrigger>
				</TabsList>
				<TabsContent value='Ongoing' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{Array.from({ length: 5 }).map((_, i) => (
						<LearningPathCard
							key={i}
							title='Web Development Fundamentals'
							deadline='Due in 5 days'
							isCompleted={false}
							content={content}
						/>
					))}
				</TabsContent>
				<TabsContent value='Completed'></TabsContent>
			</Tabs>
		</div>
	)
}
export default LearningPathPage
