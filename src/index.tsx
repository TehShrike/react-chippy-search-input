import React, { useState } from 'react'
import ChippyInput from './ChippyInput'
import type { Column, Selection } from './ChippyInput'

export default () => {
	const [selections,set_selections] = useState<Selection[]>([])

	const example_columns: Column[] = [{
		name: 'date',
		description: 'Date'
	},{
		name: 'date',
		operator: '>',
		description: 'Date greater than'
	}, {
		name: 'date',
		operator: '<',
		description: 'Date less than'
	}, {
		name: 'name',
		description: 'Name'
	}, {
		name: 'company_name',
		description: 'Company name'
	}, {
		name: 'favorite_child',
		description: 'Favorite child'
	}, {
		name: 'children_count',
		description: 'Number of children'
	}, {
		name: 'children_count',
		operator: '>',
		description: 'Number of children greater than'
	}, {
		name: 'children_count',
		operator: '<',
		description: 'Number of children fewer than'
	}]

	return <div>
		<ChippyInput
			columns={example_columns}
			on_selections_change={set_selections}
		/>

		<hr/>

		<ul>
			{
				selections.map((selection, index) => <li key={index}>
					<strong>name:</strong> <code>{selection.name}</code>,{' '}
					<strong>operator:</strong> <code>{selection.operator}</code>,{' '}
					<strong>value:</strong> <code>{selection.value}</code>{' '}
				</li>)
			}
		</ul>
	</div>
}
