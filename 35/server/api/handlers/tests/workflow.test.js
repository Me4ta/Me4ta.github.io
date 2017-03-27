import handler from '../workflow'
import MockExpressResponse from 'mock-express-response'
import workflowsList from '../../data/workflows'

it('returns workflow by id', () => {
	return handler({ params: { id: workflowsList[0].id } }, new MockExpressResponse()).then(response => {
		expect(response._getJSON()).toEqual(workflowsList[0])
	})
})

it('returns error if workflow is not found', () => {
	return handler({ params: { id: Infinity } }, new MockExpressResponse()).then(response => {
		expect(response.statusCode).toBe(404)
		expect(response._getJSON()).toEqual({ message: 'workflow not found' })
	})
})