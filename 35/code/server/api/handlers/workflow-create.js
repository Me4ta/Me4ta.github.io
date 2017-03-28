import workflowsList from '../data/workflows'
import getPromise from '../util/get-promise'

export default async function workflow(req, res) {
	if (!req.body || !req.body.name) {
		return res.status(500).json({ message: 'bad request' })
	}

	const workflow = await(getPromise({
		id: Math.max.apply(null, workflowsList.map(item => item.id)) + 1,
		name: req.body.name
	}))

	return res.json(workflow)
}
