import { useState } from 'react'
import { cn } from '@/lib/utils'

import MarkdownRenderer from './MarkdownRenderer'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface LearningPathCardProps {
  title: string
  deadline: string
  isCompleted: boolean
  content: string
}

const LearningPathCard = ({ title, deadline, isCompleted, content }: LearningPathCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <CardHeader className='px-6 pt-6 pb-4'>
        <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
        <div className='flex items-center gap-2 mt-2'>
          <Badge
            variant='outline'
            className={cn({
              'bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-400 rounded-full': isCompleted,
              'bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400 rounded-full': !isCompleted,
            })}
          >
            {isCompleted ? 'Completed' : 'Ongoing'}
          </Badge>
          <Button variant='outline' size='sm' className='ml-auto' onClick={() => {}}>
            Complete
          </Button>
        </div>
      </CardHeader>
      <CardContent className='relative max-h-32 overflow-hidden'>
        <div className={cn({ 'line-clamp-5': !isExpanded })}>
          <MarkdownRenderer content={content} />
        </div>
        {!isExpanded && (
          <div className='absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-white dark:from-gray-950'>
            <Button variant='link' onClick={() => setIsExpanded(true)}>
              See more
            </Button>
          </div>
        )}
      </CardContent>
      {isExpanded && (
        <CardContent>
          <MarkdownRenderer content={content} />
        </CardContent>
      )}
      <CardFooter>
        <p>{deadline}</p>
      </CardFooter>
    </Card>
  )
}

export default LearningPathCard
