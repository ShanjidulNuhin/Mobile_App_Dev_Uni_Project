
import { useModeration } from "@/context/moderation";
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

export default function TutorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tutors, decideTutor } = useModeration();

  const [showRejectForm, setShowRejectForm] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const tutor = tutors.find((item) => item.id === id);

  if (!tutor) {
    return <Text>Application not found.</Text>;
  }

  const handleApprove = () => {
    decideTutor(tutor.id, "Approved");
    router.back();
  };

  const handleReject = () => {
    const cleanReason = reason.trim();

    if (cleanReason.length < 10 || cleanReason.length > 500) {
      setError("Reason must contain 10 to 500 characters.");
      return;
    }

    decideTutor(tutor.id, "Rejected", cleanReason);
    router.back();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.card}>
        <Text style={styles.name}>{tutor.name}</Text>

        <Text style={styles.info}>ID: {tutor.id}</Text>
        <Text style={styles.info}>Subject: {tutor.subject}</Text>
        <Text style={styles.info}>Area: {tutor.area}</Text>
        <Text style={styles.info}>Education: {tutor.education}</Text>
        <Text style={styles.info}>Experience: {tutor.experience}</Text>
        <Text style={styles.info}>Status: {tutor.status}</Text>
      </View>

      {tutor.status === "Pending" && (
        <>
          <Pressable
            style={styles.approveButton}
            onPress={handleApprove}
          >
            <Text style={styles.whiteText}>Approve Tutor</Text>
          </Pressable>

          <Pressable
            style={styles.rejectButton}
            onPress={() => setShowRejectForm(!showRejectForm)}
          >
            <Text style={styles.rejectText}>Reject Application</Text>
          </Pressable>

          {showRejectForm && (
            <View style={styles.card}>
              <Text style={styles.label}>Rejection Reason</Text>

              <TextInput
                style={styles.input}
                multiline
                maxLength={500}
                value={reason}
                onChangeText={(text) => {
                  setReason(text);
                  setError("");
                }}
                placeholder="Explain why the tutor is rejected"
              />

              <Text style={styles.info}>
                {reason.length}/500 characters
              </Text>

              {error ? (
                <Text style={styles.error}>{error}</Text>
              ) : null}

              <Pressable
                style={styles.confirmButton}
                onPress={handleReject}
              >
                <Text style={styles.whiteText}>
                  Confirm Rejection
                </Text>
              </Pressable>
            </View>
          )}
        </>
      )}

      {tutor.status !== "Pending" && (
        <Text style={styles.info}>
          This application has already been processed.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  info: {
    color: "#4B5563",
    marginTop: 12,
    fontSize: 15,
  },
  approveButton: {
    backgroundColor: "#5145E5",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#DC2626",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  whiteText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  rejectText: {
    color: "#DC2626",
    fontWeight: "700",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DCE1E8",
    borderRadius: 12,
    minHeight: 110,
    padding: 14,
    marginTop: 12,
    textAlignVertical: "top",
    color: "#111827",
  },
  error: {
    color: "#DC2626",
    marginTop: 12,
  },
});
