<script lang="ts">
  import { goto } from '$app/navigation';
  import { useCreateJobRequirement, useUpdateJobRequirement } from '$lib/api/queries/jobs';
  import { useCompanies } from '$lib/api/queries/companies';
  import { authStore } from '$lib/stores/auth.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import SkillsInput from './SkillsInput.svelte';
  import { toast } from 'svelte-sonner';
  import { Plus, X } from 'lucide-svelte';
  import type { JobRequirement, components } from '$lib/api/generated';

  interface Props {
    job?: JobRequirement;
    mode?: 'create' | 'edit';
  }

  let { job, mode = 'create' }: Props = $props();

  // Fetch companies to get companyId if not already in authStore
  const companiesQuery = useCompanies({ limit: 1 });
  
  // Get company ID from stored value OR from companies list
  const companyId = $derived(
    authStore.companyId || $companiesQuery.data?.data?.[0]?.company_id || null
  );

  // Update authStore when we get company from API
  $effect(() => {
    if (!authStore.companyId && $companiesQuery.data?.data?.[0]) {
      authStore.setCompany($companiesQuery.data.data[0]);
    }
  });

  let formData = $state({
    title: job?.title || '',
    description: job?.description || '',
    department: job?.department || '',
    location: job?.location || '',
    job_type: job?.job_type || 'full-time',
    requirements: job?.requirements || [],
    experience: {
      min_years: job?.experience?.min_years || 0,
      max_years: job?.experience?.max_years || 5,
      preferred: job?.experience?.preferred || 2
    },
    salary_range: {
      min: job?.salary_range?.min || 50000,
      max: job?.salary_range?.max || 100000
    },
    benefits: job?.benefits || [] as string[]
  });

  let newBenefit = $state('');
  let isSubmitting = $state(false);

  const createMutation = useCreateJobRequirement();
  const updateMutation = useUpdateJobRequirement();

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (formData.requirements.length === 0) {
      toast.error('Please add at least one skill requirement');
      return;
    }

    isSubmitting = true;

    try {
      const payload: components['schemas']['JobRequirementCreateRequest'] = {
        title: formData.title,
        description: formData.description,
        department: formData.department || undefined,
        location: formData.location || undefined,
        job_type: formData.job_type,
        requirements: formData.requirements,
        experience: formData.experience,
        salary_range: formData.salary_range,
        benefits: formData.benefits.length > 0 ? formData.benefits : undefined
      };

      if (mode === 'edit' && job) {
        await $updateMutation.mutateAsync({
          jobId: job.job_requirement_id,
          payload
        });
        toast.success('Job updated successfully');
      } else {
        if (!companyId) {
          toast.error('Company not found', {
            description: 'Please register your company first'
          });
          goto('/company');
          return;
        }
        await $createMutation.mutateAsync({
          companyId: companyId,
          payload
        });
        toast.success('Job created successfully');
      }

      goto('/jobs');
    } catch (error: any) {
      toast.error(mode === 'edit' ? 'Failed to update job' : 'Failed to create job', {
        description: error.message
      });
    } finally {
      isSubmitting = false;
    }
  }

  function addBenefit() {
    if (newBenefit.trim()) {
      formData.benefits = [...formData.benefits, newBenefit.trim()];
      newBenefit = '';
    }
  }

  function removeBenefit(index: number) {
    formData.benefits = formData.benefits.filter((_, i) => i !== index);
  }

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];
</script>

<form onsubmit={handleSubmit} class="space-y-8 max-w-4xl">
  <!-- Basic Info -->
  <div class="card-executive p-6 space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Basic Information</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-2">
        <Label for="title" required>Job Title</Label>
        <Input
          id="title"
          bind:value={formData.title}
          placeholder="e.g., Senior Software Engineer"
          required
        />
      </div>

      <div>
        <Label for="department">Department</Label>
        <Input
          id="department"
          bind:value={formData.department}
          placeholder="e.g., Engineering"
        />
      </div>

      <div>
        <Label for="location">Location</Label>
        <Input
          id="location"
          bind:value={formData.location}
          placeholder="e.g., Remote, New York, NY"
        />
      </div>

      <div>
        <Label for="job_type">Job Type</Label>
        <Select
          id="job_type"
          options={jobTypes}
          bind:value={formData.job_type}
        />
      </div>
    </div>

    <div>
      <Label for="description" required>Job Description</Label>
      <Textarea
        id="description"
        bind:value={formData.description}
        placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
        rows={6}
        required
      />
    </div>
  </div>

  <!-- Skills Requirements -->
  <div class="card-executive p-6 space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Skill Requirements</h3>
    <p class="text-sm text-slate-400">Add the skills and technologies required for this role</p>
    <SkillsInput 
      bind:skills={formData.requirements}
    />
  </div>

  <!-- Experience -->
  <div class="card-executive p-6 space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Experience Requirements</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label for="min_years">Minimum Years</Label>
        <Input
          id="min_years"
          type="number"
          bind:value={formData.experience.min_years}
        />
      </div>

      <div>
        <Label for="max_years">Maximum Years</Label>
        <Input
          id="max_years"
          type="number"
          bind:value={formData.experience.max_years}
        />
      </div>

      <div>
        <Label for="preferred">Preferred Years</Label>
        <Input
          id="preferred"
          type="number"
          bind:value={formData.experience.preferred}
        />
      </div>
    </div>
  </div>

  <!-- Salary & Benefits -->
  <div class="card-executive p-6 space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Compensation</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label for="salary_min">Minimum Salary (USD)</Label>
        <Input
          id="salary_min"
          type="number"
          bind:value={formData.salary_range.min}
        />
      </div>

      <div>
        <Label for="salary_max">Maximum Salary (USD)</Label>
        <Input
          id="salary_max"
          type="number"
          bind:value={formData.salary_range.max}
        />
      </div>
    </div>

    <div>
      <Label>Benefits</Label>
      <div class="flex gap-2 mb-3">
        <Input
          bind:value={newBenefit}
          placeholder="Add a benefit (e.g., Health Insurance)"
          onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
        />
        <Button type="button" variant="secondary" onclick={addBenefit}>
          <Plus class="w-4 h-4" />
        </Button>
      </div>

      {#if formData.benefits.length > 0}
        <div class="flex flex-wrap gap-2">
          {#each formData.benefits as benefit, index}
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-slate-700 text-sm text-slate-300">
              {benefit}
              <button
                type="button"
                onclick={() => removeBenefit(index)}
                class="text-slate-500 hover:text-danger"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </span>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Actions -->
  <div class="flex justify-end gap-4">
    <Button type="button" variant="ghost" onclick={() => goto('/jobs')}>
      Cancel
    </Button>
    <Button type="submit" loading={isSubmitting}>
      {mode === 'edit' ? 'Update Job' : 'Create Job'}
    </Button>
  </div>
</form>
