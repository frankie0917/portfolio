import React from "react";

export const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="h-full">
      projects
    </div>
  );
});
