"use client";

import { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/data/colors";

const CvicnyTestCardP = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="col-span-1 sm:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: COLORS.accent,
                  color: COLORS.primary,
                }}
              >
                CVIČNÉ OTÁZKY
              </span>
            </div>
            <h3
              className="font-bold text-base"
              style={{ color: COLORS.primary }}
            >
              Cvičné otázky — Okruh 1
            </h3>
            <p className="text-sm text-gray-400 mt-0.5">40 otázok · 80 bodov</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="shrink-0 py-2.5 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity text-white"
            style={{ backgroundColor: COLORS.primary }}
          >
            Spustiť test
          </button>
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="py-6 px-7 text-center"
              style={{ backgroundColor: COLORS.primary }}
            >
              <h2 className="text-xl font-bold text-white">
                Cvičné otázky — Okruh 1
              </h2>
              <p className="text-sm mt-1" style={{ color: COLORS.accent }}>
                Preukaz typu P · Okruh 1
              </p>
            </div>

            {/* Modal body */}
            <div className="px-7 py-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Test obsahuje <strong>40 otázok</strong>. Maximálny počet bodov,
                ktoré je možné dosiahnuť je <strong>80</strong>. Na hodnotenie{" "}
                <strong>&quot;VYHOVEL&quot;</strong> potrebuje skúšaná osoba
                dosiahnuť najmenej 90&nbsp;% z celkového súčtu bodov, t.&nbsp;j.{" "}
                <strong style={{ color: COLORS.primary }}>
                  72 bodov (36 správnych odpovedí)
                </strong>
                .
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 rounded-xl font-semibold border-2 text-sm"
                  style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                >
                  Zrušiť
                </button>
                <Link
                  href="/testy/p/okruh-1"
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm text-center hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: COLORS.primary }}
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

export default CvicnyTestCardP;
