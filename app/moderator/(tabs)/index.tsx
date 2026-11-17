
import ModulePage from "@/components/moderator/module-page";
import { useModeration } from "@/context/moderation";
import { useReports } from "@/context/reports";

export default function ModeratorDashboard() {
  const { tutors, history } = useModeration();
  const { reports, reportHistory } = useReports();

  const pendingTutors = tutors.filter(
    (item) => item.status === "Pending"
  ).length;

  const openReports = reports.filter(
    (item) => item.status === "Open"
  ).length;

  const totalActions = history.length + reportHistory.length;

  return (
    <ModulePage
      title="Moderator Dashboard"
      subtitle="Welcome to the PathSathi moderation panel."
      items={[
        {
          title: `${pendingTutors} Pending Verifications`,
          description: "Tutor applications awaiting review.",
        },
        {
          title: `${openReports} Open Reports`,
          description: "Reported content awaiting moderation.",
        },
        {
          title: `${totalActions} Actions Recorded`,
          description: "Moderation decisions in this session.",
        },
      ]}
    />
  );
}
