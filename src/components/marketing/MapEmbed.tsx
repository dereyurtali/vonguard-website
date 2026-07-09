interface MapEmbedProps {
  query?: string;
  title?: string;
}

export function MapEmbed({
  query = "Maslak, Sarıyer İstanbul",
  title = "VonGuard Türkiye — location",
}: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-surface">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6)" }}
      />
    </div>
  );
}
