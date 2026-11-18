import { StyleSheet } from "react-native";
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
});}
