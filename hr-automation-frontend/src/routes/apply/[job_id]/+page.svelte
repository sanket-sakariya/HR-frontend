<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createJobQuery } from '$lib/api/queries/jobs';
  import { createApplyMutation } from '$lib/api/queries/candidates';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import { toast } from 'svelte-sonner';
  import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    Building2,
    Upload,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    FileText,
    User,
    Mail,
    Phone,
    Globe,
    Linkedin,
    Sparkles,
    Send,
    PartyPopper,
    BadgeCheck,
    Wallet,
    CalendarClock
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = createJobQuery(jobId);
  const applyMutation = createApplyMutation();

  let currentStep = $state(1);
  let formData = $state({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    current_location: '',
    willing_to_relocate: 'false',
    skills: '',
    expected_salary: '',
    notice_period: '',
    linkedin_url: '',
    portfolio_url: ''
  });

  let resumeFile = $state<File | null>(null);
  let submitted = $state(false);
  let isDragging = $state(false);

  const job = $derived($jobQuery.data);

  async function handleSubmit() {
    if (!formData.first_name || !formData.last_name || !formData.email || !resumeFile) {
      toast.error('Please fill in all required fields', {
        description: 'First name, last name, email and resume are required'
      });
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('job_requirement_id', jobId);
      submitData.append('first_name', formData.first_name);
      submitData.append('last_name', formData.last_name);
      submitData.append('email', formData.email);
      submitData.append('resume', resumeFile);

      if (formData.phone) submitData.append('phone', formData.phone);
      if (formData.current_location) submitData.append('current_location', formData.current_location);
      if (formData.willing_to_relocate) submitData.append('willing_to_relocate', formData.willing_to_relocate);
      if (formData.skills) submitData.append('skills', formData.skills);
      if (formData.expected_salary) submitData.append('expected_salary', formData.expected_salary);
      if (formData.notice_period) submitData.append('notice_period', formData.notice_period);
      if (formData.linkedin_url) submitData.append('linkedin_url', formData.linkedin_url);
      if (formData.portfolio_url) submitData.append('portfolio_url', formData.portfolio_url);

      await $applyMutation.mutateAsync(submitData);

      submitted = true;
      toast.success('Application submitted successfully!');
    } catch (error: any) {
      toast.error('Failed to submit application', {
        description: error.message || 'Please try again.'
      });
    }
  }

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      resumeFile = target.files[0];
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        resumeFile = file;
      } else {
        toast.error('Please upload a PDF, DOC, or DOCX file');
      }
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    isDragging = true;
  }

  function handleDragLeave() {
    isDragging = false;
  }

  function nextStep() {
    if (currentStep === 1) {
      if (!formData.first_name || !formData.last_name || !formData.email) {
        toast.error('Please fill in required fields');
        return;
      }
    }
    if (currentStep < 3) currentStep++;
  }

  function prevStep() {
    if (currentStep > 1) currentStep--;
  }

  const steps = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Experience', icon: Briefcase },
    { id: 3, label: 'Documents', icon: FileText }
  ];
</script>

