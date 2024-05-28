export interface profileFieldItems {
	icon: React.ReactNode
	text: string
	value: string
	onChange: (value: string) => void
	setError: (error: string) => void
}
export interface nonEditableProfileFieldItems {
	icon: React.ReactNode
	text: string
	value: string
}
