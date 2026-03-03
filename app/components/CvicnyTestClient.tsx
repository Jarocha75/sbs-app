"use client";

import CvicnyTestBaseClient from "@/app/components/CvicnyTestBaseClient";
import type { QuizQuestion } from "@/types/dashboard";

const CvicnyTestClient = ({ questions }: { questions: QuizQuestion[] }) => (
  <CvicnyTestBaseClient
    questions={questions}
    totalSeconds={40 * 60}
    passMark={32}
    backHref="/testy/s"
    title="Cvičný test SBS — Typ S"
    subtitle="40 otázok · 40 minút"
  />
);

export default CvicnyTestClient;
