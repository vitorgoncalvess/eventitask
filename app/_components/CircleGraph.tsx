import React, { useEffect, useState } from "react";

const CircleGraph = ({
  data,
  max,
  single,
}: {
  data: number;
  max: number;
  single: boolean;
}) => {
  const [graus, setGraus] = useState(0);
  console.log(data, max);

  const circleStyle = {
    clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 0)`,
    background: `conic-gradient(#52bf6a 0deg ${graus}deg, transparent ${graus}deg 360deg)`,
    borderRadius: "50%",
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    const cal = (data / max) * 360;
    setGraus(cal);
    if (single && !max) setGraus(360);
  }, [data, max, single]);

  return (
    <div className="h-full w-full border-2 rounded-full border-[#52bf6a] p-0.5">
      <div style={circleStyle}></div>
    </div>
  );
};

export default CircleGraph;
