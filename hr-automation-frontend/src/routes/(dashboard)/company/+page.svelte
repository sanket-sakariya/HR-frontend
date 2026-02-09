<script lang="ts">
  import { authStore } from '$lib/stores/auth.svelte';
  import { useCompany, useCompanies, createUpdateCompanyMutation, createRegisterCompanyMutation } from '$lib/api/queries/companies';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';

  // Company size options from API enum
  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1001+', label: '1000+ employees' }
  ];
  import {
    Building2,
    Globe,
    Mail,
    Phone,
    MapPin,
    Users,
    Calendar,
    Edit,
    Save,
    X,
    Upload
  } from 'lucide-svelte';

  // Fetch companies list to get companyId if not already in authStore
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

  const companyQuery = useCompany(companyId);
  const updateMutation = createUpdateCompanyMutation();
  const registerMutation = createRegisterCompanyMutation();

  let isEditing = $state(false);
  let formData = $state({
    company_name: '',
    description: '',
    industry: '',
    size: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: ''
  });

  const company = $derived($companyQuery.data);
  const hasCompany = $derived(!!company && !!company.company_id);

  // Sync form data with company data
  $effect(() => {
    if (company && !isEditing) {
      formData = {
        company_name: company.company_name || '',
        description: '',
        industry: company.industry || '',
        size: company.size || '',
        website: company.website || '',
        email: company.email || '',
        phone: company.phone || '',
        address: company.address?.street || '',
        city: company.address?.city || '',
        state: company.address?.state || '',
        country: company.address?.country || '',
        zip_code: company.address?.zip_code || ''
      };
    }
  });

  function startEditing() {
    isEditing = true;
  }

  function cancelEditing() {
    isEditing = false;
    // Reset form data
    if (company) {
      formData = {
        company_name: company.company_name || '',
        description: '',
        industry: company.industry || '',
        size: company.size || '',
        website: company.website || '',
        email: company.email || '',
        phone: company.phone || '',
        address: company.address?.street || '',
        city: company.address?.city || '',
        state: company.address?.state || '',
        country: company.address?.country || '',
        zip_code: company.address?.zip_code || ''
      };
    }
  }

  async function handleSave() {
    // Validate required fields
    if (!formData.company_name || !formData.email || !formData.industry || !formData.size) {
      toast.error('Please fill in all required fields', {
        description: 'Company name, email, industry, and size are required'
      });
      return;
    }

    try {
      if (hasCompany && companyId) {
        // Update existing company
        await $updateMutation.mutateAsync({
          companyId: companyId,
          payload: {
            company_name: formData.company_name,
            industry: formData.industry,
            size: formData.size,
            website: formData.website || undefined,
            phone: formData.phone || undefined,
            address: {
              street: formData.address || undefined,
              city: formData.city || undefined,
              state: formData.state || undefined,
              country: formData.country || undefined,
              zip_code: formData.zip_code || undefined
            }
          }
        });
        toast.success('Company profile updated successfully');
      } else {
        // Register new company (no password needed - user is already authenticated)
        const result = await $registerMutation.mutateAsync({
          company_name: formData.company_name,
          email: formData.email,
          industry: formData.industry,
          size: formData.size,
          website: formData.website || undefined,
          phone: formData.phone || undefined,
          address: {
            street: formData.address || undefined,
            city: formData.city || undefined,
            state: formData.state || undefined,
            country: formData.country || undefined,
            zip_code: formData.zip_code || undefined
          }
        });
        
        // Update auth store with new company ID
        if (result?.data?.company_id) {
          authStore.setCompany(result.data);
        }
        
        toast.success('Company registered successfully');
        // Refetch company data
        $companyQuery.refetch();
      }
      isEditing = false;
    } catch (error: any) {
      toast.error(hasCompany ? 'Failed to update company profile' : 'Failed to register company', {
        description: error.message || 'Please try again'
      });
    }
  }

  const isSaving = $derived($updateMutation.isPending || $registerMutation.isPending);
</script>

