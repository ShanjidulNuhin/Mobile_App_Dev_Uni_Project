
import { useReports } from "@/context/reports";
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

type Filter = "Open" | "Resolved" | "All";

export default function ReportsScreen() {
  const { reports } = useReports();
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("Open");
  const [search, setSearch] = useState("");

  const visibleReports = reports.filter((report) => {
    const matchesStatus =
      filter === "All" ||
      (filter === "Open"
        ? report.status === "Open"
        : report.status !== "Open");

    const matchesSearch =
      `${report.id} ${report.title} ${report.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Reported Content</Text>
      <Text style={styles.subtitle}>
        Review reports submitted by users
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search reports"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        {(["Open", "Resolved", "All"] as const).map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filter,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.count}>
        {visibleReports.length} reports
      </Text>

      {visibleReports.map((report) => (
        <Pressable
          key={report.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/moderator/reports/[id]",
              params: { id: report.id },
            })
          }
        >
          <Text style={styles.name}>{report.title}</Text>
          <Text style={styles.info}>ID: {report.id}</Text>
          <Text style={styles.info}>{report.category}</Text>
          <Text style={styles.status}>
            Status: {report.status}
          </Text>
          <Text style={styles.review}>View Report</Text>
        </Pressable>
      ))}

      {visibleReports.length === 0 && (
        <Text style={styles.empty}>
          No reports match this filter.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FC" },
  content: { padding: 20, paddingTop: 45, paddingBottom: 40 },
  title: { fontSize: 27, fontWeight: "700", color: "#111827" },
  subtitle: { color: "#6B7280", marginTop: 8, marginBottom: 20 },
  search: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DCE1E8",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  filters: { flexDirection: "row", gap: 8, marginBottom: 20 },
  filter: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  activeFilter: { backgroundColor: "#5145E5" },
  filterText: { color: "#374151", fontWeight: "600" },
  activeText: { color: "#FFFFFF" },
  count: { color: "#374151", fontWeight: "600", marginBottom: 14 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  info: { color: "#6B7280", marginTop: 8 },
  status: { color: "#5145E5", marginTop: 10 },
  review: { color: "#5145E5", fontWeight: "700", marginTop: 15 },
  empty: { color: "#6B7280", textAlign: "center", marginTop: 30 },
});
