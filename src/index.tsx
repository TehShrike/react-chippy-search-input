import React, { useState, useEffect } from 'react'
import ChippyInput from './ChippyInput'

export default () => {
	const [ counter, setCounter ] = useState(1)

	useEffect(() => {
		const timer = setInterval(() => setCounter(counter + 1), 1000)

		return () => clearInterval(timer)
	})

	return <>
		<ChippyInput />
	</>
}
