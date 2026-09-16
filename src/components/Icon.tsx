export type IconName = "arrow" | "diagonal" | "close";

const paths = {
  arrow: "M4 12h15M13 6l6 6-6 6",
  diagonal: "M6 18 18 6M6 6h12v12",
  close: "m6 6 12 12M6 18 18 6",
};

export default function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
