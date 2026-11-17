
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

// Supported user roles
export type Role = "Student" | "Tutor" | "Moderator";

// Demo account structure
type Account = {
  fullName: string;
  email: string;
  password: string;
  role: Role;
};

// Authentication context structure
type AuthContextValue = {
  registerAccount: (account: Account) => void;
  authenticate: (email: string, password: string) => Role | null;
  currentRole: Role | null;
  logout: () => void;
};

// Create authentication context
const AuthContext = createContext<AuthContextValue | null>(null);

// Authentication provider
export function DemoAuthProvider({
  children,
}: PropsWithChildren) {
  // Store the most recently registered demo account
  const [account, setAccount] = useState<Account | null>(null);

  // Track the currently logged-in user's role
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  // Register a new demo account
  const registerAccount = (newAccount: Account) => {
    setAccount({
      ...newAccount,
      email: newAccount.email.trim().toLowerCase(),
    });
  };

  // Authenticate a user
  const authenticate = (
    email: string,
    password: string
  ): Role | null => {
    const normalizedEmail = email.trim().toLowerCase();

    let matchedRole: Role | null = null;

    // Built-in Moderator demo account
    if (
      normalizedEmail === "moderator@pathsathi.test" &&
      password === "Demo1234"
    ) {
      matchedRole = "Moderator";
    }

    // Check registered demo account
    else if (
      account &&
      account.email.toLowerCase() === normalizedEmail &&
      account.password === password
    ) {
      matchedRole = account.role;
    }

    // Update the active login session
    setCurrentRole(matchedRole);

    return matchedRole;
  };

  // Log out the current user
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

// Custom hook to access authentication
export function useDemoAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useDemoAuth must be used inside DemoAuthProvider."
    );
  }

  return context;
}
