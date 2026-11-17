
import ModulePage from "@/components/moderator/module-page";

export default function ModeratorDashboard() {
  return (
    <ModulePage
      title="Moderator Dashboard"
      subtitle="Welcome to the PathSathi moderation panel."
      items={[
        {
          title: "3 Pending Verifications",
          description: "Tutor applications awaiting review.",
        },
        {
          title: "2 Open Reports",
          description: "Reported content requiring moderation.",
        },
        {
          title: "0 Actions Today",
          description: "No moderation decisions recorded yet.",
        },
      ]}
    />
  );
}
