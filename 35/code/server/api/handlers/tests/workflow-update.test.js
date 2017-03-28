import handler from '../workflow-update'
import MockExpressResponse from 'mock-express-response'

it('returns workflow by id', () => {
	return handler({
		params: { id: 1 },
		body: { name: 'workflow' }
	}, new MockExpressResponse()).then(response => {
		expect(response._getJSON()).toEqual({ id: 1, name: 'workflow' })
	})
})

it('returns error if name in empty', () => {
	return handler({ body: {} }, new MockExpressResponse()).then(response => {
		expect(response.statusCode).toBe(500)
	})
})

it('returns error if workflow is not found', () => {
	return handler({
		params: { id: Infinity },
		body: { name: 'workflow' }
	}, new MockExpressResponse()).then(response => {
		expect(response.statusCode).toBe(404)
		expect(response._getJSON()).toEqual({ message: 'workflow not found' })
	})
})
