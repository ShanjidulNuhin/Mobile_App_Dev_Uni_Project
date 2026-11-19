import { type Role, useDemoAuth } from "@/context/demo-auth";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from "react-native";

// type Role = "Student" | "Tutor";

export default function RegisterScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<Role>("Student");
    const [error, setError] = useState("");
    //   const [success, setSuccess] = useState("");
    const router = useRouter();
    const { registerAccount, authReady } = useDemoAuth();
    const handleRegister = async () => {
        if (!authReady) {
            setError("Please wait while accounts load.");
            return;
        }
        setError("");

        if (fullName.trim().length < 2) {
            setError("Please enter your full name.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError("Please enter a valid email.");
            return;
        }

        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
            setError("Enter a valid phone number.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // setSuccess(
        //   `${role} registration form validated successfully!`
        // );

        try {
            await registerAccount({
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                password,
                role,
            });

            router.replace({
                pathname: "/login",
                params: { registered: "1" },
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed."
            );
        }

        router.replace({
            pathname: "/login",
            params: { registered: "1" },
        });
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.logo}>
                <Text style={styles.logoText}>P</Text>
            </View>

            <Text style={styles.title}>Join PathSathi</Text>
            <Text style={styles.subtitle}>
                Create your PathSathi account
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Create Account</Text>

                <Text style={styles.label}>Register as</Text>

                <View style={styles.roleRow}>
                    {(["Student", "Tutor", "Moderator"] as const).map((item) => (<Pressable
                        key={item}
                        style={[
                            styles.roleButton,
                            role === item && styles.selectedRole,
                        ]}
                        onPress={() => setRole(item)}
                    >
                        <Text
                            style={[
                                styles.roleText,
                                role === item && styles.selectedRoleText,
                            ]}
                        >
                            {item}
                        </Text>
                    </Pressable>
                    ))}
                </View>

                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Minimum 6 characters"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter your password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}

                {/* {success ? (
          <Text style={styles.success}>{success}</Text>
        ) : null} */}

                <Pressable
                    style={styles.submitButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.submitText}>
                        Create Account
                    </Text>
                </Pressable>
            </View>

            <Link href="/login" style={styles.link}>
                Already have an account? Sign In
            </Link>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F7F8FC",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    logo: {
        width: 70,
        height: 70,
        backgroundColor: "#5145E5",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    logoText: {
        color: "#FFFFFF",
        fontSize: 42,
        fontWeight: "bold",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#5145E5",
    },
    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        marginTop: 8,
        marginBottom: 24,
    },
    card: {
        width: "100%",
        maxWidth: 430,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginTop: 18,
        marginBottom: 8,
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#DCE1E8",
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 15,
        color: "#111827",
    },
    roleRow: {
        flexDirection: "row",
        gap: 12,
    },
    roleButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#DCE1E8",
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
    },
    selectedRole: {
        backgroundColor: "#5145E5",
        borderColor: "#5145E5",
    },
    roleText: {
        color: "#374151",
        fontWeight: "600",
        fontSize: 13,
    },
    selectedRoleText: {
        color: "#FFFFFF",
    },
    submitButton: {
        backgroundColor: "#5145E5",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 24,
    },
    submitText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    error: {
        color: "#DC2626",
        marginTop: 14,
    },
    success: {
        color: "#16803C",
        marginTop: 14,
    },
    link: {
        color: "#5145E5",
        fontWeight: "600",
        marginTop: 24,
        marginBottom: 20,
        textAlign: "center",
    },
});
// function registerAccount(arg0: { fullName: string; email: string; password: string; role: Role; }) {
//     throw new Error("Function not implemented.");
//}

