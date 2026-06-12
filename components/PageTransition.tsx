"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Pages animate IN on every route change (keyed remount), but there is
 * deliberately NO exit animation: AnimatePresence mode="wait" kept the old
 * page in the DOM during its exit, which raced against GSAP ScrollTrigger's
 * pin-spacer (the pinned horizontal-fleet section gets wrapped in a
 * non-React div). React then called removeChild on a re-parented node →
 * "NotFoundError: Failed to execute 'removeChild' on 'Node'".
 *
 * Unmounting the old page immediately lets effect cleanups (gsap.context
 * revert, Three.js dispose) restore the DOM before React tears it down.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
