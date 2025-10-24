<script lang="ts">
  import { projects } from "$lib/projects/data";
</script>

<div class="container">
  <section class="projects">
    <h3>Key Projects</h3>

    {#each projects as project}
      <div class="project-item">
        <h4>{project.title}</h4>
        <ul>
          {#each project.bullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
        <a href={`/projects/${project.slug}`}>View Detail Page →</a>
      </div>
    {/each}
  </section>
</div>

<style>
  /* Center the whole section and give breathing room */
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

  h4 {
    font-size: 1.1em;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #e6edf3;
  }

  .project-item {
    margin-top: 25px;
    padding: 1rem 1.25rem;
    background: #151515;
    border-left: 3px solid #00bcd4;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .project-item ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  .project-item li {
    margin-bottom: 8px;
    line-height: 1.4;
    color: #b0b0b0;
  }

  .project-item a {
    color: #00bcd4;
    font-weight: bold;
    margin-top: 10px;
    display: inline-block;
    text-decoration: none;
    transition: transform 0.2s ease-out;
  }

  .project-item a:hover {
    transform: translateX(4px);
    text-decoration: underline;
  }

</style>
