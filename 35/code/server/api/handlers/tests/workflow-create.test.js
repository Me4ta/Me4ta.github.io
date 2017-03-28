import handler from '../workflow-create'
import MockExpressResponse from 'mock-express-response'

it('returns workflow by id', () => {
	return handler({ body: { name: 'workflow' } }, new MockExpressResponse()).then(response => {
		const json = response._getJSON()
		expect(json.name).toBe('workflow')
	})
})

it('returns error if name in empty', () => {
	return handler({ body: {} }, new MockExpressResponse()).then(response => {
		expect(response.statusCode).toBe(500)
	})
})
