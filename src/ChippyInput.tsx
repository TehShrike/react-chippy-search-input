import React, { useState, useEffect, useRef } from 'react'
import assert from './assert'

export default () => {
	const [chips,set_chips] = useState(['first', 'second'])
	const [input_value, set_input_value] = useState('')
	const input_ref = useRef<HTMLInputElement>(null)

	const remove_chip = (index: number) => {
		set_chips(chips.toSpliced(index, 1))
		assert(input_ref.current)
		input_ref.current.focus()
	}

	const on_input_keydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		assert(input_ref.current)
		if (event.key === 'Enter') {
			set_chips([...chips,input_value])
			const target = event.target as HTMLInputElement
			target.value = ''
		} else if (event.key === 'Backspace' && input_ref.current.selectionStart === 0 && input_ref.current.selectionEnd === 0) {
			set_chips(chips.slice(0, -1))
		}
	}

	const on_click = (event: React.MouseEvent) => {
		assert(input_ref.current)
		input_ref.current.focus()
	}

	return <div className="input" onClick={on_click}>
		{
			chips.map((chip, index) =>
				<div className="chip">
					{chip}
					<button onClick={() => remove_chip(index)}>
						❌
					</button>
				</div>
			)
		}
		<input
			type="text"
			onKeyDown={on_input_keydown}
			ref={input_ref}
			onChange={event => set_input_value(event.target.value)}
		/>
	</div>
}
