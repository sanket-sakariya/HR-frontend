export const THEME = {
  colors: {
    primary: 'purple',
    success: 'emerald',
    warning: 'amber',
    danger: 'red',
    info: 'blue'
  },
  gradients: {
    primary: 'from-purple-600 to-purple-500',
    success: 'from-emerald-500 to-emerald-400',
    danger: 'from-red-500 to-red-400'
  }
} as const;

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  // Job statuses
  draft: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  paused: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  closed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },

  // Candidate statuses
  applied: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  resume_screened: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  aptitude_eligible: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  aptitude_passed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  aptitude_failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  technical_eligible: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  technical_passed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  technical_failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  hr_eligible: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  hr_passed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  hr_failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  hire_recommended: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },

  // Interview statuses
  pending: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  in_progress: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },

  // Pass/Fail
  pass: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  fail: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
} as const;
