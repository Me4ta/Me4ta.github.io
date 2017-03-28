import random from 'lodash/random'

const getRand = () => process.env.NODE_ENV === 'test' ? 0 : random(500, 2000)

const getPromise = data => new Promise((resolve, reject) => setTimeout(() => resolve(data), getRand()))

export default getPromise