import { d as store_get, m as head, a as attr, n as stringify, e as ensure_array_like, f as attr_class, u as unsubscribe_stores } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import { g as goto } from "../../../../../chunks/client.js";
import { c as createCandidateQuery } from "../../../../../chunks/candidates.js";
import { u as useAptitudeAttemptByCandidate } from "../../../../../chunks/aptitude.js";
import { u as useTechnicalResultByCandidate, a as useHRResultByCandidate, b as useStartTechnicalInterview, c as useStartHRInterview } from "../../../../../chunks/interviews.js";
import { A as API_URLS, f as fetchWithAuth } from "../../../../../chunks/client2.js";
import { f as formatDuration, a as formatDateTime, S as StatusBadge, b as formatDate } from "../../../../../chunks/StatusBadge.js";
import { B as Button } from "../../../../../chunks/Button.js";
import { S as ScoreGauge } from "../../../../../chunks/ScoreGauge.js";
import { C as Card } from "../../../../../chunks/Card.js";
import { C as ConfirmDialog } from "../../../../../chunks/ConfirmDialog.js";
import { S as Skeleton } from "../../../../../chunks/Skeleton.js";
import { a as toast } from "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { S as Star } from "../../../../../chunks/star.js";
import { F as File_text } from "../../../../../chunks/file-text.js";
import { B as Brain } from "../../../../../chunks/brain.js";
import { C as Circle_check_big } from "../../../../../chunks/circle-check-big.js";
import { C as Circle_x } from "../../../../../chunks/circle-x.js";
import { C as Code } from "../../../../../chunks/code.js";
import { H as Handshake } from "../../../../../chunks/handshake.js";
import { B as Briefcase } from "../../../../../chunks/briefcase.js";
import { M as Mail } from "../../../../../chunks/mail.js";
import { P as Phone } from "../../../../../chunks/phone.js";
import { E as External_link } from "../../../../../chunks/external-link.js";
import { A as Arrow_left } from "../../../../../chunks/arrow-left.js";
import { D as Download } from "../../../../../chunks/download.js";
import { C as Calendar } from "../../../../../chunks/calendar.js";
import { C as Clock } from "../../../../../chunks/clock.js";
import { T as Trending_up } from "../../../../../chunks/trending-up.js";
import { E as Eye } from "../../../../../chunks/eye.js";
import { C as Copy } from "../../../../../chunks/copy.js";
import { R as Refresh_cw } from "../../../../../chunks/refresh-cw.js";
import { M as Message_square } from "../../../../../chunks/message-square.js";
import { L as Loader_circle } from "../../../../../chunks/loader-circle.js";
import { Y as escape_html } from "../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const candidateId = store_get($$store_subs ??= {}, "$page", page).params.candidate_id;
    const candidateQuery = createCandidateQuery(candidateId);
    const aptitudeAttemptQuery = useAptitudeAttemptByCandidate(() => candidateId);
    const aptitudeAttempt = store_get($$store_subs ??= {}, "$aptitudeAttemptQuery", aptitudeAttemptQuery).data;
    const aptitudeScore = typeof aptitudeAttempt?.score === "number" ? aptitudeAttempt.score : Number.isFinite(Number(candidate?.aptitude_test_score)) ? Number(candidate.aptitude_test_score) : null;
    const technicalResultQuery = useTechnicalResultByCandidate(() => candidateId);
    const technicalResult = store_get($$store_subs ??= {}, "$technicalResultQuery", technicalResultQuery).data;
    const technicalScore = typeof technicalResult?.overall_score === "number" ? technicalResult.overall_score : Number.isFinite(Number(candidate?.technical_test_score)) ? Number(candidate.technical_test_score) : null;
    const hrResultQuery = useHRResultByCandidate(() => candidateId);
    const hrResult = store_get($$store_subs ??= {}, "$hrResultQuery", hrResultQuery).data;
    const hrScore = typeof hrResult?.overall_score === "number" ? hrResult.overall_score : Number.isFinite(Number(candidate?.hr_test_score)) ? Number(candidate.hr_test_score) : null;
    let activeTab = "overview";
    let showRejectDialog = false;
    let resettingAptitude = false;
    async function resetAptitude() {
      if (!candidate) return;
      const confirmed = window.confirm("Reset this candidate's aptitude attempts? Their previous attempt(s) will be deleted and their attempt count goes back to 0 so they can retake the test.");
      if (!confirmed) return;
      resettingAptitude = true;
      try {
        const res = await fetchWithAuth(`${API_URLS.main}/aptitude/reset-attempts/${candidate.candidate_id}`, { method: "POST" });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || body?.success === false) {
          throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        }
        toast.success(body?.message || "Aptitude attempts reset");
        store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).refetch?.();
      } catch (err) {
        toast.error(`Failed to reset: ${err?.message ?? err}`);
      } finally {
        resettingAptitude = false;
      }
    }
    let resettingTechnical = false;
    async function resetTechnical() {
      if (!candidate) return;
      const confirmed = window.confirm("Reset this candidate's technical interview? Previous interview record(s) will be deleted so they can retake it.");
      if (!confirmed) return;
      resettingTechnical = true;
      try {
        const res = await fetchWithAuth(`${API_URLS.main}/technical-interview/reset/${candidate.candidate_id}`, { method: "POST" });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || body?.success === false) {
          throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        }
        toast.success(body?.message || "Technical interview reset");
        store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).refetch?.();
        store_get($$store_subs ??= {}, "$technicalResultQuery", technicalResultQuery).refetch?.();
      } catch (err) {
        toast.error(`Failed to reset technical interview: ${err?.message ?? err}`);
      } finally {
        resettingTechnical = false;
      }
    }
    let resettingHR = false;
    async function resetHR() {
      if (!candidate) return;
      const confirmed = window.confirm("Reset this candidate's HR interview? Previous interview record(s) will be deleted so they can retake it.");
      if (!confirmed) return;
      resettingHR = true;
      try {
        const res = await fetchWithAuth(`${API_URLS.main}/hr-interview/reset/${candidate.candidate_id}`, { method: "POST" });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || body?.success === false) {
          throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        }
        toast.success(body?.message || "HR interview reset");
        store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).refetch?.();
        store_get($$store_subs ??= {}, "$hrResultQuery", hrResultQuery).refetch?.();
      } catch (err) {
        toast.error(`Failed to reset HR interview: ${err?.message ?? err}`);
      } finally {
        resettingHR = false;
      }
    }
    const statusConfig = {
      applied: { label: "Applied", variant: "default" },
      resume_screened: { label: "Resume Screened", variant: "info" },
      aptitude_eligible: { label: "Aptitude Eligible", variant: "info" },
      aptitude_passed: { label: "Aptitude Passed", variant: "success" },
      aptitude_failed: { label: "Aptitude Failed", variant: "error" },
      technical_eligible: { label: "Technical Eligible", variant: "warning" },
      technical_passed: { label: "Technical Passed", variant: "success" },
      technical_failed: { label: "Technical Failed", variant: "error" },
      hr_eligible: { label: "HR Eligible", variant: "warning" },
      hr_passed: { label: "HR Passed", variant: "success" },
      hr_failed: { label: "HR Failed", variant: "error" },
      hire_recommended: { label: "Hire Recommended", variant: "success" },
      rejected: { label: "Rejected", variant: "error" }
    };
    const candidate = store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).data;
    const resumeUrl = (() => {
      const raw = candidate?.resume_url;
      if (!raw) return null;
      if (/^https?:\/\//i.test(raw)) return raw;
      const host = API_URLS.main.replace(/\/[^/]+\/api\/v1\/?$/, "");
      const path = raw.startsWith("/") ? raw : `/${raw}`;
      return `${host}${path}`;
    })();
    const candidateName = candidate ? [candidate.first_name, candidate.last_name].filter(Boolean).join(" ") || "Unknown" : "Unknown";
    const currentStatus = candidate ? statusConfig[candidate.status || "applied"] || statusConfig.applied : statusConfig.applied;
    function updateStatus(newStatus) {
      toast.info("Candidate status changes occur through the interview pipeline");
    }
    function handleReject() {
      updateStatus();
      showRejectDialog = false;
    }
    useStartTechnicalInterview();
    useStartHRInterview();
    async function scheduleInterview(type) {
      const c = candidate;
      const jobId = c?.job_requirement_id;
      const candId = c?.candidate_id;
      if (!jobId || !candId) {
        toast.error("Candidate or job info missing — cannot schedule.");
        return;
      }
      if (type === "aptitude") {
        if (c.aptitude_test === true && c.aptitude_test_result) {
          const retake = window.confirm(`This candidate already took the aptitude test (result: ${c.aptitude_test_result}). Open the test URL anyway? (Use "Refresh Aptitude Attempts" first to let them retake.)`);
          if (!retake) return;
        }
        const url = `${window.location.origin}/aptitude/${jobId}`;
        window.open(url, "_blank", "noopener");
        toast.success("Opened aptitude test URL — share it with the candidate.");
        return;
      }
      if (type === "technical") {
        if (c.aptitude_test_result !== "pass") {
          toast.error("Candidate must pass the aptitude test before scheduling a technical interview.");
          return;
        }
        goto();
        return;
      }
      if (type === "hr") {
        if (c.technical_test_result !== "pass") {
          toast.error("Candidate must pass the technical interview before scheduling an HR interview.");
          return;
        }
        goto();
        return;
      }
    }
    function sendMessage() {
      const email = candidate?.email;
      if (!email) {
        toast.error("Candidate has no email on file.");
        return;
      }
      const subject = encodeURIComponent(`Regarding your application`);
      window.location.href = `mailto:${email}?subject=${subject}`;
    }
    let generatingReport = false;
    async function downloadDetailedReport() {
      const c = candidate ?? {};
      if (!c.candidate_id) {
        toast.error("Candidate data not loaded.");
        return;
      }
      generatingReport = true;
      const loadingToast = toast.loading("Generating AI-powered comprehensive report — this may take 10-20 seconds…");
      const escapeHtml = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      const fmtScore = (v) => typeof v === "number" ? `${Math.round(v)}/100` : "—";
      const fmtPct = (v) => typeof v === "number" ? `${Math.round(v)}%` : "—";
      const list = (items) => {
        if (!items) return "<li>—</li>";
        if (Array.isArray(items)) {
          return items.length ? items.map((s) => `<li>${escapeHtml(String(s))}</li>`).join("") : "<li>—</li>";
        }
        return `<li>${escapeHtml(String(items))}</li>`;
      };
      const scoreRow = (label, value) => `<tr><td>${escapeHtml(label)}</td><td style="text-align:right;font-weight:600;">${fmtScore(value)}</td></tr>`;
      let payload = null;
      try {
        const res = await fetchWithAuth(`${API_URLS.main}/candidates/${c.candidate_id}/comprehensive-report`, { method: "POST" });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        payload = body?.data ?? null;
      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error("Failed to generate AI report", { description: err?.message ?? String(err) });
        generatingReport = false;
        return;
      }
      if (!payload) {
        toast.dismiss(loadingToast);
        toast.error("No report data returned.");
        generatingReport = false;
        return;
      }
      const fullName = payload.candidate_name || `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || "Candidate";
      const resumeScore = payload.resume_score ?? c.candidate_resume_score ?? c.resume_score ?? null;
      const ai = payload.ai_report ?? {};
      const apt = payload.aptitude ?? {};
      const aptSummary = apt.summary ?? {};
      const aptQA = Array.isArray(apt.qa) ? apt.qa : [];
      const tr = payload.technical ?? {};
      const hr = payload.hr ?? {};
      const recBadgeColor = (rec) => {
        switch (rec) {
          case "strong_hire":
            return "#059669";
          case "hire":
            return "#10b981";
          case "neutral":
            return "#f59e0b";
          case "no_hire":
            return "#ef4444";
          case "strong_no_hire":
            return "#dc2626";
          default:
            return "#6b7280";
        }
      };
      const aptQARows = aptQA.map((q) => {
        const optionsHtml = q.options && typeof q.options === "object" ? Object.entries(q.options).map(([k, v]) => `<div style="font-size:12px;color:${k === q.correct_answer ? "#059669" : k === q.given ? "#dc2626" : "#6b7280"};${k === q.correct_answer ? "font-weight:600;" : ""}">${escapeHtml(k)}. ${escapeHtml(String(v))}${k === q.correct_answer ? " ✓" : ""}${k === q.given && k !== q.correct_answer ? " ✗ (chosen)" : ""}</div>`).join("") : "";
        return `
        <tr><td colspan="2" style="padding-top:14px;">
          <div style="font-size:13px;color:#374151;"><strong>Q${q.q_no}.</strong> <span style="color:#9ca3af;">[${escapeHtml(q.category || "")}]</span> ${escapeHtml(q.question)}</div>
          <div style="margin-top:6px;margin-left:10px;">${optionsHtml}</div>
          <div style="font-size:12px;margin-top:4px;color:${q.is_correct ? "#059669" : "#dc2626"};font-weight:600;">
            ${q.is_correct ? "✓ Correct" : `✗ Wrong — chose ${q.given ?? "nothing"}, correct was ${q.correct}`}
          </div>
        </td></tr>`;
      }).join("");
      const formatTranscript = (t) => {
        if (!t) return '<p style="color:#9ca3af;font-style:italic;">No transcript available.</p>';
        if (typeof t === "string") return `<pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;color:#374151;background:#fafafa;border:1px solid #e5e7eb;border-radius:6px;padding:14px;">${escapeHtml(t)}</pre>`;
        if (Array.isArray(t)) {
          return t.map((turn) => {
            const speaker = turn.speaker || turn.role || "speaker";
            const text = turn.text || turn.content || "";
            const isInterviewer = /interview/i.test(speaker);
            return `<div style="margin:8px 0;padding:10px 14px;border-radius:8px;background:${isInterviewer ? "#fffbeb" : "#f9fafb"};border-left:3px solid ${isInterviewer ? "#f59e0b" : "#9ca3af"};">
            <div style="font-size:11px;color:${isInterviewer ? "#d97706" : "#6b7280"};font-weight:700;text-transform:uppercase;margin-bottom:4px;">${escapeHtml(speaker)}</div>
            <div style="font-size:13px;color:#374151;white-space:pre-wrap;">${escapeHtml(text)}</div>
          </div>`;
          }).join("");
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
    ${escapeHtml(c.email || "")} ${c.phone_number ? " · " + escapeHtml(c.phone_number) : ""}<br>
    Applied for: <strong>${escapeHtml(c.job_title || "—")}</strong><br>
    Report generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}
  </div>

  ${ai.hire_recommendation ? `
    <div class="ai-section" style="text-align:center;">
      <div style="font-size:11px;color:#92400e;letter-spacing:1px;text-transform:uppercase;font-weight:700;">AI Hiring Recommendation</div>
      <div style="margin:10px 0;"><span class="badge" style="background:${recBadgeColor(ai.hire_recommendation)};">${escapeHtml(String(ai.hire_recommendation).replace(/_/g, " ").toUpperCase())}</span></div>
      <div style="font-size:18px;color:#111827;font-weight:600;margin-top:8px;">${escapeHtml(ai.headline || "")}</div>
      ${typeof ai.overall_score_out_of_10 === "number" ? `<div style="margin-top:8px;font-size:14px;color:#6b7280;">Overall: <strong style="color:#111827;">${ai.overall_score_out_of_10}/10</strong> · Confidence: <strong style="color:#111827;">${escapeHtml(ai.confidence || "—")}</strong></div>` : ""}
    </div>
  ` : ""}

  <h2>Pipeline Overview</h2>
  <div class="grid">
    <div class="card"><div class="lbl">Resume AI Match</div><div class="val">${fmtPct(resumeScore)}</div><div class="sub">${c.resume_selected === true ? "Shortlisted" : "Reviewed"}</div></div>
    <div class="card"><div class="lbl">Aptitude</div><div class="val">${fmtPct(aptSummary.score ?? c.aptitude_test_score)}</div><div class="sub ${c.aptitude_test_result === "pass" || aptSummary.passed === true ? "pass" : c.aptitude_test_result === "fail" || aptSummary.passed === false ? "fail" : ""}">${(c.aptitude_test_result ?? (aptSummary.passed === true ? "pass" : aptSummary.passed === false ? "fail" : "Not taken")).toString().toUpperCase()}</div></div>
    <div class="card"><div class="lbl">Technical Interview</div><div class="val">${fmtPct(tr.overall_score ?? c.technical_test_score)}</div><div class="sub ${tr.result === "pass" || c.technical_test_result === "pass" ? "pass" : tr.result === "fail" || c.technical_test_result === "fail" ? "fail" : ""}">${(tr.result || c.technical_test_result || "Not taken").toString().toUpperCase()}</div></div>
    <div class="card"><div class="lbl">HR Interview</div><div class="val">${fmtPct(hr.overall_score ?? c.hr_test_score)}</div><div class="sub ${hr.result === "pass" || c.hr_test_result === "pass" ? "pass" : hr.result === "fail" || c.hr_test_result === "fail" ? "fail" : ""}">${(hr.result || c.hr_test_result || "Not taken").toString().toUpperCase()}</div></div>
  </div>

  ${ai.executive_summary ? `
    <h2>Executive Summary</h2>
    <div class="ai-section"><p>${escapeHtml(ai.executive_summary)}</p></div>
  ` : ""}

  ${ai.technical_assessment ? `
    <h2>Technical Assessment</h2>
    <p>${escapeHtml(ai.technical_assessment).replace(/\n/g, "<br>")}</p>
  ` : ""}

  ${ai.behavioral_assessment ? `
    <h2>Behavioral Assessment</h2>
    <p>${escapeHtml(ai.behavioral_assessment).replace(/\n/g, "<br>")}</p>
  ` : ""}

  ${ai.communication_assessment ? `
    <h2>Communication Assessment</h2>
    <p>${escapeHtml(ai.communication_assessment).replace(/\n/g, "<br>")}</p>
  ` : ""}

  ${ai.cultural_fit_assessment ? `
    <h2>Cultural Fit Assessment</h2>
    <p>${escapeHtml(ai.cultural_fit_assessment).replace(/\n/g, "<br>")}</p>
  ` : ""}

  ${ai.key_strengths?.length || ai.key_concerns?.length ? `
    <h2>Strengths & Concerns</h2>
    <div class="grid">
      <div><h3 style="color:#059669;">Key Strengths</h3><ul>${list(ai.key_strengths)}</ul></div>
      <div><h3 style="color:#dc2626;">Key Concerns</h3><ul>${list(ai.key_concerns)}</ul></div>
    </div>
  ` : ""}

  ${ai.risk_areas?.length ? `
    <h2>Risk Areas</h2>
    <ul>${list(ai.risk_areas)}</ul>
  ` : ""}

  ${ai.recommended_next_steps?.length ? `
    <h2>Recommended Next Steps</h2>
    <ul>${list(ai.recommended_next_steps)}</ul>
  ` : ""}

  ${ai.comparison_vs_role ? `
    <h2>Comparison vs Role Bar</h2>
    <p>${escapeHtml(ai.comparison_vs_role)}</p>
  ` : ""}

  ${aptQA.length ? `
    <h2>Aptitude Test — Question & Answer Detail</h2>
    <p style="font-size:13px;color:#6b7280;">Score: <strong>${aptSummary.score ?? "—"}/100</strong> · Correct: <strong>${aptSummary.correct ?? "—"}/${aptSummary.total ?? "—"}</strong> · ${aptSummary.passed ? '<span class="pass">PASSED</span>' : '<span class="fail">FAILED</span>'}</p>
    <table>${aptQARows}</table>
  ` : ""}

  ${tr.overall_score != null ? `
    <h2>Technical Interview — Score Breakdown</h2>
    <table>
      ${scoreRow("Overall Score", tr.overall_score)}
      ${tr.scores ? Object.entries(tr.scores).map(([k, v]) => scoreRow(k.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), v)).join("") : ""}
    </table>
    ${tr.ai_feedback ? `<h3>AI Feedback</h3><p style="font-size:13px;">${escapeHtml(tr.ai_feedback)}</p>` : ""}
    ${tr.strengths ? `<h3>Strengths</h3><ul>${list(tr.strengths)}</ul>` : ""}
    ${tr.weaknesses ? `<h3>Weaknesses</h3><ul>${list(tr.weaknesses)}</ul>` : ""}
    <h3>Full Transcript</h3>
    ${formatTranscript(tr.transcript)}
  ` : ""}

  ${hr.overall_score != null ? `
    <h2>HR Interview — Score Breakdown</h2>
    <table>
      ${scoreRow("Overall Score", hr.overall_score)}
      ${hr.scores ? Object.entries(hr.scores).map(([k, v]) => scoreRow(k.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), v)).join("") : ""}
    </table>
    ${hr.ai_feedback ? `<h3>AI Feedback</h3><p style="font-size:13px;">${escapeHtml(hr.ai_feedback)}</p>` : ""}
    ${hr.strengths ? `<h3>Strengths</h3><ul>${list(hr.strengths)}</ul>` : ""}
    ${hr.weaknesses ? `<h3>Weaknesses</h3><ul>${list(hr.weaknesses)}</ul>` : ""}
    <h3>Full Transcript</h3>
    ${formatTranscript(hr.transcript)}
  ` : ""}

  <div class="footer">HR Automation — confidential. Generated for ${escapeHtml(fullName)} on ${(/* @__PURE__ */ new Date()).toLocaleString()}.</div>
</body></html>`;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fullName.replace(/\s+/g, "_")}_comprehensive_report.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.dismiss(loadingToast);
      toast.success('Comprehensive report downloaded. Open and use "Print → Save as PDF" for a PDF copy.');
      generatingReport = false;
    }
    const interviewHistory = (() => {
      const c = candidate ?? {};
      const items = (
        // 'completed' | 'in_progress' | 'pending' | 'scheduled' | etc.
        // 0-100 or null
        // ISO timestamp or null
        // human-readable
        []
      );
      if (aptitudeAttempt || c.aptitude_test === true) {
        const a = aptitudeAttempt ?? {};
        const score = typeof a.score === "number" ? a.score : Number.isFinite(Number(c.aptitude_test_score)) ? Number(c.aptitude_test_score) : null;
        const passed = a.passed === true ? true : a.passed === false ? false : c.aptitude_test_result === "pass" ? true : c.aptitude_test_result === "fail" ? false : null;
        items.push({
          type: "aptitude",
          status: a.status ?? (c.aptitude_test === true ? "completed" : "pending"),
          score,
          date: a.submitted_at ?? a.started_at ?? null,
          duration: a.time_taken_seconds != null ? formatDuration(a.time_taken_seconds) : null,
          passed
        });
      }
      if (technicalResult || c.technical_test === true || c.technical_test_result) {
        const tr = technicalResult ?? {};
        const score = typeof tr.overall_score === "number" ? tr.overall_score : Number.isFinite(Number(c.technical_test_score)) ? Number(c.technical_test_score) : null;
        const resultStr = tr.result ?? c.technical_test_result ?? null;
        const passed = resultStr === "pass" ? true : resultStr === "fail" ? false : typeof score === "number" && typeof tr.passed_threshold === "number" ? score >= tr.passed_threshold : null;
        items.push({
          type: "technical",
          status: tr.interview_status ?? (c.technical_test === true ? "completed" : "pending"),
          score,
          date: tr.interview_ended_at ?? tr.interview_started_at ?? tr.created_at ?? tr.submitted_at ?? tr.completed_at ?? null,
          duration: typeof tr.interview_duration_seconds === "number" ? formatDuration(tr.interview_duration_seconds) : null,
          passed
        });
      }
      if (hrResult || c.hr_test === true || c.hr_test_result) {
        const hr = hrResult ?? {};
        const score = typeof hr.overall_score === "number" ? hr.overall_score : Number.isFinite(Number(c.hr_test_score)) ? Number(c.hr_test_score) : null;
        const resultStr = hr.result ?? c.hr_test_result ?? null;
        const passed = resultStr === "pass" ? true : resultStr === "fail" ? false : typeof score === "number" && typeof hr.passed_threshold === "number" ? score >= hr.passed_threshold : null;
        items.push({
          type: "hr",
          status: hr.interview_status ?? (c.hr_test === true ? "completed" : "pending"),
          score,
          date: hr.interview_ended_at ?? hr.interview_started_at ?? hr.created_at ?? hr.submitted_at ?? hr.completed_at ?? null,
          duration: typeof hr.interview_duration_seconds === "number" ? formatDuration(hr.interview_duration_seconds) : null,
          passed
        });
      }
      return items.sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0;
        const tb = b.date ? new Date(b.date).getTime() : 0;
        return tb - ta;
      });
    })();
    (() => {
      const c = candidate ?? {};
      const events = [];
      if (c.created_at) {
        events.push({
          key: "created",
          action: "Application submitted",
          detail: c.job_title ? `Applied for ${c.job_title}` : null,
          date: c.created_at,
          icon: Star,
          tone: "neutral"
        });
      }
      const resumeScore = typeof c.candidate_resume_score === "number" ? c.candidate_resume_score : typeof c.resume_score === "number" ? c.resume_score : null;
      if (resumeScore != null) {
        const selected = c.resume_selected === true || resumeScore >= 60;
        events.push({
          key: "resume-scored",
          action: selected ? "Resume shortlisted by AI" : "Resume reviewed",
          detail: `AI score: ${resumeScore}/100`,
          date: c.resume_scored_at ?? c.updated_at ?? c.created_at ?? null,
          icon: File_text,
          tone: selected ? "success" : "info"
        });
      }
      if (aptitudeAttempt?.started_at) {
        events.push({
          key: "apt-started",
          action: "Aptitude test started",
          date: aptitudeAttempt.started_at,
          icon: Brain,
          tone: "info"
        });
      }
      if (aptitudeAttempt?.submitted_at || c.aptitude_test === true) {
        const passed = aptitudeAttempt?.passed === true || c.aptitude_test_result === "pass";
        const score = typeof aptitudeAttempt?.score === "number" ? aptitudeAttempt.score : typeof c.aptitude_test_score === "number" ? c.aptitude_test_score : null;
        events.push({
          key: "apt-done",
          action: passed ? "Aptitude test passed" : "Aptitude test completed",
          detail: score != null ? `Score: ${score}/100` : null,
          date: aptitudeAttempt?.submitted_at ?? c.updated_at ?? null,
          icon: passed ? Circle_check_big : Circle_x,
          tone: passed ? "success" : "danger"
        });
      }
      const tr = technicalResult ?? null;
      if (tr?.interview_started_at) {
        events.push({
          key: "tech-started",
          action: "Technical interview started",
          date: tr.interview_started_at,
          icon: Code,
          tone: "info"
        });
      }
      if (tr?.interview_ended_at || c.technical_test === true) {
        const passed = tr?.result === "pass" || c.technical_test_result === "pass";
        const score = typeof tr?.overall_score === "number" ? tr.overall_score : typeof c.technical_test_score === "number" ? c.technical_test_score : null;
        events.push({
          key: "tech-done",
          action: passed ? "Technical interview passed" : "Technical interview completed",
          detail: score != null ? `Score: ${score}/100` : null,
          date: tr?.interview_ended_at ?? c.updated_at ?? null,
          icon: passed ? Circle_check_big : Circle_x,
          tone: passed ? "success" : "danger"
        });
      }
      const hr = hrResult ?? null;
      if (hr?.interview_started_at) {
        events.push({
          key: "hr-started",
          action: "HR interview started",
          date: hr.interview_started_at,
          icon: Handshake,
          tone: "info"
        });
      }
      if (hr?.interview_ended_at || c.hr_test === true) {
        const passed = hr?.result === "pass" || c.hr_test_result === "pass";
        const score = typeof hr?.overall_score === "number" ? hr.overall_score : typeof c.hr_test_score === "number" ? c.hr_test_score : null;
        events.push({
          key: "hr-done",
          action: passed ? "HR interview passed" : "HR interview completed",
          detail: score != null ? `Score: ${score}/100` : null,
          date: hr?.interview_ended_at ?? c.updated_at ?? null,
          icon: passed ? Circle_check_big : Circle_x,
          tone: passed ? "success" : "danger"
        });
      }
      if (c.status === "hired" || c.is_hired === true) {
        events.push({
          key: "hired",
          action: "Candidate hired",
          detail: "Offer accepted",
          date: c.hired_at ?? c.updated_at ?? null,
          icon: Circle_check_big,
          tone: "success"
        });
      } else if (c.status === "rejected" || c.is_rejected === true) {
        events.push({
          key: "rejected",
          action: "Candidate rejected",
          date: c.rejected_at ?? c.updated_at ?? null,
          icon: Circle_x,
          tone: "danger"
        });
      }
      return events.sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0;
        const tb = b.date ? new Date(b.date).getTime() : 0;
        return tb - ta;
      });
    })();
    const pipelineComplete = (() => {
      const c = candidate ?? {};
      return c.hr_test === true || !!hrResult || c.status === "hired" || c.status === "rejected" || c.is_hired === true || c.is_rejected === true;
    })();
    const pipelineStages = (() => {
      const c = candidate ?? {};
      const resumeScore = typeof c.candidate_resume_score === "number" ? c.candidate_resume_score : typeof c.resume_score === "number" ? c.resume_score : null;
      const resumeDone = resumeScore != null || c.resume_selected != null;
      const resumeSelected = c.resume_selected === true || resumeScore != null && resumeScore >= 60;
      const aptitudeTaken = c.aptitude_test === true || !!aptitudeAttempt;
      const aptitudeResult = c.aptitude_test_result ?? (aptitudeAttempt?.passed === true ? "pass" : aptitudeAttempt?.passed === false ? "fail" : null);
      const aptitudePassed = aptitudeResult === "pass";
      const technicalTaken = c.technical_test === true || !!technicalResult;
      const technicalResultStr = c.technical_test_result ?? (technicalResult?.overall_score != null && technicalResult?.passed_threshold != null ? technicalResult.overall_score >= technicalResult.passed_threshold ? "pass" : "fail" : null);
      const technicalPassed = technicalResultStr === "pass";
      const hrTaken = c.hr_test === true || !!hrResult;
      const hrResultStr = c.hr_test_result ?? (hrResult?.overall_score != null ? hrResult.overall_score >= 60 ? "pass" : "fail" : null);
      const hrPassed = hrResultStr === "pass";
      const hireRecommended = c.status === "hire_recommended" || c.status === "hired" || hrPassed && technicalPassed;
      const stages = [
        {
          id: "applied",
          label: "Applied",
          icon: Star,
          state: "completed",
          detail: c.created_at ? formatDateTime(c.created_at) : "Application received"
        },
        {
          id: "resume",
          label: "Resume Screening",
          icon: Brain,
          state: !resumeDone ? "current" : resumeSelected ? "completed" : "failed",
          detail: resumeScore != null ? `Score ${Math.round(resumeScore)}%${resumeSelected ? " · Selected" : " · Not selected"}` : "Awaiting AI screening"
        },
        {
          id: "aptitude",
          label: "Aptitude Test",
          icon: File_text,
          state: !resumeSelected ? "pending" : !aptitudeTaken ? "current" : aptitudePassed ? "completed" : "failed",
          detail: aptitudeAttempt?.score != null ? `Score ${Math.round(aptitudeAttempt.score)}%${aptitudePassed ? " · Passed" : " · Failed"}` : aptitudeTaken ? `Result: ${aptitudeResult ?? "completed"}` : resumeSelected ? "Waiting for candidate to take test" : "Locked"
        },
        {
          id: "technical",
          label: "Technical Interview",
          icon: Code,
          state: !aptitudePassed ? "pending" : !technicalTaken ? "current" : technicalPassed ? "completed" : "failed",
          detail: technicalResult?.overall_score != null ? `Score ${Math.round(technicalResult.overall_score)}%${technicalPassed ? " · Passed" : " · Failed"}` : technicalTaken ? `Result: ${technicalResultStr ?? "completed"}` : aptitudePassed ? "Ready to schedule" : "Locked"
        },
        {
          id: "hr",
          label: "HR Interview",
          icon: Handshake,
          state: !technicalPassed ? "pending" : !hrTaken ? "current" : hrPassed ? "completed" : "failed",
          detail: hrResult?.overall_score != null ? `Score ${Math.round(hrResult.overall_score)}%${hrPassed ? " · Passed" : " · Failed"}` : hrTaken ? `Result: ${hrResultStr ?? "completed"}` : technicalPassed ? "Ready to schedule" : "Locked"
        },
        {
          id: "hire",
          label: "Hire Recommended",
          icon: Circle_check_big,
          state: hireRecommended ? "completed" : hrPassed ? "current" : "pending",
          detail: hireRecommended ? "Ready for offer" : hrPassed ? "Pending final decision" : "Locked"
        }
      ];
      const hasCurrent = stages.some((s) => s.state === "current");
      if (!hasCurrent) {
        const idx = stages.findIndex((s) => s.state === "pending");
        if (idx > 0) {
          const lastDoneIdx = stages.map((s, i) => s.state === "completed" || s.state === "failed" ? i : -1).reduce((a, b) => Math.max(a, b), -1);
          if (lastDoneIdx + 1 < stages.length && stages[lastDoneIdx + 1].state === "pending") {
            stages[lastDoneIdx + 1].state = "current";
          }
        }
      }
      return stages;
    })();
    const tabs = [
      { id: "overview", label: "Overview" },
      { id: "notes", label: "Notes" },
      { id: "timeline", label: "Timeline" }
    ];
    head("6lbdk1", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(candidateName)} | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6">`);
    Button($$renderer2, {
      variant: "ghost",
      href: "/candidates",
      class: "!px-0",
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "w-4 h-4 mr-2" });
        $$renderer3.push(`<!----> Back to Candidates`);
      }
    });
    $$renderer2.push(`<!----> `);
    if (store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).isLoading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-start gap-6">`);
      Skeleton($$renderer2, { class: "w-24 h-24 rounded-full" });
      $$renderer2.push(`<!----> <div class="flex-1 space-y-3">`);
      Skeleton($$renderer2, { class: "h-8 w-64" });
      $$renderer2.push(`<!----> `);
      Skeleton($$renderer2, { class: "h-4 w-48" });
      $$renderer2.push(`<!----> `);
      Skeleton($$renderer2, { class: "h-4 w-32" });
      $$renderer2.push(`<!----></div></div> `);
      Skeleton($$renderer2, { class: "h-64" });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).error) {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          class: "p-6 text-center",
          children: ($$renderer3) => {
            Circle_x($$renderer3, { class: "w-12 h-12 mx-auto text-red-500 mb-4" });
            $$renderer3.push(`<!----> <h3 class="text-lg font-medium text-gray-700 mb-2">Candidate not found</h3> <p class="text-gray-500 mb-4">The candidate you're looking for doesn't exist or has been removed.</p> `);
            Button($$renderer3, {
              href: "/candidates",
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->View All Candidates`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (candidate) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex flex-col lg:flex-row lg:items-start gap-6"><div class="flex items-start gap-4"><div class="w-20 h-20 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0"><span class="text-3xl font-bold text-white">${escape_html((candidate.first_name || "C").charAt(0).toUpperCase())}</span></div> <div><div class="flex items-center gap-3 mb-2"><h1 class="text-2xl font-bold text-gray-900">${escape_html(candidateName)}</h1> `);
          StatusBadge($$renderer2, { status: currentStatus.label, variant: currentStatus.variant });
          $$renderer2.push(`<!----></div> `);
          if (candidate.job_title || candidate.job_requirement_id) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p class="text-gray-600 flex items-center gap-2">`);
            Briefcase($$renderer2, { class: "w-4 h-4" });
            $$renderer2.push(`<!----> ${escape_html(candidate.job_title || "Applied Job")}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">`);
          if (candidate.email) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<a${attr("href", `mailto:${stringify(candidate.email)}`)} class="flex items-center gap-1 hover:text-royal-400">`);
            Mail($$renderer2, { class: "w-4 h-4" });
            $$renderer2.push(`<!----> ${escape_html(candidate.email)}</a>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (candidate.phone) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<a${attr("href", `tel:${stringify(candidate.phone)}`)} class="flex items-center gap-1 hover:text-royal-400">`);
            Phone($$renderer2, { class: "w-4 h-4" });
            $$renderer2.push(`<!----> ${escape_html(candidate.phone)}</a>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (candidate.linkedin_url) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<a${attr("href", candidate.linkedin_url)} target="_blank" class="flex items-center gap-1 hover:text-royal-400">`);
            External_link($$renderer2, { class: "w-4 h-4" });
            $$renderer2.push(`<!----> LinkedIn</a>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div></div> <div class="flex flex-wrap gap-2 lg:ml-auto">`);
          if (resumeUrl) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<a${attr("href", resumeUrl)} target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-3 py-1.5 text-sm bg-transparent hover:bg-purple-50 text-purple-600 border-2 border-purple-500 hover:border-purple-600 transition-all no-underline">`);
            File_text($$renderer2, { class: "w-4 h-4" });
            $$renderer2.push(`<!----> View Resume</a>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (pipelineComplete) {
            $$renderer2.push("<!--[-->");
            Button($$renderer2, {
              variant: "outline",
              size: "sm",
              onclick: downloadDetailedReport,
              disabled: generatingReport,
              children: ($$renderer3) => {
                if (generatingReport) {
                  $$renderer3.push("<!--[-->");
                  Loader_circle($$renderer3, { class: "w-4 h-4 mr-2 animate-spin" });
                  $$renderer3.push(`<!----> Generating Report…`);
                } else {
                  $$renderer3.push("<!--[!-->");
                  Download($$renderer3, { class: "w-4 h-4 mr-2" });
                  $$renderer3.push(`<!----> Download AI Detailed Report`);
                }
                $$renderer3.push(`<!--]-->`);
              }
            });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (candidate.status !== "hired" && candidate.status !== "rejected") {
            $$renderer2.push("<!--[-->");
            Button($$renderer2, {
              variant: "outline",
              size: "sm",
              onclick: () => scheduleInterview("technical"),
              children: ($$renderer3) => {
                Calendar($$renderer3, { class: "w-4 h-4 mr-2" });
                $$renderer3.push(`<!----> Schedule Interview`);
              }
            });
            $$renderer2.push(`<!----> `);
            Button($$renderer2, {
              variant: "outline",
              size: "sm",
              onclick: () => updateStatus(),
              children: ($$renderer3) => {
                Circle_check_big($$renderer3, { class: "w-4 h-4 mr-2" });
                $$renderer3.push(`<!----> Make Offer`);
              }
            });
            $$renderer2.push(`<!----> `);
            Button($$renderer2, {
              variant: "destructive",
              size: "sm",
              onclick: () => showRejectDialog = true,
              children: ($$renderer3) => {
                Circle_x($$renderer3, { class: "w-4 h-4 mr-2" });
                $$renderer3.push(`<!----> Reject`);
              }
            });
            $$renderer2.push(`<!---->`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div> <div class="border-b border-gray-200"><nav class="flex gap-8"><!--[-->`);
          const each_array = ensure_array_like(tabs);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let tab = each_array[$$index];
            $$renderer2.push(`<button${attr_class(`py-3 text-sm font-medium border-b-2 transition-colors ${stringify(activeTab === tab.id ? "border-royal-500 text-royal-400" : "border-transparent text-gray-500 hover:text-gray-700")}`)}>${escape_html(tab.label)}</button>`);
          }
          $$renderer2.push(`<!--]--></nav></div> `);
          {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6">`);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-4">Assessment Scores</h2> <div class="grid grid-cols-2 sm:grid-cols-4 gap-6"><div class="text-center">`);
                ScoreGauge($$renderer3, {
                  score: candidate.candidate_resume_score || candidate.resume_score || 0,
                  size: "lg"
                });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-600 mt-2 font-medium">Resume</p></div> <div class="text-center">`);
                ScoreGauge($$renderer3, { score: aptitudeScore ?? 0, size: "lg" });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-600 mt-2 font-medium">Aptitude</p> `);
                if (aptitudeScore == null && candidate.aptitude_test_result) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-400 mt-0.5">Result: ${escape_html(candidate.aptitude_test_result)}</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--> `);
                if (aptitudeScore == null && !candidate.aptitude_test_result) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-400 mt-0.5">Not taken</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div> <div class="text-center">`);
                ScoreGauge($$renderer3, {
                  score: technicalScore ?? (candidate.technical_test_result === "pass" ? 80 : 0),
                  size: "lg"
                });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-600 mt-2 font-medium">Technical</p> `);
                if (technicalScore == null && candidate.technical_test_result) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-400 mt-0.5">Result: ${escape_html(candidate.technical_test_result)}</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--> `);
                if (technicalScore == null && !candidate.technical_test_result) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-400 mt-0.5">Not taken</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div> <div class="text-center">`);
                ScoreGauge($$renderer3, {
                  score: hrScore ?? (candidate.hr_test_result === "pass" ? 80 : 0),
                  size: "lg"
                });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-600 mt-2 font-medium">HR</p> `);
                if (hrScore == null && candidate.hr_test_result) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-400 mt-0.5">Result: ${escape_html(candidate.hr_test_result)}</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--> `);
                if (hrScore == null && !candidate.hr_test_result) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-400 mt-0.5">Not taken</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div></div>`);
              }
            });
            $$renderer2.push(`<!----> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-4">Test Results</h2> <div class="grid sm:grid-cols-3 gap-4"><div class="bg-gray-100 rounded-lg p-4 text-center">`);
                Brain($$renderer3, { class: "w-6 h-6 mx-auto mb-2 text-royal-400" });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-500">Aptitude</p> <p class="font-semibold text-gray-900 mt-1">`);
                if (aptitudeScore != null) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`${escape_html(Math.round(aptitudeScore))}%`);
                } else {
                  $$renderer3.push("<!--[!-->");
                  if (candidate.aptitude_test_result) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`${escape_html(candidate.aptitude_test_result)}`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    $$renderer3.push(`Pending`);
                  }
                  $$renderer3.push(`<!--]-->`);
                }
                $$renderer3.push(`<!--]--></p> `);
                if (aptitudeAttempt) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-500 mt-1">${escape_html(aptitudeAttempt.correct_answers_count ?? 0)} / ${escape_html(aptitudeAttempt.total_questions_attempted ?? aptitudeAttempt.total_questions ?? "?")} correct</p> `);
                  if (aptitudeAttempt.passed === true) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<span class="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide text-emerald-600">Passed</span>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (aptitudeAttempt.passed === false) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide text-red-600">Failed</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]-->`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div> <div class="bg-gray-100 rounded-lg p-4 text-center">`);
                Code($$renderer3, { class: "w-6 h-6 mx-auto mb-2 text-amber-400" });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-500">Technical</p> <p class="font-semibold text-gray-900 mt-1">`);
                if (technicalScore != null) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`${escape_html(Math.round(technicalScore))}%`);
                } else {
                  $$renderer3.push("<!--[!-->");
                  if (candidate.technical_test_result) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`${escape_html(candidate.technical_test_result)}`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    $$renderer3.push(`Pending`);
                  }
                  $$renderer3.push(`<!--]-->`);
                }
                $$renderer3.push(`<!--]--></p> `);
                if (technicalResult?.interview_status) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-500 mt-1">${escape_html(technicalResult.interview_status)}</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div> <div class="bg-gray-100 rounded-lg p-4 text-center">`);
                Handshake($$renderer3, { class: "w-6 h-6 mx-auto mb-2 text-purple-400" });
                $$renderer3.push(`<!----> <p class="text-sm text-gray-500">HR</p> <p class="font-semibold text-gray-900 mt-1">`);
                if (hrScore != null) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`${escape_html(Math.round(hrScore))}%`);
                } else {
                  $$renderer3.push("<!--[!-->");
                  if (candidate.hr_test_result) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`${escape_html(candidate.hr_test_result)}`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    $$renderer3.push(`Pending`);
                  }
                  $$renderer3.push(`<!--]-->`);
                }
                $$renderer3.push(`<!--]--></p> `);
                if (hrResult?.interview_status) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<p class="text-xs text-gray-500 mt-1">${escape_html(hrResult.interview_status)}</p>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div></div>`);
              }
            });
            $$renderer2.push(`<!----> `);
            if (aptitudeAttempt) {
              $$renderer2.push("<!--[-->");
              Card($$renderer2, {
                class: "p-6",
                children: ($$renderer3) => {
                  const total = aptitudeAttempt.total_questions_attempted ?? aptitudeAttempt.total_questions ?? 0;
                  const correct = aptitudeAttempt.correct_answers_count ?? 0;
                  const incorrect = Math.max(0, total - correct);
                  $$renderer3.push(`<div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900">Aptitude Test Result</h2> `);
                  if (aptitudeAttempt.passed === true) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wide">`);
                    Circle_check_big($$renderer3, { class: "w-3.5 h-3.5" });
                    $$renderer3.push(`<!----> Passed</span>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (aptitudeAttempt.passed === false) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide">`);
                      Circle_x($$renderer3, { class: "w-3.5 h-3.5" });
                      $$renderer3.push(`<!----> Failed</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (aptitudeAttempt.passed === true) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="rounded-lg bg-emerald-50 border border-emerald-200 p-4 mb-4"><p class="font-semibold text-emerald-800">🎉 Congratulations!</p> <p class="text-sm text-emerald-700 mt-0.5">Candidate successfully passed the aptitude test.</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]-->   <div class="grid grid-cols-2 sm:grid-cols-5 gap-3"><div class="rounded-lg bg-purple-50 border border-purple-100 p-3 text-center"><p class="text-2xl font-bold text-purple-700">${escape_html(aptitudeScore != null ? `${Math.round(aptitudeScore)}%` : "—")}</p> <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Score</p></div> <div class="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-center"><p class="text-2xl font-bold text-emerald-700">${escape_html(correct)}</p> <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Correct</p></div> <div class="rounded-lg bg-red-50 border border-red-100 p-3 text-center"><p class="text-2xl font-bold text-red-700">${escape_html(incorrect)}</p> <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Incorrect</p></div> <div class="rounded-lg bg-gray-100 border border-gray-200 p-3 text-center"><p class="text-2xl font-bold text-gray-800">${escape_html(total)}</p> <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Attempted</p></div> <div class="rounded-lg bg-amber-50 border border-amber-100 p-3 text-center"><p class="text-2xl font-bold text-amber-700">${escape_html(aptitudeAttempt.time_taken_seconds != null ? formatDuration(aptitudeAttempt.time_taken_seconds) : "—")}</p> <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">Time Taken</p></div></div> <div class="mt-6 border border-gray-200 rounded-lg overflow-hidden"><div class="px-4 py-2 bg-gray-50 border-b border-gray-200"><h3 class="text-sm font-semibold text-gray-700">Test Summary</h3></div> <dl class="divide-y divide-gray-100 text-sm"><div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Candidate</dt> <dd class="col-span-2 text-gray-800">${escape_html(candidateName)}</dd></div> <div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Email</dt> <dd class="col-span-2 text-gray-800">${escape_html(aptitudeAttempt.candidate_email || candidate.email || "—")}</dd></div> <div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Total Questions</dt> <dd class="col-span-2 text-gray-800">${escape_html(aptitudeAttempt.total_questions ?? total)}</dd></div> <div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Passing Score</dt> <dd class="col-span-2 text-gray-800">${escape_html(aptitudeAttempt.passing_score_percentage != null ? `${aptitudeAttempt.passing_score_percentage}%` : "—")}</dd></div> <div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Result</dt> <dd class="col-span-2">`);
                  if (aptitudeAttempt.passed === true) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<span class="text-emerald-700 font-semibold">PASS</span>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (aptitudeAttempt.passed === false) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="text-red-700 font-semibold">FAIL</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                      $$renderer3.push(`<span class="text-gray-500">—</span>`);
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></dd></div> <div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Status</dt> <dd class="col-span-2 text-gray-800 capitalize">${escape_html(aptitudeAttempt.status ?? "—")}</dd></div> `);
                  if (aptitudeAttempt.tab_switches != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Tab Switches</dt> <dd class="col-span-2 text-gray-800">${escape_html(aptitudeAttempt.tab_switches)} `);
                    if (aptitudeAttempt.tab_switches > 0) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="text-xs text-amber-600 ml-1">(proctoring flag)</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--></dd></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> <div class="grid grid-cols-3 px-4 py-2"><dt class="text-gray-500">Submitted At</dt> <dd class="col-span-2 text-gray-800">${escape_html(aptitudeAttempt.submitted_at ? formatDateTime(aptitudeAttempt.submitted_at) : "—")}</dd></div></dl></div>`);
                }
              });
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (technicalResult) {
              $$renderer2.push("<!--[-->");
              const tr = technicalResult;
              const tScore = typeof tr.overall_score === "number" ? tr.overall_score : null;
              const tThreshold = typeof tr.passed_threshold === "number" ? tr.passed_threshold : 60;
              const tPassed = tr.result ? tr.result === "pass" : tScore != null ? tScore >= tThreshold : null;
              const tStrengths = Array.isArray(tr.candidate_strengths) ? tr.candidate_strengths : [];
              const tImprovements = [
                ...Array.isArray(tr.improvement_areas) ? tr.improvement_areas : [],
                ...Array.isArray(tr.candidate_weaknesses) ? tr.candidate_weaknesses : []
              ];
              const tDurationMin = tr.interview_duration_seconds ? Math.round(tr.interview_duration_seconds / 60) : null;
              Card($$renderer2, {
                class: "p-6",
                children: ($$renderer3) => {
                  $$renderer3.push(`<div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">`);
                  Code($$renderer3, { class: "w-5 h-5 text-amber-600" });
                  $$renderer3.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-900">Technical Interview Result</h2></div> <div${attr_class(`flex items-center justify-between p-4 rounded-xl mb-5 ${stringify(tPassed === true ? "bg-emerald-50 border border-emerald-200" : "")} ${stringify(tPassed === false ? "bg-red-50 border border-red-200" : "")} ${stringify(tPassed == null ? "bg-gray-50 border border-gray-200" : "")}`)}><div class="flex items-center gap-3">`);
                  if (tPassed === true) {
                    $$renderer3.push("<!--[-->");
                    Circle_check_big($$renderer3, { class: "w-8 h-8 text-emerald-600" });
                    $$renderer3.push(`<!----> <div><p class="text-xs uppercase tracking-wider text-emerald-700 font-medium">Interview Result</p> <p class="text-2xl font-bold text-emerald-700">PASS</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (tPassed === false) {
                      $$renderer3.push("<!--[-->");
                      Circle_x($$renderer3, { class: "w-8 h-8 text-red-600" });
                      $$renderer3.push(`<!----> <div><p class="text-xs uppercase tracking-wider text-red-700 font-medium">Interview Result</p> <p class="text-2xl font-bold text-red-700">FAIL</p></div>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                      Clock($$renderer3, { class: "w-8 h-8 text-gray-500" });
                      $$renderer3.push(`<!----> <div><p class="text-xs uppercase tracking-wider text-gray-600 font-medium">Interview Result</p> <p class="text-2xl font-bold text-gray-700">${escape_html((tr.interview_status || "pending").toUpperCase())}</p></div>`);
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (tScore != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="text-right"><p class="text-4xl font-extrabold text-gray-900 leading-none">${escape_html(Math.round(tScore))}<span class="text-2xl text-gray-400">/100</span></p> `);
                    if (tr.overall_rating) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<p class="text-xs uppercase tracking-wide text-gray-500 mt-1">${escape_html(tr.overall_rating)}</p>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (tr.ai_recommendation_reason) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="mb-5"><h3 class="text-sm font-semibold text-gray-700 mb-2">Performance Summary</h3> <p class="text-sm text-gray-600 leading-relaxed">${escape_html(tr.ai_recommendation_reason)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (tr.ai_feedback_summary) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="mb-5"><h3 class="text-sm font-semibold text-gray-700 mb-2">Feedback</h3> <p class="text-sm text-gray-600 leading-relaxed">${escape_html(tr.ai_feedback_summary)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">`);
                  if (tStrengths.length) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-4 rounded-lg bg-emerald-50 border border-emerald-100"><h3 class="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">`);
                    Circle_check_big($$renderer3, { class: "w-4 h-4" });
                    $$renderer3.push(`<!----> Strengths</h3> <ul class="space-y-1.5 text-sm text-emerald-900"><!--[-->`);
                    const each_array_1 = ensure_array_like(tStrengths);
                    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                      let s = each_array_1[$$index_1];
                      $$renderer3.push(`<li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">•</span> <span>${escape_html(s)}</span></li>`);
                    }
                    $$renderer3.push(`<!--]--></ul></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (tImprovements.length) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-4 rounded-lg bg-amber-50 border border-amber-100"><h3 class="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">`);
                    Trending_up($$renderer3, { class: "w-4 h-4" });
                    $$renderer3.push(`<!----> Areas to Improve</h3> <ul class="space-y-1.5 text-sm text-amber-900"><!--[-->`);
                    const each_array_2 = ensure_array_like(tImprovements);
                    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                      let i = each_array_2[$$index_2];
                      $$renderer3.push(`<li class="flex items-start gap-2"><span class="text-amber-500 mt-0.5">•</span> <span>${escape_html(i)}</span></li>`);
                    }
                    $$renderer3.push(`<!--]--></ul></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">`);
                  if (tDurationMin != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">Duration</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(tDurationMin)} min</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (tr.interview_language) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">Language</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(tr.interview_language)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (tr.questions_answered != null && tr.total_questions_asked != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">Questions</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(tr.questions_answered)}/${escape_html(tr.total_questions_asked)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (tr.ai_recommendation) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">AI Recommendation</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(String(tr.ai_recommendation).replace(/_/g, " "))}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (Array.isArray(tr.interview_transcript) && tr.interview_transcript.length) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<details class="mt-5 group"><summary class="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 select-none">Show Transcript (${escape_html(tr.interview_transcript.length)} turns)</summary> <div class="mt-3 max-h-80 overflow-y-auto space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200"><!--[-->`);
                    const each_array_3 = ensure_array_like(tr.interview_transcript);
                    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                      let turn = each_array_3[$$index_3];
                      $$renderer3.push(`<div class="text-xs"><span${attr_class(`font-semibold ${stringify(turn.speaker === "ai" ? "text-purple-700" : "text-blue-700")}`)}>${escape_html(turn.speaker === "ai" ? "AI Interviewer" : "Candidate")}${escape_html(turn.timestamp ? ` · ${turn.timestamp}` : "")}:</span> <span class="text-gray-700 ml-1">${escape_html(turn.text)}</span></div>`);
                    }
                    $$renderer3.push(`<!--]--></div></details>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]-->`);
                }
              });
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (hrResult) {
              $$renderer2.push("<!--[-->");
              const hr = hrResult;
              const hScore = typeof hr.overall_score === "number" ? hr.overall_score : null;
              const hThreshold = typeof hr.passed_threshold === "number" ? hr.passed_threshold : 60;
              const hPassed = hr.result ? hr.result === "pass" : hScore != null ? hScore >= hThreshold : null;
              const hStrengths = Array.isArray(hr.candidate_strengths) ? hr.candidate_strengths : [];
              const hImprovements = [
                ...Array.isArray(hr.improvement_areas) ? hr.improvement_areas : [],
                ...Array.isArray(hr.candidate_weaknesses) ? hr.candidate_weaknesses : []
              ];
              const hDurationMin = hr.interview_duration_seconds ? Math.round(hr.interview_duration_seconds / 60) : null;
              Card($$renderer2, {
                class: "p-6",
                children: ($$renderer3) => {
                  $$renderer3.push(`<div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">`);
                  Handshake($$renderer3, { class: "w-5 h-5 text-purple-600" });
                  $$renderer3.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-900">HR Interview Result</h2></div> <div${attr_class(`flex items-center justify-between p-4 rounded-xl mb-5 ${stringify(hPassed === true ? "bg-emerald-50 border border-emerald-200" : "")} ${stringify(hPassed === false ? "bg-red-50 border border-red-200" : "")} ${stringify(hPassed == null ? "bg-gray-50 border border-gray-200" : "")}`)}><div class="flex items-center gap-3">`);
                  if (hPassed === true) {
                    $$renderer3.push("<!--[-->");
                    Circle_check_big($$renderer3, { class: "w-8 h-8 text-emerald-600" });
                    $$renderer3.push(`<!----> <div><p class="text-xs uppercase tracking-wider text-emerald-700 font-medium">Interview Result</p> <p class="text-2xl font-bold text-emerald-700">PASS</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (hPassed === false) {
                      $$renderer3.push("<!--[-->");
                      Circle_x($$renderer3, { class: "w-8 h-8 text-red-600" });
                      $$renderer3.push(`<!----> <div><p class="text-xs uppercase tracking-wider text-red-700 font-medium">Interview Result</p> <p class="text-2xl font-bold text-red-700">FAIL</p></div>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                      Clock($$renderer3, { class: "w-8 h-8 text-gray-500" });
                      $$renderer3.push(`<!----> <div><p class="text-xs uppercase tracking-wider text-gray-600 font-medium">Interview Result</p> <p class="text-2xl font-bold text-gray-700">${escape_html((hr.interview_status || "pending").toUpperCase())}</p></div>`);
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (hScore != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="text-right"><p class="text-4xl font-extrabold text-gray-900 leading-none">${escape_html(Math.round(hScore))}<span class="text-2xl text-gray-400">/100</span></p> `);
                    if (hr.overall_rating) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<p class="text-xs uppercase tracking-wide text-gray-500 mt-1">${escape_html(hr.overall_rating)}</p>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (hr.ai_recommendation_reason) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="mb-5"><h3 class="text-sm font-semibold text-gray-700 mb-2">Performance Summary</h3> <p class="text-sm text-gray-600 leading-relaxed">${escape_html(hr.ai_recommendation_reason)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (hr.ai_feedback_summary) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="mb-5"><h3 class="text-sm font-semibold text-gray-700 mb-2">Feedback</h3> <p class="text-sm text-gray-600 leading-relaxed">${escape_html(hr.ai_feedback_summary)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">`);
                  if (hStrengths.length) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-4 rounded-lg bg-emerald-50 border border-emerald-100"><h3 class="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">`);
                    Circle_check_big($$renderer3, { class: "w-4 h-4" });
                    $$renderer3.push(`<!----> Strengths</h3> <ul class="space-y-1.5 text-sm text-emerald-900"><!--[-->`);
                    const each_array_4 = ensure_array_like(hStrengths);
                    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
                      let s = each_array_4[$$index_4];
                      $$renderer3.push(`<li class="flex items-start gap-2"><span class="text-emerald-500 mt-0.5">•</span> <span>${escape_html(s)}</span></li>`);
                    }
                    $$renderer3.push(`<!--]--></ul></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (hImprovements.length) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-4 rounded-lg bg-amber-50 border border-amber-100"><h3 class="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">`);
                    Trending_up($$renderer3, { class: "w-4 h-4" });
                    $$renderer3.push(`<!----> Areas to Improve</h3> <ul class="space-y-1.5 text-sm text-amber-900"><!--[-->`);
                    const each_array_5 = ensure_array_like(hImprovements);
                    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
                      let i = each_array_5[$$index_5];
                      $$renderer3.push(`<li class="flex items-start gap-2"><span class="text-amber-500 mt-0.5">•</span> <span>${escape_html(i)}</span></li>`);
                    }
                    $$renderer3.push(`<!--]--></ul></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">`);
                  if (hDurationMin != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">Duration</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(hDurationMin)} min</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (hr.interview_language) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">Language</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(hr.interview_language)}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (hr.ai_recommendation) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">AI Recommendation</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(String(hr.ai_recommendation).replace(/_/g, " "))}</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (hr.cultural_fit_score != null) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="p-2 rounded-lg bg-gray-50"><p class="text-gray-400 uppercase tracking-wide">Cultural Fit</p> <p class="text-gray-800 font-medium mt-0.5">${escape_html(Math.round(hr.cultural_fit_score))}%</p></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (Array.isArray(hr.interview_transcript) && hr.interview_transcript.length) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<details class="mt-5 group"><summary class="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 select-none">Show Transcript (${escape_html(hr.interview_transcript.length)} turns)</summary> <div class="mt-3 max-h-80 overflow-y-auto space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200"><!--[-->`);
                    const each_array_6 = ensure_array_like(hr.interview_transcript);
                    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
                      let turn = each_array_6[$$index_6];
                      $$renderer3.push(`<div class="text-xs"><span${attr_class(`font-semibold ${stringify(turn.speaker === "ai" ? "text-purple-700" : "text-blue-700")}`)}>${escape_html(turn.speaker === "ai" ? "AI Interviewer" : "Candidate")}${escape_html(turn.timestamp ? ` · ${turn.timestamp}` : "")}:</span> <span class="text-gray-700 ml-1">${escape_html(turn.text)}</span></div>`);
                    }
                    $$renderer3.push(`<!--]--></div></details>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]-->`);
                }
              });
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900">Interview History</h2></div> <div class="space-y-4">`);
                if (interviewHistory.length === 0) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<div class="text-center py-6 text-sm text-gray-500">No interviews recorded for this candidate yet.</div>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                  $$renderer3.push(`<!--[-->`);
                  const each_array_7 = ensure_array_like(interviewHistory);
                  for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
                    let interview = each_array_7[$$index_7];
                    const typeConfig = {
                      aptitude: { icon: Brain, label: "Aptitude Test", color: "royal" },
                      technical: { icon: Code, label: "Technical Interview", color: "amber" },
                      hr: { icon: Handshake, label: "HR Interview", color: "purple" }
                    }[interview.type];
                    $$renderer3.push(`<div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"><div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">`);
                    $$renderer3.push("<!---->");
                    (typeConfig?.icon || Brain)?.($$renderer3, { class: "w-5 h-5 text-amber-600" });
                    $$renderer3.push(`<!----></div> <div class="flex-1 min-w-0"><p class="font-medium text-gray-800">${escape_html(typeConfig?.label)}</p> <p class="text-sm text-gray-500">${escape_html(interview.date ? formatDateTime(interview.date) : "—")} `);
                    if (interview.duration) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="text-gray-300">· ${escape_html(interview.duration)}</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--></p></div> <div class="text-right shrink-0">`);
                    if (interview.score != null) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<div class="flex items-center gap-2 justify-end"><span class="text-lg font-semibold text-gray-900">${escape_html(Math.round(interview.score))}%</span> `);
                      if (interview.passed === true) {
                        $$renderer3.push("<!--[-->");
                        Circle_check_big($$renderer3, { class: "w-5 h-5 text-emerald-500" });
                      } else {
                        $$renderer3.push("<!--[!-->");
                        if (interview.passed === false) {
                          $$renderer3.push("<!--[-->");
                          Circle_x($$renderer3, { class: "w-5 h-5 text-red-500" });
                        } else {
                          $$renderer3.push("<!--[!-->");
                        }
                        $$renderer3.push(`<!--]-->`);
                      }
                      $$renderer3.push(`<!--]--></div> `);
                      if (interview.passed === true) {
                        $$renderer3.push("<!--[-->");
                        $$renderer3.push(`<p class="text-xs text-emerald-600 font-medium">Passed</p>`);
                      } else {
                        $$renderer3.push("<!--[!-->");
                        if (interview.passed === false) {
                          $$renderer3.push("<!--[-->");
                          $$renderer3.push(`<p class="text-xs text-red-600 font-medium">Failed</p>`);
                        } else {
                          $$renderer3.push("<!--[!-->");
                          $$renderer3.push(`<p class="text-xs text-gray-400">Completed</p>`);
                        }
                        $$renderer3.push(`<!--]-->`);
                      }
                      $$renderer3.push(`<!--]-->`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                      StatusBadge($$renderer3, { status: interview.status || "pending" });
                    }
                    $$renderer3.push(`<!--]--></div></div>`);
                  }
                  $$renderer3.push(`<!--]-->`);
                }
                $$renderer3.push(`<!--]--></div>`);
              }
            });
            $$renderer2.push(`<!----></div> <div class="space-y-6">`);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-4">Details</h2> <dl class="space-y-4"><div><dt class="text-sm text-gray-500">Applied</dt> <dd class="text-gray-700">${escape_html(candidate.created_at ? formatDate(candidate.created_at) : "-")}</dd></div> <div><dt class="text-sm text-gray-500">Email</dt> <dd class="text-gray-700">${escape_html(candidate.email || "-")}</dd></div> <div><dt class="text-sm text-gray-500">Phone</dt> <dd class="text-gray-700">${escape_html(candidate.phone || "-")}</dd></div> `);
                if (candidate.password) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<div><dt class="text-sm text-gray-500 mb-1">Aptitude Test Password</dt> <dd class="flex items-center gap-2"><code class="px-2 py-1 rounded bg-gray-100 border border-gray-200 text-sm font-mono text-gray-800 select-all">${escape_html("•".repeat((candidate.password ?? "").length || 8))}</code> <button type="button" class="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"${attr("title", "Show password")}>`);
                  {
                    $$renderer3.push("<!--[!-->");
                    Eye($$renderer3, { class: "w-4 h-4" });
                  }
                  $$renderer3.push(`<!--]--></button> <button type="button" class="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700" title="Copy password">`);
                  Copy($$renderer3, { class: "w-4 h-4" });
                  $$renderer3.push(`<!----></button></dd> <p class="text-xs text-gray-400 mt-1">Share this with the candidate to log into the aptitude test.</p></div>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--> <div><dt class="text-sm text-gray-500">Resume Score</dt> <dd class="text-gray-700">${escape_html(candidate.candidate_resume_score || candidate.resume_score || "-")}%</dd></div> <div><dt class="text-sm text-gray-500">Resume Selected</dt> <dd class="text-gray-700">${escape_html(candidate.resume_selected ? "Yes" : "No")}</dd></div></dl>`);
              }
            });
            $$renderer2.push(`<!----> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-4">Pipeline Progress</h2> <div class="space-y-3"><!--[-->`);
                const each_array_8 = ensure_array_like(pipelineStages);
                for (let index = 0, $$length = each_array_8.length; index < $$length; index++) {
                  let stage = each_array_8[index];
                  const isCompleted = stage.state === "completed";
                  const isFailed = stage.state === "failed";
                  const isCurrent = stage.state === "current";
                  const isPending = stage.state === "pending";
                  $$renderer3.push(`<div class="flex items-start gap-3"><div${attr_class(`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${stringify(isCompleted ? "bg-emerald-600 text-white" : "")} ${stringify(isFailed ? "bg-red-600 text-white" : "")} ${stringify(isCurrent ? "bg-royal-600 text-white ring-4 ring-royal-200" : "")} ${stringify(isPending ? "bg-gray-200 text-gray-400" : "")}`)}>`);
                  if (isCompleted) {
                    $$renderer3.push("<!--[-->");
                    Circle_check_big($$renderer3, { class: "w-4 h-4" });
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (isFailed) {
                      $$renderer3.push("<!--[-->");
                      Circle_x($$renderer3, { class: "w-4 h-4" });
                    } else {
                      $$renderer3.push("<!--[!-->");
                      $$renderer3.push("<!---->");
                      stage.icon?.($$renderer3, { class: "w-4 h-4" });
                      $$renderer3.push(`<!---->`);
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></div> <div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-2"><span${attr_class(`text-sm ${stringify(isCompleted ? "text-gray-900 font-medium" : "")} ${stringify(isFailed ? "text-red-600 font-medium" : "")} ${stringify(isCurrent ? "text-royal-700 font-semibold" : "")} ${stringify(isPending ? "text-gray-400" : "")}`)}>${escape_html(stage.label)}</span> `);
                  if (isCurrent) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<span class="text-[10px] uppercase tracking-wide text-royal-600 bg-royal-100 px-2 py-0.5 rounded">Current</span>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (isCompleted) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="text-[10px] uppercase tracking-wide text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Done</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                      if (isFailed) {
                        $$renderer3.push("<!--[-->");
                        $$renderer3.push(`<span class="text-[10px] uppercase tracking-wide text-red-600 bg-red-100 px-2 py-0.5 rounded">Failed</span>`);
                      } else {
                        $$renderer3.push("<!--[!-->");
                      }
                      $$renderer3.push(`<!--]-->`);
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></div> `);
                  if (stage.detail) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<p class="text-xs text-gray-500 mt-0.5 truncate">${escape_html(stage.detail)}</p>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div></div> `);
                  if (index < pipelineStages.length - 1) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div${attr_class(`w-0.5 h-4 ml-4 ${stringify(isCompleted ? "bg-emerald-500" : "")} ${stringify(isFailed ? "bg-red-400" : "")} ${stringify(isCurrent || isPending ? "bg-gray-200" : "")}`)}></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]-->`);
                }
                $$renderer3.push(`<!--]--></div>`);
              }
            });
            $$renderer2.push(`<!----> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2> <div class="space-y-2">`);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  onclick: () => scheduleInterview("aptitude"),
                  children: ($$renderer4) => {
                    Brain($$renderer4, { class: "w-4 h-4 mr-2" });
                    $$renderer4.push(`<!----> Schedule Aptitude Test`);
                  }
                });
                $$renderer3.push(`<!----> `);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  disabled: resettingAptitude,
                  onclick: resetAptitude,
                  children: ($$renderer4) => {
                    Refresh_cw($$renderer4, {
                      class: `w-4 h-4 mr-2 ${stringify(resettingAptitude ? "animate-spin" : "")}`
                    });
                    $$renderer4.push(`<!----> ${escape_html(resettingAptitude ? "Resetting..." : "Refresh Aptitude Attempts")}`);
                  }
                });
                $$renderer3.push(`<!----> `);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  onclick: () => scheduleInterview("technical"),
                  children: ($$renderer4) => {
                    Code($$renderer4, { class: "w-4 h-4 mr-2" });
                    $$renderer4.push(`<!----> Schedule Technical Interview`);
                  }
                });
                $$renderer3.push(`<!----> `);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  disabled: resettingTechnical,
                  onclick: resetTechnical,
                  children: ($$renderer4) => {
                    Refresh_cw($$renderer4, {
                      class: `w-4 h-4 mr-2 ${stringify(resettingTechnical ? "animate-spin" : "")}`
                    });
                    $$renderer4.push(`<!----> ${escape_html(resettingTechnical ? "Resetting..." : "Refresh Technical Interview")}`);
                  }
                });
                $$renderer3.push(`<!----> `);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  onclick: () => scheduleInterview("hr"),
                  children: ($$renderer4) => {
                    Handshake($$renderer4, { class: "w-4 h-4 mr-2" });
                    $$renderer4.push(`<!----> Schedule HR Interview`);
                  }
                });
                $$renderer3.push(`<!----> `);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  disabled: resettingHR,
                  onclick: resetHR,
                  children: ($$renderer4) => {
                    Refresh_cw($$renderer4, {
                      class: `w-4 h-4 mr-2 ${stringify(resettingHR ? "animate-spin" : "")}`
                    });
                    $$renderer4.push(`<!----> ${escape_html(resettingHR ? "Resetting..." : "Refresh HR Interview")}`);
                  }
                });
                $$renderer3.push(`<!----> `);
                Button($$renderer3, {
                  variant: "outline",
                  class: "w-full justify-start",
                  onclick: sendMessage,
                  children: ($$renderer4) => {
                    Message_square($$renderer4, { class: "w-4 h-4 mr-2" });
                    $$renderer4.push(`<!----> Send Message`);
                  }
                });
                $$renderer3.push(`<!----></div>`);
              }
            });
            $$renderer2.push(`<!----></div></div>`);
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    ConfirmDialog($$renderer2, {
      open: showRejectDialog,
      title: "Reject Candidate",
      description: "Are you sure you want to reject this candidate? This action can be undone later.",
      confirmText: "Reject",
      cancelText: "Cancel",
      variant: "destructive",
      onconfirm: handleReject,
      oncancel: () => showRejectDialog = false
    });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
