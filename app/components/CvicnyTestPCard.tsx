"use client";

import { useState } from "react";
import Link from "next/link";

const CvicnyTestPCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <article className="col-span-1 sm:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent text-primary">
                CVIČNÝ TEST
              </span>
            </div>
            <h3 className="font-bold text-base text-primary">
              Cvičný test SBS — Typ P
            </h3>
            <p className="text-sm text-gray-400 mt-0.5">
              50 otázok · 50 minút · 100 bodov
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="shrink-0 py-2.5 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity text-white bg-primary"
          >
            Spustiť test
          </button>
        </div>
      </article>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <header className="py-6 px-7 text-center bg-primary">
              <h2 className="text-xl font-bold text-white">
                Cvičný test SBS — Typ P
              </h2>
              <p className="text-sm mt-1 text-accent">
                Cvičný test na skúšku odbornej spôsobilosti
              </p>
            </header>

            {/* Modal body */}
            <div className="px-7 py-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Test obsahuje <strong>50 otázok</strong>. Maximálny počet bodov,
                ktoré je možné dosiahnuť je <strong>100</strong>. Na hodnotenie{" "}
                <strong>&quot;VYHOVEL&quot;</strong> potrebuje skúšaná osoba
                dosiahnuť najmenej 90&nbsp;% z celkového súčtu bodov, t.&nbsp;j.{" "}
                <strong className="text-primary">
                  90 bodov (45 správnych odpovedí)
                </strong>
                .
              </p>

              <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm font-medium bg-subtle-bg text-primary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6v6l4 2"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Čas na vypracovanie: <strong>50 minút</strong>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-500 text-sm"
                >
                  Zrušiť
                </button>
                <Link
                  href="/testy/p/cvicny-test"
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm text-center hover:opacity-90 transition-opacity bg-primary"
                >
                  Štart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CvicnyTestPCard;
