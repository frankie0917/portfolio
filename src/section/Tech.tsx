import React from "react";

export const Tech = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="h-full">
      tech
    </div>
  );
});
