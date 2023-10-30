import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

export default function Portal(props: React.PropsWithChildren) {
  const portalRef = useRef(document.createElement("div"));
  useEffect(() => {
    const container = portalRef.current;
    if (!hasTarget(container)) {
      portalRef.current.className = styles["custom-portal"];
      document.body.appendChild(portalRef.current);
    }
    return () => {
      if (hasTarget(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  return portalRef.current
    ? createPortal(props.children ?? "기본내용", portalRef.current)
    : null;
}

function hasTarget(container: HTMLDivElement) {
  if (container === null) return false;
  return document.body.contains(container);
}
