export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        zIndex: 50,
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}
