/** A small architectural study: three separate forms resting on one plane. */
export default function AbstractComposition() {
  return (
    <svg
      className="abstract-composition"
      viewBox="0 0 460 420"
      fill="none"
      aria-hidden="true"
    >
      <path d="M43 291 218 189 421 306 246 408Z" fill="#ded4c7" opacity=".28" />
      <g className="geometry-base">
        <path d="m47 260 171-99 204 118-172 100Z" fill="#eee7dd" />
        <path d="M47 260v17l203 119v-17Z" fill="#d7ccbc" />
        <path d="m250 379 172-100v17L250 396Z" fill="#bfae97" />
        <path d="m47 260 203 119 172-100" stroke="#fffaf2" strokeWidth="1" />
      </g>
      <g className="geometry-form geometry-form-one">
        <path d="m90 177 70-41 61 35-71 42Z" fill="#e9dfd1" />
        <path d="M90 177v93l60 35v-92Z" fill="#bfa57f" />
        <path d="m150 213 71-42v94l-71 40Z" fill="#a88d6b" />
        <path d="m90 177 60 36 71-42" stroke="#f4eadd" strokeWidth="1" />
      </g>
      <g className="geometry-form geometry-form-two">
        <path d="m167 108 72-42 62 36-73 42Z" fill="#f3eee6" />
        <path d="M167 108v163l61 36V144Z" fill="#dcd0bf" />
        <path d="m228 144 73-42v165l-73 40Z" fill="#c5b297" />
        <path d="m167 108 61 36 73-42" stroke="#fffaf4" strokeWidth="1" />
      </g>
      <g className="geometry-form geometry-form-three">
        <path d="m247 220 69-41 60 35-70 41Z" fill="#7e7467" />
        <path d="M247 220v78l59 35v-78Z" fill="#554d43" />
        <path d="m306 255 70-41v78l-70 41Z" fill="#393630" />
        <path d="m247 220 59 35 70-41" stroke="#978b7b" strokeWidth=".8" />
      </g>
    </svg>
  );
}
