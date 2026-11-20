import type { Project } from "./types";

export const projects = [
  {
    id: "tim-beeston-cleaning",
    title: "Tim Beeston Cleaning",
    description:
      "New website for a family-run cleaning business in Killarney, replacing a template site: services, before-and-after gallery, team profiles, FAQ, Instagram feed and WhatsApp contact. A lightweight static build that loads fast on a phone.",
    tech: ["HTML", "CSS", "JavaScript"],
    kind: "client",
    url: "https://timbeestoncleaning.ie",
    image: "/projects/tim-beeston.jpg",
    year: 2026,
  },
  {
    id: "lens",
    title: "Lens",
    description:
      "A public demo of a private AI stack: drop in a PDF and get the key facts as strict JSON plus a plain-language explanation, point it at a photo and it transcribes and describes it, or just chat. Two open-weight Qwen models run on a six-core desktop in my house; a Go API queues the work and streams results back as they arrive. No account, files deleted after 24 hours.",
    tech: ["Go", "React", "TypeScript", "Tailwind", "SQLite", "llama.cpp", "Cloudflare"],
    kind: "personal",
    url: "https://lens.fanslau.me",
    urlLabel: "◉ Try it",
    image: "/projects/lens.jpg",
    year: 2026,
  },
  {
    id: "bug-blaster",
    title: "Bug Blaster",
    description:
      "It's Sprint 47, the build is red, and you are the CI. A synthwave canvas shooter where `missing ;`, `undefined is not a function` and a memory leak with a live MB counter charge down a neon corridor toward your desk. Every bug you miss ships to production and costs you a coffee; run out and you get a Production Incident Postmortem, with story points. Fill the RAGE meter and answer with git push --force. Zero dependencies, zero asset files, zero mercy.",
    tech: ["TypeScript", "HTML5 Canvas", "Web Audio", "Vite"],
    kind: "personal",
    url: "https://bugblaster.fanslau.me",
    urlLabel: "▶ Play",
    repoUrl: "https://github.com/adamfanslau/bug-blaster",
    image: "/projects/bug-blaster-poster.jpg",
    video: {
      mp4: "/projects/bug-blaster.mp4",
      webm: "/projects/bug-blaster.webm",
    },
    year: 2026,
  },
  {
    id: "synth",
    title: "AI Synth Studio",
    description:
      "Two synthesizers in the browser and a sound designer that turns the knobs for you. Model F is a three-oscillator monosynth in the 1970s mould with a ladder filter; Drift is a self-playing groove and drone machine with generated patterns, bass and drums. Describe a sound and the same home-hosted Qwen model behind Lens writes a grammar-constrained patch sheet that sets every control. All the audio is hand-written DSP in an AudioWorklet; plug in a MIDI keyboard, or share a patch as a link.",
    tech: ["TypeScript", "React", "Web Audio", "Go", "llama.cpp", "Tailwind"],
    kind: "personal",
    url: "https://synth.fanslau.me",
    urlLabel: "▶ Play",
    image: "/projects/synth.jpg",
    year: 2026,
  },
] satisfies Project[];
