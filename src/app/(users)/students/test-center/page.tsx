import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Tally5 } from 'lucide-react';
import SearchAndBell from '@/components/SearchAndBell';
const page = () => {
	return (
		<div>
            <div className="md:ml-80 pt-20">
            <SearchAndBell/>
            </div>
            <div className="md:w-10/12 md:mx-auto mx-2 md:pl-60">
			<Card className='mb-3'>
				<CardHeader>
					<CardTitle>Application of Intergration</CardTitle>

				</CardHeader>
				<CardContent>
					<p>Assesses interdisciplinary knowledge for a 
comprehensive understanding of students' learning.</p>
                   
				</CardContent>
				<CardFooter>
					 <div className="flex space-x-2">
                    <Tally5/> <span> 5</span>
                    </div>
				</CardFooter>
			</Card>
            
            </div>
		</div>
	)
}

export default page