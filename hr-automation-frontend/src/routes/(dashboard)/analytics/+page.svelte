<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Briefcase,
    Clock,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Sparkles,
    Award,
    Activity,
    UserCheck,
    UserX,
    Zap,
    Globe,
    Mail,
    Linkedin,
    Share2,
    Building2,
    GraduationCap,
    Star,
    FileCheck,
    Brain,
    MessageSquare,
    Trophy,
    CheckCircle2,
    AlertCircle
  } from 'lucide-svelte';

  let timeRange = $state('30d');
  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '365d', label: 'Last year' }
  ];

  // ====== FAKE DATA ======
  const stats = {
    totalCandidates: 1284,
    totalCandidatesDelta: 12.4,
    activeJobs: 18,
    activeJobsDelta: 3,
    avgTimeToHire: 22,
    avgTimeToHireDelta: -3,
    conversionRate: 14.6,
    conversionRateDelta: 2.1,
    interviewsCompleted: 412,
    offersAccepted: 87,
    aiHoursSaved: 1840,
    qualityOfHire: 8.7
  };

  // Pipeline funnel (top→bottom)
  const pipeline = [
    { label: 'Applied',     value: 1284, color: '#94a3b8', icon: Users },
    { label: 'Resume Screen', value: 642, color: '#a78bfa', icon: FileCheck },
    { label: 'Aptitude',    value: 384,  color: '#60a5fa', icon: Brain },
    { label: 'Technical',   value: 218,  color: '#f59e0b', icon: GraduationCap },
    { label: 'HR Round',    value: 142,  color: '#a855f7', icon: MessageSquare },
    { label: 'Offered',     value: 96,   color: '#34d399', icon: Award },
    { label: 'Hired',       value: 87,   color: '#10b981', icon: Trophy }
  ];
  const maxPipeline = Math.max(...pipeline.map(p => p.value));

  // Hiring trends — 12 months
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const applications = [82, 94, 110, 125, 142, 168, 154, 178, 196, 212, 234, 248];
  const hires        = [ 4,  5,   6,   8,   7,  11,  10,  12,   9,  13,  15,  18];
  const maxTrend = Math.max(...applications);

  // Candidate sources
  const sources = [
    { source: 'LinkedIn',           count: 412, pct: 32, color: '#0ea5e9', icon: Linkedin },
    { source: 'Direct Application', count: 358, pct: 28, color: '#8b5cf6', icon: Globe },
    { source: 'Employee Referral',  count: 218, pct: 17, color: '#10b981', icon: UserCheck },
    { source: 'Job Boards',         count: 154, pct: 12, color: '#f59e0b', icon: Briefcase },
    { source: 'Email Campaign',     count: 90,  pct: 7,  color: '#ec4899', icon: Mail },
    { source: 'Social / Other',     count: 52,  pct: 4,  color: '#64748b', icon: Share2 }
  ];

  // Top performing roles
  const topRoles = [
    { title: 'Senior Backend Engineer', applied: 218, hired: 14, conv: 6.4, dept: 'Engineering' },
    { title: 'Full Stack Developer',     applied: 184, hired: 12, conv: 6.5, dept: 'Engineering' },
    { title: 'Product Manager',          applied: 96,  hired: 7,  conv: 7.3, dept: 'Product' },
    { title: 'Data Scientist',           applied: 142, hired: 9,  conv: 6.3, dept: 'Data' },
    { title: 'UX Designer',              applied: 87,  hired: 6,  conv: 6.9, dept: 'Design' },
    { title: 'DevOps Engineer',          applied: 64,  hired: 5,  conv: 7.8, dept: 'Engineering' }
  ];

  // Skill distribution (top in-demand)
  const skills = [
    { name: 'Python',      score: 92 },
    { name: 'React',       score: 88 },
    { name: 'PostgreSQL',  score: 81 },
    { name: 'AWS',         score: 76 },
    { name: 'TypeScript',  score: 74 },
    { name: 'Docker',      score: 69 },
    { name: 'Kubernetes',  score: 58 },
    { name: 'GraphQL',     score: 47 }
  ];

  // AI interview score distribution (histogram)
  const scoreBuckets = [
    { range: '0-20',   tech: 8,  hr: 4  },
    { range: '21-40',  tech: 18, hr: 12 },
    { range: '41-60',  tech: 42, hr: 38 },
    { range: '61-80',  tech: 96, hr: 108 },
    { range: '81-100', tech: 54, hr: 50 }
  ];
  const maxBucket = Math.max(...scoreBuckets.flatMap(b => [b.tech, b.hr]));

  // Recent activity feed
  const recentActivity = [
    { type: 'hired',    name: 'Ananya Reddy',   role: 'Senior Backend Engineer', time: '2 hours ago',  bg: 'bg-emerald-100', fg: 'text-emerald-600' },
    { type: 'offered',  name: 'Vikram Singh',   role: 'Full Stack Developer',     time: '5 hours ago',  bg: 'bg-amber-100',   fg: 'text-amber-600' },
    { type: 'rejected', name: 'Sneha Verma',    role: 'Senior Backend Engineer', time: '8 hours ago',  bg: 'bg-rose-100',    fg: 'text-rose-600' },
    { type: 'interview',name: 'Karan Mehta',    role: 'Senior Backend Engineer', time: '12 hours ago', bg: 'bg-purple-100',  fg: 'text-purple-600' },
    { type: 'applied',  name: 'Rohan Patel',    role: 'Product Manager',          time: '1 day ago',    bg: 'bg-sky-100',     fg: 'text-sky-600' },
    { type: 'hired',    name: 'Priya Iyer',     role: 'Data Scientist',           time: '2 days ago',   bg: 'bg-emerald-100', fg: 'text-emerald-600' }
  ];
  const activityIcon = (t: string) => ({
    hired: Trophy, offered: Award, rejected: UserX, interview: MessageSquare, applied: Users
  } as any)[t] || Activity;
  const activityVerb = (t: string) => ({
    hired: 'was hired for', offered: 'received an offer for', rejected: 'was rejected for',
    interview: 'completed an interview for', applied: 'applied for'
  } as any)[t] || 'activity for';

  // Department breakdown — donut style
  const departments = [
    { name: 'Engineering', value: 564, color: '#8b5cf6' },
    { name: 'Product',     value: 218, color: '#f59e0b' },
    { name: 'Design',      value: 142, color: '#ec4899' },
    { name: 'Data',        value: 196, color: '#10b981' },
    { name: 'Marketing',   value: 96,  color: '#0ea5e9' },
    { name: 'Operations',  value: 68,  color: '#64748b' }
  ];
  const deptTotal = departments.reduce((s, d) => s + d.value, 0);

  // Donut math
  let cumulative = 0;
  const donutSegments = departments.map(d => {
    const pct = d.value / deptTotal;
    const dash = pct * 100;
    const seg = { ...d, dash, offset: cumulative, pct: Math.round(pct * 100) };
    cumulative += dash;
    return seg;
  });

  // Time-of-day application pattern (heat-row)
  const timeBuckets = ['12a','3a','6a','9a','12p','3p','6p','9p'];
  const timeHeat = [4, 2, 8, 28, 64, 86, 52, 18];
  const maxHeat = Math.max(...timeHeat);

  // Trend chart geometry helpers (must be in <script> — can't be inside SVG)
  const trendStepX = 650 / 11;
  const trendPtX = (i: number) => 40 + i * trendStepX;
  const trendPtY = (v: number) => 240 - (v / maxTrend) * 200;
  const appAreaPath = `M ${trendPtX(0)},${trendPtY(applications[0])} ` +
    applications.slice(1).map((v, i) => `L ${trendPtX(i + 1)},${trendPtY(v)}`).join(' ') +
    ` L ${trendPtX(11)},240 L ${trendPtX(0)},240 Z`;
  const appLinePath = `M ${trendPtX(0)},${trendPtY(applications[0])} ` +
    applications.slice(1).map((v, i) => `L ${trendPtX(i + 1)},${trendPtY(v)}`).join(' ');

  function exportReport() {
    const data = { timeRange, stats, pipeline, sources, topRoles };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Analytics | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Hero header -->
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-amber-500 p-8 text-white shadow-xl">
    <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px); background-size: 32px 32px;"></div>
    <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-3">
          <Sparkles class="w-3.5 h-3.5" />
          AI-POWERED INSIGHTS
        </div>
        <h1 class="text-3xl font-bold">Hiring Analytics</h1>
        <p class="text-white/90 mt-1">Track performance, spot bottlenecks, and optimise your funnel.</p>
      </div>
      <div class="flex items-center gap-3">
        <Select
          value={timeRange}
          options={timeRangeOptions}
          onchange={(e) => (timeRange = e.currentTarget.value)}
          class="w-44 !bg-white/20 !backdrop-blur-sm !text-white !border-white/30"
        />
        <Button variant="outline" class="!bg-white !text-purple-700 !border-white hover:!bg-white/90" onclick={exportReport}>
          <Download class="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  </div>

  <!-- Key Metrics -->
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Total Candidates -->
    <Card class="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
      <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-purple-100 opacity-50 group-hover:scale-110 transition-transform"></div>
      <div class="relative flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500">Total Candidates</p>
          <p class="text-3xl font-bold text-gray-900 mt-1">{stats.totalCandidates.toLocaleString()}</p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">
            <ArrowUpRight class="w-4 h-4" />
            <span class="font-medium">+{stats.totalCandidatesDelta}%</span>
            <span class="text-gray-400">vs last period</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-purple-sm">
          <Users class="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>

    <!-- Active Jobs -->
    <Card class="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
      <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-100 opacity-50 group-hover:scale-110 transition-transform"></div>
      <div class="relative flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500">Active Jobs</p>
          <p class="text-3xl font-bold text-gray-900 mt-1">{stats.activeJobs}</p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">
            <ArrowUpRight class="w-4 h-4" />
            <span class="font-medium">+{stats.activeJobsDelta}</span>
            <span class="text-gray-400">new this week</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
          <Briefcase class="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>

    <!-- Time to Hire -->
    <Card class="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
      <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-100 opacity-50 group-hover:scale-110 transition-transform"></div>
      <div class="relative flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500">Avg. Time to Hire</p>
          <p class="text-3xl font-bold text-gray-900 mt-1">{stats.avgTimeToHire}<span class="text-lg text-gray-500 ml-1">days</span></p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">
            <TrendingDown class="w-4 h-4" />
            <span class="font-medium">{stats.avgTimeToHireDelta} days</span>
            <span class="text-gray-400">faster</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
          <Clock class="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>

    <!-- Conversion -->
    <Card class="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
      <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-pink-100 opacity-50 group-hover:scale-110 transition-transform"></div>
      <div class="relative flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500">Conversion Rate</p>
          <p class="text-3xl font-bold text-gray-900 mt-1">{stats.conversionRate}<span class="text-lg text-gray-500">%</span></p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">
            <ArrowUpRight class="w-4 h-4" />
            <span class="font-medium">+{stats.conversionRateDelta}pp</span>
            <span class="text-gray-400">above benchmark</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
          <Target class="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  </div>

  <!-- AI strip -->
  <Card class="p-6 bg-gradient-to-r from-purple-50 via-white to-amber-50 border-purple-200">
    <div class="grid sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-purple-200">
      <div class="flex items-center gap-4 sm:pl-0 pl-0">
        <div class="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center"><Zap class="w-6 h-6 text-white" /></div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.aiHoursSaved.toLocaleString()}h</p>
          <p class="text-sm text-gray-500">Recruiter hours saved by AI</p>
        </div>
      </div>
      <div class="flex items-center gap-4 sm:pl-6 pt-6 sm:pt-0">
        <div class="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center"><MessageSquare class="w-6 h-6 text-white" /></div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.interviewsCompleted}</p>
          <p class="text-sm text-gray-500">AI interviews completed</p>
        </div>
      </div>
      <div class="flex items-center gap-4 sm:pl-6 pt-6 sm:pt-0">
        <div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center"><CheckCircle2 class="w-6 h-6 text-white" /></div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.offersAccepted}</p>
          <p class="text-sm text-gray-500">Offers accepted</p>
        </div>
      </div>
      <div class="flex items-center gap-4 sm:pl-6 pt-6 sm:pt-0">
        <div class="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center"><Star class="w-6 h-6 text-white" /></div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.qualityOfHire}<span class="text-base text-gray-500">/10</span></p>
          <p class="text-sm text-gray-500">Avg. quality of hire</p>
        </div>
      </div>
    </div>
  </Card>

  <!-- Pipeline funnel + Sources -->
  <div class="grid lg:grid-cols-3 gap-6">
    <!-- Funnel -->
    <Card class="p-6 lg:col-span-2">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Hiring Pipeline Funnel</h2>
          <p class="text-sm text-gray-500">Conversion from application to hire</p>
        </div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
          <BarChart3 class="w-3.5 h-3.5" />
          {stats.conversionRate}% overall
        </div>
      </div>

      <div class="space-y-3">
        {#each pipeline as stage, i}
          {@const widthPct = (stage.value / maxPipeline) * 100}
          {@const dropoff = i > 0 ? Math.round((1 - stage.value / pipeline[i - 1].value) * 100) : 0}
          <div class="group">
            <div class="flex items-center gap-3 mb-1">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white" style="background-color: {stage.color};">
                <stage.icon class="w-4 h-4" />
              </div>
              <span class="text-sm font-medium text-gray-700 flex-1">{stage.label}</span>
              <span class="text-sm font-semibold text-gray-900">{stage.value.toLocaleString()}</span>
              {#if i > 0}
                <span class="text-xs text-rose-500 font-medium w-12 text-right">-{dropoff}%</span>
              {:else}
                <span class="text-xs text-gray-400 w-12 text-right">—</span>
              {/if}
            </div>
            <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                style="width: {widthPct}%; background: linear-gradient(90deg, {stage.color}, {stage.color}dd);"
              ></div>
            </div>
          </div>
        {/each}
      </div>
    </Card>

    <!-- Sources -->
    <Card class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Candidate Sources</h2>
          <p class="text-sm text-gray-500">Where applicants come from</p>
        </div>
      </div>
      <div class="space-y-4">
        {#each sources as src}
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center" style="background-color: {src.color}20; color: {src.color};">
                <src.icon class="w-4 h-4" />
              </div>
              <span class="text-sm font-medium text-gray-700 flex-1">{src.source}</span>
              <span class="text-xs text-gray-500">{src.count} · <span class="font-semibold text-gray-700">{src.pct}%</span></span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden ml-9">
              <div class="h-full rounded-full transition-all duration-700" style="width: {src.pct * 2.5}%; background-color: {src.color};"></div>
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </div>

  <!-- Hiring Trends - dual-line + area chart -->
  <Card class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Hiring Trends</h2>
        <p class="text-sm text-gray-500">12-month applications vs hires</p>
      </div>
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-purple-500"></div>
          <span class="text-gray-600">Applications</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-amber-500"></div>
          <span class="text-gray-600">Hires</span>
        </div>
      </div>
    </div>

    <div class="relative h-72">
      <svg viewBox="0 0 700 280" class="w-full h-full" preserveAspectRatio="none">
        <!-- Grid lines -->
        {#each [0, 1, 2, 3, 4] as g}
          <line x1="40" x2="690" y1={40 + g * 50} y2={40 + g * 50} stroke="#e5e7eb" stroke-dasharray="4 4" />
        {/each}

        <!-- Y axis labels -->
        {#each [0, 1, 2, 3, 4] as g}
          <text x="32" y={45 + g * 50} text-anchor="end" fill="#9ca3af" font-size="10">{Math.round(maxTrend - g * maxTrend / 4)}</text>
        {/each}

        <!-- Applications area -->
        <defs>
          <linearGradient id="appGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0" />
          </linearGradient>
        </defs>

        <path d={appAreaPath} fill="url(#appGrad)" />
        <path
          d={appLinePath}
          fill="none" stroke="#a855f7" stroke-width="2.5"
        />

        <!-- Hires bars -->
        {#each hires as h, i}
          <rect x={trendPtX(i) - 8} y={240 - (h / maxTrend) * 200} width="16" height={(h / maxTrend) * 200} fill="#f59e0b" rx="3" opacity="0.85" />
        {/each}

        <!-- Applications dots -->
        {#each applications as v, i}
          <circle cx={trendPtX(i)} cy={trendPtY(v)} r="4" fill="#a855f7" stroke="white" stroke-width="2" />
        {/each}

        <!-- X axis labels -->
        {#each months as m, i}
          <text x={trendPtX(i)} y="265" text-anchor="middle" fill="#6b7280" font-size="11">{m}</text>
        {/each}
      </svg>
    </div>
  </Card>

  <!-- Three-up: Donut + Scores + Time-of-day -->
  <div class="grid lg:grid-cols-3 gap-6">
    <!-- Department donut -->
    <Card class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-1">Candidates by Department</h2>
      <p class="text-sm text-gray-500 mb-4">Distribution across teams</p>

      <div class="flex items-center gap-6">
        <div class="relative w-40 h-40 flex-shrink-0">
          <svg viewBox="0 0 42 42" class="w-full h-full -rotate-90">
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#f3f4f6" stroke-width="6" />
            {#each donutSegments as seg}
              <circle
                cx="21" cy="21" r="15.9" fill="none"
                stroke={seg.color}
                stroke-width="6"
                stroke-dasharray="{seg.dash} {100 - seg.dash}"
                stroke-dashoffset={-seg.offset}
              />
            {/each}
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-2xl font-bold text-gray-900">{deptTotal.toLocaleString()}</span>
            <span class="text-xs text-gray-500">total</span>
          </div>
        </div>
        <div class="flex-1 space-y-2">
          {#each donutSegments as d}
            <div class="flex items-center gap-2 text-sm">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: {d.color};"></span>
              <span class="text-gray-700 flex-1">{d.name}</span>
              <span class="font-semibold text-gray-900">{d.pct}%</span>
            </div>
          {/each}
        </div>
      </div>
    </Card>

    <!-- Interview score histogram -->
    <Card class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-1">AI Interview Scores</h2>
      <p class="text-sm text-gray-500 mb-4">Score distribution (Technical vs HR)</p>

      <div class="flex items-end justify-between gap-3 h-44">
        {#each scoreBuckets as b}
          <div class="flex-1 flex flex-col items-center gap-1 group">
            <div class="w-full flex gap-1 items-end h-full">
              <div class="flex-1 rounded-t-md bg-amber-500 transition-all duration-500 group-hover:bg-amber-600" style="height: {(b.tech / maxBucket) * 100}%" title="Technical: {b.tech}"></div>
              <div class="flex-1 rounded-t-md bg-purple-500 transition-all duration-500 group-hover:bg-purple-600" style="height: {(b.hr / maxBucket) * 100}%" title="HR: {b.hr}"></div>
            </div>
            <span class="text-xs text-gray-500">{b.range}</span>
          </div>
        {/each}
      </div>
      <div class="flex items-center gap-4 text-xs mt-3 justify-center">
        <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="text-gray-600">Technical</span></div>
        <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="text-gray-600">HR</span></div>
      </div>
    </Card>

    <!-- Application time-of-day -->
    <Card class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-1">When Candidates Apply</h2>
      <p class="text-sm text-gray-500 mb-4">Application volume by hour</p>

      <div class="flex items-end justify-between gap-1.5 h-44">
        {#each timeHeat as v, i}
          {@const intensity = v / maxHeat}
          <div class="flex-1 flex flex-col items-center gap-1 group">
            <div
              class="w-full rounded-t-md transition-all duration-500 group-hover:scale-110"
              style="height: {intensity * 100}%; background: linear-gradient(180deg, #8b5cf6, #6366f1);"
              title="{v} applications"
            ></div>
            <span class="text-[10px] text-gray-500">{timeBuckets[i]}</span>
          </div>
        {/each}
      </div>
      <p class="text-xs text-center text-gray-500 mt-3">Peak: <span class="font-semibold text-purple-600">3 PM (86 apps)</span></p>
    </Card>
  </div>

  <!-- Top roles table + activity feed -->
  <div class="grid lg:grid-cols-3 gap-6">
    <!-- Top performing roles -->
    <Card class="p-6 lg:col-span-2">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Top Performing Roles</h2>
          <p class="text-sm text-gray-500">By conversion rate this period</p>
        </div>
        <Trophy class="w-5 h-5 text-amber-500" />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
              <th class="py-3 font-medium">Role</th>
              <th class="py-3 font-medium">Department</th>
              <th class="py-3 font-medium text-right">Applied</th>
              <th class="py-3 font-medium text-right">Hired</th>
              <th class="py-3 font-medium text-right">Conversion</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            {#each topRoles as r}
              <tr class="hover:bg-purple-50/40 transition-colors">
                <td class="py-3 font-medium text-gray-800">{r.title}</td>
                <td class="py-3">
                  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                    <Building2 class="w-3 h-3" />
                    {r.dept}
                  </span>
                </td>
                <td class="py-3 text-right text-gray-600">{r.applied}</td>
                <td class="py-3 text-right font-semibold text-gray-900">{r.hired}</td>
                <td class="py-3 text-right">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <ArrowUpRight class="w-3 h-3" />
                    {r.conv}%
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Activity feed -->
    <Card class="p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p class="text-sm text-gray-500">Live pipeline events</p>
        </div>
        <span class="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>
      <div class="space-y-3">
        {#each recentActivity as a}
          {@const Icon = activityIcon(a.type)}
          <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center {a.bg} {a.fg}">
              <Icon class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-800">
                <span class="font-semibold">{a.name}</span>
                <span class="text-gray-500"> {activityVerb(a.type)} </span>
                <span class="font-medium">{a.role}</span>
              </p>
              <p class="text-xs text-gray-400 mt-0.5">{a.time}</p>
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </div>

  <!-- In-demand skills -->
  <Card class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">In-Demand Skills</h2>
        <p class="text-sm text-gray-500">Most frequently required across active jobs</p>
      </div>
      <Sparkles class="w-5 h-5 text-purple-500" />
    </div>
    <div class="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {#each skills as s}
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">{s.name}</span>
            <span class="text-xs text-gray-500 font-semibold">{s.score}%</span>
          </div>
          <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-700" style="width: {s.score}%;"></div>
          </div>
        </div>
      {/each}
    </div>
  </Card>

  <!-- Bottom summary -->
  <div class="grid sm:grid-cols-3 gap-4">
    <Card class="p-6 text-center bg-gradient-to-br from-emerald-50 to-emerald-100/40 border-emerald-200">
      <div class="w-12 h-12 mx-auto rounded-xl bg-emerald-500 flex items-center justify-center mb-3 shadow-md">
        <Trophy class="w-6 h-6 text-white" />
      </div>
      <div class="text-4xl font-bold text-gray-900 mb-1">87</div>
      <p class="text-gray-600 font-medium">Total Hires</p>
      <p class="text-sm text-emerald-600 mt-2 inline-flex items-center gap-1">
        <ArrowUpRight class="w-3.5 h-3.5" />
        +18 this month
      </p>
    </Card>

    <Card class="p-6 text-center bg-gradient-to-br from-amber-50 to-orange-100/40 border-amber-200">
      <div class="w-12 h-12 mx-auto rounded-xl bg-amber-500 flex items-center justify-center mb-3 shadow-md">
        <Award class="w-6 h-6 text-white" />
      </div>
      <div class="text-4xl font-bold text-gray-900 mb-1">9</div>
      <p class="text-gray-600 font-medium">Pending Offers</p>
      <p class="text-sm text-amber-600 mt-2 inline-flex items-center gap-1">
        <AlertCircle class="w-3.5 h-3.5" />
        Awaiting response
      </p>
    </Card>

    <Card class="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-100/40 border-purple-200">
      <div class="w-12 h-12 mx-auto rounded-xl bg-purple-500 flex items-center justify-center mb-3 shadow-md">
        <Activity class="w-6 h-6 text-white" />
      </div>
      <div class="text-4xl font-bold text-gray-900 mb-1">744</div>
      <p class="text-gray-600 font-medium">In Interview Stage</p>
      <p class="text-sm text-purple-600 mt-2 inline-flex items-center gap-1">
        <Zap class="w-3.5 h-3.5" />
        Across all rounds
      </p>
    </Card>
  </div>
</div>

<style>
  /* tailwind dynamic classes safelist hack — referenced via templated bg/text classes */
</style>
