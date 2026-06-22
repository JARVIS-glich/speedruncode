import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { getTracks } from "@/lib/queries/tracks";

export default async function OnboardingPage() {
  const tracks = await getTracks();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <OnboardingWizard tracks={tracks} />
    </div>
  );
}
