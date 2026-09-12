import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
/**
 * HoverPreview - inspired by React Bits "Hover Preview".
 * Wrap target text; a preview image follows the cursor with a spring
 * while hovering. Styled to match the Persona 3 design system
 * (skewed cut-corner frame, hard offset shadow, cyan accent edge).
 */
export default function HoverPreview({ children, image, alt = "", width = 220 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 260, damping: 24, mass: 0.7 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <span
      ref={ref}
      className="hp-target"
      onMouseEnter={() => setVisible(true)}
      onMouseMove={onMove}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <motion.span
        className="hp-preview"
        aria-hidden="true"
        style={{ x: sx, y: sy, width }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.72 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={image} alt={alt} draggable="false" />
      </motion.span>
    </span>
  );
}
