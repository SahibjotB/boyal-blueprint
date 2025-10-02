export default function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
      <div className="relative flex w-[200%] h-120 animate-wave">
        {/* Wave #1 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-[50%] h-full"
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
          className="w-[50%] h-full"
        >
          <path
            className="fill-black dark:fill-white"
            d="M0,160 C 240,200 480,120 720,160 C 960,200 1200,120 1440,160 V320 H0 Z"
          />
        </svg>
      </div>
    </div>
  );
}
