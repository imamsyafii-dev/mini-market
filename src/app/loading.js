export default function Loading() {
  return (
    <section className="page-loading" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat halaman...</p>

      <div className="loading-hero skeleton" aria-hidden="true" />
      <div className="loading-heading skeleton" aria-hidden="true" />

      <div className="loading-grid" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="loading-card skeleton" />
        ))}
      </div>
    </section>
  );
}