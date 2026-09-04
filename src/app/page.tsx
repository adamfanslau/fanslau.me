import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

// Services-first: what I do → proof → who I am → how to start.
// The CV (experience, education, skills) lives at /cv.
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
