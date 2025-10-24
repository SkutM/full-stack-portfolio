<script lang="ts">
  import "$lib/app.css";   // this brings in your global styles
  import Header from "$lib/components/Header.svelte";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
</script>

<Header />

{#key $page.url.pathname}
  <div in:fade={{ duration: 140 }} out:fade={{ duration: 120 }}>
    <slot />
  </div>
{/key}