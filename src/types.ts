export type TogglWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface TogglCorsWhitelistEntry {
	id: number
	user_id: number
	domain: string
}

export interface TogglWorkspace {
	id: number
	name: string
	profile: number
	premium: boolean
	admin: boolean
	default_hourly_rate: boolean
	default_currency: string
	only_admins_may_create_projects: boolean
	only_admins_see_billable_rates: boolean
	only_admins_see_team_dashboard: boolean
	projects_billable_by_default: boolean
	rounding: number
	rounding_minutes: number
	api_token: string
	at: string
	logo_url: string
	ical_url: string
	ical_enabled: boolean
}

export interface TogglTimeEntry {
	id: number
	wid: number
	billable: boolean
	start: string
	stop: string
	duration: number
	description: string
	tags: string[]
	at: string
}

export interface TogglProject {
	id: number
	wid: number
	name: string
	billable: boolean
	active: boolean
	at: string
	color: string
}

export interface TogglTag {
	id: number
	wid: number
	name: string
	at: string
}

export interface TogglClient {
	id: number
	wid: number
	name: string
	notes?: string
	at: string
}

export interface TogglTask {
	id: number
	wid: number
	name: string
	pid: number
	uid?: number
	active: boolean
	at: string
	estimated_seconds: number
}

export interface TogglUser {
	id: number
	api_token: number
	default_wid: number
	email: string
	fullname: string
	jquery_timeofday_format: string
	jquery_date_format: string
	date_format: string
	store_start_and_stop_time: string
	beginning_of_week: number
	language: string
	image_url: string
	sidebar_piechart: boolean
	at: string
	created_at: string
	retention: number
	record_timeline: boolean
	render_timeline: boolean
	timeline_enabled: boolean
	timeline_experiment: boolean
	should_upgrade: boolean
	achievements_enabled: boolean
	timezone: string
	openid_enabled: boolean
	openid_email: boolean
	send_product_emails: boolean
	send_weekly_report: boolean
	send_timer_notifications: boolean
	last_blog_entry: string
	invitation: object
	workspaces: TogglWorkspace[]
	duration_format: string
}

export interface TogglUserWithExtendedData extends TogglUser {
	new_blog_post: {
		title: string
		url: string
	}
	time_entries: TogglTimeEntry[]
	projects: TogglProject[]
	tags: TogglTag[]
	workspaces: TogglWorkspace[]
	clients: TogglClient[]
}

export interface TogglProjectUser {
	pid: number
	uid: number
	wid?: number
	manager: boolean
	rate: number
	at: string
}

export interface TogglDashboard {
	most_active_user: { user_id: number; duration: number }[]
	activity: {
		user_id: number
		project_id: number
		duration: number
		description: string
		stop?: string
		tid?: number
	}[]
}

export module Args {
	export interface UpdateUser {
		fullname?: string
		email?: string
		send_product_emails?: boolean
		send_weekly_report?: boolean
		send_timer_notifications?: boolean
		store_start_and_stop_time?: boolean
		beginning_of_week?: TogglWeekday | number
		timezone?: string
		timeofday_format?: 'H:mm' | 'h:mm A'
		date_format?:
			| 'YYYY-MM-DD'
			| 'DD.MM.YYYY'
			| 'DD-MM-YYYY'
			| 'MM/DD/YYYY'
			| 'DD/MM/YYYY'
			| 'MM-DD-YYYY'
	}
	export interface UpdateUserWithPasswordChange extends UpdateUser {
		current_password: string
		password: string
	}

	export interface CreateClient {
		wid: string
		name: string
		notes?: string
	}

	export interface UpdateClient {
		name?: string
		notes?: string
	}
}
