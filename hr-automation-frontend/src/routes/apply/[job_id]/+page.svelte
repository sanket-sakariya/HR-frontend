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
    FileText
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = createJobQuery(jobId);
  const applyMutation = createApplyMutation();

  let currentStep = $state(1);
  let formData = $state({
    name: '',
    email: '',
    phone: '',
    current_position: '',
    experience_years: '',
    expected_salary: '',
    notice_period: '',
    location: '',
    linkedin_url: '',
    portfolio_url: '',
    cover_letter: '',
    skills: [] as string[]
  });

  let resumeFile = $state<File | null>(null);
  let submitted = $state(false);

  const job = $derived($jobQuery.data);

  async function handleSubmit() {
    if (!formData.name || !formData.email || !resumeFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Create form data for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('current_position', formData.current_position);
      submitData.append('experience_years', formData.experience_years);
      submitData.append('expected_salary', formData.expected_salary);
      submitData.append('notice_period', formData.notice_period);
      submitData.append('location', formData.location);
      submitData.append('linkedin_url', formData.linkedin_url);
      submitData.append('portfolio_url', formData.portfolio_url);
      submitData.append('cover_letter', formData.cover_letter);
      submitData.append('resume', resumeFile);
      submitData.append('job_id', jobId);

      await $applyMutation.mutateAsync({
        jobId,
        data: formData as any
      });

      submitted = true;
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  }

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      resumeFile = target.files[0];
    }
  }

  function nextStep() {
    if (currentStep < 3) currentStep++;
  }

  function prevStep() {
    if (currentStep > 1) currentStep--;
  }

  const steps = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Experience' },
    { id: 3, label: 'Documents' }
  ];
</script>

