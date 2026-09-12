import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * HoverPreview - inspired by React Bits "Hover Preview".
 * Wrap target text; a preview image follows the cursor with a spring
 * while hovering. The card is portaled to document.body so no ancestor
 * clip-path/transform can cut it off.
 */
export default function HoverPreview({ children, image, alt = "", width = 220 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 260, damping: 24, mass: 0.7 });

  const onMove = (e) => {
    // Card lives in a portal at body level, so viewport coordinates are right.
    x.set(e.clientX + 18);
    y.set(e.clientY - 320);
  };

  return (
    <>
      <span
        ref={ref}
        className="hp-target"
        onMouseEnter={() => setVisible(true)}
        onMouseMove={onMove}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {createPortal(
        <motion.div
          className="hp-preview"
          aria-hidden="true"
          style={{ x: sx, y: sy, width }}
          initial={false}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.72 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={image} alt={alt} draggable="false" />
        </motion.div>,
        document.body
      )}
    </>
  );
}
