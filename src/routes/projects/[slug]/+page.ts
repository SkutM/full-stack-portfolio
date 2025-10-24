// src/routes/projects/[slug]/+page.ts
import { projects, type Project, type Slug } from '$lib/projects/data';
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) throw error(404, "Project not found");
  return { project };
};
