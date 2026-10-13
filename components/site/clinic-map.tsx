export function ClinicMap({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative h-[460px] overflow-hidden rounded-[32px] border border-border bg-secondary">
      <iframe
        title={title}
        src={src}
        className="absolute inset-x-0 top-0 h-[calc(100%+2.25rem)] w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        className="absolute right-3 bottom-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] text-foreground/70 shadow-sm"
      >
        © OpenStreetMap
      </a>
    </div>
  );
}
