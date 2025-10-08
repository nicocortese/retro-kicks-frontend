const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-50 h-50"
      >
        <circle
          fill="#d64541"
          stroke="#1a1a1a"
          strokeWidth="2"
          r="10"
          cx="40"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2s"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4s"
          ></animate>
        </circle>
        <circle
          fill="#d64541"
          stroke="1a1a1a"
          strokeWidth="2"
          r="10"
          cx="100"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2s"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2s"
          ></animate>
        </circle>
        <circle
          fill="#d64541"
          stroke="#1a1a1a"
          strokeWidth="2"
          r="10"
          cx="160"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2s"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0s"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
