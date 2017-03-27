import connectorsList from '../data/connectors'
import getPromise from '../util/get-promise'

export default async function connectors(req, res) {
	const result = await(getPromise(connectorsList))
	return res.json(result)
}