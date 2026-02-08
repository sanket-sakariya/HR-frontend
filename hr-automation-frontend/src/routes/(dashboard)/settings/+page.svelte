<script lang="ts">
  import { authStore } from '$lib/stores/auth.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import { toast } from 'svelte-sonner';
  import {
    Settings,
    Bell,
    Lock,
    Globe,
    Palette,
    Mail,
    Shield,
    Key,
    Trash2,
    Save
  } from 'lucide-svelte';

  let activeTab = $state<'general' | 'notifications' | 'security' | 'api'>('general');

  // General settings
  let language = $state('en');
  let timezone = $state('UTC');
  let dateFormat = $state('MM/DD/YYYY');

  // Notification settings
  let emailNotifications = $state(true);
  let newCandidateAlert = $state(true);
  let interviewCompleteAlert = $state(true);
  let dailyDigest = $state(false);

  // Security settings
  let currentPassword = $state('');
  let newPassword = $state('');
  let confirmPassword = $state('');
  let twoFactorEnabled = $state(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (US)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'api', label: 'API Keys', icon: Key }
  ] as const;

  function saveGeneralSettings() {
    toast.success('General settings saved');
  }

  function saveNotificationSettings() {
    toast.success('Notification settings saved');
  }

  function changePassword() {
    if (!currentPassword || !newPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully');
    currentPassword = '';
    newPassword = '';
    confirmPassword = '';
  }

  function toggleTwoFactor() {
    twoFactorEnabled = !twoFactorEnabled;
    toast.success(twoFactorEnabled ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled');
  }

  function generateApiKey() {
    toast.success('New API key generated');
  }
</script>

<svelte:head>
  <title>Settings | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-obsidian-100">Settings</h1>
    <p class="text-obsidian-400 mt-1">Manage your account and application preferences</p>
  </div>

  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Sidebar -->
    <nav class="lg:w-56 flex-shrink-0">
      <Card class="p-2">
        <div class="space-y-1">
          {#each tabs as tab}
            <button
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left {activeTab === tab.id
                ? 'bg-royal-600 text-white'
                : 'text-obsidian-300 hover:bg-obsidian-700'}"
              onclick={() => activeTab = tab.id}
            >
              <svelte:component this={tab.icon} class="w-5 h-5" />
              {tab.label}
            </button>
          {/each}
        </div>
      </Card>
    </nav>

    <!-- Content -->
    <div class="flex-1">
      {#if activeTab === 'general'}
        <Card class="p-6">
          <h2 class="text-lg font-semibold text-obsidian-100 mb-6">General Settings</h2>
          
          <div class="space-y-6 max-w-md">
            <div>
              <Label for="language">Language</Label>
              <Select
                id="language"
                bind:value={language}
                options={languageOptions}
              />
            </div>

            <div>
              <Label for="timezone">Timezone</Label>
              <Select
                id="timezone"
                bind:value={timezone}
                options={timezoneOptions}
              />
            </div>

            <div>
              <Label for="dateFormat">Date Format</Label>
              <Select
                id="dateFormat"
                bind:value={dateFormat}
                options={dateFormatOptions}
              />
            </div>

            <Button onclick={saveGeneralSettings}>
              <Save class="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      {:else if activeTab === 'notifications'}
        <Card class="p-6">
          <h2 class="text-lg font-semibold text-obsidian-100 mb-6">Notification Preferences</h2>
          
          <div class="space-y-6">
            <div class="flex items-center justify-between py-3 border-b border-obsidian-700">
              <div>
                <p class="font-medium text-obsidian-100">Email Notifications</p>
                <p class="text-sm text-obsidian-400">Receive notifications via email</p>
              </div>
              <button
                class="relative w-12 h-6 rounded-full transition-colors {emailNotifications ? 'bg-royal-600' : 'bg-obsidian-700'}"
                onclick={() => emailNotifications = !emailNotifications}
              >
                <span
                  class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform {emailNotifications ? 'left-7' : 'left-1'}"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between py-3 border-b border-obsidian-700">
              <div>
                <p class="font-medium text-obsidian-100">New Candidate Alerts</p>
                <p class="text-sm text-obsidian-400">Get notified when new candidates apply</p>
              </div>
              <button
                class="relative w-12 h-6 rounded-full transition-colors {newCandidateAlert ? 'bg-royal-600' : 'bg-obsidian-700'}"
                onclick={() => newCandidateAlert = !newCandidateAlert}
              >
                <span
                  class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform {newCandidateAlert ? 'left-7' : 'left-1'}"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between py-3 border-b border-obsidian-700">
              <div>
                <p class="font-medium text-obsidian-100">Interview Complete Alerts</p>
                <p class="text-sm text-obsidian-400">Get notified when interviews are completed</p>
              </div>
              <button
                class="relative w-12 h-6 rounded-full transition-colors {interviewCompleteAlert ? 'bg-royal-600' : 'bg-obsidian-700'}"
                onclick={() => interviewCompleteAlert = !interviewCompleteAlert}
              >
                <span
                  class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform {interviewCompleteAlert ? 'left-7' : 'left-1'}"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between py-3">
              <div>
                <p class="font-medium text-obsidian-100">Daily Digest</p>
                <p class="text-sm text-obsidian-400">Receive a daily summary of activity</p>
              </div>
              <button
                class="relative w-12 h-6 rounded-full transition-colors {dailyDigest ? 'bg-royal-600' : 'bg-obsidian-700'}"
                onclick={() => dailyDigest = !dailyDigest}
              >
                <span
                  class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform {dailyDigest ? 'left-7' : 'left-1'}"
                ></span>
              </button>
            </div>

            <Button onclick={saveNotificationSettings}>
              <Save class="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      {:else if activeTab === 'security'}
        <div class="space-y-6">
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-obsidian-100 mb-6">Change Password</h2>
            
            <div class="space-y-4 max-w-md">
              <div>
                <Label for="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  bind:value={currentPassword}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <Label for="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  bind:value={newPassword}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label for="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  bind:value={confirmPassword}
                  placeholder="Confirm new password"
                />
              </div>

              <Button onclick={changePassword}>
                <Lock class="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>
          </Card>

          <Card class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-obsidian-100">Two-Factor Authentication</h2>
                <p class="text-sm text-obsidian-400 mt-1">Add an extra layer of security to your account</p>
              </div>
              <Button 
                variant={twoFactorEnabled ? 'destructive' : 'outline'}
                onclick={toggleTwoFactor}
              >
                <Shield class="w-4 h-4 mr-2" />
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </Card>

          <Card class="p-6 border-red-900/50">
            <h2 class="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
            <p class="text-sm text-obsidian-400 mb-4">
              Permanently delete your account and all associated data
            </p>
            <Button variant="destructive">
              <Trash2 class="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </Card>
        </div>
      {:else if activeTab === 'api'}
        <Card class="p-6">
          <h2 class="text-lg font-semibold text-obsidian-100 mb-6">API Keys</h2>
          
          <div class="space-y-6">
            <div class="bg-obsidian-800/50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-obsidian-200">Workspace ID</span>
                <button
                  class="text-xs text-royal-400 hover:text-royal-300"
                  onclick={() => {
                    navigator.clipboard.writeText(authStore.workspaceId || '');
                    toast.success('Copied to clipboard');
                  }}
                >
                  Copy
                </button>
              </div>
              <code class="text-sm text-obsidian-400 font-mono break-all">
                {authStore.workspaceId || 'Not set'}
              </code>
            </div>

            <div class="bg-obsidian-800/50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-obsidian-200">API Key</span>
                <button
                  class="text-xs text-royal-400 hover:text-royal-300"
                  onclick={() => {
                    toast.success('Copied to clipboard');
                  }}
                >
                  Copy
                </button>
              </div>
              <code class="text-sm text-obsidian-400 font-mono">
                ••••••••••••••••••••••••••••••••
              </code>
            </div>

            <div class="flex gap-3">
              <Button variant="outline" onclick={generateApiKey}>
                <Key class="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </div>

            <div class="bg-amber-900/20 border border-amber-900/50 rounded-lg p-4">
              <p class="text-sm text-amber-300">
                <strong>Warning:</strong> Generating a new API key will invalidate your existing key. Make sure to update your integrations.
              </p>
            </div>
          </div>
        </Card>
      {/if}
    </div>
  </div>
</div>
