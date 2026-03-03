"use client";

import CvicnyTestBaseClient from "@/app/components/CvicnyTestBaseClient";
import type { QuizQuestion } from "@/types/dashboard";

const CvicnyTestPClient = ({ questions }: { questions: QuizQuestion[] }) => (
  <CvicnyTestBaseClient
    questions={questions}
    totalSeconds={50 * 60}
    passMark={45}
    backHref="/testy/p"
    title="Cvičný test SBS — Typ P"
    subtitle="50 otázok · 50 minút"
  />
);

export default CvicnyTestPClient;
