import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function GlowCard({ to, title, desc, Icon, mousePos }) {
  const [rect, setRect] = useState(null);

  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  let glow = "transparent";
  if (rect) {
    const dx = Math.max(rect.left - mousePos.x, 0, mousePos.x - rect.right);
    const dy = Math.max(rect.top - mousePos.y, 0, mousePos.y - rect.bottom);
    const dist = Math.sqrt(dx * dx + dy * dy);

    // reasonable threshold (closer than before but not too small)
    if (dist < 60) {
      glow = `radial-gradient(300px circle at ${
        mousePos.x - rect.left
      }px ${mousePos.y - rect.top}px, rgba(255,128,0,1), transparent 40%)`;
    }
  }



  return (
    <Link
      ref={ref}
      to={to}
      className="relative bg-black dark:bg-white border border-neutral-900 dark:border-gray-200 
                hover:bg-white dark:hover:bg-black rounded-2xl p-6 shadow-sm 
                transition-all duration-300 transform overflow-hidden group"
    >
      {/* Glow under content */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background:
            glow ||
            "radial-gradient(350px circle at 50% 50%, rgba(255,128,0,1), transparent 95%)",
          padding: "2px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          transition: "background 0.25s ease-out",
          filter: "brightness(1.5) blur(4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-5 rounded-xl flex items-center justify-center">
          <Icon className="w-12 h-12 text-white dark:text-black group-hover:text-black dark:group-hover:text-white transition-colors" />
        </div>

        <h3 className="text-lg sm:text-xl font-semibold 
                      text-white dark:text-gray-900 
                      group-hover:text-black dark:group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="mt-2 text-sm sm:text-base 
                      text-gray-300 dark:text-gray-600 
                      group-hover:text-black dark:group-hover:text-white transition-colors">
          {desc}
        </p>
      </div>
    </Link>
  );
}
