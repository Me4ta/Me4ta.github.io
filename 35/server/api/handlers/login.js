import jwt from 'jsonwebtoken'
import jwtOptions from '../data/jwt-options'
import { getUserByName } from '../data/users'
import getPromise from '../util/get-promise'

export default async function login(req, res) {
	const { name, password } = req.body;

	if (!name || !password) {
		return res.status(500).json( { message: 'bad request' })
	}

	const user = await(getPromise(getUserByName(name)))

	if (!user) {
		return res.status(401).json( { message: 'user not found' })
	}

	if (user.password === req.body.password) {
		const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey)
		return res.json({ message: 'ok', token: token })
	} else {
		return res.status(401).json({ message: 'name or password is wrong' })
	}
}
