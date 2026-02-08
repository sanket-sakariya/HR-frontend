<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.svelte';
  import { useLogin } from '$lib/api/queries/auth';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import { toast } from 'svelte-sonner';
  import { Mail, Lock, Sparkles } from 'lucide-svelte';

  let formData = $state({
    email: '',
    password: ''
  });

  let isSubmitting = $state(false);

  const loginMutation = useLogin();

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;

    try {
      const result = await $loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password
      });

      if (result.success && result.data) {
        authStore.setUserCredentials({
          user_id: result.data.user_id,
          username: result.data.username,
          email: result.data.email,
          workspace_id: result.data.workspace_id,
          access_token: result.data.access_token
        });

        toast.success('Welcome back!');
        goto('/dashboard');
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.message || 'Invalid email or password'
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
      <h1 class="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h1>
      <p class="text-slate-400">Sign in to your company account</p>
    </div>

    <!-- Form -->
    <form onsubmit={handleSubmit} class="card-executive p-8 space-y-6">
      <!-- Email -->
      <div>
        <Label for="email" required>Email Address</Label>
        <div class="relative">
          <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            id="email"
            type="email"
            bind:value={formData.email}
            placeholder="hr@company.com"
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
            class="pl-10"
          />
        </div>
      </div>

      <!-- Submit -->
      <Button type="submit" loading={isSubmitting} class="w-full">
        {#if isSubmitting}
          Signing in...
        {:else}
          Sign In
        {/if}
      </Button>

      <!-- Register Link -->
      <p class="text-center text-sm text-slate-400">
        Don't have an account?
        <a href="/register" class="text-royal-400 hover:text-royal-300 font-medium">
          Create one
        </a>
      </p>
    </form>
  </div>
</div>
