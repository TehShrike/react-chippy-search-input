import React, { useState, useEffect, useRef } from 'react'

import assert from './assert'
import Dropdown from './Dropdown'

type Operator = '>' | '<' | '='

export type Column = {
	description: string
	name: string
	operator?: Operator
}

export type Selection = {
	name: string
	operator: Operator
	value: string
}

export default ({ columns, on_selections_change }: {
	columns: Column[],
	on_selections_change: (selections: Selection[]) => void
}) => {
	const [move_focus_after_next_render, set_move_focus_after_next_render] = useState(true)
	const [chips,set_chips_local_state] = useState<(Column & Selection)[]>([])
	const [selected_column, set_selected_column] = useState<null | Column>(null)
	const [input_value, set_input_value] = useState('')

	const input_ref = useRef<HTMLInputElement>(null)
	const dropdown_ref = useRef<Dropdown<Column>>(null)

	useEffect(() => {
		if (move_focus_after_next_render) {
			set_focus()
			set_move_focus_after_next_render(false)
		}
	}, [move_focus_after_next_render])

	const set_focus = () => {
		if (selected_column) {
			assert(input_ref.current)
			input_ref.current.focus()
		} else {
			assert(dropdown_ref.current)
			dropdown_ref.current.set_focus()
		}
	}

	const set_chips = (chips: (Column & Selection)[]) => {
		set_chips_local_state(chips)
		on_selections_change(chips.map(({name,operator,value}) => ({name,operator,value})))
	}

	const remove_chip = (index: number) => {
		set_chips(chips.toSpliced(index, 1))
		set_focus()
	}

	const on_input_keydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement

		if (event.key === 'Backspace' && target.selectionStart === 0 && target.selectionEnd === 0) {
			set_selected_column(null)
			set_move_focus_after_next_render(true)
		} else if (event.key === 'Enter' && selected_column) {
			set_chips([
				...chips,
				{
					operator: '=',
					...selected_column,
					value: target.value
				}
			])
			target.value = ''
			set_selected_column(null)
			set_move_focus_after_next_render(true)
		}
	}

	return <div className="input" onClick={set_focus}>
		{
			chips.map((chip, index) =>
				<div className="chip" key={index}>
					{chip.description}: {chip.value}
					<button onClick={() => remove_chip(index)}>
						❌
					</button>
				</div>
			)
		}

		{
			selected_column ?
				<div className="mini_chip">
					{selected_column.description}:
				</div>
				:
				null
		}

		{
			selected_column ?
				<input
					type="text"
					onKeyDown={on_input_keydown}
					ref={input_ref}
					onChange={event => set_input_value(event.target.value)}
				/>
				:
				<Dropdown
					options={columns}
					on_selection={selection => {
						set_selected_column(selection)
						set_move_focus_after_next_render(true)
					}}
					on_remove_previous_item={() => {
						remove_chip(chips.length - 1)
						set_move_focus_after_next_render(true)
					}}
					ref={dropdown_ref}
				/>
		}
	</div>
}
