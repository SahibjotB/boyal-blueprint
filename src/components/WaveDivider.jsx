export default function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
      <div id='wavetop' className="relative flex w-[450%] sm:w-[400%] md:w-[250%] h-[500px] sm:h-[400px] md:h-[420px] animate-wave scroll-mt-72">
        {/* Wave #1 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-[50%] h-full -mb-[2px]" // 👈 overlaps bottom edge
        >
          <path
            className="fill-black dark:fill-white"
            d="M0,160 C 240,200 480,120 720,160 C 960,200 1200,120 1440,160 V320 H0 Z"
          />
        </svg>
        {/* Wave #2 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-[50%] h-full -mb-[2px]" // 👈 overlaps bottom edge
        >
          <path
            className="fill-black dark:fill-white"
            d="M0,160 C 240,200 480,120 720,160 C 960,200 1200,120 1440,160 V320 H0 Z"
          />
        </svg>
      </div>
      {/* 👇 Add solid background filler so no line ever shows */}
      <div id='wavebottom' className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white" />
    </div>
  );
}
