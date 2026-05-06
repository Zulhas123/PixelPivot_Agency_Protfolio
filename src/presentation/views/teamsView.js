import { clear, el } from "../components/dom.js";

const TEAM_MEMBERS = [
  {
    name: "Md Imran",
    role: "Software Engineer (Backend)",
    description: "Builds reliable APIs and scalable services with a performance-first mindset.",
    image: "images/profile-1.jpeg",
  },
  {
    name: "Md Rabiul Islam",
    role: "Backend Developer",
    description: "Focused on clean architecture, database design, and secure integrations.",
    image: "images/profile-2.jpeg",
  },
  {
    name: "Md Shohag",
    role: "Front-end Developer",
    description: "Creates responsive UI with accessible, consistent components and smooth UX.",
    image: "images/profile-4.jpeg",
  },
  {
    name: "Md Zulhas",
    role: "Full Stack Developer",
    description: "Connects product needs to end-to-end solutions across frontend and backend.",
    image: "images/p1.jpg",
  },
  {
    name: "Md Rasel",
    role: "Full Stack Developer",
    description: "Delivers features with strong attention to maintainability and quality.",
    image: "images/profile-5.jpeg",
  },
  {
    name: "Md Jakaria",
    role: "Front-end Developer",
    description: "Builds modern interfaces with strong typography, spacing, and clarity.",
    image: "images/profile-3.jpeg",
  },
];

export function renderTeams({ root }) {
  clear(root);
  for (const member of TEAM_MEMBERS) {
    root.append(
      el("div", { class: "card team-card" }, [
        el("div", { class: "box" }, [
          el("img", {
            src: member.image,
            alt: member.name,
            loading: "lazy",
            decoding: "async",
            width: "150",
            height: "150",
          }),
          el("div", { class: "text" }, member.name),
          el("div", { class: "team-role" }, member.role),
          el("p", { class: "team-desc" }, member.description),
        ]),
      ]),
    );
  }
}
