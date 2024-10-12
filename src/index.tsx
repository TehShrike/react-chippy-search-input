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
		description: 'Date after'
	}, {
		name: 'date',
		operator: '<',
		description: 'Date before'
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
		<strong>
			Some options you could type in:
		</strong>
		<ul className='example_list'>
			{
				example_columns.map((column, index) => <li key={index}>{column.description.toLocaleLowerCase()}</li>)
			}
		</ul>

		<label>
			Search filter
			<ChippyInput
				columns={example_columns}
				on_selections_change={set_selections}
			/>
		</label>

		{
			selections.length
			?
			<>
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
			</>
			:
			null
		}
	</div>
}
