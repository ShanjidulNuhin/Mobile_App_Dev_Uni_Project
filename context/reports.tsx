
import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";

export type ReportDecision =
  | "Dismissed"
  | "Removed"
  | "Warned"
  | "Escalated";

export type Report = {
  id: string;
  title: string;
  category: string;
  reportedUser: string;
  reporter: string;
  content: string;
  reason: string;
  status: "Open" | ReportDecision;
};

export type ReportLog = {
  id: string;
  reportId: string;
  title: string;
  decision: ReportDecision;
  reason: string;
  date: string;
};

const initialReports: Report[] = [
  {
    id: "R-201",
    title: "Misleading Tutor Advertisement",
    category: "False Information",
    reportedUser: "Tutor Demo Account",
    reporter: "Student Demo Account",
    content: "Guaranteed A+ results for every student.",
    reason: "The advertised guarantee is misleading.",
    status: "Open",
  },
  {
    id: "R-202",
    title: "Inappropriate Tuition Post",
    category: "Inappropriate Content",
    reportedUser: "Student Demo Account 2",
    reporter: "Tutor Demo Account 2",
    content: "A tuition advertisement containing insulting language.",
    reason: "The post contains inappropriate language.",
    status: "Open",
  },
];

type ReportsContextValue = {
  reports: Report[];
  reportHistory: ReportLog[];
  resolveReport: (
    id: string,
    decision: ReportDecision,
    reason?: string
  ) => void;
};

const ReportsContext = createContext<ReportsContextValue | null>(null);

export function ReportsProvider({ children }: PropsWithChildren) {
  const [reports, setReports] = useState(initialReports);
  const [reportHistory, setReportHistory] = useState<ReportLog[]>([]);

  const resolveReport = (
    id: string,
    decision: ReportDecision,
    reason = ""
  ) => {
    const report = reports.find(
      (item) => item.id === id && item.status === "Open"
    );

    if (!report) return;

    setReports((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: decision } : item
      )
    );

    setReportHistory((current) => [
      {
        id: `${Date.now()}-${id}`,
        reportId: id,
        title: report.title,
        decision,
        reason,
        date: new Date().toLocaleString(),
      },
      ...current,
    ]);
  };

  return (
    <ReportsContext.Provider
      value={{ reports, reportHistory, resolveReport }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);

  if (!context) {
    throw new Error("ReportsProvider is missing.");
  }

  return context;
}
