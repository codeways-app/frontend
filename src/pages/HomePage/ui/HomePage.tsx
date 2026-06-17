'use client';

import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ProductsSection } from '../components/ProductsSection';
import { CtaSection } from '../components/CtaSection';
import { MktFooter } from '../components/MktFooter';

import styles from './Home.module.css';

export const HomePage = () => (
  <div className={styles.page}>
    <Header />
    <HeroSection />
    <ProductsSection />
    <CtaSection />
    <MktFooter />
  </div>
);
