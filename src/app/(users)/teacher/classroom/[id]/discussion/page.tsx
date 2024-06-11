'use client'

import { useState } from 'react'

import Chat from '@/components/Chat'

const Forum = () => {
	const [typing, setTyping] = useState(false)
	return (
		<div className='pl-72'>
			<Chat typing={typing} />
		</div>
	)
}
export default Forum