<svelte:head>
  <title>{job?.title || 'Apply'} | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950">
  <!-- Header -->
  <header class="bg-obsidian-900 border-b border-obsidian-800">
    <div class="max-w-5xl mx-auto px-4 py-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-lg bg-royal-600 flex items-center justify-center">
          <Building2 class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-obsidian-100">HR Automation</h1>
          <p class="text-sm text-obsidian-400">Career Opportunities</p>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-4 py-8">
    {#if $jobQuery.isLoading}
      <div class="space-y-6">
        <Skeleton class="h-48" />
        <Skeleton class="h-96" />
      </div>
    {:else if $jobQuery.error || !job}
      <Card class="p-8 text-center">
        <Briefcase class="w-12 h-12 mx-auto text-obsidian-500 mb-4" />
        <h2 class="text-xl font-semibold text-obsidian-100 mb-2">Job Not Found</h2>
        <p class="text-obsidian-400 mb-6">
          This job posting may have been removed or is no longer accepting applications.
        </p>
        <Button href="/">Browse Other Jobs</Button>
      </Card>
    {:else if submitted}
      <!-- Success State -->
      <Card class="p-12 text-center max-w-lg mx-auto">
        <div class="w-20 h-20 rounded-full bg-emerald-900/50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle class="w-10 h-10 text-emerald-400" />
        </div>
        <h2 class="text-2xl font-bold text-obsidian-100 mb-3">Application Submitted!</h2>
        <p class="text-obsidian-400 mb-6">
          Thank you for applying for the <strong class="text-obsidian-200">{job.title}</strong> position.
          We've received your application and will review it shortly.
        </p>
        <p class="text-sm text-obsidian-500 mb-8">
          You will receive a confirmation email at <strong class="text-obsidian-300">{formData.email}</strong>
        </p>
        <Button href="/">Browse More Jobs</Button>
      </Card>
    {:else}
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Job Details Sidebar -->
        <div class="lg:col-span-1">
          <Card class="p-6 sticky top-8">
            <h2 class="text-xl font-bold text-obsidian-100 mb-2">{job.title}</h2>
            
            <div class="space-y-3 text-sm text-obsidian-400 mb-6">
              {#if job.department}
                <div class="flex items-center gap-2">
                  <Building2 class="w-4 h-4" />
                  {job.department}
                </div>
              {/if}
              {#if job.location}
                <div class="flex items-center gap-2">
                  <MapPin class="w-4 h-4" />
                  {job.location}
                </div>
              {/if}
              {#if job.salary_min && job.salary_max}
                <div class="flex items-center gap-2">
                  <DollarSign class="w-4 h-4" />
                  ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                </div>
              {/if}
              {#if job.job_type}
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4" />
                  {job.job_type}
                </div>
              {/if}
            </div>

            {#if job.skills && job.skills.length > 0}
              <div class="mb-6">
                <h3 class="text-sm font-medium text-obsidian-300 mb-2">Required Skills</h3>
                <div class="flex flex-wrap gap-1">
                  {#each job.skills as skill}
                    <span class="px-2 py-1 text-xs bg-obsidian-700 text-obsidian-300 rounded">
                      {skill}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}

            {#if job.description}
              <div>
                <h3 class="text-sm font-medium text-obsidian-300 mb-2">Description</h3>
                <p class="text-sm text-obsidian-400 line-clamp-6">{job.description}</p>
              </div>
            {/if}
          </Card>
        </div>

        <!-- Application Form -->
        <div class="lg:col-span-2">
          <Card class="p-6">
            <h2 class="text-xl font-bold text-obsidian-100 mb-6">Apply for this Position</h2>

            <!-- Progress Steps -->
            <div class="flex items-center justify-between mb-8">
              {#each steps as step, i}
                <div class="flex items-center">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium {currentStep >= step.id ? 'bg-royal-600 text-white' : 'bg-obsidian-700 text-obsidian-400'}">
                      {#if currentStep > step.id}
                        <CheckCircle class="w-5 h-5" />
                      {:else}
                        {step.id}
                      {/if}
                    </div>
                    <span class="text-sm {currentStep >= step.id ? 'text-obsidian-100' : 'text-obsidian-500'}">
                      {step.label}
                    </span>
                  </div>
                  {#if i < steps.length - 1}
                    <div class="w-12 h-0.5 mx-4 {currentStep > step.id ? 'bg-royal-600' : 'bg-obsidian-700'}"></div>
                  {/if}
                </div>
              {/each}
            </div>

            <!-- Step 1: Personal Info -->
            {#if currentStep === 1}
              <div class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label for="name">Full Name *</Label>
                    <Input
                      id="name"
                      bind:value={formData.name}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label for="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      bind:value={formData.email}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label for="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      bind:value={formData.phone}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <Label for="location">Location</Label>
                    <Input
                      id="location"
                      bind:value={formData.location}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label for="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      bind:value={formData.linkedin_url}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <Label for="portfolio">Portfolio / Website</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      bind:value={formData.portfolio_url}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            {/if}

            <!-- Step 2: Experience -->
            {#if currentStep === 2}
              <div class="space-y-4">
                <div>
                  <Label for="position">Current Position</Label>
                  <Input
                    id="position"
                    bind:value={formData.current_position}
                    placeholder="Software Engineer at Company"
                  />
                </div>

                <div class="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label for="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      bind:value={formData.experience_years}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label for="salary">Expected Salary</Label>
                    <Input
                      id="salary"
                      bind:value={formData.expected_salary}
                      placeholder="$100,000"
                    />
                  </div>
                  <div>
                    <Label for="notice">Notice Period</Label>
                    <Input
                      id="notice"
                      bind:value={formData.notice_period}
                      placeholder="2 weeks"
                    />
                  </div>
                </div>

                <div>
                  <Label for="cover_letter">Cover Letter</Label>
                  <Textarea
                    id="cover_letter"
                    bind:value={formData.cover_letter}
                    placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                    rows={6}
                  />
                </div>
              </div>
            {/if}

            <!-- Step 3: Documents -->
            {#if currentStep === 3}
              <div class="space-y-6">
                <div>
                  <Label>Resume / CV *</Label>
                  <div class="mt-2">
                    <label
                      class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-obsidian-700 rounded-lg cursor-pointer hover:border-royal-500 hover:bg-obsidian-800/50 transition-colors"
                    >
                      {#if resumeFile}
                        <div class="text-center">
                          <FileText class="w-12 h-12 text-royal-400 mx-auto mb-2" />
                          <p class="text-obsidian-100 font-medium">{resumeFile.name}</p>
                          <p class="text-sm text-obsidian-500">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <p class="text-xs text-royal-400 mt-2">Click to change file</p>
                        </div>
                      {:else}
                        <div class="text-center">
                          <Upload class="w-12 h-12 text-obsidian-500 mx-auto mb-2" />
                          <p class="text-obsidian-300 font-medium">Click to upload your resume</p>
                          <p class="text-sm text-obsidian-500 mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
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
                <div class="bg-obsidian-800/50 rounded-lg p-4">
                  <h3 class="font-medium text-obsidian-100 mb-3">Application Summary</h3>
                  <dl class="grid sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt class="text-obsidian-500">Name</dt>
                      <dd class="text-obsidian-200">{formData.name || '-'}</dd>
                    </div>
                    <div>
                      <dt class="text-obsidian-500">Email</dt>
                      <dd class="text-obsidian-200">{formData.email || '-'}</dd>
                    </div>
                    <div>
                      <dt class="text-obsidian-500">Experience</dt>
                      <dd class="text-obsidian-200">{formData.experience_years || '0'} years</dd>
                    </div>
                    <div>
                      <dt class="text-obsidian-500">Expected Salary</dt>
                      <dd class="text-obsidian-200">{formData.expected_salary || '-'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            {/if}

            <!-- Navigation -->
            <div class="flex justify-between mt-8 pt-6 border-t border-obsidian-700">
              {#if currentStep > 1}
                <Button variant="outline" onclick={prevStep}>
                  Back
                </Button>
              {:else}
                <div></div>
              {/if}

              {#if currentStep < 3}
                <Button onclick={nextStep}>
                  Continue
                  <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
              {:else}
                <Button onclick={handleSubmit} disabled={$applyMutation.isPending}>
                  {$applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
                </Button>
              {/if}
            </div>
          </Card>
        </div>
      </div>
    {/if}
  </main>
</div>
