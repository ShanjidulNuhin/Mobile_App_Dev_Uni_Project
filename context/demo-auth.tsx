
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
  currentRole: Role | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function DemoAuthProvider({
  children,
}: PropsWithChildren) {
  const [account, setAccount] = useState<Account | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  const registerAccount = (newAccount: Account) => {
    setAccount({
      ...newAccount,
      email: newAccount.email.trim().toLowerCase(),
    });
  };

  const authenticate = (
    email: string,
    password: string
  ): Role | null => {
    const normalizedEmail = email.trim().toLowerCase();

    let matchedRole: Role | null = null;

    if (
      normalizedEmail === "moderator@pathsathi.test" &&
      password === "Demo1234"
    ) {
      matchedRole = "Moderator";
    } else if (
      account &&
      account.email.toLowerCase() === normalizedEmail &&
      account.password === password
    ) {
      matchedRole = account.role;
    }

    setCurrentRole(matchedRole);

    return matchedRole;
  };

  const logout = () => {
    setCurrentRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        registerAccount,
        authenticate,
        currentRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useDemoAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("DemoAuthProvider is missing.");
  }

  return context;
}
