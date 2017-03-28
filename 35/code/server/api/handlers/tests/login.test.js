import handler from '../login'
import MockExpressResponse from 'mock-express-response'
import users from '../../data/users'

it('authenticates user', () => {
	return handler(
		{
			body: {
				name: users[0].name,
				password: users[0].password
			}
		},
		new MockExpressResponse()
	).then(response => {
		const json = response._getJSON()
		expect(json.message).toBe('ok')
	})
})

it('returns error is pass or name are wrong', () => {
	return handler(
		{
			body: {
				name: '---------',
				password: '---------'
			}
		},
		new MockExpressResponse()
	).then(response => {
		expect(response.statusCode).toBe(401)
		expect(response._getJSON()).toEqual({ message: 'user not found' })
	})
})

it('returns error is pass or name are not set', () => {
	return handler(
		{
			body: {}
		},
		new MockExpressResponse()
	).then(response => {
		expect(response.statusCode).toBe(500)
		expect(response._getJSON()).toEqual({ message: 'bad request' })
	})
})