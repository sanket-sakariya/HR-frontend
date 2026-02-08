export const THEME = {
  colors: {
    primary: 'royal',
    success: 'emerald',
    warning: 'amber',
    danger: 'red',
    info: 'blue'
  },
  gradients: {
    primary: 'from-royal-600 to-royal-500',
    success: 'from-emerald-600 to-emerald-500',
    danger: 'from-red-600 to-red-500'
  }
} as const;

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  // Job statuses
  draft: { bg: 'bg-slate-700/50', text: 'text-slate-400', border: 'border-slate-600/30' },
  active: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  paused: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
  closed: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },

  // Candidate statuses
  applied: { bg: 'bg-slate-700/50', text: 'text-slate-400', border: 'border-slate-600/30' },
  resume_screened: { bg: 'bg-royal-500/10', text: 'text-royal-400', border: 'border-royal-500/20' },
  aptitude_eligible: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  aptitude_passed: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  aptitude_failed: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },
  technical_eligible: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  technical_passed: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  technical_failed: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },
  hr_eligible: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  hr_passed: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  hr_failed: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },
  hire_recommended: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  rejected: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },

  // Interview statuses
  pending: { bg: 'bg-slate-700/50', text: 'text-slate-400', border: 'border-slate-600/30' },
  in_progress: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
  completed: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },

  // Pass/Fail
  pass: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  fail: { bg: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' }
} as const;
