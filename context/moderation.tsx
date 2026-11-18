
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export type TutorStatus = "Pending" | "Approved" | "Rejected";

export type Tutor = {
  id: string;
  name: string;
  subject: string;
  area: string;
  education: string;
  experience: string;
  status: TutorStatus;
};

export type ModerationRecord = {
  id: string;
  name: string;
  action: "Approved" | "Rejected";
  reason: string;
  date: string;
  timestamp: number;
};

type ModerationContextType = {
  tutors: Tutor[];
  history: ModerationRecord[];
  decideTutor: (
    id: string,
    action: "Approved" | "Rejected",
    reason?: string
  ) => void;
};

const initialTutors: Tutor[] = [
  {
    id: "T-101",
    name: "Amina Rahman",
    subject: "Mathematics",
    area: "Dhanmondi",
    education: "BSc in Mathematics",
    experience: "3 years",
    status: "Pending",
  },
  {
    id: "T-102",
    name: "Rafi Ahmed",
    subject: "English",
    area: "Mirpur",
    education: "BA in English",
    experience: "2 years",
    status: "Pending",
  },
  {
    id: "T-103",
    name: "Nusrat Jahan",
    subject: "Physics",
    area: "Uttara",
    education: "BSc in Physics",
    experience: "4 years",
    status: "Pending",
  },
];

const ModerationContext =
  createContext<ModerationContextType | null>(null);

export function ModerationProvider({
  children,
}: PropsWithChildren) {
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors);

  const [history, setHistory] = useState<ModerationRecord[]>([]);

  const decideTutor = (
    id: string,
    action: "Approved" | "Rejected",
    reason = ""
  ) => {
    const tutor = tutors.find(
      (item) => item.id === id && item.status === "Pending"
    );

    if (!tutor) return;

    setTutors((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: action } : item
      )
    );

    setHistory((previous) => [
      {
        id: `${Date.now()}`,
        name: tutor.name,
        action,
        reason,
        date: new Date().toLocaleString(),
        timestamp: Date.now(),
      },
      ...previous,
    ]);
  };

  return (
    <ModerationContext.Provider
      value={{ tutors, history, decideTutor }}
    >
      {children}
    </ModerationContext.Provider>
  );
}

export function useModeration() {
  const context = useContext(ModerationContext);

  if (!context) {
    throw new Error("ModerationProvider is missing");
  }

  return context;
}
