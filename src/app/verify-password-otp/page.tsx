import { Suspense } from "react";
import OtpPage from "./OtpPage";
import LoadingSpinner from "@/components/LoadingSpinner";

// ✅ These are server-only exports
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function VerifyPasswordOtpPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OtpPage />
    </Suspense>
  );
}
