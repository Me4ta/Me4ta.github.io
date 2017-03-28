import find from 'lodash/find'

const connectors = [{
	id: 1,
	name: 'Connector 1'
}, {
	id: 2,
	name: 'Connector 2'
}]

export default connectors

export const getConnectorById = id => find(connectors, { id })