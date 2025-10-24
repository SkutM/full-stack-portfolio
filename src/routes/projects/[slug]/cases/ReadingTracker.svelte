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
        <img src={`${assets}/images/reading-tracker/reading_tracker.png`}
            alt="Reading Tracker"
            loading="lazy" />
        <figcaption>Reading Tracker Display</figcaption>
    </figure>
    </article>

    <!-- Problem & Solution -->
    <section class="card section">
    <h2>Problem & Goal</h2>
    <p>
        The goal was to build a <strong>secure, production-grade full-stack application</strong> that enforces
        strict data isolation while handling reflective reading records efficiently. This required integrating
        two distinct technology stacks — <strong>SvelteKit</strong> and <strong>FastAPI</strong> — and resolving
        critical communication issues between them.
    </p>
    <p>
        The solution connects both via a <strong>Vite Proxy</strong> for seamless development and a
        <strong>Svelte store</strong> to persist authentication state, achieving a smooth, secure user flow.
    </p>
    </section>

    <!-- Solution -->
    <section class="card section">
    <h2>Solution</h2>
    <ul class="bullets">
        <li>
        <strong>Secure full-stack auth:</strong> SvelteKit frontend + FastAPI backend with JWT
        (access/refresh) to enforce <em>per-user data ownership</em>.
        </li>
        <li>
        <strong>Reliable cross-service comms:</strong> Vite proxy for development to bypass CORS and
        absolute-path fixes in <strong>Alembic</strong> migrations for consistent DB mapping across environments.
        </li>
        <li>
        <strong>Safe partial updates:</strong> <strong>Pydantic</strong> + <strong>SQLAlchemy</strong> with
        <code>exclude_unset=True</code> prevents overwriting unspecified fields during PATCH/PUT.
        </li>
        <li>
        <strong>Centralized external API:</strong> Backend service fetches Open Library covers and persists
        normalized data, keeping API keys and logic off the client.
        </li>
        <li>
        <strong>Polished UX:</strong> Svelte store persists auth state; a 3D CSS card-flip reveals private
        reflections; prefetch keeps common actions snappy.
        </li>
    </ul>

    </section>
        <figure class="gallery">
        <img src={`${assets}/images/reading-tracker/readingtracker_gif.gif`}
            alt="Reading Tracker gif"
            loading="lazy" />
        <figcaption>Reading Tracker Register/Login & CRUD</figcaption>
    </figure>

    <!-- Architecture -->
    <section class="card section">
    <h2>Architecture</h2>

    <!-- High-level system view -->
    <div class="cols">
        <div>
        <h3>System Overview</h3>
        <ul class="bullets">
            <li><strong>SvelteKit ↔ FastAPI</strong> pairing: SvelteKit handles routes/UI and state; FastAPI exposes REST for auth/CRUD.</li>
            <li><strong>Vite Proxy</strong> in dev: forwards <code>/api</code> requests to FastAPI to bypass CORS and keep DX smooth.</li>
            <li><strong>JWT Auth</strong> end-to-end: access/refresh tokens with guarded routes and per-user data isolation.</li>
            <li><strong>Alembic</strong> migrations keep schema changes consistent across environments.</li>
        </ul>
        </div>

        <div>
        <h3>Data & Auth Pipeline</h3>
        <ul class="bullets">
            <li><strong>Login/Register</strong> → server verifies credentials/embeddings → issues JWT pair.</li>
            <li><strong>Auth store</strong> persists token; all CRUD requests include bearer token automatically.</li>
            <li><strong>Pydantic + SQLAlchemy</strong> models; safe partial updates via <code>exclude_unset=True</code>.</li>
            <li><strong>Open Library API</strong> used server-side to fetch/attach cover images during book creation.</li>
        </ul>
        </div>
    </div>

    <!-- Modules: Backend vs Frontend -->
    <div class="cols" style="margin-top:12px;">
        <div>
        <h3>Backend (FastAPI)</h3>
        <ul class="bullets">
            <li><strong><code>main.py</code></strong> — App factory, CORS, routers, and /books CRUD (create/list/read/update/delete) behind auth.</li>
            <li><strong><code>auth_routes.py</code></strong> — <code>/auth/register</code>, <code>/auth/login</code>, and profile endpoints; issues/validates JWT.</li>
            <li><strong><code>jwt_utils.py</code></strong> — create/decode tokens; <code>get_current_user</code> dependency for protecting routes.</li>
            <li><strong><code>auth_models.py</code></strong> / <strong><code>models.py</code></strong> — SQLAlchemy models for <code>User</code> and <code>Book</code>.</li>
            <li><strong><code>auth_schemas.py</code></strong> / <strong><code>schemas.py</code></strong> — Pydantic DTOs (requests/responses), <code>from_attributes</code> for ORM.</li>
            <li><strong><code>database.py</code></strong> — engine/session (<code>SessionLocal</code>), shared <code>Base</code>, dependency <code>get_db</code>.</li>
            <li><strong><code>config.py</code></strong> — settings (secrets, JWT algorithm/expirations, DB path); <strong><code>env.py</code></strong> — Generates Alembic migration scripts for database table creation and schema updates.</li>
        </ul>
        </div>

        <div>
        <h3>Frontend (SvelteKit)</h3>
        <ul class="bullets">
            <li><strong><code>+layout.svelte</code></strong> — App shell (header/nav), dark theme, consistent page frame.</li>
            <li><strong><code>+page.svelte</code></strong> — Landing/CTA with prefetch for seamless route changes.</li>
            <li><strong><code>authStore.ts</code></strong> — Central store for token + user; <code>login()</code>/<code>logout()</code>; persists across reloads.</li>
            <li><strong><code>types.ts</code></strong> — Shared DTO/types (e.g., <code>User</code>, <code>Book</code>, <code>LoginResponse</code>) for type-safe components.</li>
            <li><strong><code>LoginForm.svelte</code></strong> / <strong><code>RegisterForm.svelte</code></strong> — Auth flows with inline validation and error display.</li>
            <li><strong><code>BookManager.svelte</code></strong> — Authorized CRUD UI: list/filter/create/edit/delete with cover-fetch status feedback.</li>
        </ul>
        </div>
    </div>

    <!-- Optional: request flow diagram -->
    <div style="margin-top:12px;">
        <h3>Request Flow</h3>
        <pre style="white-space:pre-wrap; margin:0; color:#b0b0b0;">
    Client → <strong>Login/Register</strong> → FastAPI (<strong>JWT</strong>) → <strong>authStore</strong> saves token
    Client (Bearer) → <strong>/books</strong> CRUD → FastAPI (Pydantic/SQLAlchemy, <code>exclude_unset=True</code>)
    Open Library fetch (server) → persist cover URL → response → UI updates
        </pre>
    </div>
    </section>

    <!-- === DEMO (CRUD) === -->
    <section class="section">
        <h2>Demo — Full CRUD</h2>

        <div class="demo-grid">
            <figure>
            <img
                src={`${assets}/images/reading-tracker/C.gif`}
                alt="Create a new book entry"
                loading="lazy"
            />
            <figcaption><strong>Create</strong> — Add a new book (title, author, review, recommendation).</figcaption>
            </figure>

            <figure>
            <img
                src={`${assets}/images/reading-tracker/R.gif`}
                alt="Read — list and filter books"
                loading="lazy"
            />
            <figcaption><strong>Read</strong> — Browse your library.</figcaption>
            </figure>

            <figure>
            <img
                src={`${assets}/images/reading-tracker/U.gif`}
                alt="Update book progress and notes"
                loading="lazy"
            />
            <figcaption><strong>Update</strong> — Edit reviews, recommendations, and notes.</figcaption>
            </figure>

            <figure>
            <img
                src={`${assets}/images/reading-tracker/D.gif`}
                alt="Delete a book entry"
                loading="lazy"
            />
            <figcaption><strong>Delete</strong> — Remove an entry (with confirmation).</figcaption>
            </figure>
        </div>
    </section>

    



  <!-- Links -->
    <section class="links">
    <a href="{base}/projects">← Back to Projects</a>
    {#if project.links.repo}
        <a href={project.links.repo} target="_blank" rel="noopener">Repo →</a>
    {/if}
    {#if project.links.live}
        <a href={project.links.live} target="_blank" rel="noopener">Live →</a>
    {/if}
    </section>
</div>

<style>
/* === GALLERY === */
.hero-media {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-media img {
  display: block;
  max-width: 75%;
  height: auto;
  border-radius: 10px;
}

.hero-media figcaption {
  text-align: center;
  font-size: 0.95rem;
  color: #8b949e;
  margin-top: 0.5rem;
}
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

/* === TWO-COLUMN GRID === */
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

/* === CRUD DEMO GRID === */
.demo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 10px;
}
@media (min-width: 800px) {
  .demo-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.demo-grid figure {
  margin: 0;
}
.demo-grid img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  border: 1px solid #222;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  object-fit: contain;
}
.demo-grid figcaption {
  color: #8b949e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

    .container { width: min(1100px, 92vw); margin: 0 auto; padding: 24px 0 40px; }

    .card {
    background:#151515;
    border:1px solid #222;
    border-left:3px solid #00bcd4;
    border-radius:10px;
    padding:18px 20px;
    }

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

    .links { display: flex; gap: 1.5rem; margin-top: 16px; flex-wrap: wrap; }
    .links a { color:#00bcd4; text-decoration:none; font-weight:600; }
    .links a:hover { text-decoration: underline; }
</style>
