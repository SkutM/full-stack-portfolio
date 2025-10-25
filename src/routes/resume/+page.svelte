<script lang="ts">
  import { projects } from "$lib/projects/data";
  import { base } from "$app/paths";
</script>

<div class="resume-container">
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
  .resume-container {
    padding: 40px;
    max-width: 900px;
    margin: 40px auto;
    text-align: left;
    background-color: #1a1a1a;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }

  hr {
    border: 0;
    height: 1px;
    background: #333;
    margin: 30px 0;
  }

  h1 {
    font-size: 2.2em;
    margin-bottom: 0px;
    color: #00bcd4;
  }
  h2 {
    font-size: 1.2em;
    color: #b0b0b0;
    margin-top: 5px;
  }

  a {
    color: #00bcd4;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .contact-info p {
    font-size: 0.9em;
    margin: 2px 0;
    color: #b0b0b0;
  }

  h3 {
    font-size: 1.5em;
    border-bottom: 2px solid #00bcd4;
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 1.1em;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #e6edf3;
  }

  .summary p {
    line-height: 1.5;
    color: #b0b0b0;
  }

  .dates {
    font-style: italic;
    font-size: 0.9em;
    color: #8b949e;
    margin-bottom: 10px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .skills-grid ul {
    list-style-type: none;
    padding-left: 0;
  }

  .skills-grid li {
    margin-bottom: 5px;
    color: #b0b0b0;
    font-size: 0.95em;
  }

  .project-item {
    margin-top: 25px;
    padding-left: 15px;
    border-left: 3px solid #00bcd4;
    margin-bottom: 30px;
  }

  .project-item ul {
    padding-left: 20px;
    list-style-type: disc;
  }

  .project-item li {
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .project-item a {
    color: #00bcd4;
    font-weight: bold;
    margin-top: 10px;
    display: inline-block;
  }

  .pdf-button {
  background: none;
  border: 1px solid #00bcd4;
  color: #00bcd4;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s ease;
  margin-top: 8px;
  }
  .pdf-button:hover {
    background: #00bcd4;
    color: #111;
  }
  @media print {
    /* hide the button itself in the PDF */
    .pdf-button { display: none; }
  }

</style>
