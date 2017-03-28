import React from 'react'
import RadioButton from '../RadioButton'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
	const component = renderer.create(
		<RadioButton checked={Boolean(true)} name='test' className='additional-class' />
	)

	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()

	tree.props.onClick()
	tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})