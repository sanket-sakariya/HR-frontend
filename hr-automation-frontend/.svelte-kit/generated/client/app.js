export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32')
];

export const server_loads = [];

export const dictionary = {
		"/": [5],
		"/(dashboard)/analytics": [8,[3]],
		"/apply/[job_id]": [23],
		"/aptitude/test/[job_id]/[test_id]": [25],
		"/aptitude/test/[job_id]/[test_id]/results": [26],
		"/aptitude/test/[job_id]/[test_id]/start": [27],
		"/aptitude/test/[job_id]/[test_id]/take": [28],
		"/aptitude/[job_id]": [24],
		"/(dashboard)/candidates": [9,[3]],
		"/(dashboard)/candidates/[candidate_id]": [10,[3]],
		"/(dashboard)/candidates/[candidate_id]/hr-interview": [11,[3]],
		"/(dashboard)/candidates/[candidate_id]/technical-interview": [12,[3]],
		"/(dashboard)/company": [13,[3]],
		"/(dashboard)/dashboard": [14,[3]],
		"/interview/hr/[session]": [29,[4]],
		"/interview/hr/[session]/results": [30,[4]],
		"/interview/technical/[session]": [31,[4]],
		"/interview/technical/[session]/results": [32,[4]],
		"/(dashboard)/jobs": [15,[3]],
		"/(dashboard)/jobs/new": [21,[3]],
		"/(dashboard)/jobs/[job_id]": [16,[3]],
		"/(dashboard)/jobs/[job_id]/aptitude": [17,[3]],
		"/(dashboard)/jobs/[job_id]/edit": [18,[3]],
		"/(dashboard)/jobs/[job_id]/hr": [19,[3]],
		"/(dashboard)/jobs/[job_id]/technical": [20,[3]],
		"/(auth)/login": [6,[2]],
		"/(auth)/register": [7,[2]],
		"/(dashboard)/settings": [22,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';