export default function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
      <div className="relative w-[200%] h-[420px] animate-wave flex">
        {/* Continuous flowing wave - two paths side by side */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-1/2 h-full -mb-[2px]"
        >
          <path
            className="fill-black dark:fill-white"
            d="M0,160 C240,200 480,120 720,160 C960,200 1200,120 1440,160 V320 H0 Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-1/2 h-full -mb-[2px]"
        >
          <path
            className="fill-black dark:fill-white"
            d="M0,160 C240,200 480,120 720,160 C960,200 1200,120 1440,160 V320 H0 Z"
          />
        </svg>
      </div>

      {/* Solid filler to cover bottom seam */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white" />
    </div>
  );
}
