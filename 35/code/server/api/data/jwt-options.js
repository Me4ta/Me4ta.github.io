import passportJWT from 'passport-jwt'

const jwtOptions = {
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
	secretOrKey: 'someSecretString'
}

export default jwtOptions