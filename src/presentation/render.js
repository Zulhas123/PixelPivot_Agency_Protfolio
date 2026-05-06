import { renderTeams } from "./views/teamsView.js";
import { renderProjects } from "./views/projectsView.js";
import { renderTestimonials } from "./views/testimonialsView.js";

export function renderStaticViews({ document }) {
  const teamsRoot = document.querySelector('[data-view="teams"]');
  if (teamsRoot) renderTeams({ root: teamsRoot });

  const projectsRoot = document.querySelector('[data-view="projects"]');
  if (projectsRoot) renderProjects({ root: projectsRoot });

  const testimonialsRoot = document.querySelector('[data-view="testimonials"]');
  if (testimonialsRoot) renderTestimonials({ root: testimonialsRoot });
}

