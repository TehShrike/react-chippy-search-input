import React, { useState, useEffect, createRef } from 'react'
import assert from './assert'

type Props<T> = {
	options: T[]
	on_selection: (selection: T) => void
	on_remove_previous_item: () => void
}

// this implementation could be replaced with something more robust than a datalist
export default class Dropdown<T extends { description: string }> extends React.Component<Props<T>, {
	input_value: string
	input_ref: React.RefObject<HTMLInputElement>
	id: string
}> {
	constructor(props: Props<T>) {
		super(props)

		this.state = {
			input_value: '',
			input_ref: createRef(),
			id: Math.random().toString().slice(2)
		}
	}

	private on_keydown(event: React.KeyboardEvent<HTMLInputElement>) {
		const target = event.target as HTMLInputElement

		if (event.key === 'Backspace' && target.selectionStart === 0 && target.selectionEnd === 0) {
			this.props.on_remove_previous_item()
		}
	}

	private on_input(event: React.FormEvent<HTMLInputElement>) {
		const target = event.target as HTMLInputElement
		const lowercase_value = target.value.toLowerCase()
		const matching_option = this.props.options.find(option => option.description.toLowerCase() + ':' === lowercase_value)

		if (matching_option) {
			this.props.on_selection(matching_option)
			target.value = ''
		}
	}

	public set_focus() {
		assert(this.state.input_ref.current)

		this.state.input_ref.current.focus()
	}

	public render() {
		return <>
			<input
				type="text"
				onKeyDown={e => this.on_keydown(e)}
				onInput={event => this.on_input(event)}
				ref={this.state.input_ref}
				list={this.state.id}
			/>
			<datalist id={this.state.id}>
				{
					this.props.options.map((option, index) =>
						<option key={option.description} value={option.description + ':'}>
							{option.description}
						</option>)
				}
			</datalist>
		</>
	}
}
