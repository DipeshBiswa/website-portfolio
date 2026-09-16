import { useLayoutEffect } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/** Native scrolling, one-shot entrances, and bounded decorative depth. */
export default function usePageMotion() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hero = document.querySelector<HTMLElement>(".hero");
    const geometry = document.querySelector<HTMLElement>(".hero-geometry");
    const header = document.querySelector<HTMLElement>(".site-header");
    const reveals = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const surfaces = [
      geometry,
      ...document.querySelectorAll<HTMLElement>(".project-art"),
    ].filter((node): node is HTMLElement => Boolean(node));
    const pointerTargets = new Map<HTMLElement, { x: number; y: number }>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let heroHeight = hero?.offsetHeight ?? 1;
    let lastProgress = -1;

    const render = () => {
      frame = 0;
      if (header) header.dataset.scrolled = String(window.scrollY > 24);
      if (preference.matches) return;

      const progress = clamp(window.scrollY / heroHeight);
      if (progress !== lastProgress) {
        geometry?.style.setProperty("--hero-progress", progress.toFixed(4));
        lastProgress = progress;
      }
      pointerTargets.forEach(({ x, y }, surface) => {
        surface.style.setProperty("--tilt-x", `${(-y * 3).toFixed(2)}deg`);
        surface.style.setProperty("--tilt-y", `${(x * 3).toFixed(2)}deg`);
      });
      pointerTargets.clear();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const measure = () => {
      heroHeight = hero?.offsetHeight ?? 1;
      schedule();
    };
    const resetPointer = () => {
      pointerTargets.clear();
      surfaces.forEach((surface) => {
        surface.style.removeProperty("--tilt-x");
        surface.style.removeProperty("--tilt-y");
      });
    };
    const onPointerMove = (event: PointerEvent) => {
      if (
        preference.matches ||
        !pointer.matches ||
        event.pointerType === "touch"
      )
        return;
      const surface = event.currentTarget as HTMLElement;
      const rect = surface.getBoundingClientRect();
      pointerTargets.set(surface, {
        x: clamp((event.clientX - rect.left) / rect.width, 0, 1) * 2 - 1,
        y: clamp((event.clientY - rect.top) / rect.height, 0, 1) * 2 - 1,
      });
      schedule();
    };
    const onPointerLeave = (event: PointerEvent) => {
      const surface = event.currentTarget as HTMLElement;
      pointerTargets.delete(surface);
      surface.style.removeProperty("--tilt-x");
      surface.style.removeProperty("--tilt-y");
    };
    // A keyboard jump should never land in an unrevealed container.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(
        ".reveal, .hero-enter, .hero-baseline",
      );
      if (target) {
        target.dataset.focusRevealed = "true";
        target.dataset.revealed = "true";
        observer?.unobserve(target);
      }
    };
    const setup = () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      frame = 0;
      resetPointer();
      geometry?.style.removeProperty("--hero-progress");
      lastProgress = -1;
      const enabled = !preference.matches && "IntersectionObserver" in window;
      root.classList.toggle("motion-ready", enabled);
      if (enabled) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              (entry.target as HTMLElement).dataset.revealed = "true";
              observer?.unobserve(entry.target);
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
        );
        reveals.forEach((node) => {
          if (node.dataset.revealed !== "true") observer?.observe(node);
        });
      } else {
        // Preserve content already seen if the user later enables motion.
        reveals.forEach((node) => (node.dataset.revealed = "true"));
      }
      render();
    };

    setup();
    // Fragment targets do not exist until React mounts this page.
    const hashFrame = requestAnimationFrame(() => {
      if (window.location.hash && window.scrollY === 0) {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    });
    const resizeObserver = new ResizeObserver(measure);
    if (hero) resizeObserver.observe(hero);
    preference.addEventListener("change", setup);
    pointer.addEventListener("change", resetPointer);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.addEventListener("focusin", onFocus);
    surfaces.forEach((surface) => {
      surface.addEventListener("pointermove", onPointerMove, { passive: true });
      surface.addEventListener("pointerleave", onPointerLeave);
    });
    return () => {
      observer?.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(hashFrame);
      preference.removeEventListener("change", setup);
      pointer.removeEventListener("change", resetPointer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("focusin", onFocus);
      surfaces.forEach((surface) => {
        surface.removeEventListener("pointermove", onPointerMove);
        surface.removeEventListener("pointerleave", onPointerLeave);
      });
      resetPointer();
      geometry?.style.removeProperty("--hero-progress");
      root.classList.remove("motion-ready");
    };
  }, []);
}
