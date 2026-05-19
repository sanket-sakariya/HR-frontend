<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createCandidateQuery } from '$lib/api/queries/candidates';
  import { useAptitudeAttemptByCandidate } from '$lib/api/queries/aptitude';
  import {
    useTechnicalResultByCandidate,
    useHRResultByCandidate,
    useStartTechnicalInterview,
    useStartHRInterview
  } from '$lib/api/queries/interviews';
  import { API_URLS, fetchWithAuth } from '$lib/api/client';
  import { formatRelativeTime as formatRelative, formatDate, formatDateTime, formatDuration } from '$lib/utils/format';
  import Button from '$lib/components/ui/Button.svelte';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    FileText,
    Download,
    ExternalLink,
    Brain,
    Code,
    Handshake,
    CheckCircle,
    XCircle,
    Clock,
    Star,
    MessageSquare,
    Edit,
    Copy,
    Eye,
    TrendingUp,
    EyeOff,
    RefreshCw,
    Loader2
  } from 'lucide-svelte';

  const candidateId = $derived($page.params.candidate_id);
  const candidateQuery = createCandidateQuery(candidateId);
  const aptitudeAttemptQuery = useAptitudeAttemptByCandidate(() => candidateId);
  const aptitudeAttempt = $derived($aptitudeAttemptQuery.data);
  $effect(() => {
    console.log('[candidate-page] aptitude query', {
      isLoading: $aptitudeAttemptQuery.isLoading,
      isFetching: $aptitudeAttemptQuery.isFetching,
      isError: $aptitudeAttemptQuery.isError,
      error: $aptitudeAttemptQuery.error,
      data: $aptitudeAttemptQuery.data
    });
  });
  const aptitudeScore = $derived(
    typeof aptitudeAttempt?.score === 'number'
      ? aptitudeAttempt.score
      : Number.isFinite(Number((candidate as any)?.aptitude_test_score))
        ? Number((candidate as any).aptitude_test_score)
        : null
  );

  const technicalResultQuery = useTechnicalResultByCandidate(() => candidateId);
  const technicalResult = $derived($technicalResultQuery.data);
  const technicalScore = $derived(
    typeof technicalResult?.overall_score === 'number'
      ? technicalResult.overall_score
      : Number.isFinite(Number((candidate as any)?.technical_test_score))
        ? Number((candidate as any).technical_test_score)
        : null
  );

  const hrResultQuery = useHRResultByCandidate(() => candidateId);
  const hrResult = $derived($hrResultQuery.data);
  const hrScore = $derived(
    typeof hrResult?.overall_score === 'number'
      ? hrResult.overall_score
      : Number.isFinite(Number((candidate as any)?.hr_test_score))
        ? Number((candidate as any).hr_test_score)
        : null
  );

  let activeTab = $state<'overview' | 'notes' | 'timeline'>('overview');
  let showRejectDialog = $state(false);
  let showAptitudePassword = $state(false);

  async function copyPassword() {
    const pw = (candidate as any)?.password;
    if (!pw) return;
    try {
      await navigator.clipboard.writeText(pw);
      toast.success('Aptitude password copied');
    } catch {
      toast.error('Could not copy to clipboard');
    }
  }

  let resettingAptitude = $state(false);
  async function resetAptitude() {
    if (!candidate) return;
    const confirmed = window.confirm(
      'Reset this candidate\'s aptitude attempts? Their previous attempt(s) will be deleted and their attempt count goes back to 0 so they can retake the test.'
    );
    if (!confirmed) return;

    resettingAptitude = true;
    try {
      const res = await fetchWithAuth(
        `${API_URLS.main}/aptitude/reset-attempts/${(candidate as any).candidate_id}`,
        { method: 'POST' }
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.success === false) {
        throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
      }
      toast.success(body?.message || 'Aptitude attempts reset');
      $candidateQuery.refetch?.();
    } catch (err: any) {
      toast.error(`Failed to reset: ${err?.message ?? err}`);
    } finally {
      resettingAptitude = false;
    }
  }

  let resettingTechnical = $state(false);
  async function resetTechnical() {
    if (!candidate) return;
    const confirmed = window.confirm(
      'Reset this candidate\'s technical interview? Previous interview record(s) will be deleted so they can retake it.'
    );
    if (!confirmed) return;

    resettingTechnical = true;
    try {
      const res = await fetchWithAuth(
        `${API_URLS.main}/technical-interview/reset/${(candidate as any).candidate_id}`,
        { method: 'POST' }
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.success === false) {
        throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
      }
      toast.success(body?.message || 'Technical interview reset');
      $candidateQuery.refetch?.();
      $technicalResultQuery.refetch?.();
    } catch (err: any) {
      toast.error(`Failed to reset technical interview: ${err?.message ?? err}`);
    } finally {
      resettingTechnical = false;
    }
  }

  let resettingHR = $state(false);
  async function resetHR() {
    if (!candidate) return;
    const confirmed = window.confirm(
      'Reset this candidate\'s HR interview? Previous interview record(s) will be deleted so they can retake it.'
    );
    if (!confirmed) return;

    resettingHR = true;
    try {
      const res = await fetchWithAuth(
        `${API_URLS.main}/hr-interview/reset/${(candidate as any).candidate_id}`,
        { method: 'POST' }
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.success === false) {
        throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
      }
      toast.success(body?.message || 'HR interview reset');
      $candidateQuery.refetch?.();
      $hrResultQuery.refetch?.();
    } catch (err: any) {
      toast.error(`Failed to reset HR interview: ${err?.message ?? err}`);
    } finally {
      resettingHR = false;
    }
  }

  const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
    applied: { label: 'Applied', variant: 'default' },
    resume_screened: { label: 'Resume Screened', variant: 'info' },
    aptitude_eligible: { label: 'Aptitude Eligible', variant: 'info' },
    aptitude_passed: { label: 'Aptitude Passed', variant: 'success' },
    aptitude_failed: { label: 'Aptitude Failed', variant: 'error' },
    technical_eligible: { label: 'Technical Eligible', variant: 'warning' },
    technical_passed: { label: 'Technical Passed', variant: 'success' },
    technical_failed: { label: 'Technical Failed', variant: 'error' },
    hr_eligible: { label: 'HR Eligible', variant: 'warning' },
    hr_passed: { label: 'HR Passed', variant: 'success' },
    hr_failed: { label: 'HR Failed', variant: 'error' },
    hire_recommended: { label: 'Hire Recommended', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'error' }
  };

  const candidate = $derived($candidateQuery.data);

  // Build a public URL to the candidate's resume.
  // Backend stores files as "resume/<candidate_id>.<ext>" and serves them at
  // http://<host>/resume/<filename> (StaticFiles mount in app/main.py).
  const resumeUrl = $derived.by(() => {
    const raw = (candidate as any)?.resume_url;
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw;
    // Strip "/interview-management-service/api/v1" suffix to reach host root
    const host = API_URLS.main.replace(/\/[^/]+\/api\/v1\/?$/, '');
    const path = raw.startsWith('/') ? raw : `/${raw}`;
    return `${host}${path}`;
  });
  
  // Compute full name from first_name and last_name
  const candidateName = $derived(
    candidate ? [candidate.first_name, candidate.last_name].filter(Boolean).join(' ') || 'Unknown' : 'Unknown'
  );
  
  const currentStatus = $derived(
    candidate ? statusConfig[candidate.status || 'applied'] || statusConfig.applied : statusConfig.applied
  );

  function updateStatus(newStatus: string) {
    // Status updates happen automatically through the interview pipeline stages
    toast.info('Candidate status changes occur through the interview pipeline');
  }

  function handleReject() {
    updateStatus('rejected');
    showRejectDialog = false;
  }

  const startTechnicalMutation = useStartTechnicalInterview();
  const startHRMutation = useStartHRInterview();
  let schedulingType = $state<'aptitude' | 'technical' | 'hr' | null>(null);

  async function scheduleInterview(type: 'aptitude' | 'technical' | 'hr') {
    const c: any = candidate;
    const jobId = c?.job_requirement_id;
    const candId = c?.candidate_id;
    if (!jobId || !candId) {
      toast.error('Candidate or job info missing — cannot schedule.');
      return;
    }

    // --- Aptitude: just open the candidate's test URL ---
    if (type === 'aptitude') {
      if (c.aptitude_test === true && c.aptitude_test_result) {
        const retake = window.confirm(
          `This candidate already took the aptitude test (result: ${c.aptitude_test_result}). Open the test URL anyway? (Use "Refresh Aptitude Attempts" first to let them retake.)`
        );
        if (!retake) return;
      }
      const url = `${window.location.origin}/aptitude/${jobId}`;
      window.open(url, '_blank', 'noopener');
      toast.success('Opened aptitude test URL — share it with the candidate.');
      return;
    }

    // --- Technical: navigate to the share-URL page (does NOT auto-start) ---
    if (type === 'technical') {
      if (c.aptitude_test_result !== 'pass') {
        toast.error('Candidate must pass the aptitude test before scheduling a technical interview.');
        return;
      }
      goto(`/candidates/${candId}/technical-interview`);
      return;
    }

    // --- HR: navigate to the share-URL page ---
    if (type === 'hr') {
      if (c.technical_test_result !== 'pass') {
        toast.error('Candidate must pass the technical interview before scheduling an HR interview.');
        return;
      }
      goto(`/candidates/${candId}/hr-interview`);
      return;
    }
  }

  function sendMessage() {
    const email = (candidate as any)?.email;
    if (!email) {
      toast.error('Candidate has no email on file.');
      return;
    }
    const subject = encodeURIComponent(`Regarding your application`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  }

  let generatingReport = $state(false);

  async function downloadDetailedReport() {
    const c: any = candidate ?? {};
    if (!c.candidate_id) {
      toast.error('Candidate data not loaded.');
      return;
    }

    generatingReport = true;
    const loadingToast = toast.loading('Generating AI-powered comprehensive report — this may take 10-20 seconds…');

    // ---- helpers ----
    const escapeHtml = (s: any) =>
      String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    const fmtScore = (v: any) => (typeof v === 'number' ? `${Math.round(v)}/100` : '—');
    const fmtPct = (v: any) => (typeof v === 'number' ? `${Math.round(v)}%` : '—');
    const list = (items: any) => {
      if (!items) return '<li>—</li>';
      if (Array.isArray(items)) {
        return items.length
          ? items.map((s) => `<li>${escapeHtml(String(s))}</li>`).join('')
          : '<li>—</li>';
      }
      return `<li>${escapeHtml(String(items))}</li>`;
    };
    const scoreRow = (label: string, value: any) =>
      `<tr><td>${escapeHtml(label)}</td><td style="text-align:right;font-weight:600;">${fmtScore(value)}</td></tr>`;

    // ---- fetch comprehensive AI report ----
    let payload: any = null;
    try {
      const res = await fetchWithAuth(
        `${API_URLS.main}/candidates/${c.candidate_id}/comprehensive-report`,
        { method: 'POST' }
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
      payload = body?.data ?? null;
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error('Failed to generate AI report', { description: err?.message ?? String(err) });
      generatingReport = false;
      return;
    }

    if (!payload) {
      toast.dismiss(loadingToast);
      toast.error('No report data returned.');
      generatingReport = false;
      return;
    }

    const fullName = payload.candidate_name || `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim() || 'Candidate';
    const resumeScore = payload.resume_score ?? c.candidate_resume_score ?? c.resume_score ?? null;
    const ai = payload.ai_report ?? {};
    const apt = payload.aptitude ?? {};
    const aptSummary = apt.summary ?? {};
    const aptQA: any[] = Array.isArray(apt.qa) ? apt.qa : [];
    const tr = payload.technical ?? {};
    const hr = payload.hr ?? {};

    const recBadgeColor = (rec: string) => {
      switch (rec) {
        case 'strong_hire': return '#059669';
        case 'hire': return '#10b981';
        case 'neutral': return '#f59e0b';
        case 'no_hire': return '#ef4444';
        case 'strong_no_hire': return '#dc2626';
        default: return '#6b7280';
      }
    };

    const aptQARows = aptQA.map((q: any) => {
      const optionsHtml =
        q.options && typeof q.options === 'object'
          ? Object.entries(q.options).map(
              ([k, v]) =>
                `<div style="font-size:12px;color:${k === q.correct_answer ? '#059669' : k === q.given ? '#dc2626' : '#6b7280'};${k === q.correct_answer ? 'font-weight:600;' : ''}">${escapeHtml(k)}. ${escapeHtml(String(v))}${k === q.correct_answer ? ' ✓' : ''}${k === q.given && k !== q.correct_answer ? ' ✗ (chosen)' : ''}</div>`
            ).join('')
          : '';
      return `
        <tr><td colspan="2" style="padding-top:14px;">
          <div style="font-size:13px;color:#374151;"><strong>Q${q.q_no}.</strong> <span style="color:#9ca3af;">[${escapeHtml(q.category || '')}]</span> ${escapeHtml(q.question)}</div>
          <div style="margin-top:6px;margin-left:10px;">${optionsHtml}</div>
          <div style="font-size:12px;margin-top:4px;color:${q.is_correct ? '#059669' : '#dc2626'};font-weight:600;">
            ${q.is_correct ? '✓ Correct' : `✗ Wrong — chose ${q.given ?? 'nothing'}, correct was ${q.correct}`}
          </div>
        </td></tr>`;
    }).join('');

    const formatTranscript = (t: any): string => {
      if (!t) return '<p style="color:#9ca3af;font-style:italic;">No transcript available.</p>';
      if (typeof t === 'string') return `<pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;color:#374151;background:#fafafa;border:1px solid #e5e7eb;border-radius:6px;padding:14px;">${escapeHtml(t)}</pre>`;
      if (Array.isArray(t)) {
        return t.map((turn: any) => {
          const speaker = turn.speaker || turn.role || 'speaker';
          const text = turn.text || turn.content || '';
          const isInterviewer = /interview/i.test(speaker);
          return `<div style="margin:8px 0;padding:10px 14px;border-radius:8px;background:${isInterviewer ? '#fffbeb' : '#f9fafb'};border-left:3px solid ${isInterviewer ? '#f59e0b' : '#9ca3af'};">
            <div style="font-size:11px;color:${isInterviewer ? '#d97706' : '#6b7280'};font-weight:700;text-transform:uppercase;margin-bottom:4px;">${escapeHtml(speaker)}</div>
            <div style="font-size:13px;color:#374151;white-space:pre-wrap;">${escapeHtml(text)}</div>
          </div>`;
        }).join('');
      }
      return `<pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;color:#374151;">${escapeHtml(JSON.stringify(t, null, 2))}</pre>`;
    };

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${escapeHtml(fullName)} — Comprehensive Hiring Report</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;max-width:900px;margin:32px auto;padding:0 24px;line-height:1.6;}
  h1{margin:0 0 4px;font-size:30px;color:#111827;}
  h2{margin:36px 0 14px;font-size:20px;color:#d97706;border-bottom:2px solid #fde68a;padding-bottom:6px;}
  h3{margin:20px 0 8px;font-size:15px;color:#374151;}
  .meta{color:#6b7280;font-size:13px;margin-bottom:24px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .card{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px;}
  .card .lbl{font-size:11px;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;}
  .card .val{font-size:22px;font-weight:700;color:#111827;margin-top:4px;}
  .card .sub{font-size:12px;color:#6b7280;margin-top:2px;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-top:6px;}
  td{padding:6px 8px;border-bottom:1px solid #f3f4f6;vertical-align:top;}
  .pass{color:#059669;font-weight:700;}
  .fail{color:#dc2626;font-weight:700;}
  ul{margin:6px 0 0 18px;padding:0;font-size:13px;color:#374151;}
  li{margin-bottom:4px;}
  .ai-section{background:linear-gradient(135deg,#fff7ed,#fffbeb);border:1px solid #fde68a;border-radius:14px;padding:24px;margin:18px 0;}
  .ai-section p{font-size:13.5px;color:#374151;}
  .footer{margin-top:48px;font-size:11px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:12px;}
  .badge{display:inline-block;padding:6px 14px;border-radius:999px;font-weight:700;font-size:13px;color:#fff;letter-spacing:0.5px;}
  @media print{body{margin:0;max-width:none;}.no-print{display:none;}h2{page-break-after:avoid;}}
  @page{margin:18mm;}
</style></head>
<body>
  <div class="no-print" style="text-align:right;margin-bottom:16px;">
    <button onclick="window.print()" style="padding:10px 18px;background:#f59e0b;color:#fff;border:0;border-radius:8px;cursor:pointer;font-weight:600;font-size:14px;">Print / Save as PDF</button>
  </div>

  <h1>${escapeHtml(fullName)}</h1>
  <div class="meta">
    ${escapeHtml(c.email || '')} ${c.phone_number ? ' · ' + escapeHtml(c.phone_number) : ''}<br>
    Applied for: <strong>${escapeHtml(c.job_title || '—')}</strong><br>
    Report generated: ${new Date().toLocaleString()}
  </div>

  ${ai.hire_recommendation ? `
    <div class="ai-section" style="text-align:center;">
      <div style="font-size:11px;color:#92400e;letter-spacing:1px;text-transform:uppercase;font-weight:700;">AI Hiring Recommendation</div>
      <div style="margin:10px 0;"><span class="badge" style="background:${recBadgeColor(ai.hire_recommendation)};">${escapeHtml(String(ai.hire_recommendation).replace(/_/g,' ').toUpperCase())}</span></div>
      <div style="font-size:18px;color:#111827;font-weight:600;margin-top:8px;">${escapeHtml(ai.headline || '')}</div>
      ${typeof ai.overall_score_out_of_10 === 'number' ? `<div style="margin-top:8px;font-size:14px;color:#6b7280;">Overall: <strong style="color:#111827;">${ai.overall_score_out_of_10}/10</strong> · Confidence: <strong style="color:#111827;">${escapeHtml(ai.confidence || '—')}</strong></div>` : ''}
    </div>
  ` : ''}

  <h2>Pipeline Overview</h2>
  <div class="grid">
    <div class="card"><div class="lbl">Resume AI Match</div><div class="val">${fmtPct(resumeScore)}</div><div class="sub">${c.resume_selected === true ? 'Shortlisted' : 'Reviewed'}</div></div>
    <div class="card"><div class="lbl">Aptitude</div><div class="val">${fmtPct(aptSummary.score ?? c.aptitude_test_score)}</div><div class="sub ${c.aptitude_test_result === 'pass' || aptSummary.passed === true ? 'pass' : c.aptitude_test_result === 'fail' || aptSummary.passed === false ? 'fail' : ''}">${(c.aptitude_test_result ?? (aptSummary.passed === true ? 'pass' : aptSummary.passed === false ? 'fail' : 'Not taken')).toString().toUpperCase()}</div></div>
    <div class="card"><div class="lbl">Technical Interview</div><div class="val">${fmtPct(tr.overall_score ?? c.technical_test_score)}</div><div class="sub ${tr.result === 'pass' || c.technical_test_result === 'pass' ? 'pass' : tr.result === 'fail' || c.technical_test_result === 'fail' ? 'fail' : ''}">${(tr.result || c.technical_test_result || 'Not taken').toString().toUpperCase()}</div></div>
    <div class="card"><div class="lbl">HR Interview</div><div class="val">${fmtPct(hr.overall_score ?? c.hr_test_score)}</div><div class="sub ${hr.result === 'pass' || c.hr_test_result === 'pass' ? 'pass' : hr.result === 'fail' || c.hr_test_result === 'fail' ? 'fail' : ''}">${(hr.result || c.hr_test_result || 'Not taken').toString().toUpperCase()}</div></div>
  </div>

  ${ai.executive_summary ? `
    <h2>Executive Summary</h2>
    <div class="ai-section"><p>${escapeHtml(ai.executive_summary)}</p></div>
  ` : ''}

  ${ai.technical_assessment ? `
    <h2>Technical Assessment</h2>
    <p>${escapeHtml(ai.technical_assessment).replace(/\n/g, '<br>')}</p>
  ` : ''}

  ${ai.behavioral_assessment ? `
    <h2>Behavioral Assessment</h2>
    <p>${escapeHtml(ai.behavioral_assessment).replace(/\n/g, '<br>')}</p>
  ` : ''}

  ${ai.communication_assessment ? `
    <h2>Communication Assessment</h2>
    <p>${escapeHtml(ai.communication_assessment).replace(/\n/g, '<br>')}</p>
  ` : ''}

  ${ai.cultural_fit_assessment ? `
    <h2>Cultural Fit Assessment</h2>
    <p>${escapeHtml(ai.cultural_fit_assessment).replace(/\n/g, '<br>')}</p>
  ` : ''}

  ${(ai.key_strengths?.length || ai.key_concerns?.length) ? `
    <h2>Strengths & Concerns</h2>
    <div class="grid">
      <div><h3 style="color:#059669;">Key Strengths</h3><ul>${list(ai.key_strengths)}</ul></div>
      <div><h3 style="color:#dc2626;">Key Concerns</h3><ul>${list(ai.key_concerns)}</ul></div>
    </div>
  ` : ''}

  ${ai.risk_areas?.length ? `
    <h2>Risk Areas</h2>
    <ul>${list(ai.risk_areas)}</ul>
  ` : ''}

  ${ai.recommended_next_steps?.length ? `
    <h2>Recommended Next Steps</h2>
    <ul>${list(ai.recommended_next_steps)}</ul>
  ` : ''}

  ${ai.comparison_vs_role ? `
    <h2>Comparison vs Role Bar</h2>
    <p>${escapeHtml(ai.comparison_vs_role)}</p>
  ` : ''}

  ${aptQA.length ? `
    <h2>Aptitude Test — Question & Answer Detail</h2>
    <p style="font-size:13px;color:#6b7280;">Score: <strong>${aptSummary.score ?? '—'}/100</strong> · Correct: <strong>${aptSummary.correct ?? '—'}/${aptSummary.total ?? '—'}</strong> · ${aptSummary.passed ? '<span class="pass">PASSED</span>' : '<span class="fail">FAILED</span>'}</p>
    <table>${aptQARows}</table>
  ` : ''}

  ${tr.overall_score != null ? `
    <h2>Technical Interview — Score Breakdown</h2>
    <table>
      ${scoreRow('Overall Score', tr.overall_score)}
      ${tr.scores ? Object.entries(tr.scores).map(([k, v]) => scoreRow(k.replace(/_/g,' ').replace(/\b\w/g, (m: string) => m.toUpperCase()), v)).join('') : ''}
    </table>
    ${tr.ai_feedback ? `<h3>AI Feedback</h3><p style="font-size:13px;">${escapeHtml(tr.ai_feedback)}</p>` : ''}
    ${tr.strengths ? `<h3>Strengths</h3><ul>${list(tr.strengths)}</ul>` : ''}
    ${tr.weaknesses ? `<h3>Weaknesses</h3><ul>${list(tr.weaknesses)}</ul>` : ''}
    <h3>Full Transcript</h3>
    ${formatTranscript(tr.transcript)}
  ` : ''}

  ${hr.overall_score != null ? `
    <h2>HR Interview — Score Breakdown</h2>
    <table>
      ${scoreRow('Overall Score', hr.overall_score)}
      ${hr.scores ? Object.entries(hr.scores).map(([k, v]) => scoreRow(k.replace(/_/g,' ').replace(/\b\w/g, (m: string) => m.toUpperCase()), v)).join('') : ''}
    </table>
    ${hr.ai_feedback ? `<h3>AI Feedback</h3><p style="font-size:13px;">${escapeHtml(hr.ai_feedback)}</p>` : ''}
    ${hr.strengths ? `<h3>Strengths</h3><ul>${list(hr.strengths)}</ul>` : ''}
    ${hr.weaknesses ? `<h3>Weaknesses</h3><ul>${list(hr.weaknesses)}</ul>` : ''}
    <h3>Full Transcript</h3>
    ${formatTranscript(hr.transcript)}
  ` : ''}

  <div class="footer">HR Automation — confidential. Generated for ${escapeHtml(fullName)} on ${new Date().toLocaleString()}.</div>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}_comprehensive_report.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.dismiss(loadingToast);
    toast.success('Comprehensive report downloaded. Open and use "Print → Save as PDF" for a PDF copy.');
    generatingReport = false;
  }

  // Build interview history from this candidate's real data:
  // - aptitude attempt (aptitudeAttempt)
  // - technical interview (technicalResult)
  // - HR interview (hrResult)
  // Each entry is only added when there's actual data for THIS candidate.
  const interviewHistory = $derived.by(() => {
    const c: any = candidate ?? {};
    const items: Array<{
      type: 'aptitude' | 'technical' | 'hr';
      status: string;             // 'completed' | 'in_progress' | 'pending' | 'scheduled' | etc.
      score: number | null;       // 0-100 or null
      date: string | null;        // ISO timestamp or null
      duration: string | null;    // human-readable
      passed?: boolean | null;
    }> = [];

    // ---------- Aptitude ----------
    if (aptitudeAttempt || c.aptitude_test === true) {
      const a: any = aptitudeAttempt ?? {};
      const score =
        typeof a.score === 'number'
          ? a.score
          : Number.isFinite(Number(c.aptitude_test_score))
            ? Number(c.aptitude_test_score)
            : null;
      const passed =
        a.passed === true
          ? true
          : a.passed === false
            ? false
            : c.aptitude_test_result === 'pass'
              ? true
              : c.aptitude_test_result === 'fail'
                ? false
                : null;
      items.push({
        type: 'aptitude',
        status: a.status ?? (c.aptitude_test === true ? 'completed' : 'pending'),
        score,
        date: a.submitted_at ?? a.started_at ?? null,
        duration: a.time_taken_seconds != null ? formatDuration(a.time_taken_seconds) : null,
        passed,
      });
    }

    // ---------- Technical ----------
    // Show row if EITHER the rich query has data OR the candidate flag indicates it was taken.
    if (technicalResult || c.technical_test === true || c.technical_test_result) {
      const tr: any = technicalResult ?? {};
      const score =
        typeof tr.overall_score === 'number'
          ? tr.overall_score
          : Number.isFinite(Number(c.technical_test_score))
            ? Number(c.technical_test_score)
            : null;
      const resultStr = tr.result ?? c.technical_test_result ?? null;
      const passed =
        resultStr === 'pass'
          ? true
          : resultStr === 'fail'
            ? false
            : typeof score === 'number' && typeof tr.passed_threshold === 'number'
              ? score >= tr.passed_threshold
              : null;
      items.push({
        type: 'technical',
        status: tr.interview_status ?? (c.technical_test === true ? 'completed' : 'pending'),
        score,
        date:
          tr.interview_ended_at ??
          tr.interview_started_at ??
          tr.created_at ??
          tr.submitted_at ??
          tr.completed_at ??
          null,
        duration:
          typeof tr.interview_duration_seconds === 'number'
            ? formatDuration(tr.interview_duration_seconds)
            : null,
        passed,
      });
    }

    // ---------- HR ----------
    if (hrResult || c.hr_test === true || c.hr_test_result) {
      const hr: any = hrResult ?? {};
      const score =
        typeof hr.overall_score === 'number'
          ? hr.overall_score
          : Number.isFinite(Number(c.hr_test_score))
            ? Number(c.hr_test_score)
            : null;
      const resultStr = hr.result ?? c.hr_test_result ?? null;
      const passed =
        resultStr === 'pass'
          ? true
          : resultStr === 'fail'
            ? false
            : typeof score === 'number' && typeof hr.passed_threshold === 'number'
              ? score >= hr.passed_threshold
              : null;
      items.push({
        type: 'hr',
        status: hr.interview_status ?? (c.hr_test === true ? 'completed' : 'pending'),
        score,
        date:
          hr.interview_ended_at ??
          hr.interview_started_at ??
          hr.created_at ??
          hr.submitted_at ??
          hr.completed_at ??
          null,
        duration:
          typeof hr.interview_duration_seconds === 'number'
            ? formatDuration(hr.interview_duration_seconds)
            : null,
        passed,
      });
    }

    // Newest first
    return items.sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0;
      const tb = b.date ? new Date(b.date).getTime() : 0;
      return tb - ta;
    });
  });

  // Real activity timeline — built from candidate row + interview results.
  // Only includes events that actually happened.
  const timelineEvents = $derived.by(() => {
    const c: any = candidate ?? {};
    const events: Array<{
      key: string;
      action: string;
      detail?: string | null;
      date: string | null;
      icon: any;
      tone: 'neutral' | 'success' | 'danger' | 'info';
    }> = [];

    // 1. Application submitted
    if (c.created_at) {
      events.push({
        key: 'created',
        action: 'Application submitted',
        detail: c.job_title ? `Applied for ${c.job_title}` : null,
        date: c.created_at,
        icon: Star,
        tone: 'neutral',
      });
    }

    // 2. Resume scored / shortlisted
    const resumeScore =
      typeof c.candidate_resume_score === 'number'
        ? c.candidate_resume_score
        : typeof c.resume_score === 'number'
          ? c.resume_score
          : null;
    if (resumeScore != null) {
      const selected = c.resume_selected === true || resumeScore >= 60;
      events.push({
        key: 'resume-scored',
        action: selected ? 'Resume shortlisted by AI' : 'Resume reviewed',
        detail: `AI score: ${resumeScore}/100`,
        date: c.resume_scored_at ?? c.updated_at ?? c.created_at ?? null,
        icon: FileText,
        tone: selected ? 'success' : 'info',
      });
    }

    // 3. Aptitude test
    if (aptitudeAttempt?.started_at) {
      events.push({
        key: 'apt-started',
        action: 'Aptitude test started',
        date: aptitudeAttempt.started_at,
        icon: Brain,
        tone: 'info',
      });
    }
    if (aptitudeAttempt?.submitted_at || c.aptitude_test === true) {
      const passed =
        aptitudeAttempt?.passed === true || c.aptitude_test_result === 'pass';
      const score =
        typeof aptitudeAttempt?.score === 'number'
          ? aptitudeAttempt.score
          : typeof c.aptitude_test_score === 'number'
            ? c.aptitude_test_score
            : null;
      events.push({
        key: 'apt-done',
        action: passed ? 'Aptitude test passed' : 'Aptitude test completed',
        detail: score != null ? `Score: ${score}/100` : null,
        date: aptitudeAttempt?.submitted_at ?? c.updated_at ?? null,
        icon: passed ? CheckCircle : XCircle,
        tone: passed ? 'success' : 'danger',
      });
    }

    // 4. Technical interview
    const tr: any = technicalResult ?? null;
    if (tr?.interview_started_at) {
      events.push({
        key: 'tech-started',
        action: 'Technical interview started',
        date: tr.interview_started_at,
        icon: Code,
        tone: 'info',
      });
    }
    if (tr?.interview_ended_at || c.technical_test === true) {
      const passed =
        tr?.result === 'pass' || c.technical_test_result === 'pass';
      const score =
        typeof tr?.overall_score === 'number'
          ? tr.overall_score
          : typeof c.technical_test_score === 'number'
            ? c.technical_test_score
            : null;
      events.push({
        key: 'tech-done',
        action: passed ? 'Technical interview passed' : 'Technical interview completed',
        detail: score != null ? `Score: ${score}/100` : null,
        date: tr?.interview_ended_at ?? c.updated_at ?? null,
        icon: passed ? CheckCircle : XCircle,
        tone: passed ? 'success' : 'danger',
      });
    }

    // 5. HR interview
    const hr: any = hrResult ?? null;
    if (hr?.interview_started_at) {
      events.push({
        key: 'hr-started',
        action: 'HR interview started',
        date: hr.interview_started_at,
        icon: Handshake,
        tone: 'info',
      });
    }
    if (hr?.interview_ended_at || c.hr_test === true) {
      const passed = hr?.result === 'pass' || c.hr_test_result === 'pass';
      const score =
        typeof hr?.overall_score === 'number'
          ? hr.overall_score
          : typeof c.hr_test_score === 'number'
            ? c.hr_test_score
            : null;
      events.push({
        key: 'hr-done',
        action: passed ? 'HR interview passed' : 'HR interview completed',
        detail: score != null ? `Score: ${score}/100` : null,
        date: hr?.interview_ended_at ?? c.updated_at ?? null,
        icon: passed ? CheckCircle : XCircle,
        tone: passed ? 'success' : 'danger',
      });
    }

    // 6. Final outcome
    if (c.status === 'hired' || c.is_hired === true) {
      events.push({
        key: 'hired',
        action: 'Candidate hired',
        detail: 'Offer accepted',
        date: c.hired_at ?? c.updated_at ?? null,
        icon: CheckCircle,
        tone: 'success',
      });
    } else if (c.status === 'rejected' || c.is_rejected === true) {
      events.push({
        key: 'rejected',
        action: 'Candidate rejected',
        date: c.rejected_at ?? c.updated_at ?? null,
        icon: XCircle,
        tone: 'danger',
      });
    }

    // Sort newest-first
    return events.sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0;
      const tb = b.date ? new Date(b.date).getTime() : 0;
      return tb - ta;
    });
  });

  // Pipeline is "complete" when HR interview is done OR candidate is hired/rejected
  const pipelineComplete = $derived.by(() => {
    const c: any = candidate ?? {};
    return (
      c.hr_test === true ||
      !!hrResult ||
      c.status === 'hired' ||
      c.status === 'rejected' ||
      c.is_hired === true ||
      c.is_rejected === true
    );
  });

  // Pipeline Progress — derived from real candidate signals (not the static status field)
  // Stage state: 'completed' (passed/done), 'failed', 'current' (in progress / eligible),
  // 'pending' (not reached yet).
  const pipelineStages = $derived.by(() => {
    const c: any = candidate ?? {};

    // Resume: completed if a score exists OR resume_selected is set
    const resumeScore =
      typeof c.candidate_resume_score === 'number'
        ? c.candidate_resume_score
        : typeof c.resume_score === 'number'
          ? c.resume_score
          : null;
    const resumeDone = resumeScore != null || c.resume_selected != null;
    const resumeSelected = c.resume_selected === true || (resumeScore != null && resumeScore >= 60);

    // Aptitude
    const aptitudeTaken = c.aptitude_test === true || !!aptitudeAttempt;
    const aptitudeResult =
      c.aptitude_test_result ??
      (aptitudeAttempt?.passed === true ? 'pass' : aptitudeAttempt?.passed === false ? 'fail' : null);
    const aptitudePassed = aptitudeResult === 'pass';

    // Technical
    const technicalTaken = c.technical_test === true || !!technicalResult;
    const technicalResultStr =
      c.technical_test_result ??
      (technicalResult?.overall_score != null && technicalResult?.passed_threshold != null
        ? technicalResult.overall_score >= technicalResult.passed_threshold
          ? 'pass'
          : 'fail'
        : null);
    const technicalPassed = technicalResultStr === 'pass';

    // HR
    const hrTaken = c.hr_test === true || !!hrResult;
    const hrResultStr =
      c.hr_test_result ??
      (hrResult?.overall_score != null
        ? hrResult.overall_score >= 60
          ? 'pass'
          : 'fail'
        : null);
    const hrPassed = hrResultStr === 'pass';

    const hireRecommended =
      c.status === 'hire_recommended' || c.status === 'hired' || (hrPassed && technicalPassed);

    const stages = [
      {
        id: 'applied',
        label: 'Applied',
        icon: Star,
        state: 'completed' as const,
        detail: c.created_at ? formatDateTime(c.created_at) : 'Application received',
      },
      {
        id: 'resume',
        label: 'Resume Screening',
        icon: Brain,
        state: !resumeDone
          ? ('current' as const)
          : resumeSelected
            ? ('completed' as const)
            : ('failed' as const),
        detail:
          resumeScore != null
            ? `Score ${Math.round(resumeScore)}%${resumeSelected ? ' · Selected' : ' · Not selected'}`
            : 'Awaiting AI screening',
      },
      {
        id: 'aptitude',
        label: 'Aptitude Test',
        icon: FileText,
        state: !resumeSelected
          ? ('pending' as const)
          : !aptitudeTaken
            ? ('current' as const)
            : aptitudePassed
              ? ('completed' as const)
              : ('failed' as const),
        detail: aptitudeAttempt?.score != null
          ? `Score ${Math.round(aptitudeAttempt.score)}%${aptitudePassed ? ' · Passed' : ' · Failed'}`
          : aptitudeTaken
            ? `Result: ${aptitudeResult ?? 'completed'}`
            : resumeSelected
              ? 'Waiting for candidate to take test'
              : 'Locked',
      },
      {
        id: 'technical',
        label: 'Technical Interview',
        icon: Code,
        state: !aptitudePassed
          ? ('pending' as const)
          : !technicalTaken
            ? ('current' as const)
            : technicalPassed
              ? ('completed' as const)
              : ('failed' as const),
        detail: technicalResult?.overall_score != null
          ? `Score ${Math.round(technicalResult.overall_score)}%${technicalPassed ? ' · Passed' : ' · Failed'}`
          : technicalTaken
            ? `Result: ${technicalResultStr ?? 'completed'}`
            : aptitudePassed
              ? 'Ready to schedule'
              : 'Locked',
      },
      {
        id: 'hr',
        label: 'HR Interview',
        icon: Handshake,
        state: !technicalPassed
          ? ('pending' as const)
          : !hrTaken
            ? ('current' as const)
            : hrPassed
              ? ('completed' as const)
              : ('failed' as const),
        detail: hrResult?.overall_score != null
          ? `Score ${Math.round(hrResult.overall_score)}%${hrPassed ? ' · Passed' : ' · Failed'}`
          : hrTaken
            ? `Result: ${hrResultStr ?? 'completed'}`
            : technicalPassed
              ? 'Ready to schedule'
              : 'Locked',
      },
      {
        id: 'hire',
        label: 'Hire Recommended',
        icon: CheckCircle,
        state: hireRecommended
          ? ('completed' as const)
          : hrPassed
            ? ('current' as const)
            : ('pending' as const),
        detail: hireRecommended
          ? 'Ready for offer'
          : hrPassed
            ? 'Pending final decision'
            : 'Locked',
      },
    ];

    // Mark the first non-completed/non-failed as the highlighted "current" if not already
    const hasCurrent = stages.some((s) => s.state === 'current');
    if (!hasCurrent) {
      const idx = stages.findIndex((s) => s.state === 'pending');
      if (idx > 0) {
        // Promote the stage right after the last completed/failed to current visually
        const lastDoneIdx = stages
          .map((s, i) => (s.state === 'completed' || s.state === 'failed' ? i : -1))
          .reduce((a, b) => Math.max(a, b), -1);
        if (lastDoneIdx + 1 < stages.length && stages[lastDoneIdx + 1].state === 'pending') {
          stages[lastDoneIdx + 1].state = 'current';
        }
      }
    }
    return stages;
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'notes', label: 'Notes' },
    { id: 'timeline', label: 'Timeline' }
  ] as const;
</script>

<svelte:head>
  <title>{candidateName} | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Back Button -->
  <Button variant="ghost" href="/candidates" class="!px-0">
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back to Candidates
  </Button>

  {#if $candidateQuery.isLoading}
    <!-- Loading State -->
    <div class="space-y-6">
      <div class="flex items-start gap-6">
        <Skeleton class="w-24 h-24 rounded-full" />
        <div class="flex-1 space-y-3">
          <Skeleton class="h-8 w-64" />
          <Skeleton class="h-4 w-48" />
          <Skeleton class="h-4 w-32" />
        </div>
      </div>
      <Skeleton class="h-64" />
    </div>
  {:else if $candidateQuery.error}
    <Card class="p-6 text-center">
      <XCircle class="w-12 h-12 mx-auto text-red-500 mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">Candidate not found</h3>
      <p class="text-gray-500 mb-4">The candidate you're looking for doesn't exist or has been removed.</p>
      <Button href="/candidates">View All Candidates</Button>
    </Card>
  {:else if candidate}
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-start gap-6">
      <!-- Avatar & Basic Info -->
      <div class="flex items-start gap-4">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0">
          <span class="text-3xl font-bold text-white">
            {(candidate.first_name || 'C').charAt(0).toUpperCase()}
          </span>
        </div>

        <div>
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-2xl font-bold text-gray-900">{candidateName}</h1>
            <StatusBadge status={currentStatus.label} variant={currentStatus.variant} />
          </div>

          {#if (candidate as any).job_title || candidate.job_requirement_id}
            <p class="text-gray-600 flex items-center gap-2">
              <Briefcase class="w-4 h-4" />
              {(candidate as any).job_title || 'Applied Job'}
            </p>
          {/if}

          <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            {#if candidate.email}
              <a href="mailto:{candidate.email}" class="flex items-center gap-1 hover:text-royal-400">
                <Mail class="w-4 h-4" />
                {candidate.email}
              </a>
            {/if}
            {#if candidate.phone}
              <a href="tel:{candidate.phone}" class="flex items-center gap-1 hover:text-royal-400">
                <Phone class="w-4 h-4" />
                {candidate.phone}
              </a>
            {/if}
            {#if (candidate as any).linkedin_url}
              <a href={(candidate as any).linkedin_url} target="_blank" class="flex items-center gap-1 hover:text-royal-400">
                <ExternalLink class="w-4 h-4" />
                LinkedIn
              </a>
            {/if}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 lg:ml-auto">
        {#if resumeUrl}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-3 py-1.5 text-sm bg-transparent hover:bg-purple-50 text-purple-600 border-2 border-purple-500 hover:border-purple-600 transition-all no-underline"
          >
            <FileText class="w-4 h-4" />
            View Resume
          </a>
        {/if}
        
        {#if pipelineComplete}
          <Button variant="outline" size="sm" onclick={downloadDetailedReport} disabled={generatingReport}>
            {#if generatingReport}
              <Loader2 class="w-4 h-4 mr-2 animate-spin" />
              Generating Report…
            {:else}
              <Download class="w-4 h-4 mr-2" />
              Download AI Detailed Report
            {/if}
          </Button>
        {/if}

        {#if candidate.status !== 'hired' && candidate.status !== 'rejected'}
          <Button variant="outline" size="sm" onclick={() => scheduleInterview('technical')}>
            <Calendar class="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
          <Button variant="outline" size="sm" onclick={() => updateStatus('offered')}>
            <CheckCircle class="w-4 h-4 mr-2" />
            Make Offer
          </Button>
          <Button variant="destructive" size="sm" onclick={() => showRejectDialog = true}>
            <XCircle class="w-4 h-4 mr-2" />
            Reject
          </Button>
        {/if}
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex gap-8">
        {#each tabs as tab}
          <button
            class="py-3 text-sm font-medium border-b-2 transition-colors {activeTab === tab.id
              ? 'border-royal-500 text-royal-400'
              : 'border-transparent text-gray-500 hover:text-gray-700'}"
            onclick={() => activeTab = tab.id}
          >
            {tab.label}
          </button>
        {/each}
      </nav>
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'overview'}
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Scores -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Assessment Scores</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div class="text-center">
                <ScoreGauge
                  score={(candidate as any).candidate_resume_score || candidate.resume_score || 0}
                  size="lg"
                />
                <p class="text-sm text-gray-600 mt-2 font-medium">Resume</p>
              </div>
              <div class="text-center">
                <ScoreGauge score={aptitudeScore ?? 0} size="lg" />
                <p class="text-sm text-gray-600 mt-2 font-medium">Aptitude</p>
                {#if aptitudeScore == null && (candidate as any).aptitude_test_result}
                  <p class="text-xs text-gray-400 mt-0.5">Result: {(candidate as any).aptitude_test_result}</p>
                {/if}
                {#if aptitudeScore == null && !(candidate as any).aptitude_test_result}
                  <p class="text-xs text-gray-400 mt-0.5">Not taken</p>
                {/if}
              </div>
              <div class="text-center">
                <ScoreGauge
                  score={technicalScore ?? ((candidate as any).technical_test_result === 'pass' ? 80 : 0)}
                  size="lg"
                />
                <p class="text-sm text-gray-600 mt-2 font-medium">Technical</p>
                {#if technicalScore == null && (candidate as any).technical_test_result}
                  <p class="text-xs text-gray-400 mt-0.5">Result: {(candidate as any).technical_test_result}</p>
                {/if}
                {#if technicalScore == null && !(candidate as any).technical_test_result}
                  <p class="text-xs text-gray-400 mt-0.5">Not taken</p>
                {/if}
              </div>
              <div class="text-center">
                <ScoreGauge
                  score={hrScore ?? ((candidate as any).hr_test_result === 'pass' ? 80 : 0)}
                  size="lg"
                />
                <p class="text-sm text-gray-600 mt-2 font-medium">HR</p>
                {#if hrScore == null && (candidate as any).hr_test_result}
                  <p class="text-xs text-gray-400 mt-0.5">Result: {(candidate as any).hr_test_result}</p>
                {/if}
                {#if hrScore == null && !(candidate as any).hr_test_result}
                  <p class="text-xs text-gray-400 mt-0.5">Not taken</p>
                {/if}
              </div>
            </div>
          </Card>

          <!-- Test Results -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
            <div class="grid sm:grid-cols-3 gap-4">
              <div class="bg-gray-100 rounded-lg p-4 text-center">
                <Brain class="w-6 h-6 mx-auto mb-2 text-royal-400" />
                <p class="text-sm text-gray-500">Aptitude</p>
                <p class="font-semibold text-gray-900 mt-1">
                  {#if aptitudeScore != null}
                    {Math.round(aptitudeScore)}%
                  {:else if (candidate as any).aptitude_test_result}
                    {(candidate as any).aptitude_test_result}
                  {:else}
                    Pending
                  {/if}
                </p>
                {#if aptitudeAttempt}
                  <p class="text-xs text-gray-500 mt-1">
                    {aptitudeAttempt.correct_answers_count ?? 0} / {aptitudeAttempt.total_questions_attempted ?? aptitudeAttempt.total_questions ?? '?'} correct
                  </p>
                  {#if aptitudeAttempt.passed === true}
                    <span class="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide text-emerald-600">Passed</span>
                  {:else if aptitudeAttempt.passed === false}
                    <span class="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide text-red-600">Failed</span>
                  {/if}
                {/if}
              </div>
              <div class="bg-gray-100 rounded-lg p-4 text-center">
                <Code class="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <p class="text-sm text-gray-500">Technical</p>
                <p class="font-semibold text-gray-900 mt-1">
                  {#if technicalScore != null}
                    {Math.round(technicalScore)}%
                  {:else if (candidate as any).technical_test_result}
                    {(candidate as any).technical_test_result}
                  {:else}
                    Pending
                  {/if}
                </p>
                {#if technicalResult?.interview_status}
                  <p class="text-xs text-gray-500 mt-1">{technicalResult.interview_status}</p>
                {/if}
              </div>
              <div class="bg-gray-100 rounded-lg p-4 text-center">
                <Handshake class="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <p class="text-sm text-gray-500">HR</p>
                <p class="font-semibold text-gray-900 mt-1">
                  {#if hrScore != null}
                    {Math.round(hrScore)}%
                  {:else if (candidate as any).hr_test_result}
                    {(candidate as any).hr_test_result}
                  {:else}
                    Pending
                  {/if}
                </p>
                {#if hrResult?.interview_status}
                  <p class="text-xs text-gray-500 mt-1">{hrResult.interview_status}</p>
                {/if}
              </div>
            </div>
          </Card>

          <!-- Aptitude Test Result (detailed breakdown the candidate sees on submit) -->
          {#if aptitudeAttempt}
            <Card class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900">Aptitude Test Result</h2>
                {#if aptitudeAttempt.passed === true}
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
                    <CheckCircle class="w-3.5 h-3.5" /> Passed
                  </span>
                {:else if aptitudeAttempt.passed === false}
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide">
                    <XCircle class="w-3.5 h-3.5" /> Failed
                  </span>
                {/if}
              </div>

              {#if aptitudeAttempt.passed === true}
                <div class="rounded-lg bg-emerald-50 border border-emerald-200 p-4 mb-4">
                  <p class="font-semibold text-emerald-800">🎉 Congratulations!</p>
                  <p class="text-sm text-emerald-700 mt-0.5">
                    Candidate successfully passed the aptitude test.
                  </p>
                </div>
              {/if}

              <!-- Stats grid: score | correct | incorrect | attempted | time -->
              {@const total = aptitudeAttempt.total_questions_attempted ?? aptitudeAttempt.total_questions ?? 0}
              {@const correct = aptitudeAttempt.correct_answers_count ?? 0}
              {@const incorrect = Math.max(0, total - correct)}
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div class="rounded-lg bg-purple-50 border border-purple-100 p-3 text-center">
                  <p class="text-2xl font-bold text-purple-700">
                    {aptitudeScore != null ? `${Math.round(aptitudeScore)}%` : '—'}
                  </p>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Score</p>
                </div>
                <div class="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-center">
                  <p class="text-2xl font-bold text-emerald-700">{correct}</p>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Correct</p>
                </div>
                <div class="rounded-lg bg-red-50 border border-red-100 p-3 text-center">
                  <p class="text-2xl font-bold text-red-700">{incorrect}</p>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Incorrect</p>
                </div>
                <div class="rounded-lg bg-gray-100 border border-gray-200 p-3 text-center">
                  <p class="text-2xl font-bold text-gray-800">{total}</p>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Attempted</p>
                </div>
                <div class="rounded-lg bg-amber-50 border border-amber-100 p-3 text-center">
                  <p class="text-2xl font-bold text-amber-700">
                    {aptitudeAttempt.time_taken_seconds != null
                      ? formatDuration(aptitudeAttempt.time_taken_seconds)
                      : '—'}
                  </p>
                  <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Time Taken</p>
                </div>
              </div>

              <!-- Test Summary -->
              <div class="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                <div class="px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-700">Test Summary</h3>
                </div>
                <dl class="divide-y divide-gray-100 text-sm">
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Candidate</dt>
                    <dd class="col-span-2 text-gray-800">{candidateName}</dd>
                  </div>
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Email</dt>
                    <dd class="col-span-2 text-gray-800">{aptitudeAttempt.candidate_email || candidate.email || '—'}</dd>
                  </div>
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Total Questions</dt>
                    <dd class="col-span-2 text-gray-800">{aptitudeAttempt.total_questions ?? total}</dd>
                  </div>
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Passing Score</dt>
                    <dd class="col-span-2 text-gray-800">
                      {aptitudeAttempt.passing_score_percentage != null
                        ? `${aptitudeAttempt.passing_score_percentage}%`
                        : '—'}
                    </dd>
                  </div>
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Result</dt>
                    <dd class="col-span-2">
                      {#if aptitudeAttempt.passed === true}
                        <span class="text-emerald-700 font-semibold">PASS</span>
                      {:else if aptitudeAttempt.passed === false}
                        <span class="text-red-700 font-semibold">FAIL</span>
                      {:else}
                        <span class="text-gray-500">—</span>
                      {/if}
                    </dd>
                  </div>
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Status</dt>
                    <dd class="col-span-2 text-gray-800 capitalize">{aptitudeAttempt.status ?? '—'}</dd>
                  </div>
                  {#if aptitudeAttempt.tab_switches != null}
                    <div class="grid grid-cols-3 px-4 py-2">
                      <dt class="text-gray-500">Tab Switches</dt>
                      <dd class="col-span-2 text-gray-800">
                        {aptitudeAttempt.tab_switches}
                        {#if aptitudeAttempt.tab_switches > 0}
                          <span class="text-xs text-amber-600 ml-1">(proctoring flag)</span>
                        {/if}
                      </dd>
                    </div>
                  {/if}
                  <div class="grid grid-cols-3 px-4 py-2">
                    <dt class="text-gray-500">Submitted At</dt>
                    <dd class="col-span-2 text-gray-800">
                      {aptitudeAttempt.submitted_at
                        ? formatDateTime(aptitudeAttempt.submitted_at)
                        : '—'}
                    </dd>
                  </div>
                </dl>
              </div>
            </Card>
          {/if}

          <!-- Technical Interview Result (rich AI feedback) -->
          {#if technicalResult}
            {@const tr = technicalResult as any}
            {@const tScore = typeof tr.overall_score === 'number' ? tr.overall_score : null}
            {@const tThreshold = typeof tr.passed_threshold === 'number' ? tr.passed_threshold : 60}
            {@const tPassed = tr.result ? tr.result === 'pass' : (tScore != null ? tScore >= tThreshold : null)}
            {@const tStrengths = Array.isArray(tr.candidate_strengths) ? tr.candidate_strengths : []}
            {@const tImprovements = [
              ...(Array.isArray(tr.improvement_areas) ? tr.improvement_areas : []),
              ...(Array.isArray(tr.candidate_weaknesses) ? tr.candidate_weaknesses : [])
            ]}
            {@const tDurationMin = tr.interview_duration_seconds ? Math.round(tr.interview_duration_seconds / 60) : null}
            <Card class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Code class="w-5 h-5 text-amber-600" />
                </div>
                <h2 class="text-lg font-semibold text-gray-900">Technical Interview Result</h2>
              </div>

              <!-- Big result strip -->
              <div class="flex items-center justify-between p-4 rounded-xl mb-5
                {tPassed === true ? 'bg-emerald-50 border border-emerald-200' : ''}
                {tPassed === false ? 'bg-red-50 border border-red-200' : ''}
                {tPassed == null ? 'bg-gray-50 border border-gray-200' : ''}">
                <div class="flex items-center gap-3">
                  {#if tPassed === true}
                    <CheckCircle class="w-8 h-8 text-emerald-600" />
                    <div>
                      <p class="text-xs uppercase tracking-wider text-emerald-700 font-medium">Interview Result</p>
                      <p class="text-2xl font-bold text-emerald-700">PASS</p>
                    </div>
                  {:else if tPassed === false}
                    <XCircle class="w-8 h-8 text-red-600" />
                    <div>
                      <p class="text-xs uppercase tracking-wider text-red-700 font-medium">Interview Result</p>
                      <p class="text-2xl font-bold text-red-700">FAIL</p>
                    </div>
                  {:else}
                    <Clock class="w-8 h-8 text-gray-500" />
                    <div>
                      <p class="text-xs uppercase tracking-wider text-gray-600 font-medium">Interview Result</p>
                      <p class="text-2xl font-bold text-gray-700">{(tr.interview_status || 'pending').toUpperCase()}</p>
                    </div>
                  {/if}
                </div>
                {#if tScore != null}
                  <div class="text-right">
                    <p class="text-4xl font-extrabold text-gray-900 leading-none">{Math.round(tScore)}<span class="text-2xl text-gray-400">/100</span></p>
                    {#if tr.overall_rating}
                      <p class="text-xs uppercase tracking-wide text-gray-500 mt-1">{tr.overall_rating}</p>
                    {/if}
                  </div>
                {/if}
              </div>

              <!-- Performance Summary -->
              {#if tr.ai_recommendation_reason}
                <div class="mb-5">
                  <h3 class="text-sm font-semibold text-gray-700 mb-2">Performance Summary</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">{tr.ai_recommendation_reason}</p>
                </div>
              {/if}

              <!-- Feedback -->
              {#if tr.ai_feedback_summary}
                <div class="mb-5">
                  <h3 class="text-sm font-semibold text-gray-700 mb-2">Feedback</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">{tr.ai_feedback_summary}</p>
                </div>
              {/if}

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <!-- Strengths -->
                {#if tStrengths.length}
                  <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                    <h3 class="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                      <CheckCircle class="w-4 h-4" /> Strengths
                    </h3>
                    <ul class="space-y-1.5 text-sm text-emerald-900">
                      {#each tStrengths as s}
                        <li class="flex items-start gap-2">
                          <span class="text-emerald-500 mt-0.5">•</span>
                          <span>{s}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}

                <!-- Areas to Improve -->
                {#if tImprovements.length}
                  <div class="p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <h3 class="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                      <TrendingUp class="w-4 h-4" /> Areas to Improve
                    </h3>
                    <ul class="space-y-1.5 text-sm text-amber-900">
                      {#each tImprovements as i}
                        <li class="flex items-start gap-2">
                          <span class="text-amber-500 mt-0.5">•</span>
                          <span>{i}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>

              <!-- Metadata strip -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {#if tDurationMin != null}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">Duration</p>
                    <p class="text-gray-800 font-medium mt-0.5">{tDurationMin} min</p>
                  </div>
                {/if}
                {#if tr.interview_language}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">Language</p>
                    <p class="text-gray-800 font-medium mt-0.5">{tr.interview_language}</p>
                  </div>
                {/if}
                {#if tr.questions_answered != null && tr.total_questions_asked != null}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">Questions</p>
                    <p class="text-gray-800 font-medium mt-0.5">{tr.questions_answered}/{tr.total_questions_asked}</p>
                  </div>
                {/if}
                {#if tr.ai_recommendation}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">AI Recommendation</p>
                    <p class="text-gray-800 font-medium mt-0.5">{String(tr.ai_recommendation).replace(/_/g, ' ')}</p>
                  </div>
                {/if}
              </div>

              <!-- Transcript (collapsed by default) -->
              {#if Array.isArray(tr.interview_transcript) && tr.interview_transcript.length}
                <details class="mt-5 group">
                  <summary class="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 select-none">
                    Show Transcript ({tr.interview_transcript.length} turns)
                  </summary>
                  <div class="mt-3 max-h-80 overflow-y-auto space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {#each tr.interview_transcript as turn}
                      <div class="text-xs">
                        <span class="font-semibold {turn.speaker === 'ai' ? 'text-purple-700' : 'text-blue-700'}">
                          {turn.speaker === 'ai' ? 'AI Interviewer' : 'Candidate'}{turn.timestamp ? ` · ${turn.timestamp}` : ''}:
                        </span>
                        <span class="text-gray-700 ml-1">{turn.text}</span>
                      </div>
                    {/each}
                  </div>
                </details>
              {/if}
            </Card>
          {/if}

          <!-- HR Interview Result (rich AI feedback) -->
          {#if hrResult}
            {@const hr = hrResult as any}
            {@const hScore = typeof hr.overall_score === 'number' ? hr.overall_score : null}
            {@const hThreshold = typeof hr.passed_threshold === 'number' ? hr.passed_threshold : 60}
            {@const hPassed = hr.result ? hr.result === 'pass' : (hScore != null ? hScore >= hThreshold : null)}
            {@const hStrengths = Array.isArray(hr.candidate_strengths) ? hr.candidate_strengths : []}
            {@const hImprovements = [
              ...(Array.isArray(hr.improvement_areas) ? hr.improvement_areas : []),
              ...(Array.isArray(hr.candidate_weaknesses) ? hr.candidate_weaknesses : [])
            ]}
            {@const hDurationMin = hr.interview_duration_seconds ? Math.round(hr.interview_duration_seconds / 60) : null}
            <Card class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Handshake class="w-5 h-5 text-purple-600" />
                </div>
                <h2 class="text-lg font-semibold text-gray-900">HR Interview Result</h2>
              </div>

              <div class="flex items-center justify-between p-4 rounded-xl mb-5
                {hPassed === true ? 'bg-emerald-50 border border-emerald-200' : ''}
                {hPassed === false ? 'bg-red-50 border border-red-200' : ''}
                {hPassed == null ? 'bg-gray-50 border border-gray-200' : ''}">
                <div class="flex items-center gap-3">
                  {#if hPassed === true}
                    <CheckCircle class="w-8 h-8 text-emerald-600" />
                    <div>
                      <p class="text-xs uppercase tracking-wider text-emerald-700 font-medium">Interview Result</p>
                      <p class="text-2xl font-bold text-emerald-700">PASS</p>
                    </div>
                  {:else if hPassed === false}
                    <XCircle class="w-8 h-8 text-red-600" />
                    <div>
                      <p class="text-xs uppercase tracking-wider text-red-700 font-medium">Interview Result</p>
                      <p class="text-2xl font-bold text-red-700">FAIL</p>
                    </div>
                  {:else}
                    <Clock class="w-8 h-8 text-gray-500" />
                    <div>
                      <p class="text-xs uppercase tracking-wider text-gray-600 font-medium">Interview Result</p>
                      <p class="text-2xl font-bold text-gray-700">{(hr.interview_status || 'pending').toUpperCase()}</p>
                    </div>
                  {/if}
                </div>
                {#if hScore != null}
                  <div class="text-right">
                    <p class="text-4xl font-extrabold text-gray-900 leading-none">{Math.round(hScore)}<span class="text-2xl text-gray-400">/100</span></p>
                    {#if hr.overall_rating}
                      <p class="text-xs uppercase tracking-wide text-gray-500 mt-1">{hr.overall_rating}</p>
                    {/if}
                  </div>
                {/if}
              </div>

              {#if hr.ai_recommendation_reason}
                <div class="mb-5">
                  <h3 class="text-sm font-semibold text-gray-700 mb-2">Performance Summary</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">{hr.ai_recommendation_reason}</p>
                </div>
              {/if}

              {#if hr.ai_feedback_summary}
                <div class="mb-5">
                  <h3 class="text-sm font-semibold text-gray-700 mb-2">Feedback</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">{hr.ai_feedback_summary}</p>
                </div>
              {/if}

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {#if hStrengths.length}
                  <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                    <h3 class="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                      <CheckCircle class="w-4 h-4" /> Strengths
                    </h3>
                    <ul class="space-y-1.5 text-sm text-emerald-900">
                      {#each hStrengths as s}
                        <li class="flex items-start gap-2">
                          <span class="text-emerald-500 mt-0.5">•</span>
                          <span>{s}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                {#if hImprovements.length}
                  <div class="p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <h3 class="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                      <TrendingUp class="w-4 h-4" /> Areas to Improve
                    </h3>
                    <ul class="space-y-1.5 text-sm text-amber-900">
                      {#each hImprovements as i}
                        <li class="flex items-start gap-2">
                          <span class="text-amber-500 mt-0.5">•</span>
                          <span>{i}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {#if hDurationMin != null}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">Duration</p>
                    <p class="text-gray-800 font-medium mt-0.5">{hDurationMin} min</p>
                  </div>
                {/if}
                {#if hr.interview_language}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">Language</p>
                    <p class="text-gray-800 font-medium mt-0.5">{hr.interview_language}</p>
                  </div>
                {/if}
                {#if hr.ai_recommendation}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">AI Recommendation</p>
                    <p class="text-gray-800 font-medium mt-0.5">{String(hr.ai_recommendation).replace(/_/g, ' ')}</p>
                  </div>
                {/if}
                {#if hr.cultural_fit_score != null}
                  <div class="p-2 rounded-lg bg-gray-50">
                    <p class="text-gray-400 uppercase tracking-wide">Cultural Fit</p>
                    <p class="text-gray-800 font-medium mt-0.5">{Math.round(hr.cultural_fit_score)}%</p>
                  </div>
                {/if}
              </div>

              {#if Array.isArray(hr.interview_transcript) && hr.interview_transcript.length}
                <details class="mt-5 group">
                  <summary class="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 select-none">
                    Show Transcript ({hr.interview_transcript.length} turns)
                  </summary>
                  <div class="mt-3 max-h-80 overflow-y-auto space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {#each hr.interview_transcript as turn}
                      <div class="text-xs">
                        <span class="font-semibold {turn.speaker === 'ai' ? 'text-purple-700' : 'text-blue-700'}">
                          {turn.speaker === 'ai' ? 'AI Interviewer' : 'Candidate'}{turn.timestamp ? ` · ${turn.timestamp}` : ''}:
                        </span>
                        <span class="text-gray-700 ml-1">{turn.text}</span>
                      </div>
                    {/each}
                  </div>
                </details>
              {/if}
            </Card>
          {/if}

          <!-- Recent Interviews -->
          <Card class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Interview History</h2>
            </div>

            <div class="space-y-4">
              {#if interviewHistory.length === 0}
                <div class="text-center py-6 text-sm text-gray-500">
                  No interviews recorded for this candidate yet.
                </div>
              {:else}
                {#each interviewHistory as interview}
                  {@const typeConfig = {
                    aptitude: { icon: Brain, label: 'Aptitude Test', color: 'royal' },
                    technical: { icon: Code, label: 'Technical Interview', color: 'amber' },
                    hr: { icon: Handshake, label: 'HR Interview', color: 'purple' }
                  }[interview.type]}

                  <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svelte:component this={typeConfig?.icon || Brain} class="w-5 h-5 text-amber-600" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-800">{typeConfig?.label}</p>
                      <p class="text-sm text-gray-500">
                        {interview.date ? formatDateTime(interview.date) : '—'}
                        {#if interview.duration}
                          <span class="text-gray-300"> · {interview.duration}</span>
                        {/if}
                      </p>
                    </div>
                    <div class="text-right shrink-0">
                      {#if interview.score != null}
                        <div class="flex items-center gap-2 justify-end">
                          <span class="text-lg font-semibold text-gray-900">{Math.round(interview.score)}%</span>
                          {#if interview.passed === true}
                            <CheckCircle class="w-5 h-5 text-emerald-500" />
                          {:else if interview.passed === false}
                            <XCircle class="w-5 h-5 text-red-500" />
                          {/if}
                        </div>
                        {#if interview.passed === true}
                          <p class="text-xs text-emerald-600 font-medium">Passed</p>
                        {:else if interview.passed === false}
                          <p class="text-xs text-red-600 font-medium">Failed</p>
                        {:else}
                          <p class="text-xs text-gray-400">Completed</p>
                        {/if}
                      {:else}
                        <StatusBadge status={interview.status || 'pending'} variant="warning" />
                      {/if}
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </Card>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Quick Info -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <dl class="space-y-4">
              <div>
                <dt class="text-sm text-gray-500">Applied</dt>
                <dd class="text-gray-700">
                  {candidate.created_at ? formatDate(candidate.created_at) : '-'}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Email</dt>
                <dd class="text-gray-700">{candidate.email || '-'}</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Phone</dt>
                <dd class="text-gray-700">{candidate.phone || '-'}</dd>
              </div>
              {#if (candidate as any).password}
                <div>
                  <dt class="text-sm text-gray-500 mb-1">Aptitude Test Password</dt>
                  <dd class="flex items-center gap-2">
                    <code class="px-2 py-1 rounded bg-gray-100 border border-gray-200 text-sm font-mono text-gray-800 select-all">
                      {showAptitudePassword ? (candidate as any).password : '•'.repeat(((candidate as any).password ?? '').length || 8)}
                    </code>
                    <button
                      type="button"
                      class="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                      title={showAptitudePassword ? 'Hide password' : 'Show password'}
                      onclick={() => (showAptitudePassword = !showAptitudePassword)}
                    >
                      {#if showAptitudePassword}
                        <EyeOff class="w-4 h-4" />
                      {:else}
                        <Eye class="w-4 h-4" />
                      {/if}
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                      title="Copy password"
                      onclick={copyPassword}
                    >
                      <Copy class="w-4 h-4" />
                    </button>
                  </dd>
                  <p class="text-xs text-gray-400 mt-1">
                    Share this with the candidate to log into the aptitude test.
                  </p>
                </div>
              {/if}
              <div>
                <dt class="text-sm text-gray-500">Resume Score</dt>
                <dd class="text-gray-700">{(candidate as any).candidate_resume_score || candidate.resume_score || '-'}%</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Resume Selected</dt>
                <dd class="text-gray-700">{(candidate as any).resume_selected ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
          </Card>

          <!-- Pipeline Progress -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Pipeline Progress</h2>
            <div class="space-y-3">
              {#each pipelineStages as stage, index}
                {@const isCompleted = stage.state === 'completed'}
                {@const isFailed = stage.state === 'failed'}
                {@const isCurrent = stage.state === 'current'}
                {@const isPending = stage.state === 'pending'}

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    {isCompleted ? 'bg-emerald-600 text-white' : ''}
                    {isFailed ? 'bg-red-600 text-white' : ''}
                    {isCurrent ? 'bg-royal-600 text-white ring-4 ring-royal-200' : ''}
                    {isPending ? 'bg-gray-200 text-gray-400' : ''}"
                  >
                    {#if isCompleted}
                      <CheckCircle class="w-4 h-4" />
                    {:else if isFailed}
                      <XCircle class="w-4 h-4" />
                    {:else}
                      <svelte:component this={stage.icon} class="w-4 h-4" />
                    {/if}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2">
                      <span
                        class="text-sm
                        {isCompleted ? 'text-gray-900 font-medium' : ''}
                        {isFailed ? 'text-red-600 font-medium' : ''}
                        {isCurrent ? 'text-royal-700 font-semibold' : ''}
                        {isPending ? 'text-gray-400' : ''}"
                      >
                        {stage.label}
                      </span>
                      {#if isCurrent}
                        <span class="text-[10px] uppercase tracking-wide text-royal-600 bg-royal-100 px-2 py-0.5 rounded">Current</span>
                      {:else if isCompleted}
                        <span class="text-[10px] uppercase tracking-wide text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Done</span>
                      {:else if isFailed}
                        <span class="text-[10px] uppercase tracking-wide text-red-600 bg-red-100 px-2 py-0.5 rounded">Failed</span>
                      {/if}
                    </div>
                    {#if stage.detail}
                      <p class="text-xs text-gray-500 mt-0.5 truncate">{stage.detail}</p>
                    {/if}
                  </div>
                </div>
                {#if index < pipelineStages.length - 1}
                  <div
                    class="w-0.5 h-4 ml-4
                    {isCompleted ? 'bg-emerald-500' : ''}
                    {isFailed ? 'bg-red-400' : ''}
                    {isCurrent || isPending ? 'bg-gray-200' : ''}"
                  ></div>
                {/if}
              {/each}
            </div>
          </Card>

          <!-- Quick Actions -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="space-y-2">
              <Button variant="outline" class="w-full justify-start" onclick={() => scheduleInterview('aptitude')}>
                <Brain class="w-4 h-4 mr-2" />
                Schedule Aptitude Test
              </Button>
              <Button
                variant="outline"
                class="w-full justify-start"
                disabled={resettingAptitude}
                onclick={resetAptitude}
              >
                <RefreshCw class="w-4 h-4 mr-2 {resettingAptitude ? 'animate-spin' : ''}" />
                {resettingAptitude ? 'Resetting...' : 'Refresh Aptitude Attempts'}
              </Button>
              <Button variant="outline" class="w-full justify-start" onclick={() => scheduleInterview('technical')}>
                <Code class="w-4 h-4 mr-2" />
                Schedule Technical Interview
              </Button>
              <Button
                variant="outline"
                class="w-full justify-start"
                disabled={resettingTechnical}
                onclick={resetTechnical}
              >
                <RefreshCw class="w-4 h-4 mr-2 {resettingTechnical ? 'animate-spin' : ''}" />
                {resettingTechnical ? 'Resetting...' : 'Refresh Technical Interview'}
              </Button>
              <Button variant="outline" class="w-full justify-start" onclick={() => scheduleInterview('hr')}>
                <Handshake class="w-4 h-4 mr-2" />
                Schedule HR Interview
              </Button>
              <Button
                variant="outline"
                class="w-full justify-start"
                disabled={resettingHR}
                onclick={resetHR}
              >
                <RefreshCw class="w-4 h-4 mr-2 {resettingHR ? 'animate-spin' : ''}" />
                {resettingHR ? 'Resetting...' : 'Refresh HR Interview'}
              </Button>
              <Button variant="outline" class="w-full justify-start" onclick={sendMessage}>
                <MessageSquare class="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    {:else if activeTab === 'notes'}
      <Card class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Notes</h2>
          <Button variant="outline" size="sm">
            <Edit class="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
        <div class="text-center py-12 text-gray-500">
          <MessageSquare class="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No notes yet. Add notes to track important information about this candidate.</p>
        </div>
      </Card>
    {:else if activeTab === 'timeline'}
      <Card class="p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h2>
        {#if timelineEvents.length === 0}
          <div class="text-center py-12 text-gray-400">
            <Clock class="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No activity recorded yet.</p>
          </div>
        {:else}
          <div class="space-y-6">
            {#each timelineEvents as event, idx (event.key)}
              <div class="flex gap-4">
                <div class="relative">
                  <div
                    class="w-9 h-9 rounded-full flex items-center justify-center {event.tone === 'success'
                      ? 'bg-emerald-100 text-emerald-600'
                      : event.tone === 'danger'
                        ? 'bg-rose-100 text-rose-600'
                        : event.tone === 'info'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-gray-100 text-gray-500'}"
                  >
                    <svelte:component this={event.icon} class="w-4 h-4" />
                  </div>
                  {#if idx < timelineEvents.length - 1}
                    <div class="absolute top-9 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
                  {/if}
                </div>
                <div class="flex-1 pb-6">
                  <p class="text-gray-800 font-medium">{event.action}</p>
                  {#if event.detail}
                    <p class="text-sm text-gray-500 mt-0.5">{event.detail}</p>
                  {/if}
                  <p class="text-xs text-gray-400 mt-1">
                    {event.date ? formatDateTime(event.date) : '—'}
                    {#if event.date}
                      <span class="text-gray-300"> · {formatRelative(event.date)}</span>
                    {/if}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </Card>
    {/if}
  {/if}
</div>

<!-- Reject Dialog -->
<ConfirmDialog
  open={showRejectDialog}
  title="Reject Candidate"
  description="Are you sure you want to reject this candidate? This action can be undone later."
  confirmText="Reject"
  cancelText="Cancel"
  variant="destructive"
  onconfirm={handleReject}
  oncancel={() => showRejectDialog = false}
/>
