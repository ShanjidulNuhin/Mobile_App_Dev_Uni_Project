
import ModulePage from "@/components/moderator/module-page";

export default function VerificationScreen() {
  return (
    <ModulePage
      title="Tutor Verification"
      subtitle="Review pending tutor applications."
      items={[
        {
          title: "Application T-101",
          description: "Mathematics tutor. Status: Pending.",
        },
        {
          title: "Application T-102",
          description: "English tutor. Status: Pending.",
        },
        {
          title: "Application T-103",
          description: "Physics tutor. Status: Pending.",
        },
      ]}
    />
  );
}
