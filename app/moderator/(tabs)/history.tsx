
import ModulePage from "@/components/moderator/module-page";

export default function ModerationHistory() {
  return (
    <ModulePage
      title="Moderation History"
      subtitle="Review previous moderation decisions."
      items={[
        {
          title: "No actions recorded",
          description:
            "Approved, rejected, warned, and escalated decisions will appear here.",
        },
      ]}
    />
  );
}
