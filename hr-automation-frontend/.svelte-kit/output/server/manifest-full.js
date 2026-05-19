export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: null,
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(dashboard)/analytics",
				pattern: /^\/analytics\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/apply/[job_id]",
				pattern: /^\/apply\/([^/]+?)\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/aptitude/test/[job_id]/[test_id]",
				pattern: /^\/aptitude\/test\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false},{"name":"test_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/aptitude/test/[job_id]/[test_id]/results",
				pattern: /^\/aptitude\/test\/([^/]+?)\/([^/]+?)\/results\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false},{"name":"test_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/aptitude/test/[job_id]/[test_id]/start",
				pattern: /^\/aptitude\/test\/([^/]+?)\/([^/]+?)\/start\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false},{"name":"test_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/aptitude/test/[job_id]/[test_id]/take",
				pattern: /^\/aptitude\/test\/([^/]+?)\/([^/]+?)\/take\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false},{"name":"test_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/aptitude/[job_id]",
				pattern: /^\/aptitude\/([^/]+?)\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/(dashboard)/candidates",
				pattern: /^\/candidates\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(dashboard)/candidates/[candidate_id]",
				pattern: /^\/candidates\/([^/]+?)\/?$/,
				params: [{"name":"candidate_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(dashboard)/candidates/[candidate_id]/hr-interview",
				pattern: /^\/candidates\/([^/]+?)\/hr-interview\/?$/,
				params: [{"name":"candidate_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(dashboard)/candidates/[candidate_id]/technical-interview",
				pattern: /^\/candidates\/([^/]+?)\/technical-interview\/?$/,
				params: [{"name":"candidate_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(dashboard)/company",
				pattern: /^\/company\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(dashboard)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/interview/hr/[session]",
				pattern: /^\/interview\/hr\/([^/]+?)\/?$/,
				params: [{"name":"session","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/interview/hr/[session]/results",
				pattern: /^\/interview\/hr\/([^/]+?)\/results\/?$/,
				params: [{"name":"session","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/interview/technical/[session]",
				pattern: /^\/interview\/technical\/([^/]+?)\/?$/,
				params: [{"name":"session","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/interview/technical/[session]/results",
				pattern: /^\/interview\/technical\/([^/]+?)\/results\/?$/,
				params: [{"name":"session","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs",
				pattern: /^\/jobs\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs/new",
				pattern: /^\/jobs\/new\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs/[job_id]",
				pattern: /^\/jobs\/([^/]+?)\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs/[job_id]/aptitude",
				pattern: /^\/jobs\/([^/]+?)\/aptitude\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs/[job_id]/edit",
				pattern: /^\/jobs\/([^/]+?)\/edit\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs/[job_id]/hr",
				pattern: /^\/jobs\/([^/]+?)\/hr\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(dashboard)/jobs/[job_id]/technical",
				pattern: /^\/jobs\/([^/]+?)\/technical\/?$/,
				params: [{"name":"job_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(dashboard)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 22 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
