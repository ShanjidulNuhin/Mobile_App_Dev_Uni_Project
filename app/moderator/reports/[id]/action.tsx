
import { useReports, type ReportDecision } from "@/context/reports";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ModerationActionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { reports, resolveReport } = useReports();

  const [decision, setDecision] =
    useState<"Warned" | "Escalated">("Warned");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const report = reports.find((item) => item.id === id);

  if (!report) return <Text>Report not found.</Text>;

  const handleSubmit = () => {
    if (report.status !== "Open") return;

    const cleanReason = reason.trim();

    if (cleanReason.length < 10 || cleanReason.length > 500) {
      setError("Reason must contain 10 to 500 characters.");
      return;
    }

    resolveReport(
      report.id,
      decision as ReportDecision,
      cleanReason
    );

    router.replace("/moderator/reports");
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Moderation Action</Text>
      <Text style={styles.subtitle}>{report.title}</Text>

      {report.status !== "Open" ? (
        <Text>This report has already been processed.</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Select Action</Text>

          <View style={styles.options}>
            {(["Warned", "Escalated"] as const).map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.option,
                  decision === item && styles.selected,
                ]}
                onPress={() => setDecision(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    decision === item && styles.selectedText,
                  ]}
                >
                  {item === "Warned" ? "Warn User" : "Escalate to Admin"}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.hint}>
            {decision === "Warned"
              ? "Record a formal warning for the reported user."
              : "Flag this report for review by an administrator."}
          </Text>

          <Text style={styles.label}>Action Reason</Text>

          <TextInput
            style={styles.input}
            multiline
            maxLength={500}
            textAlignVertical="top"
            placeholder="Explain the moderation decision"
            value={reason}
            onChangeText={(value) => {
              setReason(value);
              setError("");
            }}
          />

          <Text style={styles.hint}>
            {reason.trim().length}/500 characters
          </Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={styles.submit}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Confirm Action</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FC" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 25, fontWeight: "700", color: "#111827" },
  subtitle: { color: "#6B7280", marginTop: 8, marginBottom: 22 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20 },
  label: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  options: { flexDirection: "row", gap: 10 },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DCE1E8",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#5145E5",
    borderColor: "#5145E5",
  },
  optionText: { color: "#374151", fontSize: 13, fontWeight: "600" },
  selectedText: { color: "#FFFFFF" },
  hint: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 14,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DCE1E8",
    borderRadius: 12,
    padding: 14,
    minHeight: 110,
    color: "#111827",
  },
  error: { color: "#DC2626", marginTop: 12 },
  submit: {
    backgroundColor: "#5145E5",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  submitText: { color: "#FFFFFF", fontWeight: "700" },
});
