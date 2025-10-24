<script lang="ts">
  import "$lib/app.css";
  import Header from "$lib/components/Header.svelte";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
</script>

<Header />

{#key $page.url.pathname}
  <div in:fade={{ duration: 140 }} out:fade={{ duration: 120 }}>
    <slot />
  </div>
{/key}