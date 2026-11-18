
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

export type SignedInUser = {
  fullName: string;
  email: string;
  role: Role;
};

type AuthContextValue = {
  registerAccount: (account: Account) => void;
  authenticate: (email: string, password: string) => Role | null;
  currentRole: Role | null;
  currentUser: SignedInUser | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function DemoAuthProvider({
  children,
}: PropsWithChildren) {
  const [account, setAccount] = useState<Account | null>(null);

  const [currentUser, setCurrentUser] =
    useState<SignedInUser | null>(null);

  const registerAccount = (newAccount: Account) => {
    setAccount({
      ...newAccount,
      fullName: newAccount.fullName.trim(),
      email: newAccount.email.trim().toLowerCase(),
    });
  };

  const authenticate = (
    email: string,
    password: string
  ): Role | null => {
    const normalizedEmail = email.trim().toLowerCase();

    let signedIn: SignedInUser | null = null;

    if (
      normalizedEmail === "moderator@pathsathi.test" &&
      password === "Demo1234"
    ) {
      signedIn = {
        fullName: "Demo Moderator",
        email: normalizedEmail,
        role: "Moderator",
      };
    } else if (
      account &&
      account.email === normalizedEmail &&
      account.password === password
    ) {
      signedIn = {
        fullName: account.fullName,
        email: account.email,
        role: account.role,
      };
    }

    setCurrentUser(signedIn);

    return signedIn?.role ?? null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        registerAccount,
        authenticate,
        currentRole: currentUser?.role ?? null,
        currentUser,
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