<svelte:head>
  <title>{job?.title || 'Apply'} | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">
          <Building2 class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="font-semibold text-gray-800">HR Automation</h1>
          <p class="text-xs text-gray-500">Career Opportunities</p>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 py-8">
    {#if $jobQuery.isLoading}
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <Skeleton class="h-72" />
        </div>
        <div class="lg:col-span-2">
          <Skeleton class="h-96" />
        </div>
      </div>
    {:else if $jobQuery.error || !job}
      <Card class="p-12 text-center max-w-lg mx-auto">
        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <Briefcase class="w-10 h-10 text-gray-400" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Job Not Found</h2>
        <p class="text-gray-500 mb-8">
          This job posting may have been removed or is no longer accepting applications.
        </p>
        <Button onclick={() => goto('/')}>Browse Other Jobs</Button>
      </Card>
    {:else if submitted}
      <!-- Success State -->
      <Card class="p-12 text-center max-w-xl mx-auto">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <PartyPopper class="w-12 h-12 text-white" />
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
        <p class="text-gray-500 mb-6 text-lg">
          Thank you for applying for the <strong class="text-purple-600">{job.title}</strong> position.
        </p>

        <div class="bg-purple-50 rounded-xl p-6 mb-8 text-left">
          <h3 class="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <Sparkles class="w-5 h-5" />
            What happens next?
          </h3>
          <ul class="space-y-2 text-sm text-purple-700">
            <li class="flex items-start gap-2">
              <BadgeCheck class="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Your resume will be analyzed by our AI screening system</span>
            </li>
            <li class="flex items-start gap-2">
              <BadgeCheck class="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>If selected, you'll receive an aptitude test invitation</span>
            </li>
            <li class="flex items-start gap-2">
              <BadgeCheck class="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Check your email at <strong>{formData.email}</strong> for updates</span>
            </li>
          </ul>
        </div>

        <Button onclick={() => goto('/')} size="lg">
          <Briefcase class="w-5 h-5" />
          Browse More Jobs
        </Button>
      </Card>
    {:else}
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Job Details Sidebar -->
        <div class="lg:col-span-1 order-2 lg:order-1">
          <div class="lg:sticky lg:top-24 space-y-6">
            <Card class="p-6">
              <div class="flex items-start gap-4 mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Briefcase class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-800">{job.title}</h2>
                  {#if job.department}
                    <p class="text-sm text-gray-500">{job.department}</p>
                  {/if}
                </div>
              </div>

              <div class="space-y-3 mb-6">
                {#if job.location}
                  <div class="flex items-center gap-3 text-gray-600">
                    <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <MapPin class="w-4 h-4 text-gray-500" />
                    </div>
                    <span class="text-sm">{job.location}</span>
                  </div>
                {/if}
                {#if job.job_type}
                  <div class="flex items-center gap-3 text-gray-600">
                    <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Clock class="w-4 h-4 text-gray-500" />
                    </div>
                    <span class="text-sm capitalize">{job.job_type}</span>
                  </div>
                {/if}
                {#if job.salary_min && job.salary_max}
                  <div class="flex items-center gap-3 text-gray-600">
                    <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <DollarSign class="w-4 h-4 text-gray-500" />
                    </div>
                    <span class="text-sm">${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}</span>
                  </div>
                {/if}
              </div>

              {#if job.requirements && job.requirements.length > 0}
                <div class="pt-4 border-t border-gray-100">
                  <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Required Skills</h3>
                  <div class="flex flex-wrap gap-2">
                    {#each job.requirements as req}
                      <span class="px-2.5 py-1 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                        {req.skill}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
            </Card>

            {#if job.description}
              <Card class="p-6">
                <h3 class="text-sm font-medium text-gray-700 mb-3">About this role</h3>
                <p class="text-sm text-gray-500 leading-relaxed line-clamp-8">{job.description}</p>
              </Card>
            {/if}
          </div>
        </div>

        <!-- Application Form -->
        <div class="lg:col-span-2 order-1 lg:order-2">
          <Card class="p-6 lg:p-8">
            <!-- Header -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-2">Apply for this Position</h2>
              <p class="text-gray-500">Fill out the form below to submit your application</p>
            </div>

            <!-- Progress Steps -->
            <div class="flex items-center justify-between mb-8 px-4">
              {#each steps as step, i}
                {@const StepIcon = step.icon}
                <div class="flex items-center">
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 {currentStep >= step.id ? 'bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-sm' : 'bg-gray-100'}">
                      {#if currentStep > step.id}
                        <CheckCircle class="w-6 h-6 text-white" />
                      {:else}
                        <StepIcon class="w-5 h-5 {currentStep >= step.id ? 'text-white' : 'text-gray-400'}" />
                      {/if}
                    </div>
                    <span class="mt-2 text-xs font-medium {currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'}">
                      {step.label}
                    </span>
                  </div>
                  {#if i < steps.length - 1}
                    <div class="w-16 lg:w-24 h-1 mx-2 rounded-full {currentStep > step.id ? 'bg-purple-500' : 'bg-gray-200'}"></div>
                  {/if}
                </div>
              {/each}
            </div>

            <!-- Step 1: Personal Info -->
            {#if currentStep === 1}
              <div class="space-y-5 animate-fade-in">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label for="first_name" class="text-gray-700">
                      First Name <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative mt-1.5">
                      <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="first_name"
                        bind:value={formData.first_name}
                        placeholder="John"
                        class="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label for="last_name" class="text-gray-700">
                      Last Name <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative mt-1.5">
                      <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="last_name"
                        bind:value={formData.last_name}
                        placeholder="Doe"
                        class="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label for="email" class="text-gray-700">
                      Email Address <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative mt-1.5">
                      <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        bind:value={formData.email}
                        placeholder="john@example.com"
                        class="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label for="phone" class="text-gray-700">Phone Number</Label>
                    <div class="relative mt-1.5">
                      <Phone class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        bind:value={formData.phone}
                        placeholder="+1 (555) 000-0000"
                        class="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label for="location" class="text-gray-700">Current Location</Label>
                    <div class="relative mt-1.5">
                      <MapPin class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        bind:value={formData.current_location}
                        placeholder="City, Country"
                        class="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label for="relocate" class="text-gray-700">Willing to Relocate?</Label>
                    <select
                      id="relocate"
                      bind:value={formData.willing_to_relocate}
                      class="mt-1.5 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label for="linkedin" class="text-gray-700">LinkedIn Profile</Label>
                    <div class="relative mt-1.5">
                      <Linkedin class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="linkedin"
                        type="url"
                        bind:value={formData.linkedin_url}
                        placeholder="https://linkedin.com/in/..."
                        class="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label for="portfolio" class="text-gray-700">Portfolio / Website</Label>
                    <div class="relative mt-1.5">
                      <Globe class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="portfolio"
                        type="url"
                        bind:value={formData.portfolio_url}
                        placeholder="https://..."
                        class="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Step 2: Experience -->
            {#if currentStep === 2}
              <div class="space-y-5 animate-fade-in">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label for="salary" class="text-gray-700">Expected Salary (Annual)</Label>
                    <div class="relative mt-1.5">
                      <Wallet class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="salary"
                        bind:value={formData.expected_salary}
                        placeholder="$80,000"
                        class="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label for="notice" class="text-gray-700">Notice Period</Label>
                    <div class="relative mt-1.5">
                      <CalendarClock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="notice"
                        bind:value={formData.notice_period}
                        placeholder="2 weeks / Immediate"
                        class="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label for="skills" class="text-gray-700">Your Skills</Label>
                  <p class="text-xs text-gray-500 mt-1 mb-2">List your relevant skills separated by commas</p>
                  <Textarea
                    id="skills"
                    bind:value={formData.skills}
                    placeholder="JavaScript, Python, React, Node.js, SQL, AWS..."
                    rows={4}
                  />
                </div>

                <div class="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div class="flex gap-3">
                    <Sparkles class="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-purple-800">Pro tip</p>
                      <p class="text-xs text-purple-600 mt-1">
                        Include skills that match the job requirements for better chances of selection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Step 3: Documents -->
            {#if currentStep === 3}
              <div class="space-y-6 animate-fade-in">
                <div>
                  <Label class="text-gray-700">
                    Resume / CV <span class="text-red-500">*</span>
                  </Label>
                  <div class="mt-2">
                    <label
                      class="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 {isDragging ? 'border-purple-500 bg-purple-50' : resumeFile ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'}"
                      ondragover={handleDragOver}
                      ondragleave={handleDragLeave}
                      ondrop={handleDrop}
                    >
                      {#if resumeFile}
                        <div class="text-center">
                          <div class="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                            <FileText class="w-8 h-8 text-emerald-600" />
                          </div>
                          <p class="text-gray-800 font-medium">{resumeFile.name}</p>
                          <p class="text-sm text-gray-500 mt-1">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <p class="text-xs text-purple-600 mt-3 font-medium">Click to change file</p>
                        </div>
                      {:else}
                        <div class="text-center">
                          <div class="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                            <Upload class="w-8 h-8 text-purple-600" />
                          </div>
                          <p class="text-gray-700 font-medium">
                            {isDragging ? 'Drop your file here' : 'Click or drag to upload'}
                          </p>
                          <p class="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
                        </div>
                      {/if}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        class="hidden"
                        onchange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <!-- Summary -->
                <div class="rounded-xl border border-gray-200 overflow-hidden">
                  <div class="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h3 class="font-semibold text-gray-800">Application Summary</h3>
                  </div>
                  <div class="p-5">
                    <dl class="grid sm:grid-cols-2 gap-4 text-sm">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <User class="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <dt class="text-xs text-gray-500">Full Name</dt>
                          <dd class="font-medium text-gray-800">{formData.first_name} {formData.last_name || '-'}</dd>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Mail class="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <dt class="text-xs text-gray-500">Email</dt>
                          <dd class="font-medium text-gray-800">{formData.email || '-'}</dd>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <MapPin class="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <dt class="text-xs text-gray-500">Location</dt>
                          <dd class="font-medium text-gray-800">{formData.current_location || '-'}</dd>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Wallet class="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <dt class="text-xs text-gray-500">Expected Salary</dt>
                          <dd class="font-medium text-gray-800">{formData.expected_salary || '-'}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>

                {#if !resumeFile}
                  <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div class="flex gap-3">
                      <FileText class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p class="text-sm font-medium text-amber-800">Resume required</p>
                        <p class="text-xs text-amber-600 mt-1">
                          Please upload your resume to complete your application.
                        </p>
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            {/if}

            <!-- Navigation -->
            <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {#if currentStep > 1}
                <Button variant="outline" onclick={prevStep}>
                  <ArrowLeft class="w-4 h-4" />
                  Back
                </Button>
              {:else}
                <div></div>
              {/if}

              {#if currentStep < 3}
                <Button onclick={nextStep} size="lg">
                  Continue
                  <ArrowRight class="w-4 h-4" />
                </Button>
              {:else}
                <Button onclick={handleSubmit} disabled={$applyMutation.isPending || !resumeFile} size="lg">
                  {#if $applyMutation.isPending}
                    Submitting...
                  {:else}
                    <Send class="w-4 h-4" />
                    Submit Application
                  {/if}
                </Button>
              {/if}
            </div>
          </Card>
        </div>
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="py-8 text-center">
    <p class="text-xs text-gray-400">
      Powered by HR Automation Platform
    </p>
  </footer>
</div>
