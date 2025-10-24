<script lang="ts">
  import type { Project } from '$lib/projects/data';
  export let project: Project;
  import { base, assets } from '$app/paths';
</script>

<div class="container">
  <!-- Hero -->
  <article class="case card">
    <header class="case-head">
      <h1>{project.title}</h1>
      <p class="stack">{project.stack.join(" · ")}</p>
    </header>

    <p class="short">{project.short}</p>

    <figure class="hero-media">
        <img src={`${assets}/images/skutface/skutface_login_page.png`}
            alt="Skutface login"
            loading="lazy" />
        <figcaption>SkutFace Login Screen</figcaption>
    </figure>

  </article>

  <!-- Problem / Goal -->
  <section class="card section">
    <h2>Problem & Goal</h2>
    <p>
      Build an authentication system that uses <strong>facial biometrics</strong> instead of passwords.
      The app should verify a user’s face, establish a secure session, and remain
      <strong>production-friendly</strong> (deployable and scalable).
    </p>
  </section>


  <!-- Solution -->
  <section class="card section">
    <h2>Solution</h2>
    <ul class="bullets">
      <li>
        Implemented with <strong>Flask</strong> and <strong>SQLAlchemy</strong>, using the
        <strong>DeepFace</strong> library and <strong>TensorFlow</strong> to generate and compare embeddings.
      </li>
      <li>
        Added <strong>JWT-based</strong> session management (access + refresh) with sensible expirations and
        secure cookie options for browser clients.
      </li>
      <li>
        Clean, responsive frontend (<strong>HTML/CSS/JS</strong>) with secure image upload flow,
        plus real-time feedback on verification.
      </li>
      <li>
        Containerized with <strong>Gunicorn</strong> for a production-ready server model and easier deployment.
      </li>
    </ul>
  </section>

    <figure class="gallery">
        <img src={`${assets}/images/skutface/skutface_gif.gif`}
            alt="Skutface login"
            loading="lazy" />
        <figcaption>SkutFace Register & Login Demo</figcaption>
    </figure>

  <!-- Architecture -->
  <section class="card section">
    <h2>Architecture</h2>
    <div class="cols">
      <div>
        <h3>Modules</h3>
        <ul class="bullets">
          <li><code>app.py</code> — Flask app factory, routes, and dependency wiring.</li>
          <li><code>models.py</code> — SQLAlchemy models (Users, Embeddings, Sessions).</li>
          <li><code>auth.py</code> — JWT issuance/refresh, guards, and cookie handling.</li>
          <li><code>face.py</code> — DeepFace/TensorFlow inference and threshold checks.</li>
          <li><code>config.py</code> — secret keys, thresholds, and environment config.</li>
        </ul>
      </div>
      <div>
        <h3>Security & Auth</h3>
        <ul class="bullets">
          <li>JWT access/refresh pair; short-lived access tokens, longer refresh tokens.</li>
          <li>HTTP-only, secure cookies; CSRF-safe refresh endpoint.</li>
          <li>Server-side verification thresholds tuned for reliable face matching.</li>
          <li>Rate limits and bounded upload sizes to mitigate abuse.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Demo / Gallery -->
  {#if project.gallery?.length}
    <section class="card section">
      <h2>Demo</h2>
      <p>Registration and login screens, verification states, and success flows:</p>
      <div class="gallery">
        {#each project.gallery as img}
          <img src={img} alt="Skut-Face screenshot" loading="lazy" />
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
.case {
  margin-bottom: 16px;
}

.case-head h1 {
  margin: 0 0 6px;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  color: #e6edf3;
}
.stack {
  color: #8b949e;
  margin: 0;
}
.short {
  color: #b0b0b0;
  margin: 0.5rem 0 1rem;
  line-height: 1.6;
}

/* === HERO IMAGE === */
.hero-media {
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
}
.hero-media img {
  width: 50%;
  height: auto;
  display: block;
  border-radius: 10px;
  border: 1px solid #222;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  object-fit: contain;
}
.hero-media figcaption {
  color: #8b949e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

/* === SECTION === */
.section {
  margin-top: 14px;
}
.section h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  color: #e6edf3;
}

/* === BULLETS === */
.bullets {
  margin: 0;
  padding-left: 1.1rem;
}
.bullets li {
  color: #b0b0b0;
  margin-bottom: 0.5rem;
  line-height: 1.55;
}

/* === COLUMNS === */
.cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 800px) {
  .cols {
    grid-template-columns: 1fr 1fr;
  }
}

/* === GALLERY === */
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 900px;
}
.gallery img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  border: 1px solid #222;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  object-fit: contain;
}
.gallery figcaption {
  color: #8b949e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

/* === LINKS === */
.links {
  display: flex;
  gap: 1.5rem;
  margin-top: 16px;
  flex-wrap: wrap;
}
.links a {
  color: #00bcd4;
  text-decoration: none;
  font-weight: 600;
}
.links a:hover {
  text-decoration: underline;
}

</style>
