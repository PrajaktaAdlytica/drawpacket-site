import { useEffect, useRef } from "react";
export function Icon({ name = "arrow-right", className = "" }) {
  return (
    <img
      className={`icon ${className}`}
      src={`/brand/icons/${name}.svg`}
      width="20"
      height="20"
      alt=""
      aria-hidden="true"
    />
  );
}
export function Button({
  children,
  secondary = false,
  onClick,
  href,
  icon = "arrow-right",
  className = "",
  ...props
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      href={href}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </Tag>
  );
}
export function Kicker({ children }) {
  return <p className="kicker">{children}</p>;
}
export function DemoLabel() {
  return <span className="demo-label">Demo — synthetic data</span>;
}
export function ChapterTop({ number, title, dark = false }) {
  return (
    <div className={`chapter-top ${dark ? "inverse" : ""}`}>
      <span className="chapter-index">
        {number} <span>/ 10</span>
      </span>
      <span>{title}</span>
      <span className="chapter-line" />
    </div>
  );
}
export function Dialog({ children, title, onClose, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d.open) d.showModal();
  }, []);
  const close = () => {
    ref.current.close();
    onClose();
  };
  return (
    <dialog
      ref={ref}
      className={`dialog ${wide ? "wide" : ""}`}
      onClose={onClose}
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
      aria-label={title}
    >
      <div className="dialog-top">
        <span className="kicker">
          {wide
            ? "DrawPacket / Demo — synthetic data"
            : "DrawPacket / concept preview"}
        </span>
        <button
          className="icon-button"
          onClick={close}
          aria-label="Close dialog"
        >
          <Icon name="x" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
