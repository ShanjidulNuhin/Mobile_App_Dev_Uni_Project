
import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";

export type Role = "Student" | "Tutor" | "Moderator";

type Account = {
  fullName: string;
  email: string;
  password: string;
  role: Role;
};

type AuthContextValue = {
  registerAccount: (account: Account) => void;
  authenticate: (email: string, password: string) => Role | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function DemoAuthProvider({ children }: PropsWithChildren) {
  const [account, setAccount] = useState<Account | null>(null);

  const registerAccount = (newAccount: Account) => {
    setAccount(newAccount);
  };

  const authenticate = (email: string, password: string): Role | null => {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail === "moderator@pathsathi.test" &&
      password === "Demo1234"
    ) {
      return "Moderator";
    }

    if (
      account &&
      account.email.toLowerCase() === normalizedEmail &&
      account.password === password
    ) {
      return account.role;
    }

    return null;
  };

  return (
    <AuthContext.Provider value={{ registerAccount, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("DemoAuthProvider is missing.");
  }

  return context;
}
