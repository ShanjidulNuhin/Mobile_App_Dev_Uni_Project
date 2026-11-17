
import { useModeration } from "@/context/moderation";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VerificationScreen() {
  const router = useRouter();
  const { tutors } = useModeration();
  const [search, setSearch] = useState("");

  const pendingTutors = tutors.filter(
    (tutor) =>
      tutor.status === "Pending" &&
      `${tutor.name} ${tutor.subject} ${tutor.area}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Tutor Verification</Text>
      <Text style={styles.subtitle}>
        Review pending tutor applications
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search name, subject or area"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.count}>
        {pendingTutors.length} pending applications
      </Text>

      {pendingTutors.map((tutor) => (
        <Pressable
          key={tutor.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/moderator/verify/[id]",
              params: { id: tutor.id },
            })
          }
        >
          <Text style={styles.name}>{tutor.name}</Text>
          <Text style={styles.info}>
            {tutor.subject} | {tutor.area}
          </Text>
          <Text style={styles.info}>ID: {tutor.id}</Text>
          <Text style={styles.action}>Review Application</Text>
        </Pressable>
      ))}

      {pendingTutors.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.info}>
            No pending applications found.
          </Text>
        </View>
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
    paddingTop: 45,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 27,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 22,
  },
  search: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE1E8",
    borderRadius: 12,
    padding: 15,
    marginBottom: 22,
  },
  count: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  name: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },
  info: {
    color: "#6B7280",
    marginTop: 9,
  },
  action: {
    color: "#5145E5",
    fontWeight: "700",
    marginTop: 18,
  },
});
