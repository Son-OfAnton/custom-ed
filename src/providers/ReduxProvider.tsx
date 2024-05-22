'use client'

import React, { ReactNode } from 'react'

import { store } from '@/store/index'
import { Provider } from 'react-redux'

interface Props {
	children?: ReactNode
}

const ReduxProvider = ({ children }: Props) => {
	return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
