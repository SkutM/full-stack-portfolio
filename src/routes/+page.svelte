<!-- src/routes/+page.svelte (Home refined) -->

<script lang="ts">
  // no imports needed
</script>

<div class="container">
  <section class="hero">
    <h1>Scott Miller</h1>
    <p class="role">Full-Stack Developer</p>
    <p class="tagline">
        I develop full-stack applications with <strong>SvelteKit/TypeScript</strong> on the frontend and
    <strong>FastAPI/SQLAlchemy</strong> on the backend — secure, maintainable, and production-ready.
    </p>


    <div class="links">
      <a href="mailto:ssm011403@gmail.com">ssm011403@gmail.com</a>
      <span class="dot">•</span>
      <a href="https://www.linkedin.com/in/scott-miller-90456b2b7" target="_blank" rel="noopener">LinkedIn</a>
      <span class="dot">•</span>
      <a href="https://github.com/SkutM" target="_blank" rel="noopener">GitHub</a>
    </div>
  </section>

  <section class="highlights card">
    <h2>What I Work With</h2>
    <ul class="stack">
      <li>SvelteKit · TypeScript · HTML/CSS</li>
      <li>FastAPI · SQLAlchemy · Alembic · Pydantic</li>
      <li>JWT auth · REST APIs · Git/GitHub</li>
    </ul>

    <p class="blurb">
      Recently: shipped a JWT-secured Reading Tracker (Vite proxy + Alembic migrations) and
      a DeepFace/TensorFlow facial auth prototype (Flask + Gunicorn).
    </p>
  </section>
</div>

<style>
  /* Center content and control width */
  .container {
    width: min(1100px, 92vw);
    margin: 0 auto;
    padding: 24px 0 40px;
  }

  /* Hero */
  .hero { margin: 8px 0 24px; }
  .hero h1 { margin: 0 0 6px; font-size: clamp(2rem, 4vw, 3rem); }
  .role { color: #b0b0b0; margin: 0 0 12px; font-size: 1.1rem; }

  .tagline {
    max-width: 60ch;
    line-height: 1.6;
    color: #b0b0b0;
    margin: 0;
  }
  .tagline strong { font-weight: 600; color: #e6edf3; }

  .links {
    margin-top: 14px;
    display: flex; flex-wrap: wrap; align-items: center;
    gap: .5rem .75rem;
  }
  .links a { color: #00bcd4; font-weight: 500; text-decoration: none; }
  .links a:hover { color: #fff; text-decoration: underline; }
  .links .dot { color: #444; }

  /* Card/section */
  .card {
    background: #151515;
    border: 1px solid #222;
    border-left: 3px solid #00bcd4;
    border-radius: 10px;
    padding: 16px 18px;
  }

  .highlights { margin-top: 18px; }
  .highlights h2 { margin: 0 0 10px; color: #e6edf3; font-size: 1.25rem; }

  .stack {
    list-style: none; padding: 0; margin: 0 0 10px;
    color: #b0b0b0; display: grid; gap: 6px;
  }

  .blurb { margin: 0; color: #8b949e; font-size: .95rem; }
</style>
