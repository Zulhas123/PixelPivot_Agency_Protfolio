import { clear, el } from "../components/dom.js";

const TESTIMONIALS = [
  { client: "Dhaka Fashion", quote: "Clean execution and great communication throughout the project." },
  { client: "ACI Retailers", quote: "Reliable delivery with strong attention to detail." },
  { client: "Alom Finance", quote: "Professional, efficient, and focused on business value." },
  { client: "AL Hela Health", quote: "The application improved our workflows dramatically." },
  { client: "News Media", quote: "Creative solutions aligned with our goals and timeline." },
  { client: "BD Energy", quote: "Strong technical depth and pragmatic problem solving." },
];

export function renderTestimonials({ root }) {
  clear(root);
  for (const item of TESTIMONIALS) {
    root.append(
      el("article", { class: "feedback-card" }, [
        el("h3", {}, item.client),
        el("p", {}, `"${item.quote}"`),
      ]),
    );
  }
}

