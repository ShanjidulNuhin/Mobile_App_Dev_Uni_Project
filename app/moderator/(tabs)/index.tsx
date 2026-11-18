
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDemoAuth } from "@/context/demo-auth";
import { useModeration } from "@/context/moderation";
import { useReports } from "@/context/reports";

type StatCard = {
  label: string;
  value: number;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconColor: string;
  iconBackground: string;
  onPress: () => void;
};

export default function ModeratorDashboard() {
  const router = useRouter();

  const { currentUser } = useDemoAuth();
  const { tutors, history } = useModeration();
  const { reports, reportHistory } = useReports();

  const pendingCount = tutors.filter(
    (tutor) => tutor.status === "Pending"
  ).length;

  const approvedCount = tutors.filter(
    (tutor) => tutor.status === "Approved"
  ).length;

  const openReports = reports.filter(
    (report) => report.status === "Open"
  ).length;

  const processedReports = reports.filter(
    (report) => report.status !== "Open"
  ).length;

  const escalatedCount = reports.filter(
    (report) => report.status === "Escalated"
  ).length;

  const totalActions =
    history.length + reportHistory.length;

  const cards: StatCard[] = [
    {
      label: "Pending Verifications",
      value: pendingCount,
      icon: "shield-checkmark-outline",
      iconColor: "#5145E5",
      iconBackground: "#EEF0FF",
      onPress: () =>
        router.navigate("/moderator/verify"),
    },
    {
      label: "Open Reports",
      value: openReports,
      icon: "flag-outline",
      iconColor: "#2563EB",
      iconBackground: "#EFF6FF",
      onPress: () =>
        router.navigate({
          pathname: "/moderator/reports",
          params: { filter: "Open" },
        }),
    },
    {
      label: "Approved Tutors",
      value: approvedCount,
      icon: "checkmark-circle-outline",
      iconColor: "#059669",
      iconBackground: "#ECFDF5",
      onPress: () =>
        router.navigate("/moderator/history"),
    },
    {
      label: "Processed Reports",
      value: processedReports,
      icon: "document-text-outline",
      iconColor: "#D97706",
      iconBackground: "#FFFBEB",
      onPress: () =>
        router.navigate({
          pathname: "/moderator/reports",
          params: { filter: "Processed" },
        }),
    },
    {
      label: "Escalated Cases",
      value: escalatedCount,
      icon: "arrow-up-circle-outline",
      iconColor: "#9333EA",
      iconBackground: "#F5F3FF",
      onPress: () =>
        router.navigate({
          pathname: "/moderator/reports",
          params: { filter: "Escalated" },
        }),
    },
    {
      label: "Actions Recorded",
      value: totalActions,
      icon: "time-outline",
      iconColor: "#0D9488",
      iconBackground: "#F0FDFA",
      onPress: () =>
        router.navigate("/moderator/history"),
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome,
          </Text>

          <Text style={styles.userName}>
            {currentUser?.fullName ?? "Moderator"}
          </Text>

          <Text style={styles.heading}>
            Moderator Dashboard
          </Text>

          <Text style={styles.subtitle}>
            Platform Overview
          </Text>
        </View>

        <View style={styles.grid}>
          {cards.map((card) => (
            <Pressable
              key={card.label}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
              ]}
              onPress={card.onPress}
              accessibilityRole="button"
              accessibilityLabel={
                `${card.value} ${card.label}`
              }
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      card.iconBackground,
                  },
                ]}
              >
                <Ionicons
                  name={card.icon}
                  size={28}
                  color={card.iconColor}
                />
              </View>

              <Text style={styles.cardValue}>
                {card.value}
              </Text>

              <Text style={styles.cardLabel}>
                {card.label}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#A4ADBB"
                style={styles.cardArrow}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 26,
  },
  wrapper: {
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 16,
    color: "#59677A",
  },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
    textAlign: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 7,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  card: {
    width: "48.2%",
    minHeight: 165,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DFE5EC",
    padding: 16,
    shadowColor: "#101828",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardValue: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
  },
  cardLabel: {
    fontSize: 13,
    color: "#536073",
    lineHeight: 18,
    marginTop: 4,
    paddingRight: 10,
  },
  cardArrow: {
    position: "absolute",
    bottom: 13,
    right: 12,
  },
});
