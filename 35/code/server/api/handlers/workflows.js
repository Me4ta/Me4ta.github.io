import workflowsList from '../data/workflows'
import getPromise from '../util/get-promise'

export default async function workflows(req, res) {
	const result = await(getPromise(workflowsList))
	return res.json(result)
}