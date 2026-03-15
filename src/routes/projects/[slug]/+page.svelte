<!-- src/routes/projects/[slug]/+page.svelte -->
<script lang="ts">
  import type { Project, Slug } from '$lib/projects/data';

  import ReadingTracker from './cases/ReadingTracker.svelte';
  import SkutFace from './cases/SkutFace.svelte';
  import SortingVisualizer from './cases/SortingVisualizer.svelte';
  import CloudImageProcessorApi from './cases/CloudImageProcessorApi.svelte';

  export let data: { project: Project };
  const { project } = data;

  type CaseComponent = typeof ReadingTracker;

  const cases: Record<Slug, CaseComponent> = {
    'reading-tracker': ReadingTracker,
    'skut-face': SkutFace,
    'sorting-visualizer': SortingVisualizer,
    'cloud-image-processor-api': CloudImageProcessorApi
  };

  const Case = cases[project.slug];
</script>

{#if Case}
  <svelte:component this={Case} {project} />
{:else}
  <div class="container">
    <article class="card">
      <h1>Project not found</h1>
      <a href="/projects">← Back to Projects</a>
    </article>
  </div>
{/if}

<style>
  .container {
    width: min(1100px, 92vw);
    margin: 0 auto;
    padding: 24px 0 40px;
  }

  .card {
    background: #151515;
    border: 1px solid #222;
    border-left: 3px solid #00bcd4;
    border-radius: 10px;
    padding: 18px 20px;
  }
</style>
