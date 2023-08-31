import React, { useEffect, useState } from "react";

const CircleGraph = ({ data, max }: { data: number; max: number }) => {
  const [graus, setGraus] = useState(0);

  const circleStyle = {
    clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 0)`,
    background: `conic-gradient(#52bf6a 0deg ${graus}deg, transparent ${graus}deg 360deg)`,
    borderRadius: "50%",
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    setGraus((data / max) * 360);
  }, [data, max]);

  return (
    <div className="h-full w-full border-2 rounded-full border-[#52bf6a] p-0.5">
      <div style={circleStyle}></div>
    </div>
  );
};

export default CircleGraph;
