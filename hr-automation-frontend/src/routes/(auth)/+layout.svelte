<script lang="ts">
  let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50/30">
  {@render children()}
</div>
