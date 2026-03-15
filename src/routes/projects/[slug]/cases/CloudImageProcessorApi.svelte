<script lang="ts">
  import type { Project } from '$lib/projects/data';
  import { assets } from '$app/paths';

  export let project: Project;
</script>

<div class="container">
  <!-- Hero -->
  <article class="case card">
    <header class="case-head">
      <h1>{project.title}</h1>
      <p class="stack">{project.stack.join(' · ')}</p>
    </header>

    <p class="short">{project.short}</p>

    <div class="cta-row">
      {#if project.links.repo}
        <a class="btn ghost" href={project.links.repo} target="_blank" rel="noopener">Repo</a>
      {/if}
      {#if project.links.live}
        <a class="btn ghost" href={project.links.live} target="_blank" rel="noopener">Project Live</a>
      {/if}
    </div>

    <figure class="hero-media">
      <img
        src={`${assets}/images/cloudimage/cloudimgport01.png`}
        alt="Cloud Image Processor architecture diagram"
        loading="lazy"
      />
      <figcaption>Cloud Image Processor API Architecture</figcaption>
    </figure>
  </article>

  <!-- Problem & Goal -->
  <section class="card section">
    <h2>Problem & Goal</h2>
    <p>
      The goal was to build a <strong>backend-focused, cloud-style media service</strong> that goes beyond a
      standard CRUD app. I wanted a system that could accept image uploads, store file objects separately from
      relational metadata, process thumbnails asynchronously, and expose the workflow through clear REST endpoints.
    </p>
  </section>

  <!-- Solution -->
  <section class="card section">
    <h2>Solution</h2>
    <ul class="bullets">
      <li>
        <strong>FastAPI upload pipeline:</strong> accepts image uploads, validates requests, stores metadata,
        and coordinates processing through a clean API layer.
      </li>
      <li>
        <strong>Storage separation:</strong> original files and generated variants live in
        <strong>S3-compatible object storage</strong>, while relational metadata is tracked in
        <strong>Postgres</strong>.
      </li>
      <li>
        <strong>Async thumbnail generation:</strong> processing work is pushed to
        <strong>Redis + RQ workers</strong> so uploads stay responsive and the system reflects a more
        production-style architecture.
      </li>
      <li>
        <strong>Containerized infrastructure:</strong> the API, worker, Redis, and Postgres all run together
        through <strong>Docker Compose</strong> in a reproducible local environment.
      </li>
      <li>
        <strong>Extensible variant model:</strong> the service supports multiple image versions such as
        <code>original</code> and <code>thumbnail</code>, making future resize or conversion pipelines easier to add.
      </li>
    </ul>

    <div class="updates">
      <strong>Key backend focus:</strong> this project emphasizes async processing, service separation,
      object storage, and production-style infrastructure rather than front-end product UX.
    </div>
  </section>

  <!-- Architecture -->
  <section class="card section">
    <h2>Architecture</h2>

    <div class="cols">
      <div>
        <h3>System Overview</h3>
        <ul class="bullets">
          <li>
            <strong>FastAPI</strong> handles request validation, routing, orchestration, and response shaping.
          </li>
          <li>
            <strong>Postgres</strong> stores image metadata and variant records.
          </li>
          <li>
            <strong>S3-compatible object storage</strong> stores originals and generated thumbnails.
          </li>
          <li>
            <strong>Redis + RQ</strong> handle the background job queue and worker processing.
          </li>
          <li>
            <strong>Docker Compose</strong> ties the services together into a realistic local multi-service environment.
          </li>
        </ul>
      </div>

      <div>
        <h3>Image Pipeline</h3>
        <ul class="bullets">
          <li><strong>POST /images</strong> receives the uploaded file.</li>
          <li>The original image is stored in object storage.</li>
          <li>A metadata record is created in Postgres.</li>
          <li>A thumbnail generation job is enqueued in Redis.</li>
          <li>The RQ worker processes the job and uploads the thumbnail.</li>
          <li><strong>GET /images/{'{id}'}</strong> returns metadata, variants, and retrievable URLs.</li>
        </ul>
      </div>
    </div>

    <div style="margin-top:12px;">
      <h3>Request Flow</h3>
      <pre style="white-space:pre-wrap; margin:0; color:#b0b0b0;">
Client → POST /images → FastAPI
       → store original in S3-compatible storage
       → create DB record in Postgres
       → enqueue thumbnail job in Redis

Worker → consume job from queue
       → generate thumbnail
       → upload thumbnail to storage
       → update image_variants metadata

Client → GET /images/{'{id}'}
       → FastAPI returns metadata + original URL + thumbnail URL
      </pre>
    </div>
  </section>

  <!-- API Surface -->
  <section class="card section">
    <h2>Key Endpoints</h2>

    <div class="cols">
      <div>
        <h3>Core Endpoints</h3>
        <ul class="bullets">
          <li><code>POST /images</code> — upload an image and enqueue thumbnail generation.</li>
          <li><code>GET /images/{'{id}'}</code> — fetch metadata, variants, and asset URLs.</li>
          <li><code>GET /images</code> — list uploaded images with pagination and ordering.</li>
        </ul>
      </div>

      <div>
        <h3>Data Model</h3>
        <ul class="bullets">
          <li><code>images</code> table for core metadata.</li>
          <li><code>image_variants</code> table for original and derived asset records.</li>
          <li>Presigned or retrievable storage URLs for file access.</li>
          <li>Explicit support for multiple image versions per upload.</li>
        </ul>
      </div>
    </div>
  </section>
</div>

<style>
  .container { width: min(1100px, 92vw); margin: 0 auto; padding: 24px 0 40px; }

  .card {
    background: #151515;
    border: 1px solid #222;
    border-left: 3px solid #00bcd4;
    border-radius: 10px;
    padding: 18px 20px;
  }

  .case { margin-bottom: 16px; }
  .case-head h1 { margin: 0 0 6px; font-size: clamp(1.9rem, 3.5vw, 2.6rem); color: #e6edf3; }
  .stack { color: #8b949e; margin: 0; }
  .short { color: #b0b0b0; margin: .5rem 0 1rem; line-height: 1.6; }

  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 10px 0 4px; }
  .cta-row .btn { flex: 0 0 auto; }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    border: 1px solid transparent;
  }

  .btn.ghost { color: #00bcd4; border-color: #1f2a33; background: #0e1519; }
  .btn.ghost:hover { border-color: #2b3a46; background: #0f1920; }

  .hero-media { display: flex; flex-direction: column; align-items: center; margin: 10px 0 0; }
  .hero-media img { width: 100%; height: auto; display: block; border-radius: 8px; border: 1px solid #222; }
  .hero-media figcaption { color: #8b949e; font-size: .9rem; margin-top: .4rem; text-align: center; }

  .section { margin-top: 14px; }
  .section h2 { margin: 0 0 8px; font-size: 1.25rem; color: #e6edf3; }

  .updates {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    background: #10171b;
    border: 1px solid #22323c;
    color: #b7c4cc;
  }

  .bullets { margin: 0; padding-left: 1.1rem; }
  .bullets li { color: #b0b0b0; margin-bottom: .5rem; line-height: 1.55; }

  .cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .cols h3 {
    margin: 0 0 8px;
    color: #e6edf3;
    font-size: 1rem;
  }

  code {
    background: #0e1519;
    border: 1px solid #1f2a33;
    border-radius: 6px;
    padding: 1px 6px;
    color: #d6f7fb;
    font-size: .95em;
  }

  p {
    color: #b0b0b0;
    line-height: 1.6;
  }

  @media (max-width: 800px) {
    .cols {
      grid-template-columns: 1fr;
    }
  }
</style>
