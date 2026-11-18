
import { useDemoAuth } from "@/context/demo-auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ModeratorAccountScreen() {
  const { currentUser } = useDemoAuth();

  const name = currentUser?.fullName ?? "Moderator";
  const email = currentUser?.email ?? "Not available";
  const role = currentUser?.role ?? "Moderator";

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.subtitle}>
        Your profile information
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{name}</Text>

        <View style={styles.roleBadge}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color="#5145E5"
          />
          <Text style={styles.roleText}>{role}</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <DetailItem
          icon="person-outline"
          label="Full Name"
          value={name}
        />

        <View style={styles.divider} />

        <DetailItem
          icon="mail-outline"
          label="Email Address"
          value={email}
        />

        <View style={styles.divider} />

        <DetailItem
          icon="shield-outline"
          label="Account Role"
          value={role}
        />
      </View>
    </ScrollView>
  );
}

type IconName =
  React.ComponentProps<typeof Ionicons>["name"];

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Ionicons
        name={icon}
        size={22}
        color="#64748B"
      />

      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  content: {
    padding: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 26,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 26,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 38,
    fontWeight: "700",
    color: "#5145E5",
  },
  name: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#EEF0FF",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 12,
  },
  roleText: {
    fontWeight: "600",
    color: "#5145E5",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 20,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    color: "#64748B",
    fontSize: 13,
  },
  detailValue: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
});
