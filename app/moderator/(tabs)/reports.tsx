
import ModulePage from "@/components/moderator/module-page";

export default function ReportsScreen() {
  return (
    <ModulePage
      title="Reported Content"
      subtitle="Review reports submitted by users."
      items={[
        {
          title: "Report R-201",
          description: "Misleading tutor advertisement. Status: Open.",
        },
        {
          title: "Report R-202",
          description: "Inappropriate post content. Status: Open.",
        },
      ]}
    />
  );
}
