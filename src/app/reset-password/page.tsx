import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
