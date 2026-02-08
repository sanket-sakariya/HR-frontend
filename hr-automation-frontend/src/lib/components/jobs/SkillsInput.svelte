<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import { Plus, X } from 'lucide-svelte';

  interface Skill {
    skill: string;
    level: string;
    required: boolean;
  }

  interface Props {
    skills?: Skill[];
    onchange?: (skills: Skill[]) => void;
  }

  let { 
    skills = $bindable([]),
    onchange 
  }: Props = $props();

  let newSkill = $state('');
  let newLevel = $state('intermediate');

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  function addSkill() {
    if (newSkill.trim()) {
      skills = [...skills, { 
        skill: newSkill.trim(), 
        level: newLevel,
        required: true
      }];
      newSkill = '';
      newLevel = 'intermediate';
      onchange?.(skills);
    }
  }

  function removeSkill(index: number) {
    skills = skills.filter((_, i) => i !== index);
    onchange?.(skills);
  }

  function toggleRequired(index: number) {
    skills = skills.map((s, i) => 
      i === index ? { ...s, required: !s.required } : s
    );
    onchange?.(skills);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  }
</script>

<div class="space-y-4">
  <!-- Add new skill -->
  <div class="flex gap-3">
    <div class="flex-1">
      <Input
        bind:value={newSkill}
        placeholder="Add a skill (e.g., Python, React, SQL)"
        onkeydown={handleKeydown}
      />
    </div>
    <div class="w-40">
      <Select
        options={levels}
        bind:value={newLevel}
      />
    </div>
    <Button variant="secondary" onclick={addSkill}>
      <Plus class="w-4 h-4" />
    </Button>
  </div>

  <!-- Skills list -->
  {#if skills.length > 0}
    <div class="flex flex-wrap gap-2">
      {#each skills as skill, index}
        <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-obsidian-800 border border-slate-700">
          <button
            type="button"
            onclick={() => toggleRequired(index)}
            class={`w-2 h-2 rounded-full ${skill.required ? 'bg-success' : 'bg-slate-500'}`}
            title={skill.required ? 'Required' : 'Optional'}
          ></button>
          <span class="text-sm text-slate-200">{skill.skill}</span>
          <span class="text-xs text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">
            {skill.level}
          </span>
          <button
            type="button"
            onclick={() => removeSkill(index)}
            class="text-slate-500 hover:text-danger transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      {/each}
    </div>
    <p class="text-xs text-slate-500">
      Click the dot to toggle required/optional status
    </p>
  {:else}
    <p class="text-sm text-slate-500 text-center py-4 bg-obsidian-800/50 rounded-lg border border-dashed border-slate-700">
      No skills added yet. Add skills that candidates should have.
    </p>
  {/if}
</div>
