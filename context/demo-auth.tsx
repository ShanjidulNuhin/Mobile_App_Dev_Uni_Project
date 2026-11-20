import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Platform } from "react-native";

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
  registerAccount: (account: Account) => Promise<void>;
  authenticate: (email: string, password: string) => Role | null;
  currentRole: Role | null;
  currentUser: SignedInUser | null;
  authReady: boolean;
  logout: () => void;
};

const STORAGE_KEY = "pathsathi-demo-accounts-v1";

const getStoredData = async (
  key: string
): Promise<string | null> => {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  }

  return SecureStore.getItemAsync(key);
};

const saveStoredData = async (
  key: string,
  value: string
): Promise<void> => {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") {
      throw new Error("Browser storage is unavailable.");
    }

    window.localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
};


const AuthContext = createContext<AuthContextValue | null>(null);

export function DemoAuthProvider({
  children,
}: PropsWithChildren) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentUser, setCurrentUser] =
    useState<SignedInUser | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Load previously registered accounts when the app starts.
  useEffect(() => {
    let active = true;

    const loadAccounts = async () => {
      try {
      const saved = await getStoredData(STORAGE_KEY);

        if (saved && active) {
          const parsed: unknown = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setAccounts(parsed as Account[]);
          }
        }
      } catch (error) {
        console.warn("Could not load demo accounts:", error);
      } finally {
        if (active) {
          setAuthReady(true);
        }
      }
    };

    void loadAccounts();

    return () => {
      active = false;
    };
  }, []);

  // Save new registrations permanently on this device.
  const registerAccount = async (newAccount: Account) => {
    if (!authReady) {
      throw new Error("Accounts are still loading.");
    }

    const normalizedEmail =
      newAccount.email.trim().toLowerCase();

    const alreadyExists = accounts.some(
      (item) => item.email === normalizedEmail
    );

    if (alreadyExists) {
      throw new Error(
        "This email is already registered. Please sign in."
      );
    }

    const updatedAccounts: Account[] = [
      ...accounts,
      {
        ...newAccount,
        fullName: newAccount.fullName.trim(),
        email: normalizedEmail,
      },
    ];


    await saveStoredData(
  STORAGE_KEY,
  JSON.stringify(updatedAccounts)
);

    const savedData = await getStoredData(STORAGE_KEY);

    if (!savedData) {
      throw new Error(
        "Account could not be verified in device storage."
      );
    }

    setAccounts(updatedAccounts);


    setAccounts(updatedAccounts);
  };

  // Check saved credentials.
  const authenticate = (
    email: string,
    password: string
  ): Role | null => {
    if (!authReady) return null;

    const normalizedEmail = email.trim().toLowerCase();

    let signedIn: SignedInUser | null = null;

    // Built-in Moderator demo account.
    if (
      normalizedEmail === "moderator@pathsathi.test" &&
      password === "Demo1234"
    ) {
      signedIn = {
        fullName: "Demo Moderator",
        email: normalizedEmail,
        role: "Moderator",
      };
    } else {
      const account = accounts.find(
        (item) =>
          item.email === normalizedEmail &&
          item.password === password
      );

      if (account) {
        signedIn = {
          fullName: account.fullName,
          email: account.email,
          role: account.role,
        };
      }
    }

    setCurrentUser(signedIn);

    return signedIn?.role ?? null;
  };

  // Log out without deleting registered accounts.
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
        authReady,
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
