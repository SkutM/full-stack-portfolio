<script lang="ts">
  import type { Project } from '$lib/projects/data';
  export let project: Project;
  import { base, assets } from '$app/paths';
// +page.svelte (or the component file)
import { tick } from 'svelte';

function scrollOnOpen(node: HTMLDetailsElement) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const doScroll = () => {
    node.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  const onToggle = async () => {
    if (!node.open) return;
    await tick();                 // wait for DOM to update
    requestAnimationFrame(doScroll);
  };

  // re-scroll if images finish loading and push content down
  const onImgLoad = () => node.open && doScroll();
  const imgs = node.querySelectorAll('img');

  node.addEventListener('toggle', onToggle);
  imgs.forEach(img => img.addEventListener('load', onImgLoad));

  return {
    destroy() {
      node.removeEventListener('toggle', onToggle);
      imgs.forEach(img => img.removeEventListener('load', onImgLoad));
    }
  };
}

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
      <a
        class="btn primary"
        href="https://reading-tracker-omega.vercel.app/feed"
        target="_blank"
        rel="noopener"
      >🚀 Try it out</a>
      <p class="note">
        Note: Backend on Render — first request may take up to a minute to process.
      </p>
      {#if project.links.repo}
        <a class="btn ghost" href={project.links.repo} target="_blank" rel="noopener">Repo</a>
      {/if}
      {#if project.links.live}
        <a class="btn ghost" href={project.links.live} target="_blank" rel="noopener">Project Live</a>
      {/if}
    </div>

    <figure class="hero-media">
      <img
        src={`${assets}/images/reading-tracker/reading_tracker.png`}
        alt="Reading Tracker"
        loading="lazy"
      />
      <figcaption>Reading Tracker Display</figcaption>
    </figure>
  </article>

  <!-- Problem & Goal -->
  <section class="card section">
    <h2>Problem & Goal</h2>
    <p>
      The goal was to build a <strong>secure, production-grade full-stack application</strong> that enforces
      strict data isolation while handling reflective reading records efficiently. This required integrating
      <strong>SvelteKit</strong> and <strong>FastAPI</strong> and resolving cross-origin and auth concerns cleanly.
    </p>
  </section>

  <!-- Solution -->
  <section class="card section">
    <h2>Solution</h2>
    <ul class="bullets">
      <li><strong>Secure full-stack auth:</strong> SvelteKit frontend + FastAPI backend with JWT (access/refresh) to enforce <em>per-user data ownership</em>.</li>
      <li><strong>Reliable cross-service comms:</strong> Vite proxy in dev; explicit CORS in prod; consistent <code>Bearer</code> headers from a single API client.</li>
      <li><strong>Safe partial updates:</strong> <strong>Pydantic</strong> + <strong>SQLAlchemy</strong> with <code>exclude_unset=True</code> to prevent accidental overwrites.</li>
      <li><strong>Server-only integrations:</strong> Backend fetches Open Library covers and persists normalized data to keep the client clean and secret-free.</li>
      <li><strong>Polished UX:</strong> Svelte store persists auth; a 3D CSS card-flip reveals private reflections; compact UI with clear states and inline errors.</li>
    </ul>

    <!-- Recent updates blurb -->
    <div class="updates">
      <strong>Recent updates:</strong> added <em>Social Readia</em> —
a social layer built on top of Reading Tracker featuring a public feed,
likes, and comments.
    </div>


  </section>

  <div class="gallery-row">
    <figure class="gallery">
      <img
        src={`${assets}/images/reading-tracker/readingtracker_gif.gif`}
        alt="Reading Tracker gif"
        loading="lazy"
      />
      <figcaption>Reading Tracker Register/Login &amp; CRUD</figcaption>
    </figure>

    <figure class="gallery">
      <img
        src={`${assets}/images/reading-tracker/social_readia.gif`}
        alt="Social Readia feed demonstration"
        loading="lazy"
      />
      <figcaption>Social Readia Feed Demonstration</figcaption>
    </figure>
  </div>

  <!-- Architecture -->
  <section class="card section">
    <h2>Architecture</h2>

    <div class="cols">
      <div>
        <h3>System Overview</h3>
        <ul class="bullets">
          <li>
            <strong>SvelteKit ↔ FastAPI</strong>: SvelteKit handles routes/UI/state;
            FastAPI exposes REST endpoints for auth, CRUD, and social features.
          </li>
          <li>
            <strong>Reading Tracker Core</strong>: authenticated personal book/review management.
          </li>
          <li>
            <strong>Social Readia</strong>: public feed, likes, comments,
            and visibility rules layered on top of the same foundation.
          </li>
          <li>
            <strong>JWT Auth</strong>: access/refresh tokens; protected routes;
            per-user data isolation.
          </li>
          <li>
            <strong>Alembic</strong> ensures consistent schema evolution across environments.
          </li>
        </ul>
      </div>

      <div>
        <h3>Data & Auth Pipeline</h3>
        <ul class="bullets">
          <li><strong>Login/Register</strong> → server verifies → issues JWT pair.</li>
          <li>
            <strong>authStore</strong> persists token; API client auto-attaches
            <code>Authorization: Bearer</code>.
          </li>
          <li>
            <strong>Pydantic + SQLAlchemy</strong> models; safe partial updates via
            <code>exclude_unset=True</code>.
          </li>
          <li>
            <strong>Open Library API</strong> (server-side) attaches cover images
            during book creation.
          </li>
        </ul>
      </div>
    </div>

    <div class="cols" style="margin-top:12px;">
      <div>
        <h3>Backend (FastAPI)</h3>
        <ul class="bullets">
          <li>
            <code>main.py</code> — App factory, CORS, router wiring,
            protected CRUD + feed endpoints.
          </li>
          <li>
            <code>auth_routes.py</code> — <code>/auth/register</code>,
            <code>/auth/login</code>, profile endpoints; issues/validates JWT.
          </li>
          <li>
            <code>services/feed.py</code> — Public feed logic, sorting,
            pagination, like/comment aggregation.
          </li>
          <li>
            <code>jwt_utils.py</code> — create/decode tokens;
            <code>get_current_user</code> dependency.
          </li>
          <li>
            <code>models.py</code> — SQLAlchemy models:
            <code>User</code>, <code>Book</code>, <code>Like</code>, <code>Comment</code>.
          </li>
          <li>
            <code>schemas.py</code> — Pydantic DTOs with
            <code>from_attributes</code>.
          </li>
          <li>
            <code>database.py</code> — engine/session, shared <code>Base</code>,
            dependency <code>get_db</code> (LibSQL via Turso in prod; SQLite locally).
          </li>
          <li>
            <code>config.py</code> — settings (secrets, JWT expirations, DB URL).
          </li>
        </ul>
      </div>

      <div>
        <h3>Frontend (SvelteKit)</h3>
        <ul class="bullets">
          <li>
            <code>authStore.ts</code> — Central store for token + user,
            persists across reloads.
          </li>
          <li>
            <code>api.ts</code> — Typed API client; merged headers;
            consistent <code>Bearer</code> handling.
          </li>
          <li>
            <code>BookManager.svelte</code> — Authenticated CRUD UI
            for personal reading tracker.
          </li>
          <li>
            <code>Feed/+page.svelte</code> — Public Social Readia feed
            with sorting + pagination.
          </li>
          <li>
            <code>CommentForm.svelte</code> / <code>CommentList.svelte</code>
            — Componentized social interactions.
          </li>
          <li>
            <code>types.ts</code> — Shared DTOs
            (<code>User</code>, <code>Book</code>, feed items).
          </li>
        </ul>
      </div>
    </div>

    <div style="margin-top:12px;">
      <h3>Request Flow</h3>
      <pre style="white-space:pre-wrap; margin:0; color:#b0b0b0;">
  Client → Login/Register → FastAPI (JWT) → authStore saves token

  Reading Tracker:
  Client (Bearer) → /books CRUD → FastAPI (Pydantic + SQLAlchemy)
  → DB persist → response → UI updates

  Social Readia:
  Client → /feed (public) → FastAPI service layer
  → aggregate likes/comments → return paginated items
  → UI renders feed with interactive components
      </pre>
    </div>
  </section>


  <!-- Demo — CRUD -->
  <section class="card section">
    <h2>Demo — Full CRUD</h2>

    <div class="crud-pills">
      <details use:scrollOnOpen>
        <summary>Create — Register/Add Book</summary>
        <figure class="gallery">
          <img
            src={`${assets}/images/reading-tracker/C.gif`}
            alt="Create a new book entry"
            loading="lazy"
          />
          <figcaption><strong>Create</strong> — Add a new book (title, author, review, recommendation).</figcaption>
        </figure>
      </details>

      <details use:scrollOnOpen>
        <summary>Read — Browse / Filter</summary>
        <figure class="gallery">
          <img
            src={`${assets}/images/reading-tracker/R.gif`}
            alt="Read — list and filter books"
            loading="lazy"
          />
          <figcaption><strong>Read</strong> — Browse your library.</figcaption>
        </figure>
      </details>

      <details use:scrollOnOpen>
        <summary>Update — Edit Review/Notes</summary>
        <figure class="gallery">
          <img
            src={`${assets}/images/reading-tracker/U.gif`}
            alt="Update book progress and notes"
            loading="lazy"
          />
          <figcaption><strong>Update</strong> — Edit reviews, recommendations, and notes.</figcaption>
        </figure>
      </details>

      <details use:scrollOnOpen>
        <summary>Delete — Remove Entry</summary>
        <figure class="gallery">
          <img
            src={`${assets}/images/reading-tracker/D.gif`}
            alt="Delete a book entry"
            loading="lazy"
          />
          <figcaption><strong>Delete</strong> — Remove an entry (with confirmation).</figcaption>
        </figure>
      </details>
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
    <a
      href="https://reading-tracker-ncyk15tbq-scotts-projects-69acb861.vercel.app/"
      target="_blank"
      rel="noopener"
    >Reading Tracker (Live) →</a>
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

  /* CTA */
  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 10px 0 4px; }
  .cta-row .note {
    flex: 1 1 100%;      /* full row */
    margin: 4px 0 0;
    text-align: left;    /* or center, your call */
  }

  /* (Optional) keep buttons aligned nicely after the note */
  .cta-row .btn {
    flex: 0 0 auto;
  }
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 14px; border-radius: 8px;
    text-decoration: none; font-weight: 600; border: 1px solid transparent;
  }
  .btn.primary { background: #00bcd4; color: #0b0f14; border-color: #00a3b7; }
  .btn.primary:hover { background: #10c5dc; }
  .btn.ghost { color: #00bcd4; border-color: #1f2a33; background: #0e1519; }
  .btn.ghost:hover { border-color: #2b3a46; background: #0f1920; }

  /* Hero */
  .hero-media { display: flex; flex-direction: column; align-items: center; margin: 10px 0 0; }
  .hero-media img { width: 100%; height: auto; display: block; border-radius: 8px; border: 1px solid #222; }
  .hero-media figcaption { color: #8b949e; font-size: .9rem; margin-top: .4rem; text-align: center; }

  .section { margin-top: 14px; }
  .section h2 { margin: 0 0 8px; font-size: 1.25rem; color: #e6edf3; }

  /* Updates blurb */
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

  .cols { display: grid; grid-template-columns: 1fr; gap: 12px; }
  @media (min-width: 800px) { .cols { grid-template-columns: 1fr 1fr; } }

  /* Gallery (shared) */
  .gallery { display: flex; flex-direction: column; align-items: center; margin: 20px auto; max-width: 900px; }
  .gallery img {
    width: 100%; height: auto; display: block; border-radius: 10px; border: 1px solid #222;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); object-fit: contain;
  }
    .gallery-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    margin: 20px auto;
    max-width: 1100px;
  }

  @media (min-width: 900px) {
    .gallery-row {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }

  /* override the single-gallery sizing so two-up doesn’t get huge */
  .gallery {
    margin: 0;
    max-width: none;
  }
  .gallery figcaption { color: #8b949e; font-size: 0.9rem; margin-top: 0.5rem; text-align: center; }

  /* CRUD pills */
  .crud-pills { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; max-width: 900px; margin-inline: auto; }
  .crud-pills details {
    flex: 0 0 auto; width: 100%; min-width: 0; scroll-margin-top: 120px;
    border-radius: 8px; background: #121212; border: 1px solid #222; border-left: 3px solid #00bcd4; overflow: hidden;
  }
  .crud-pills summary {
    cursor: pointer; list-style: none; padding: 10px 14px; color: #e6edf3; font-weight: 600; user-select: none;
    display: flex; align-items: center; gap: 8px; background: #151515; border-radius: 8px 8px 0 0; transition: background .2s ease;
  }
  .crud-pills summary::before { content: '▸'; opacity: .7; transform: translateY(1px); }
  .crud-pills details[open] summary::before { content: '▾'; }
  .crud-pills summary:hover { background: #0f0f0f; }
  .crud-pills details > .gallery { padding: 12px 14px 16px; background: #151515; border-top: 1px solid #222; }

  /* Links */
  .links { display: flex; gap: 1.5rem; margin-top: 16px; flex-wrap: wrap; }
  .links a { color: #00bcd4; text-decoration: none; font-weight: 600; }
  .links a:hover { text-decoration: underline; }
  .note {
  font-size: 0.9rem;
  color: #8b949e;
  margin-top: 6px;
  text-align: center;
  font-style: italic;
}

</style>
