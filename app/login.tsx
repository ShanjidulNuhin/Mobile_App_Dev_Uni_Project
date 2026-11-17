import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
const { registered } = useLocalSearchParams<{
  registered?: string;
}>();

    const handleSignIn = () => {
        const cleanEmail = email.trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setError("Please enter a valid email address.");
            setMessage("");
            return;
        }

        if (password.trim().length === 0) {
            setError("Password is required.");
            setMessage("");
            return;
        }

       
if (
  cleanEmail.toLowerCase() === "moderator@pathsathi.test" &&
  password === "Demo1234"
) {
  setError("");
  setMessage("");
  router.replace("/moderator");
  return;
}

setError("Only the Moderator demo account is available.");
setMessage("");

    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>P</Text>
            </View>

            <Text style={styles.appName}>PathSathi</Text>
            <Text style={styles.subtitle}>
                Your trusted tutor-matching platform
            </Text>

            <View style={styles.card}>
                <Text style={styles.heading}>Welcome back</Text>
                <Text style={styles.description}>
                    Sign in to your account
                </Text>

                {registered === "1" && (
  <Text style={styles.successText}>
    Registration successful. Please sign in.
  </Text>
)}

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}

                {message ? (
                    <Text style={styles.successText}>{message}</Text>
                ) : null}

                <Pressable
                    style={styles.signInButton}
                    onPress={handleSignIn}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </Pressable>
                <Link href="/register" style={styles.registerLink}>
    Create a new account
</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    logo: {
        width: 90,
        height: 90,
        backgroundColor: "#5145E5",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },
    logoText: {
        fontSize: 54,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    appName: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#5145E5",
    },
    subtitle: {
        fontSize: 16,
        color: "#4B5563",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: 28,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#111827",
    },
    description: {
        fontSize: 16,
        color: "#4B5563",
        marginTop: 10,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
        marginTop: 24,
        marginBottom: 10,
    },
    input: {
        height: 56,
        backgroundColor: "#F7F8FC",
        borderWidth: 1,
        borderColor: "#DCE1E8",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#111827",
    },

    signInButton: {
        backgroundColor: "#5145E5",
        height: 56,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
    },
    signInButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },
    errorText: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 12,
    },
    successText: {
        color: "#16803C",
        fontSize: 13,
        marginTop: 12,
    },
registerLink: {
    marginTop: 22,
    color: "#5145E5",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
},
});
