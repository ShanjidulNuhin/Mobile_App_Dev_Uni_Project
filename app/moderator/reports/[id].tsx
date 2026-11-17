
import { useReports } from "@/context/reports";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ReportDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { reports, resolveReport } = useReports();
  const [confirmRemove, setConfirmRemove] = useState(false);

  const report = reports.find((item) => item.id === id);

  if (!report) {
    return <Text>Report not found.</Text>;
  }

  const finish = (decision: "Dismissed" | "Removed") => {
    resolveReport(report.id, decision);
    router.replace("/moderator/reports");
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.info}>Report ID: {report.id}</Text>
        <Text style={styles.info}>Category: {report.category}</Text>
        <Text style={styles.info}>
          Reported User: {report.reportedUser}
        </Text>
        <Text style={styles.info}>
          Reported By: {report.reporter}
        </Text>
        <Text style={styles.info}>Status: {report.status}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Reported Content</Text>
        <Text style={styles.info}>{report.content}</Text>

        <Text style={[styles.heading, { marginTop: 20 }]}>
          Reason for Report
        </Text>
        <Text style={styles.info}>{report.reason}</Text>
      </View>

      {report.status === "Open" ? (
        <>
          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              router.push({
                pathname: "/moderator/reports/[id]/action",
                params: { id: report.id },
              })
            }
          >
            <Text style={styles.whiteText}>Warn or Escalate</Text>
          </Pressable>

          <Pressable
            style={styles.outlineButton}
            onPress={() => finish("Dismissed")}
          >
            <Text style={styles.outlineText}>Dismiss Report</Text>
          </Pressable>

          <Pressable
            style={styles.dangerOutline}
            onPress={() => setConfirmRemove(true)}
          >
            <Text style={styles.dangerText}>
              Remove Reported Content
            </Text>
          </Pressable>

          {confirmRemove && (
            <View style={styles.card}>
              <Text style={styles.heading}>Confirm Removal</Text>
              <Text style={styles.info}>
                This will mark the reported content as removed in
                the demo moderation records.
              </Text>

              <Pressable
                style={styles.dangerButton}
                onPress={() => finish("Removed")}
              >
                <Text style={styles.whiteText}>Confirm Remove</Text>
              </Pressable>

              <Pressable onPress={() => setConfirmRemove(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.info}>
          This report has already been processed.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FC" },
  content: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
  },
  title: { fontSize: 23, fontWeight: "700", color: "#111827" },
  heading: { fontSize: 17, fontWeight: "700", color: "#111827" },
  info: { color: "#4B5563", marginTop: 12, lineHeight: 22 },
  primaryButton: {
    backgroundColor: "#5145E5",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  outlineButton: {
    borderColor: "#5145E5",
    borderWidth: 1,
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  outlineText: { color: "#5145E5", fontWeight: "700" },
  dangerOutline: {
    borderColor: "#DC2626",
    borderWidth: 1,
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  dangerText: { color: "#DC2626", fontWeight: "700" },
  dangerButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  whiteText: { color: "#FFFFFF", fontWeight: "700" },
  cancel: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
    fontWeight: "600",
  },
});
