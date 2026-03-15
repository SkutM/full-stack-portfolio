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
            <img
              class="static"
              src={`${assets}/images/reading-tracker/reading_tracker.png`}
              alt="Reading Tracker Preview"
              loading="lazy"
            />
            <img
              class="animated"
              src={`${assets}/images/reading-tracker/U.gif`}
              alt="Reading Tracker Animated Preview"
              loading="lazy"
            />
          {:else if project.slug === 'skut-face'}
            <img
              class="static"
              src={`${assets}/images/skutface/skutface_login_page.png`}
              alt="Skut-Face Preview"
              loading="lazy"
            />
            <img
              class="animated"
              src={`${assets}/images/skutface/skutface_gif.gif`}
              alt="Skut-Face Animated Preview"
              loading="lazy"
            />
          {:else if project.slug === 'sorting-visualizer'}
            <img
              class="static"
              src={`${assets}/images/sorting-visualizer/merge_hero.png`}
              alt="Sorting Visualizer Preview"
              loading="lazy"
            />
            <img
              class="animated"
              src={`${assets}/images/sorting-visualizer/gif_sorting.gif`}
              alt="Sorting Visualizer Animated Preview"
              loading="lazy"
            />
          
            {:else if project.slug === 'cloud-image-processor-api'}
            <img
              src={`${assets}/images/cloudimage/cloudimgport01.png`}
              alt="Cloud Image Processor Architecture"
              loading="lazy"
            />

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

  /* --- Image hover swap --- */
  .project-visual {
    position: relative;
    flex: 0 0 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #0e0e0e; */
    padding: 10px;
    overflow: hidden;
  }

  .project-visual img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: opacity 0.2s ease;
    display: block;
    border-radius: 8px;
  }

  .project-visual img.animated {
    position: absolute; 
    inset: 0;                /* top:0; right:0; bottom:0; left:0 */
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  }

  .project-item:hover .project-visual img.static {
    opacity: 0;
  }

  .project-item:hover .project-visual img.animated {
    opacity: 1;
  }

  /* --- Content --- */
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

  .cloud-preview {
    width: 100%;
    min-height: 180px;
    border-radius: 8px;
    background:
      radial-gradient(circle at top, rgba(0, 188, 212, 0.18), transparent 45%),
      linear-gradient(180deg, #101416 0%, #0c0f11 100%);
    border: 1px solid #1f2a2f;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
  }

  .cloud-preview-inner {
    width: 100%;
    display: grid;
    gap: 10px;
  }

  .cloud-preview-inner span {
    display: block;
    text-align: center;
    color: #dbeef2;
    font-weight: 600;
    padding: 0.7rem 0.85rem;
    border-radius: 999px;
    border: 1px solid #294047;
    background: rgba(17, 24, 27, 0.95);
  }

</style>
