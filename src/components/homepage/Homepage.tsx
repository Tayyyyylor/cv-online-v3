"use client";

import HeroBanner from '../sections/HeroBanner';
import { Header } from '../sections/Header'
import Featured from '../sections/Featured';
import Projects from '../sections/projects/Projects';
import About from '../sections/about/About';
import Contact from '../sections/contact/Contact';

export default function Homepage() {
  return (
  <>
  <Header />
  <main>
    <HeroBanner />
    <Featured />
    <Projects />
    <About />
    <Contact />
  </main>
  </>
  )
}
