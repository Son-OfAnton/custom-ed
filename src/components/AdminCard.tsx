import React from 'react'
import { Users } from 'lucide-react'
import { Card, CardContent } from './ui/card'
const AdminCard = () => {
  return (
    <div>
      <Card className='flex items-center  font-bold pt-4'>
        <CardContent className='flex space-x-2'>   
                <Users />
                <span>Software engineering</span>
        </CardContent>
        
        
      </Card>
    </div>
  )
}

export default AdminCard
