
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Item = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: Item[];
  actionLabel?: string;
  onAction?: () => void;
};

export default function ModulePage({
  title,
  subtitle,
  items,
  actionLabel,
  onAction,
}: Props) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        {onAction && (
          <Pressable
            style={styles.actionButton}
            onPress={onAction}
          >
            <Text style={styles.actionText}>
              {actionLabel ?? "Action"}
            </Text>
          </Pressable>
        )}

        {items.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.cardDescription}>
              {item.description}
            </Text>
          </View>
        ))}
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
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: 650,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 24,
  },
  actionButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#DCE1E8",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 20,
  },
  actionText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    lineHeight: 21,
  },
});
