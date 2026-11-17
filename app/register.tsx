
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >            <Text style={styles.title}>Join PathSathi</Text>

            <Text style={styles.subtitle}>
                Create your PathSathi account
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Create Account</Text>

                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="words"
                    value={fullName}
                    onChangeText={setFullName}
                />

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
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#5145E5",
    },
    subtitle: {
        fontSize: 16,
        color: "#4B5563",
        marginTop: 12,
        marginBottom: 30,
    },
    link: {
        fontSize: 16,
        color: "#5145E5",
        fontWeight: "600",
        textAlign: "center",
    },

    card: {
        width: "100%",
        maxWidth: 430,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        height: 54,
        backgroundColor: "#F7F8FC",
        borderWidth: 1,
        borderColor: "#DCE1E8",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#111827",
    },

});
