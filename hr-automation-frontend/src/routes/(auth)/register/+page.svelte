<script lang="ts">
  import { goto } from '$app/navigation';
  import { useSignup } from '$lib/api/queries/auth';
  import { authStore } from '$lib/stores/auth.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import { toast } from 'svelte-sonner';
  import { User, Mail, Lock, Sparkles } from 'lucide-svelte';

  let formData = $state({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  let isSubmitting = $state(false);

  const signupMutation = useSignup();

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters');
      return;
    }

    isSubmitting = true;

    try {
      const result = await $signupMutation.mutateAsync({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (result.success && result.data) {
        // After signup, redirect to login page
        toast.success('Registration successful!', {
          description: 'Please sign in with your credentials'
        });

        goto('/login');
      }
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.message || 'Please try again'
      });
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <!-- Logo/Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-royal-600 to-royal-500 mb-4 shadow-lg shadow-royal-500/20">
        <Sparkles class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
      <p class="text-slate-400">Sign up to get started with HR Automation</p>
    </div>

    <!-- Form -->
    <form onsubmit={handleSubmit} class="card-executive p-8 space-y-6">
      <!-- Username -->
      <div>
        <Label for="username" required>Username</Label>
        <div class="relative">
          <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            id="username"
            bind:value={formData.username}
            placeholder="johndoe"
            required
            minlength={3}
            maxlength={100}
            class="pl-10"
          />
        </div>
        <p class="text-xs text-slate-500 mt-1">3-100 characters</p>
      </div>

      <!-- Email -->
      <div>
        <Label for="email" required>Email Address</Label>
        <div class="relative">
          <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            id="email"
            type="email"
            bind:value={formData.email}
            placeholder="john.doe@example.com"
            required
            class="pl-10"
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <Label for="password" required>Password</Label>
        <div class="relative">
          <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            id="password"
            type="password"
            bind:value={formData.password}
            placeholder="••••••••"
            required
            minlength={8}
            class="pl-10"
          />
        </div>
        <p class="text-xs text-slate-500 mt-1">Minimum 8 characters</p>
      </div>

      <!-- Confirm Password -->
      <div>
        <Label for="confirmPassword" required>Confirm Password</Label>
        <div class="relative">
          <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            id="confirmPassword"
            type="password"
            bind:value={formData.confirmPassword}
            placeholder="••••••••"
            required
            class="pl-10"
          />
        </div>
      </div>

      <!-- Submit -->
      <Button type="submit" loading={isSubmitting} class="w-full">
        {#if isSubmitting}
          Creating Account...
        {:else}
          Create Account
        {/if}
      </Button>

      <!-- Login Link -->
      <p class="text-center text-sm text-slate-400">
        Already have an account?
        <a href="/login" class="text-royal-400 hover:text-royal-300 font-medium">
          Sign in
        </a>
      </p>
    </form>
  </div>
</div>
