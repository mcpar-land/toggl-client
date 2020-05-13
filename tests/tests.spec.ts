import Toggl from '../src'
import { config } from 'dotenv-flow'
import { inspect } from 'util'

config()

const toggl = new Toggl(process.env.TOGGL_KEY + '')

describe('/me', () => {
	test('runs /me', async () => {
		const res = await toggl.users.me({ withRelatedData: false })
		expect(res).toHaveProperty('since')
		expect(res).toHaveProperty('data')
		expect(res.data).toHaveProperty('id')
		console.log('/me')
		console.log(inspect(res, false, 999, false))
	})

	test('runs /me with related data', async () => {
		const res = await toggl.users.me({ withRelatedData: true })
		expect(res).toHaveProperty('since')
		expect(res).toHaveProperty('data')
		expect(res.data).toHaveProperty('id')
		expect(res.data).toHaveProperty('time_entries')
		console.log('/me with related data')
		console.log(inspect(res, false, 999, false))
	})
})
