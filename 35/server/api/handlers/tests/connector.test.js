import handler from '../connector'
import MockExpressResponse from 'mock-express-response'
import connectorsList from '../../data/connectors'

it('returns connector by id', () => {
	return handler({ params: { id: connectorsList[0].id } }, new MockExpressResponse()).then(response => {
		expect(response._getJSON()).toEqual(connectorsList[0])
	})
})

it('returns error if connector not found', () => {
	return handler({ params: { id: Infinity } }, new MockExpressResponse()).then(response => {
		expect(response.statusCode).toBe(404)
		expect(response._getJSON()).toEqual({ message: 'connector not found' })
	})
})