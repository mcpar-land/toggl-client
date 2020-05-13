import 'isomorphic-fetch'
import * as e6p from 'es6-promise'
import * as base64 from 'base-64'
import * as Types from './types'
;(e6p as any).polyfill()

export default class Toggl {
	apiToken: string

	constructor(apiToken: string) {
		this.apiToken = apiToken
	}

	private async api(route: string, method?: string, body?: object) {
		try {
			const _method = method || 'GET'
			const res = await fetch('https://www.toggl.com/api/v8/' + route, {
				method: _method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Basic ' + base64.encode(this.apiToken + ':api_token'),
				},
				body: JSON.stringify(body),
			})

			const resBody = await res.text()
			return JSON.parse(resBody)
		} catch (err) {
			throw err
		}
	}

	readonly users = {
		me: async <T extends { withRelatedData?: boolean }>(
			options?: T
		): Promise<{
			since: number
			data: T extends { withRelatedData?: true }
				? Types.TogglUserWithExtendedData
				: Types.TogglUser
		}> => {
			const _options = {
				withRelatedData: false,
				...options,
			}
			const route = _options.withRelatedData
				? 'me?with_related_data=true'
				: 'me'
			return await this.api(route)
		},
		update: async (
			update: Types.Args.UpdateUser | Types.Args.UpdateUserWithPasswordChange
		) => {
			return (await this.api('me', 'PUT', update)) as {
				data: Types.TogglUser
			}
		},
	}

	readonly clients = {
		create: async (input: Types.Args.CreateClient) => {
			return (await this.api('clients', 'POST', input)) as {
				data: Types.TogglClient
			}
		},
		get: async (id: string | number) => {
			return (await this.api('clients/' + id)) as {
				data: Types.TogglClient
			}
		},
		update: async (id: string | number, input: Types.Args.UpdateClient) => {
			return (await this.api('clients/' + id, 'PUT', input)) as {
				data: Types.TogglClient
			}
		},
		delete: async (id: string | number) => {
			try {
				await this.api('clients/' + id, 'DELETE')
				return true
			} catch (err) {
				console.error(err)
				return false
			}
		},
		getAll: async () => {
			return (await this.api('clients')) as Types.TogglClient[]
		},
		getProjects: async (
			id: string | number,
			options?: {
				active: boolean | 'true' | 'false' | 'both'
			}
		) => {
			const activeParam = options ? `?active=${options.active.toString()}` : ''
			return (await this.api(
				`clients/${id}/projects${activeParam}`
			)) as Types.TogglProject[]
		},
	}

	readonly cors = {
		create: null,
		get: null,
		delete: null,
	}

	readonly groups = {
		create: null,
		update: null,
		delete: null,
	}

	readonly projects = {
		create: null,
		get: null,
		update: null,
		delete: null, // single or multiple
		users: null,
		tasks: null,
	}

	readonly projectUsers = {
		create: null,
		update: null,
		delete: null,
	}

	readonly tags = {
		create: null,
		update: null,
		delete: null,
	}

	readonly tasks = {
		create: null,
		get: null,
		update: null, // single or multiple
		delete: null, // single or multiple
	}

	readonly timeEntries = {
		create: null,
		start: null,
		stop: null,
		get: null,
		current: null,
		update: null,
		delete: null,
		range: null,
		updateTags: null,
	}

	readonly workspaces = {
		getAll: null,
		get: null,
		update: null,
		users: null,
		clients: null,
		groups: null,
		projects: null,
		tasks: null,
		tags: null,
	}

	readonly workspaceUsers = {
		invite: null,
		update: null,
		delete: null,
		get: null,
	}

	dashboard = null
}
