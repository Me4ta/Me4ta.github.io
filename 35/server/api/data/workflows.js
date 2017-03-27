import find from 'lodash/find'

const workflows = [{
	id: 1,
	name: 'Workflow 1'
}, {
	id: 2,
	name: 'Workflow 2'
}]

export default workflows

export const getWFById = id => find(workflows, { id })