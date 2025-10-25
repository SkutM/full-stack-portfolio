<script lang="ts">
  import { projects } from "$lib/projects/data";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let darkMode = false; // Always start in light mode

  onMount(() => {
    // Optional: if you want to clear old theme preference, uncomment below
    // localStorage.removeItem("theme");
  });

  function toggleTheme() {
    darkMode = !darkMode;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }
</script>


<div class:dark-mode={darkMode} class="resume-container">
  <button class="theme-toggle" on:click={toggleTheme}>
    {#if darkMode} ☀️ Light Mode {:else} 🌙 Dark Mode {/if}
  </button>

  <header class="header">
    <h1>Scott Miller</h1>
    <h2>Full-Stack Software Developer</h2>
    <section class="contact-info">
      <p>
        Email:
        <a href="mailto:ssm011403@gmail.com">ssm011403@gmail.com</a>
      </p>
      <p>
        LinkedIn:
        <a href="https://www.linkedin.com/in/scott-miller-90456b2b7" target="_blank" rel="noopener">
          linkedin.com/in/scott-miller-90456b2b7
        </a>
      </p>
      <p>
        GitHub:
        <a href="https://github.com/SkutM" target="_blank" rel="noopener">github.com/SkutM</a>
      </p>
      <p>
        <button class="pdf-button" on:click={() => window.print()}>
          Download as PDF
        </button>
      </p>
    </section>
  </header>

  <hr />

  <section class="summary">
    <h3>Professional Summary</h3>
    <p>
      Highly motivated <strong>Full-Stack Developer</strong> specializing in modern, dynamic application architecture
      (<strong>SvelteKit/TypeScript</strong>) and scalable Python APIs (<strong>FastAPI/SQLAlchemy</strong>).
      Proven ability to engineer secure authentication flows (<strong>JWT</strong>), resolve complex synchronization
      issues, and design systems that balance clarity, performance, and maintainability.
    </p>
  </section>

  <section class="skills">
    <h3>Technical Skills</h3>
    <div class="skills-grid">
      <div>
        <h4>Frontend & Frameworks</h4>
        <ul>
          <li><strong>Svelte / SvelteKit</strong></li>
          <li>TypeScript / JavaScript (ES6+)</li>
          <li>HTML5 / CSS3 / SCSS</li>
        </ul>
      </div>
      <div>
        <h4>Backend & API</h4>
        <ul>
          <li><strong>FastAPI</strong> (REST APIs)</li>
          <li><strong>Python</strong> / Flask</li>
          <li>JWT / Passlib (Security)</li>
        </ul>
      </div>
      <div>
        <h4>Database & Tools</h4>
        <ul>
          <li><strong>SQLAlchemy (ORM)</strong> / <strong>Alembic</strong></li>
          <li>SQLite / PostgreSQL</li>
          <li>Pydantic / Git / GitHub</li>
        </ul>
      </div>
      <div>
        <h4>CS Fundamentals & ML</h4>
        <ul>
          <li>C/C++ / x86 assembly</li>
          <li>Data Structures & Algorithms</li>
          <li><strong>TensorFlow / DeepFace</strong> (ML Integration)</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="experience">
    <h3>Relevant Experience</h3>
    <div class="experience-item">
      <h4>TANGO Multimedia | Digital Music Content Curator (Contract)</h4>
      <p class="dates">September 2019 – December 2019 (Remote)</p>
      <ul>
        <li>
          Curated and reformatted <strong>XML-based metadata</strong> files for use by the content management system
          (CMS), ensuring data clarity and standardization across platforms.
        </li>
        <li>
          Ensured all file formats and metadata attributes met strict industry standards for digital content delivery.
        </li>
      </ul>
    </div>
  </section>

  <section class="projects">
    <h3>Key Projects</h3>

    <div class="project-item">
      <h4>1. Reading Tracker (SvelteKit / FastAPI)</h4>
      <ul>
        <li>
          <strong>Engineered</strong> a secure, full-stack application using <strong>FastAPI</strong> and
          <strong>SvelteKit/TypeScript</strong>, implementing token-based <strong>JWT authorization</strong> to enforce
          strict data ownership across all CRUD operations.
        </li>
        <li>
          <strong>Resolved critical path and synchronization errors</strong> by implementing a
          <strong>Vite Proxy</strong> and utilizing <strong>Alembic</strong> migrations for stable development.
        </li>
      </ul>
      <a href={`${base}/projects/reading-tracker`}>View Detail Page →</a>
    </div>

    <div class="project-item">
      <h4>2. Skut-Face (Facial Recognition Authentication)</h4>
      <ul>
        <li>
          Developed a specialized full-stack authentication system using <strong>Flask</strong> and the
          <strong>DeepFace</strong> library to enable user login via facial biometric data.
        </li>
        <li>
          <strong>Integrated TensorFlow</strong> for generating and verifying facial embeddings, ensuring secure session
          persistence via JWT.
        </li>
        <li>
          Containerized the Flask application with <strong>Gunicorn</strong> for optimized performance and deployment
          readiness.
        </li>
      </ul>
      <a href={`${base}/projects/skut-face`}>View Detail Page →</a>
    </div>

    <div class="project-item">
      <h4>3. Sorting Visualizer (Python / Pygame)</h4>
      <ul>
        <li>
          Built an interactive Python visualizer using generator-based sorting algorithms (<strong>yield / yield from</strong>)
          to animate <strong>Bubble, Merge, and Quick Sort</strong> processes in real time.
        </li>
        <li>
          Demonstrates a strong foundational grasp of <strong>sorting algorithm efficiency</strong> and dynamic data structure
          manipulation.
        </li>
      </ul>
      <a href={`${base}/projects/sorting-visualizer`}>View Detail Page →</a>
    </div>
  </section>

  <section class="education">
    <h3>Education</h3>
    <h4>University of California, Santa Cruz</h4>
    <p class="dates">B.S., Computer Science: Game Design | Graduated: June 2025</p>
  </section>
</div>

<style>
  :root {
    /* Pure white + black body, with subtle contrast for name/links */
    --bg: #ffffff;
    --text: #000000;
    --link: #2b2b2b;   /* name + links */
    --accent: #3a3a3a; /* subheads, borders */
  }

  .dark-mode {
    --bg: #1a1a1a;
    --text: #e6edf3;
    --link: #00bcd4;
    --accent: #00bcd4;
  }

  .resume-container {
    position: relative;              /* ✅ key fix: anchor the toggle here */
    background-color: var(--bg);
    color: var(--text);
    padding: 40px;
    max-width: 900px;
    margin: 40px auto;
    text-align: left;
    border-radius: 10px;
    transition: background-color 0.4s ease, color 0.4s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  .theme-toggle {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;                     /* ✅ make sure it sits above */
    border: 1px solid var(--link);
    background: transparent;
    color: var(--link);
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    line-height: 1;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .theme-toggle:hover {
    background: var(--link);
    color: var(--bg);
  }

  /* keep your existing styles … */
  h1 { color: var(--link); }
  h2 { color: var(--accent); }
  a  { color: var(--link); }
  h3 { border-bottom: 2px solid var(--link); }

  @media print {
    .theme-toggle { display: none; }
    .resume-container { box-shadow: none; }
  }
</style>
