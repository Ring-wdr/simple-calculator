import { useDeferredValue, useEffect, useState } from "react";

type ProgressType = {
  flag: "forward" | "backward";
  value: number;
};

const initProgressValue = { flag: "forward", value: 0 } as const;

export default function MouseShow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const deferedPosition = useDeferredValue(mousePosition);
  const [progress, setProgress] = useState<ProgressType>(initProgressValue);
  const [rafProgress, setRafProgress] =
    useState<ProgressType>(initProgressValue);
  //   const [, startTransition] = useTransition();

  useEffect(() => {
    const getCurrentPosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
    const goAndBackProgress = () => {
      setProgress(progressMoveCallback);
    };
    const animationCallBack = () => {
      setRafProgress(progressMoveCallback);
      callRef = requestAnimationFrame(animationCallBack);
    };
    const progressInterval = setInterval(goAndBackProgress, 10);

    window.addEventListener("mousemove", getCurrentPosition);
    let callRef = requestAnimationFrame(animationCallBack);
    return () => {
      window.removeEventListener("mousemove", getCurrentPosition);
      clearInterval(progressInterval);
      cancelAnimationFrame(callRef);
    };
  });

  return (
    <div>
      <div>
        <h2>progress</h2>
        <ul>
          <li>
            <progress max={1000} value={progress.value} />
          </li>
          <li>
            <progress max={1000} value={rafProgress.value} />
          </li>
        </ul>
      </div>
      <ul>
        <li>{deferedPosition.x}</li>
        <li>{deferedPosition.y}</li>
      </ul>
    </div>
  );
}
function progressMoveCallback(prev: ProgressType): ProgressType {
  if (prev.flag === "forward") {
    if (prev.value >= 1000) {
      return { flag: "backward", value: prev.value - 10 };
    }
    return { ...prev, value: prev.value + 10 };
  } else {
    if (prev.value <= 0) {
      return { flag: "forward", value: prev.value + 10 };
    }
    return { ...prev, value: prev.value - 10 };
  }
}
