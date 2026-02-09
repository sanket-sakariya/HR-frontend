export const ROUTES = {
  // Auth
  login: '/login',
  register: '/register',

  // Dashboard
  dashboard: '/',
  company: '/company',

  // Jobs
  jobs: '/jobs',
  newJob: '/jobs/new',
  job: (id: string) => `/jobs/${id}`,
  editJob: (id: string) => `/jobs/${id}/edit`,
  jobAptitude: (id: string) => `/jobs/${id}/aptitude`,
  jobTechnical: (id: string) => `/jobs/${id}/technical`,
  jobHR: (id: string) => `/jobs/${id}/hr`,

  // Candidates
  candidates: '/candidates',
  candidate: (id: string) => `/candidates/${id}`,

  // Analytics
  analytics: '/analytics',

  // Interviews (Candidate-facing)
  technicalInterview: (sessionId: string) => `/interview/technical/${sessionId}`,
  hrInterview: (sessionId: string) => `/interview/hr/${sessionId}`,

  // Public
  apply: (jobId: string) => `/apply/${jobId}`
} as const;

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: ROUTES.dashboard,
    icon: 'LayoutDashboard'
  },
  {
    label: 'Jobs',
    href: ROUTES.jobs,
    icon: 'Briefcase'
  },
  {
    label: 'Analytics',
    href: ROUTES.analytics,
    icon: 'BarChart3'
  },
  {
    label: 'Company',
    href: ROUTES.company,
    icon: 'Building2'
  }
] as const;
