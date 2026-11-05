"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gold" />;
}
