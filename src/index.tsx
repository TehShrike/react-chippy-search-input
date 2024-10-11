import React, { useState, useEffect } from 'react'

export default () => {
	const [ counter, setCounter ] = useState(1)

	useEffect(() => {
		const timer = setInterval(() => setCounter(counter + 1), 1000)

		return () => clearInterval(timer)
	})

	return <h1>
		Howdy {counter}
	</h1>
}
