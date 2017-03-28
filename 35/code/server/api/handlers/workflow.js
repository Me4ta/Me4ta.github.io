import { getWFById } from '../data/workflows'
import getPromise from '../util/get-promise'

export default async function workflow(req, res) {
	if (!req.params || !req.params.id) {
		return res.status(500).json({ message: 'bad request' })
	}

	const workflow = await(getPromise(getWFById(Number(req.params.id))))

	if (!workflow) {
		return res.status(404).json({ message: 'workflow not found' })
	}

	return res.json(workflow)
}
