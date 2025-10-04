import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 md:py-8 text-sm text-white dark:text-black dark:bg-white bg-black">
      <p>© {new Date().getFullYear()} Boyal Blueprint. All rights reserved.</p>
    </footer>
  );
}
