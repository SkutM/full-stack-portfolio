<!-- Home Page -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { base, assets } from '$app/paths';

  let typed = '';
  let showCursor = true;
  const fullText = 'Scott Miller';
  const typingSpeed = 120; // ms per character
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  let showLines = false;

  onMount(() => {
    const checkWidth = () => {
      showLines = window.innerWidth >= 1200;
    };

    checkWidth(); // check immediately
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  });

  onMount(async () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      typed = fullText;
      showCursor = false; // instantly hide if no animation
      return;
    }

    for (let i = 0; i < fullText.length; i++) {
      typed += fullText[i];
      await sleep(typingSpeed);
    }

    showCursor = false; // hides it after typing completes
  });

</script>

<!-- Fixed, centered typed name near the top of the screen -->
<h1 class="name-banner">
  {typed}{#if showCursor}<span class="cursor" aria-hidden="true"></span>{/if}
</h1>

<div class="container">
  <section class="hero">
    <p class="role">Full-Stack Developer</p>

    <p class="tagline">
      I build full-stack applications with <strong>SvelteKit</strong> and
      <strong>TypeScript</strong>, designed for security, scalability, and
      long-term maintainability.
    </p>

    <div class="links">
      <a href="mailto:ssm011403@gmail.com">ssm011403@gmail.com</a>
      <span class="dot">•</span>
      <a
        href="https://www.linkedin.com/in/scott-miller-90456b2b7"
        target="_blank"
        rel="noopener"
        >LinkedIn</a
      >
      <span class="dot">•</span>
      <a href="https://github.com/SkutM" target="_blank" rel="noopener"
        >GitHub</a
      >
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
      Recently: shipped a JWT-secured Reading Tracker (Vite proxy + Alembic
      migrations) and a DeepFace/TensorFlow facial auth prototype (Flask +
      Gunicorn).
    </p>
  </section>
</div>

<div class="action-buttons">
  <a href="{base}/projects" class="btn">Projects</a>
  <a href="{base}/resume" class="btn">Résumé</a>
</div>

{#if showLines}
  <div class="edge-lines" aria-hidden="true">
    {#each Array(4) as _, i}
      <div class={`l${i+1}`}></div>
      <div class={`r${i+1}`}></div>
    {/each}
  </div>
{/if}




<style>

  .name-banner {
    position: relative;              /* so it scrolls normally */
    top: 0;                          /* reset fixed offset */
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-top: 63px;               /* same vertical spacing as before */
    padding: 0 12px;
    font-size: clamp(2.2rem, 6vw, 3.5rem);
    font-family: inherit;
    color: #00bcd4;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
    white-space: nowrap;
    pointer-events: none;
    z-index: 1;                      /* lower, so nav can cover it */
  }

  .cursor {
    display: inline-block;
    width: 10px;
    height: 1.2em;
    vertical-align: -0.2em;
    background: #e6edf3;
    margin-left: 6px;
    animation: blink 0.8s step-end infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  /* Page layout */
  .container {
    width: min(1100px, 92vw);
    margin: 0 auto;
    padding: 15px 0 40px;
  }

  /* Hero */
  .hero {
    margin-top: -50px;
    text-align: center;
  }

  .role {
    color: #b0b0b0;
    font-size: 1.1rem;
    margin: 8px 0 40px;
  }

  .tagline {
    max-width: 60ch;
    line-height: 1.6;
    color: #b0b0b0;
    margin: 0 auto;
  }

  .tagline strong {
    font-weight: 600;
    color: #e6edf3;
  }

  .links {
    position: relative;
    top: 20px;
    display: flex;
    left: 0px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem 0.75rem;
  }

  .links a {
    color: #00bcd4;
    font-weight: 500;
    text-decoration: none;
  }

  .links a:hover {
    color: #fff;
    text-decoration: underline;
  }

  .links .dot {
    color: #444;
  }

  /* Card/section */
  .card {
    background: #151515;
    border: 1px solid #222;
    border-left: 3px solid #00bcd4;
    border-radius: 10px;
    padding: 16px 18px;
  }

  .highlights {
    margin-top: 55px;
    text-align: center;
  }

  .highlights h2 {
    margin: 0 0 10px;
    color: #e6edf3;
    font-size: 1.25rem;
  }

  .stack {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    color: #b0b0b0;
    display: grid;
    gap: 10px;
  }

  .blurb {
    margin: 0;
    color: #8b949e;
    font-size: 0.95rem;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .cursor {
      display: none;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 10rem;
    margin-top: 65px;
  }

  .btn {
    display: inline-block;
    padding: 1.6rem 4rem;
    border-radius: 999px;
    background-color: #456064ff;
    color: #fff;
    font-weight: 600;
    font-size: 1.4rem;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 8px rgba(0, 188, 212, 0.3);
  }

  .btn:hover {
    background-color: #009bb0;
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(0, 188, 212, 0.5);
  }


  .edge-lines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

/* Base line style */
.edge-lines div {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 6px;             /* thickness */
  border-radius: 2px;
  background: linear-gradient(
    to bottom,
    rgba(0, 140, 200, 0.25),
    rgba(0, 40, 80, 0.08),
    rgba(0, 140, 200, 0.25)
  );
  pointer-events: none;
}

/* Left side lines */
.edge-lines .l1 { left: 24px; }
.edge-lines .l2 { left: 70px; opacity: 0.5; }
.edge-lines .l3 { left: 120px; opacity: 0.35; }
.edge-lines .l4 { left: 180px; opacity: 0.25; }

/* Right side lines */
.edge-lines .r1 { right: 24px; }
.edge-lines .r2 { right: 70px; opacity: 0.5; }
.edge-lines .r3 { right: 120px; opacity: 0.35; }
.edge-lines .r4 { right: 180px; opacity: 0.25; }

@media (max-width: 640px) {
  /* 1️⃣ Fix the name banner on small screens */
  .name-banner {
    position: relative;
    left: 0;
    top: -20px;
    transform: none;
    width: 100%;
    text-align: center;
    margin: 70px auto 15px;
    padding: 0 10px;

    font-size: clamp(1.8rem, 9vw, 2.3rem);
    color: #00bcd4;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.15);

    white-space: normal;   /* allow wrapping if needed */
    line-height: 1.2;
    z-index: 1;
  }

  /* 2️⃣ Hide action buttons entirely on phones */
  .action-buttons {
    display: none;
  }

  /* Optional: tighten hero spacing since buttons are gone */
  .container {
    padding-bottom: 20px;
  }
}


</style>
