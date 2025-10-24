<script lang="ts">
  import { projects } from "$lib/projects/data";
  import { base, assets } from "$app/paths";
</script>

<div class="container">
  <section class="projects">
    <h3>Key Projects</h3>

    {#each projects as project}
      <div class="project-item">
        <div class="project-visual">
          {#if project.slug === 'reading-tracker'}
            <img src={`${assets}/images/reading-tracker/reading_tracker.png`} alt="Reading Tracker Preview" loading="lazy" />
          {:else if project.slug === 'skut-face'}
            <img src={`${assets}/images/skut-face/hero_skutface.png`} alt="Skut-Face Preview" loading="lazy" />
          {:else if project.slug === 'sorting-visualizer'}
            <img src={`${assets}/images/sorting-visualizer/hero_sorting.png`} alt="Sorting Visualizer Preview" loading="lazy" />
          {/if}
        </div>

        <div class="project-content">
          <h4>{project.title}</h4>
          <ul>
            {#each project.bullets as bullet}
              <li>{bullet}</li>
            {/each}
          </ul>
          <a href={`${base}/projects/${project.slug}`}>View Detail Page →</a>
        </div>
      </div>
    {/each}
  </section>
</div>

<style>
  .container {
    width: min(1100px, 92vw);
    margin: 0 auto;
    padding: 24px 0 40px;
  }

  .projects h3 {
    font-size: 1.5em;
    border-bottom: 2px solid #00bcd4;
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #e6edf3;
  }

  .project-item {
    display: flex;
    flex-direction: column;
    background: #151515;
    border-left: 3px solid #00bcd4;
    border-radius: 10px;
    margin-bottom: 30px;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .project-item:hover {
    transform: translateY(-3px);
  }

  @media (min-width: 700px) {
    .project-item {
      flex-direction: row;
      align-items: center;
      gap: 1.5rem;
    }
  }

  .project-visual {
    flex: 0 0 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0e0e0e;
    padding: 10px;
  }

  .project-visual img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #222;
  }

  .project-content {
    flex: 1;
    padding: 1rem 1.25rem;
  }

  h4 {
    font-size: 1.1em;
    margin-top: 0;
    margin-bottom: 5px;
    color: #e6edf3;
  }

  .project-content ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  .project-content li {
    margin-bottom: 8px;
    line-height: 1.4;
    color: #b0b0b0;
  }

  .project-content a {
    color: #00bcd4;
    font-weight: bold;
    margin-top: 10px;
    display: inline-block;
    text-decoration: none;
    transition: transform 0.2s ease-out;
  }

  .project-content a:hover {
    transform: translateX(4px);
    text-decoration: underline;
  }
</style>
