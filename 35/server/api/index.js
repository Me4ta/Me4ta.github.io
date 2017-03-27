import express from 'express'
const router = express.Router()
import passport, { checkAuth } from './middlewares/passport'
import * as handlers from './handlers'

router.use(passport.initialize())

router.post('/login', require('./handlers/login.js').default)

router.get('/connectors', checkAuth, handlers.connectors)
router.get('/connectors/:id', checkAuth, handlers.connector)

router.get('/workflows', checkAuth, handlers.workflows)
router.get('/workflows/:id', checkAuth, handlers.workflow)
router.post('/workflows/:id', checkAuth, handlers.workflowUpdate)
router.put('/workflows', checkAuth, handlers.workflowCreate)

router.all('*', checkAuth, (req, res) => res.status(404).json( { message: 'not found' }))

export default router