<svelte:head>
  <title>Company Profile | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-obsidian-100">Company Profile</h1>
      <p class="text-obsidian-400 mt-1">Manage your company information and settings</p>
    </div>

    {#if !isEditing}
      <Button variant="outline" onclick={startEditing}>
        <Edit class="w-4 h-4 mr-2" />
        Edit Profile
      </Button>
    {:else}
      <div class="flex gap-2">
        <Button variant="outline" onclick={cancelEditing}>
          <X class="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onclick={handleSave} disabled={isSaving}>
          <Save class="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    {/if}
  </div>

  {#if $companyQuery.isLoading}
    <div class="space-y-6">
      <Skeleton class="h-48" />
      <Skeleton class="h-64" />
    </div>
  {:else if $companyQuery.error || !hasCompany}
    <!-- No company exists yet - show create form -->
    {#if isEditing}
      <div class="space-y-6">
        <!-- Company Header Card -->
        <Card class="p-6">
          <div class="flex items-start gap-6">
            <!-- Logo -->
            <div class="relative">
              <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center">
                <Building2 class="w-12 h-12 text-white" />
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 space-y-4">
              <div>
                <Label for="company_name" required>Company Name</Label>
                <Input
                  id="company_name"
                  bind:value={formData.company_name}
                  placeholder="Enter company name"
                  class="text-xl font-bold"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label for="industry" required>Industry</Label>
                  <Input
                    id="industry"
                    bind:value={formData.industry}
                    placeholder="e.g. Technology"
                  />
                </div>
                <div>
                  <Label for="size" required>Company Size</Label>
                  <Select
                    id="size"
                    options={companySizeOptions}
                    bind:value={formData.size}
                    placeholder="Select company size"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Contact Section -->
          <Card class="p-6">
            <h3 class="text-lg font-semibold text-obsidian-100 mb-4">Contact Information</h3>
            <div class="space-y-4">
              <div>
                <Label for="email" required>Email</Label>
                <Input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <Label for="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  bind:value={formData.website}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label for="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  bind:value={formData.phone}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </Card>

          <!-- Address Section -->
          <Card class="p-6">
            <h3 class="text-lg font-semibold text-obsidian-100 mb-4">Address</h3>
            <div class="space-y-4">
              <div>
                <Label for="address">Street Address</Label>
                <Input
                  id="address"
                  bind:value={formData.address}
                  placeholder="123 Main Street"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label for="city">City</Label>
                  <Input
                    id="city"
                    bind:value={formData.city}
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <Label for="state">State</Label>
                  <Input
                    id="state"
                    bind:value={formData.state}
                    placeholder="CA"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label for="country">Country</Label>
                  <Input
                    id="country"
                    bind:value={formData.country}
                    placeholder="USA"
                  />
                </div>
                <div>
                  <Label for="zip_code">ZIP Code</Label>
                  <Input
                    id="zip_code"
                    bind:value={formData.zip_code}
                    placeholder="94102"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    {:else}
      <Card class="p-8 text-center">
        <Building2 class="w-12 h-12 mx-auto text-obsidian-500 mb-4" />
        <h3 class="text-lg font-medium text-obsidian-200 mb-2">No Company Profile</h3>
        <p class="text-obsidian-400 mb-4">Create your company profile to get started</p>
        <Button onclick={startEditing}>
          <Edit class="w-4 h-4 mr-2" />
          Create Company Profile
        </Button>
      </Card>
    {/if}
  {:else}
    <!-- Company Header Card -->
    <Card class="p-6">
      <div class="flex items-start gap-6">
        <!-- Logo -->
        <div class="relative">
          <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center">
            <Building2 class="w-12 h-12 text-white" />
          </div>
          {#if isEditing}
            <button class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-royal-600 text-white flex items-center justify-center hover:bg-royal-700 transition-colors">
              <Upload class="w-4 h-4" />
            </button>
          {/if}
        </div>

        <!-- Info -->
        <div class="flex-1">
          {#if isEditing}
            <Input
              bind:value={formData.company_name}
              placeholder="Company Name"
              class="text-xl font-bold mb-2"
            />
          {:else}
            <h2 class="text-2xl font-bold text-obsidian-100">{company?.company_name || 'Company Name'}</h2>
          {/if}
          
          <div class="flex flex-wrap gap-4 mt-3 text-sm text-obsidian-400">
            {#if company?.industry || isEditing}
              <span class="flex items-center gap-1">
                <Building2 class="w-4 h-4" />
                {isEditing ? formData.industry || 'Industry' : company?.industry || '-'}
              </span>
            {/if}
            {#if company?.address?.city || company?.address?.country || isEditing}
              <span class="flex items-center gap-1">
                <MapPin class="w-4 h-4" />
                {isEditing
                  ? `${formData.city || 'City'}, ${formData.country || 'Country'}`
                  : `${company?.address?.city || ''}, ${company?.address?.country || ''}`}
              </span>
            {/if}
            {#if company?.size || isEditing}
              <span class="flex items-center gap-1">
                <Users class="w-4 h-4" />
                {isEditing ? formData.size || 'Size' : company?.size || '-'} employees
              </span>
            {/if}
          </div>
        </div>
      </div>
    </Card>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- About Section -->
      <Card class="p-6">
        <h3 class="text-lg font-semibold text-obsidian-100 mb-4">Company Details</h3>
        {#if isEditing}
          <div class="space-y-4">
            <div>
              <Label for="industry">Industry</Label>
              <Input
                id="industry"
                bind:value={formData.industry}
                placeholder="e.g. Technology, Healthcare"
              />
            </div>
            <div>
              <Label for="size">Company Size</Label>
              <Select
                id="size"
                options={companySizeOptions}
                bind:value={formData.size}
                placeholder="Select company size"
              />
            </div>
          </div>
        {:else}
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-obsidian-400">Industry</span>
              <span class="text-obsidian-200">{company?.industry || '-'}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-obsidian-400">Company Size</span>
              <span class="text-obsidian-200">{company?.size || '-'}</span>
            </div>
          </div>
        {/if}
      </Card>

      <!-- Contact Section -->
      <Card class="p-6">
        <h3 class="text-lg font-semibold text-obsidian-100 mb-4">Contact Information</h3>
        {#if isEditing}
          <div class="space-y-4">
            <div>
              <Label for="website">Website</Label>
              <Input
                id="website"
                type="url"
                bind:value={formData.website}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                bind:value={formData.email}
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <Label for="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                bind:value={formData.phone}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        {:else}
          <div class="space-y-4">
            {#if company?.website}
              <div class="flex items-center gap-3">
                <Globe class="w-5 h-5 text-obsidian-500" />
                <a href={company.website} target="_blank" rel="noopener" class="text-royal-400 hover:underline">
                  {company.website}
                </a>
              </div>
            {/if}
            {#if company?.email}
              <div class="flex items-center gap-3">
                <Mail class="w-5 h-5 text-obsidian-500" />
                <a href="mailto:{company.email}" class="text-obsidian-300 hover:text-royal-400">
                  {company.email}
                </a>
              </div>
            {/if}
            {#if company?.phone}
              <div class="flex items-center gap-3">
                <Phone class="w-5 h-5 text-obsidian-500" />
                <a href="tel:{company.phone}" class="text-obsidian-300 hover:text-royal-400">
                  {company.phone}
                </a>
              </div>
            {/if}
            {#if !company?.website && !company?.email && !company?.phone}
              <p class="text-obsidian-500">No contact information provided.</p>
            {/if}
          </div>
        {/if}
      </Card>

      <!-- Address Section -->
      <Card class="p-6 lg:col-span-2">
        <h3 class="text-lg font-semibold text-obsidian-100 mb-4">Address</h3>
        {#if isEditing}
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <Label for="address">Street Address</Label>
              <Input
                id="address"
                bind:value={formData.address}
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <Label for="city">City</Label>
              <Input
                id="city"
                bind:value={formData.city}
                placeholder="San Francisco"
              />
            </div>
            <div>
              <Label for="state">State</Label>
              <Input
                id="state"
                bind:value={formData.state}
                placeholder="CA"
              />
            </div>
            <div>
              <Label for="country">Country</Label>
              <Input
                id="country"
                bind:value={formData.country}
                placeholder="USA"
              />
            </div>
            <div>
              <Label for="zip_code">ZIP Code</Label>
              <Input
                id="zip_code"
                bind:value={formData.zip_code}
                placeholder="94102"
              />
            </div>
          </div>
        {:else}
          <div class="flex items-start gap-3">
            <MapPin class="w-5 h-5 text-obsidian-500 mt-0.5" />
            <div class="text-obsidian-300">
              {#if company?.address?.street}<p>{company.address.street}</p>{/if}
              <p>
                {company?.address?.city || ''}{company?.address?.city && company?.address?.state ? ', ' : ''}{company?.address?.state || ''}
                {company?.address?.zip_code ? ` ${company.address.zip_code}` : ''}
              </p>
              {#if company?.address?.country}<p>{company.address.country}</p>{/if}
              {#if !company?.address?.street && !company?.address?.city && !company?.address?.country}
                <p class="text-obsidian-500">No address provided.</p>
              {/if}
            </div>
          </div>
        {/if}
      </Card>
    </div>
  {/if}
</div>
