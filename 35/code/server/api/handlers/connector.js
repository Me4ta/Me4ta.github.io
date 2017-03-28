import { getConnectorById } from '../data/connectors'
import getPromise from '../util/get-promise'

export default async function connector(req, res) {
	if (!req.params || !req.params.id) {
		return res.status(500).json({ message: 'bad request' })
	}

	const connector = await(getPromise(getConnectorById(Number(req.params.id))))

	if (!connector) {
		return res.status(404).json({ message: 'connector not found' })
	}

	return res.json(connector)
}
