import Link from "next/link";
import KontaktFormular from "@/app/components/KontaktFormular";
import { COLORS } from "@/data/colors";
import {
  HERO,
  TERMINY_SECTION,
  KONTAKT_SECTION,
  vyhody,
  kurzTerminy,
  kontaktLinks,
} from "@/data/home";

const HomePage = () => {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
        style={{ backgroundColor: COLORS.primary }}
      >
        {/* Dekoratívne kruhy */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full opacity-10"
          style={{ backgroundColor: COLORS.accent }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-100 w-100 rounded-full opacity-10"
          style={{ backgroundColor: COLORS.accent }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
          {/* Badge */}
          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            {HERO.badge}
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {HERO.title}{" "}
            <span style={{ color: COLORS.accent }}>{HERO.titleHighlight}</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            {HERO.description}
            <br className="hidden sm:block" />
            <span className="mt-2 block">{HERO.descriptionCta}</span>
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#terminy"
              className="w-full rounded-xl px-8 py-4 text-base font-bold tracking-wide transition-opacity hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              {HERO.ctaTerminy}
            </a>
            <a
              href="#kontakt"
              className="w-full rounded-xl border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              {HERO.ctaKontakt}
            </a>
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
              fill={COLORS.pageBg}
            />
          </svg>
        </div>
      </section>

      {/* ── VÝHODY ── */}
      <section style={{ backgroundColor: COLORS.pageBg }} className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {vyhody.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-7 text-center shadow-sm"
              >
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3
                  className="mb-2 text-base font-bold"
                  style={{ color: COLORS.primary }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMÍNY ── */}
      <section
        id="terminy"
        style={{ backgroundColor: COLORS.pageBg }}
        className="pb-20 pt-4"
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2
            className="mb-2 text-center text-3xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            {TERMINY_SECTION.title}
          </h2>
          <p className="mb-10 text-center text-sm text-gray-500">
            {TERMINY_SECTION.subtitle}
          </p>

          <div className="grid grid-cols-1 gap-6">
            {kurzTerminy.map((kurz) => (
              <div
                key={kurz.typ}
                className="flex flex-col items-start justify-between gap-5 rounded-2xl border bg-white p-7 shadow-sm sm:flex-row sm:items-center"
                style={{ borderColor: COLORS.accent + "40" }}
              >
                {/* Typ kurzu */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-black"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
                  {kurz.typ}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p
                    className="mb-1 text-base font-bold"
                    style={{ color: COLORS.primary }}
                  >
                    {kurz.nazov}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Termín:</span> {kurz.od} –{" "}
                    {kurz.do}
                  </p>
                </div>

                {/* Voľné miesta */}
                <div className="text-right">
                  <p className="text-xs text-gray-400">Voľné miesta</p>
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: COLORS.accent }}
                  >
                    {kurz.miesta}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="#kontakt"
                  className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.primary,
                  }}
                >
                  {TERMINY_SECTION.ctaPrihlasit}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            {TERMINY_SECTION.footnote}
          </p>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section
        id="kontakt"
        className="py-20"
        style={{ backgroundColor: COLORS.subtleBg }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2
            className="mb-2 text-center text-3xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            {KONTAKT_SECTION.title}
          </h2>
          <p className="mb-10 text-center text-sm text-gray-500">
            {KONTAKT_SECTION.subtitle}
          </p>

          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <KontaktFormular />
          </div>

          {/* Alternatívy */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-gray-500">
            <p>{KONTAKT_SECTION.altText}</p>
            <div className="flex flex-wrap justify-center gap-6">
              {kontaktLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium underline underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: COLORS.primary }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
