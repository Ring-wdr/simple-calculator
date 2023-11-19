import { useState, useRef, useEffect, startTransition } from "react";

type ProgressType = {
  flag: "forward" | "backward";
  value: number;
};

export default function MouseShow() {
  const [{ x, y }, setMousePosition] = useState({ x: 0, y: 0 });
  const progressRef = useRef<HTMLProgressElement>(null);

  useEffect(() => {
    const getCurrentPosition = ({ clientX, clientY }: MouseEvent) =>
      startTransition(() => setMousePosition({ x: clientX, y: clientY }));

    let direction: ProgressType["flag"] = "forward";
    let prevTime = 0;
    const animationCallback = (timestamp: number) => {
      if (progressRef.current === null) return;
      const elapsed = (timestamp - prevTime) * 0.5;
      prevTime = timestamp;

      const currentValue = progressRef.current.value;
      if (direction === "forward") {
        if (currentValue >= 1000) {
          progressRef.current.value -= elapsed;
          direction = "backward";
        } else {
          progressRef.current.value += elapsed;
        }
      }
      if (direction === "backward") {
        if (currentValue <= 0) {
          progressRef.current.value += elapsed;
          direction = "forward";
        } else {
          progressRef.current.value -= elapsed;
        }
      }
      callRef = requestAnimationFrame(animationCallback);
    };

    window.addEventListener("mousemove", getCurrentPosition);
    let callRef = requestAnimationFrame(animationCallback);
    return () => {
      window.removeEventListener("mousemove", getCurrentPosition);
      cancelAnimationFrame(callRef);
    };
  }, [progressRef]);

  return (
    <div>
      <div>
        <h2>progress</h2>
        <ul>
          <li>
            <progress max={1000} ref={progressRef} />
          </li>
        </ul>
      </div>
      <ul>
        <li>x position:{x}</li>
        <li>y position:{y}</li>
      </ul>
    </div>
  );
}
