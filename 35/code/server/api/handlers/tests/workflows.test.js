import handler from '../workflows'
import MockExpressResponse from 'mock-express-response'
import workflowsList from '../../data/workflows'

it('returns list of workflows', () => {
	return handler({}, new MockExpressResponse()).then(response => {
		expect(response._getJSON()).toEqual(workflowsList)
	})
})