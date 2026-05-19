
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(dashboard)" | "/(auth)" | "/" | "/(dashboard)/analytics" | "/apply" | "/apply/[job_id]" | "/aptitude" | "/aptitude/test" | "/aptitude/test/[job_id]" | "/aptitude/test/[job_id]/[test_id]" | "/aptitude/test/[job_id]/[test_id]/results" | "/aptitude/test/[job_id]/[test_id]/start" | "/aptitude/test/[job_id]/[test_id]/take" | "/aptitude/[job_id]" | "/(dashboard)/candidates" | "/(dashboard)/candidates/[candidate_id]" | "/(dashboard)/candidates/[candidate_id]/hr-interview" | "/(dashboard)/candidates/[candidate_id]/technical-interview" | "/(dashboard)/company" | "/(dashboard)/dashboard" | "/interview" | "/interview/hr" | "/interview/hr/[session]" | "/interview/hr/[session]/results" | "/interview/technical" | "/interview/technical/[session]" | "/interview/technical/[session]/results" | "/(dashboard)/jobs" | "/(dashboard)/jobs/new" | "/(dashboard)/jobs/[job_id]" | "/(dashboard)/jobs/[job_id]/aptitude" | "/(dashboard)/jobs/[job_id]/edit" | "/(dashboard)/jobs/[job_id]/hr" | "/(dashboard)/jobs/[job_id]/technical" | "/(auth)/login" | "/(auth)/register" | "/(dashboard)/settings";
		RouteParams(): {
			"/apply/[job_id]": { job_id: string };
			"/aptitude/test/[job_id]": { job_id: string };
			"/aptitude/test/[job_id]/[test_id]": { job_id: string; test_id: string };
			"/aptitude/test/[job_id]/[test_id]/results": { job_id: string; test_id: string };
			"/aptitude/test/[job_id]/[test_id]/start": { job_id: string; test_id: string };
			"/aptitude/test/[job_id]/[test_id]/take": { job_id: string; test_id: string };
			"/aptitude/[job_id]": { job_id: string };
			"/(dashboard)/candidates/[candidate_id]": { candidate_id: string };
			"/(dashboard)/candidates/[candidate_id]/hr-interview": { candidate_id: string };
			"/(dashboard)/candidates/[candidate_id]/technical-interview": { candidate_id: string };
			"/interview/hr/[session]": { session: string };
			"/interview/hr/[session]/results": { session: string };
			"/interview/technical/[session]": { session: string };
			"/interview/technical/[session]/results": { session: string };
			"/(dashboard)/jobs/[job_id]": { job_id: string };
			"/(dashboard)/jobs/[job_id]/aptitude": { job_id: string };
			"/(dashboard)/jobs/[job_id]/edit": { job_id: string };
			"/(dashboard)/jobs/[job_id]/hr": { job_id: string };
			"/(dashboard)/jobs/[job_id]/technical": { job_id: string }
		};
		LayoutParams(): {
			"/(dashboard)": { candidate_id?: string; job_id?: string };
			"/(auth)": Record<string, never>;
			"/": { job_id?: string; test_id?: string; candidate_id?: string; session?: string };
			"/(dashboard)/analytics": Record<string, never>;
			"/apply": { job_id?: string };
			"/apply/[job_id]": { job_id: string };
			"/aptitude": { job_id?: string; test_id?: string };
			"/aptitude/test": { job_id?: string; test_id?: string };
			"/aptitude/test/[job_id]": { job_id: string; test_id?: string };
			"/aptitude/test/[job_id]/[test_id]": { job_id: string; test_id: string };
			"/aptitude/test/[job_id]/[test_id]/results": { job_id: string; test_id: string };
			"/aptitude/test/[job_id]/[test_id]/start": { job_id: string; test_id: string };
			"/aptitude/test/[job_id]/[test_id]/take": { job_id: string; test_id: string };
			"/aptitude/[job_id]": { job_id: string };
			"/(dashboard)/candidates": { candidate_id?: string };
			"/(dashboard)/candidates/[candidate_id]": { candidate_id: string };
			"/(dashboard)/candidates/[candidate_id]/hr-interview": { candidate_id: string };
			"/(dashboard)/candidates/[candidate_id]/technical-interview": { candidate_id: string };
			"/(dashboard)/company": Record<string, never>;
			"/(dashboard)/dashboard": Record<string, never>;
			"/interview": { session?: string };
			"/interview/hr": { session?: string };
			"/interview/hr/[session]": { session: string };
			"/interview/hr/[session]/results": { session: string };
			"/interview/technical": { session?: string };
			"/interview/technical/[session]": { session: string };
			"/interview/technical/[session]/results": { session: string };
			"/(dashboard)/jobs": { job_id?: string };
			"/(dashboard)/jobs/new": Record<string, never>;
			"/(dashboard)/jobs/[job_id]": { job_id: string };
			"/(dashboard)/jobs/[job_id]/aptitude": { job_id: string };
			"/(dashboard)/jobs/[job_id]/edit": { job_id: string };
			"/(dashboard)/jobs/[job_id]/hr": { job_id: string };
			"/(dashboard)/jobs/[job_id]/technical": { job_id: string };
			"/(auth)/login": Record<string, never>;
			"/(auth)/register": Record<string, never>;
			"/(dashboard)/settings": Record<string, never>
		};
		Pathname(): "/" | "/analytics" | "/analytics/" | "/apply" | "/apply/" | `/apply/${string}` & {} | `/apply/${string}/` & {} | "/aptitude" | "/aptitude/" | "/aptitude/test" | "/aptitude/test/" | `/aptitude/test/${string}` & {} | `/aptitude/test/${string}/` & {} | `/aptitude/test/${string}/${string}` & {} | `/aptitude/test/${string}/${string}/` & {} | `/aptitude/test/${string}/${string}/results` & {} | `/aptitude/test/${string}/${string}/results/` & {} | `/aptitude/test/${string}/${string}/start` & {} | `/aptitude/test/${string}/${string}/start/` & {} | `/aptitude/test/${string}/${string}/take` & {} | `/aptitude/test/${string}/${string}/take/` & {} | `/aptitude/${string}` & {} | `/aptitude/${string}/` & {} | "/candidates" | "/candidates/" | `/candidates/${string}` & {} | `/candidates/${string}/` & {} | `/candidates/${string}/hr-interview` & {} | `/candidates/${string}/hr-interview/` & {} | `/candidates/${string}/technical-interview` & {} | `/candidates/${string}/technical-interview/` & {} | "/company" | "/company/" | "/dashboard" | "/dashboard/" | "/interview" | "/interview/" | "/interview/hr" | "/interview/hr/" | `/interview/hr/${string}` & {} | `/interview/hr/${string}/` & {} | `/interview/hr/${string}/results` & {} | `/interview/hr/${string}/results/` & {} | "/interview/technical" | "/interview/technical/" | `/interview/technical/${string}` & {} | `/interview/technical/${string}/` & {} | `/interview/technical/${string}/results` & {} | `/interview/technical/${string}/results/` & {} | "/jobs" | "/jobs/" | "/jobs/new" | "/jobs/new/" | `/jobs/${string}` & {} | `/jobs/${string}/` & {} | `/jobs/${string}/aptitude` & {} | `/jobs/${string}/aptitude/` & {} | `/jobs/${string}/edit` & {} | `/jobs/${string}/edit/` & {} | `/jobs/${string}/hr` & {} | `/jobs/${string}/hr/` & {} | `/jobs/${string}/technical` & {} | `/jobs/${string}/technical/` & {} | "/login" | "/login/" | "/register" | "/register/" | "/settings" | "/settings/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}