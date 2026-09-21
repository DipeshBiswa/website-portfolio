import type { Project } from "../content";
import "./project-screenshot.css";

export default function ProjectScreenshot({ project }: { project: Project }) {
  const { screenshot } = project;

  return (
    <figure className="project-screenshot">
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <figcaption>{screenshot.caption}</figcaption>
    </figure>
  );
}
