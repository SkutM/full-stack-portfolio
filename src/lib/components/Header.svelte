<script lang="ts">
  import { page } from '$app/stores';

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Résumé', href: '/resume' }, // keep 'Resume' if you prefer
  ];

  // helper: marks /projects active on /projects/anything too
  const isActive = (path: string, href: string) =>
    href === '/' ? path === '/' : path.startsWith(href);
</script>

<header>
  <div class="logo">
    <a href="/" data-sveltekit-preload-data>Scott Miller</a>
  </div>

  <nav>
    <ul>
      {#each navItems as item}
        <li>
          <a
            href={item.href}
            data-sveltekit-preload-data
            class:active={isActive($page.url.pathname, item.href)}
            aria-current={isActive($page.url.pathname, item.href) ? 'page' : undefined}
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  header {
    position: sticky; top: 0; z-index: 10;           /* optional: stays visible */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background-color: #1e1e1e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .logo a {
    font-size: 1.5em;
    font-weight: bold;
    color: #00bcd4;                                   /* your blue accent */
    text-decoration: none;
  }

  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav li { margin-left: 25px; }

  nav a {
    text-decoration: none;
    color: #b0b0b0;
    font-weight: 500;
    transition: color 0.2s, border-bottom 0.2s;
  }

  nav a:hover { color: #ffffff; }

  nav a.active,
  nav a[aria-current="page"] {
    color: #ffffff;
    border-bottom: 2px solid #00bcd4;                 /* active underline */
  }
</style>
