import passport from 'passport'
import passportJWT from 'passport-jwt'
import jwtOptions from '../data/jwt-options'

import { getUserById } from '../data/users'

passport.use(new passportJWT.Strategy(jwtOptions, function(jwtPayload, next) {
	next(null, getUserById(jwtPayload.id))
}))

export default passport

export const checkAuth = passport.authenticate.bind(passport, 'jwt', { session: false })()