"use client";

import HeroBanner from '../sections/HeroBanner';
import { Header } from '../sections/Header'
import Featured from '../sections/Featured';

export default function Homepage() {
  return (
  <>
  <Header />
  <main>
    <HeroBanner />
    <Featured />
  </main>
  </>
  )
}
