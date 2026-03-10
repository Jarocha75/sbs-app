const Loading = () => {
  return (
    <main>
      {/* ── HERO skeleton ── */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-primary">
        <div className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full opacity-10 bg-accent" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-100 w-100 rounded-full opacity-10 bg-accent" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mb-6 inline-block h-7 w-48 rounded-full animate-wave" />
          <div className="mx-auto mb-3 h-12 w-3/4 rounded-xl animate-wave" />
          <div className="mx-auto mb-10 h-12 w-1/2 rounded-xl animate-wave" />
          <div className="mx-auto mb-2 h-5 w-2/3 rounded animate-wave opacity-60" />
          <div className="mx-auto mb-10 h-5 w-1/2 rounded animate-wave opacity-60" />
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="h-14 w-full rounded-xl animate-wave sm:w-48" />
            <div className="h-14 w-full rounded-xl animate-wave opacity-60 sm:w-44" />
          </div>
        </div>

        {/* Vlna */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: 60 }}
          >
            <path
              d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z"
              fill="var(--color-page-bg)"
            />
          </svg>
        </div>
      </section>

      {/* ── VÝHODY skeleton ── */}
      <section className="bg-page-bg py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-white p-7 text-center shadow-sm">
                <div className="mx-auto mb-3 h-10 w-10 rounded-full animate-wave" />
                <div className="mx-auto mb-2 h-5 w-3/4 rounded animate-wave" />
                <div className="mx-auto mb-1 h-4 w-full rounded animate-wave" />
                <div className="mx-auto h-4 w-2/3 rounded animate-wave" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMÍNY skeleton ── */}
      <section className="bg-page-bg pb-20 pt-4">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-2 h-9 w-64 rounded-xl animate-wave" />
          <div className="mx-auto mb-10 h-4 w-48 rounded animate-wave" />

          <div className="grid grid-cols-1 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="h-14 w-14 shrink-0 rounded-xl animate-wave" />
                <div className="flex-1">
                  <div className="mb-2 h-5 w-48 rounded animate-wave" />
                  <div className="h-4 w-36 rounded animate-wave" />
                </div>
                <div className="text-right">
                  <div className="mb-1 h-3 w-20 rounded animate-wave" />
                  <div className="h-8 w-12 rounded animate-wave" />
                </div>
                <div className="h-11 w-36 shrink-0 rounded-xl animate-wave" />
              </div>
            ))}
          </div>

          <div className="mt-6 mx-auto h-3 w-64 rounded animate-wave" />
        </div>
      </section>

      {/* ── KONTAKT skeleton ── */}
      <section className="py-12 bg-subtle-bg">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mx-auto mb-2 h-9 w-56 rounded-xl animate-wave" />
          <div className="mx-auto mb-6 h-4 w-72 rounded animate-wave" />

          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <div className="space-y-4">
              <div className="h-11 w-full rounded-lg animate-wave" />
              <div className="h-11 w-full rounded-lg animate-wave" />
              <div className="h-28 w-full rounded-lg animate-wave" />
              <div className="h-11 w-full rounded-lg animate-wave" />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="h-4 w-48 rounded animate-wave" />
            <div className="flex gap-6">
              <div className="h-4 w-24 rounded animate-wave" />
              <div className="h-4 w-24 rounded animate-wave" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;
