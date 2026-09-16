import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

/** Fetch the illustration module shortly before it enters the viewport. */
export default function DeferredPreview({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const placeholder = (
    <div className="preview-placeholder" aria-hidden="true" />
  );
  return (
    <div ref={ref} className="deferred-preview">
      {ready ? (
        <Suspense fallback={placeholder}>{children}</Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
