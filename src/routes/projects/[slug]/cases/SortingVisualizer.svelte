<!-- src/routes/projects/[slug]/cases/SortingVisualizer.svelte -->
<script lang="ts">
  import type { Project } from '$lib/projects/data';
  export let project: Project;
</script>

<div class="container">
  <!-- Hero -->
  <article class="case card">
    <header class="case-head">
      <h1>{project.title}</h1>
      <p class="stack">{project.stack.join(" · ")}</p>
    </header>

    <p class="short">{project.short}</p>

    {#if project.heroImage}
      <figure class="hero-media">
        <img src={project.heroImage} alt={`${project.title} main screen`} loading="lazy" />
        <figcaption>Interactive visualizations of multiple sorting algorithms with per-step animation.</figcaption>
      </figure>
    {/if}
  </article>

  <!-- Problem / Goal -->
  <section class="card section">
    <h2>Problem & Goal</h2>
    <p>
      Create an interactive tool to <strong>teach and compare sorting algorithms</strong> in real time.
      The app should visualize each comparison and swap, expose algorithm time complexity trade-offs, and let users
      tweak inputs.
    </p>
  </section>

  <!-- Solution -->
  <section class="card section">
    <h2>Solution</h2>
    <ul class="bullets">
      <li>
        Built with <strong>Python + Pygame</strong>, using <strong>generator functions</strong>
        (<code>yield</code>/<code>yield from</code>) so each algorithm can pause after every
        comparison/swap and the UI can render the step in real time.
      </li>
      <li>
        Implemented <strong>Bubble</strong>, <strong>Selection</strong>, <strong>Insertion</strong>,
        <strong>Merge</strong>, and <strong>Quick</strong> sort with consistent visual semantics:
        yellow = compare, red = swap, blue = pivot/write target.
      </li>
      <li>
        Added interactive controls: choose algorithm, array size, randomization, background color;
        press <strong>R</strong> to restart immediately without closing the window.
      </li>
    </ul>
  </section>

  <!-- Architecture -->
  <section class="card section">
    <h2>Architecture</h2>
    <div class="cols">
      <div>
        <h3>Modules</h3>
        <ul class="bullets">
          <li><code>algorithms.py</code> — generator-based implementations for each sort.</li>
          <li><code>utils.py</code> — helpers for drawing, color states, and array generation.</li>
          <li><code>main.py</code> — event loop, UI controls, and per-frame rendering.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Demo -->
  {#if project.gallery?.length}
    <section class="card section">
      <h2>Demo</h2>
      <p>Snapshots of different algorithms and states:</p>
      <div class="gallery">
        {#each project.gallery as img}
          <img src={img} alt="Sorting Visualizer screenshot" loading="lazy" />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Links -->
  <section class="links">
    <a href="/projects">← Back to Projects</a>
    {#if project.links.repo}
      <a href={project.links.repo} target="_blank" rel="noopener">Repo →</a>
    {/if}
    {#if project.links.live}
      <a href={project.links.live} target="_blank" rel="noopener">Live →</a>
    {/if}
  </section>
</div>

<style>
  .container { width: min(1100px, 92vw); margin: 0 auto; padding: 24px 0 40px; }

  .card { background:#151515; border:1px solid #222; border-left:3px solid #00bcd4; border-radius:10px; padding:18px 20px; }
  .case { margin-bottom: 16px; }

  .case-head h1 { margin:0 0 6px; font-size: clamp(1.9rem, 3.5vw, 2.6rem); color:#e6edf3; }
  .stack { color:#8b949e; margin:0; }
  .short { color:#b0b0b0; margin:.5rem 0 1rem; line-height:1.6; }

  .hero-media { margin: 10px 0 0; }
  .hero-media img { width: 100%; height: auto; display: block; border-radius: 8px; border: 1px solid #222; }
  .hero-media figcaption { color: #8b949e; font-size: .9rem; margin-top: .4rem; }

  .section { margin-top: 14px; }
  .section h2 { margin: 0 0 8px; font-size: 1.25rem; color: #e6edf3; }

  .bullets { margin: 0; padding-left: 1.1rem; }
  .bullets li { color:#b0b0b0; margin-bottom:.5rem; line-height:1.55; }

  .cols { display: grid; grid-template-columns: 1fr; gap: 12px; }
  @media (min-width: 800px) { .cols { grid-template-columns: 1fr 1fr; } }

  .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 8px; }
  .gallery img { width: 100%; height: auto; display: block; border-radius: 8px; border: 1px solid #222; }

  .links { display: flex; gap: 1.5rem; margin-top: 16px; flex-wrap: wrap; }
  .links a { color:#00bcd4; text-decoration:none; font-weight:600; }
  .links a:hover { text-decoration: underline; }
  
</style>
