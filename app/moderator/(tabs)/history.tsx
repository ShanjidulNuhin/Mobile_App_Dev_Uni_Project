
import ModulePage from "@/components/moderator/module-page";
import { useModeration } from "@/context/moderation";
import { useReports } from "@/context/reports";

export default function ModerationHistory() {
  const { history } = useModeration();
  const { reportHistory } = useReports();

 const tutorItems = history.map((record) => ({
  title: `${record.action}: ${record.name}`,
  description:
    `Tutor Verification | ${record.date}` +
    (record.reason ? `\nReason: ${record.reason}` : ""),
  timestamp: record.timestamp,
}));

  const reportItems = reportHistory.map((record) => ({
  title: `${record.decision}: ${record.title}`,
  description:
    `Report ${record.reportId} | ${record.date}` +
    (record.reason ? `\nReason: ${record.reason}` : ""),
  timestamp: record.timestamp,
}));

  const allItems = [...reportItems, ...tutorItems]
  .sort((a, b) => b.timestamp - a.timestamp)
  .map(({ title, description }) => ({
    title,
    description,
  }));;

  return (
    <ModulePage
      title="Moderation History"
      subtitle="Recorded tutor and content moderation decisions."
      items={
        allItems.length > 0
          ? allItems
          : [
              {
                title: "No actions recorded",
                description:
                  "Approved, rejected, dismissed, removed, warned, and escalated actions will appear here.",
              },
            ]
      }
    />
  );
}
