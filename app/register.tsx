
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join PathSathi</Text>

            <Text style={styles.subtitle}>
                Create your PathSathi account
            </Text>

            <Link href="/login" style={styles.link}>
                Already have an account? Sign In
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});
