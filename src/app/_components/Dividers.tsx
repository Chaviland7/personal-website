export const WavyDivider = (props: { fill: string }) => {
  return (
    <div className="z-10 -mb-4 -mt-12 w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        className="h-20 w-full"
      >
        <path
          d="M0.00,49.98 C150.00,150.00 349.86,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
          fill={props.fill}
        ></path>
      </svg>
    </div>
  );
};
