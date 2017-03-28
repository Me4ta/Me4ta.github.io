import handler from '../connectors'
import MockExpressResponse from 'mock-express-response'
import connectorsList from '../../data/connectors'

it('returns list of connectors', () => {
	return handler({}, new MockExpressResponse()).then(response => {
		expect(response._getJSON()).toEqual(connectorsList)
	})
})