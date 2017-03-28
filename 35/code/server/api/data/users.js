import find from 'lodash/find'

const users = [{
	id: 1,
	name: 'graymur',
	password: '123'
}, {
	id: 2,
	name: 'test',
	password: 'test'
}]

export default users

export const getUserById = id => find(users, { id })
export const getUserByName = name => find(users, { name })