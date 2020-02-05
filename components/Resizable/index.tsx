import {
  useEffect,
  FunctionComponent,
  useState,
  useRef,
  MutableRefObject
} from "react";

const Resizable: FunctionComponent<{ minWidth: number; maxWidth: number }> = ({
  children,
  minWidth,
  maxWidth
}) => {
  const resizable: MutableRefObject<HTMLDivElement> = useRef(null);
  const handle: MutableRefObject<HTMLDivElement> = useRef(null);
  const initialData = useRef({
    x: 0,
    width: 0
  });

  const [size, setSize] = useState(minWidth);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      setIsResizing(false);
    };

    const onMouseMove = (ev: MouseEvent) => {
      const { x, width } = initialData.current;
      let newSize = width - (x - ev.clientX);
      if (newSize < minWidth) {
        newSize = minWidth;
      }

      if (newSize > maxWidth) {
        newSize = maxWidth;
      }
      setSize(newSize);
    };

    window.addEventListener("mouseup", onMouseUp);
    handle.current.addEventListener("mousedown", (ev: MouseEvent) => {
      initialData.current = {
        x: ev.clientX,
        width: resizable.current.getBoundingClientRect().width
      };
      setIsResizing(true);
      window.addEventListener("mousemove", onMouseMove);
    });
  }, []);

  return (
    <div
      className="resizable"
      ref={resizable}
      style={{ width: Math.round(size) }}
    >
      <div className="content">{children}</div>
      <div className="handle" ref={handle}></div>
      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .handle {
          width: 5px;
          height: 100%;
          cursor: ew-resize;
          background-color: transparent;
          position: absolute;
          right: 0;
          z-index: 100;
        }

        .resizable {
          display: flex;
          cursor: ${isResizing ? "ew-resize" : ""};
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Resizable;
