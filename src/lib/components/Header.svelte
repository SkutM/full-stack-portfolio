<script>
  import { base } from '$app/paths';
</script>

<header class="header">
  <div class="logo">
    <a href="{base}/" class="logo-link">Scott Miller</a>
  </div>

  <nav>
    <a href="{base}/" class="nav-link">Home</a>
    <a href="{base}/projects" class="nav-link">Projects</a>
    <a href="{base}/resume" class="nav-link">Résumé</a>
  </nav>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background-color: #1e1e1e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .logo-link {
    font-size: 1.5em;
    font-weight: bold;
    color: #00bcd4;
    text-decoration: none;
  }

  @media (max-width: 640px) {
    .logo-link {
      display: inline-block;
      margin-left: -6px;            /* tweak: -4px to -10px to taste */
    }
  }

  nav {
    display: flex;
    gap: 25px;
  }

  .nav-link {
    text-decoration: none;
    color: #b0b0b0;
    font-weight: 500;
    transition: color 0.2s, border-bottom 0.2s;
  }

  .nav-link:hover {
    color: #ffffff;
    border-bottom: 2px solid #00bcd4;
  }
</style>
