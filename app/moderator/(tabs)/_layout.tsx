
import { useDemoAuth } from "@/context/demo-auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY = "#5145E5";

const DRAWER_WIDTH = Math.min(
  Dimensions.get("window").width * 0.82,
  320
);

type Destination =
  | "/moderator"
  | "/moderator/verify"
  | "/moderator/reports"
  | "/moderator/history"
  | "/moderator/account";

type MenuItem = {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  path: Destination;
};

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Home",
    icon: "home-outline",
    path: "/moderator",
  },
  {
    title: "Verify",
    icon: "checkmark-circle-outline",
    path: "/moderator/verify",
  },
  {
    title: "Reports",
    icon: "flag-outline",
    path: "/moderator/reports",
  },
  {
    title: "History",
    icon: "time-outline",
    path: "/moderator/history",
  },
];

export default function ModeratorTabsLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentUser, logout } = useDemoAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const slideX = useRef(
    new Animated.Value(-DRAWER_WIDTH)
  ).current;

  useEffect(() => {
    if (drawerOpen) {
      slideX.setValue(-DRAWER_WIDTH);

      Animated.timing(slideX, {
        toValue: 0,
        duration: 230,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerOpen, slideX]);

  const closeDrawer = (callback?: () => void) => {
    Animated.timing(slideX, {
      toValue: -DRAWER_WIDTH,
      duration: 190,
      useNativeDriver: true,
    }).start(() => {
      setDrawerOpen(false);
      callback?.();
    });
  };

  const navigateTo = (path: Destination) => {
    closeDrawer(() => router.navigate(path));
  };

  const handleLogout = () => {
    closeDrawer(() => {
      logout();
      router.replace("/login");
    });
  };

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => (
            <View
              style={[
                styles.header,
                { paddingTop: insets.top + 6 },
              ]}
            >
              <Pressable
                style={styles.headerButton}
                onPress={() => setDrawerOpen(true)}
                accessibilityLabel="Open menu"
              >
                <Ionicons
                  name="menu-outline"
                  size={28}
                  color="#111827"
                />
              </Pressable>

              <Text style={styles.brandName}>
                PathSathi
              </Text>

              <Pressable
                style={styles.headerButton}
                onPress={() =>
                  router.navigate("/moderator/account")
                }
              >
                <Ionicons
                  name="person-circle-outline"
                  size={29}
                  color={PRIMARY}
                />
              </Pressable>
            </View>
          ),
          tabBarActiveTintColor: PRIMARY,
          tabBarInactiveTintColor: "#8995A5",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
          },
          tabBarStyle: {
            height: 59 + Math.max(insets.bottom, 8),
            paddingTop: 8,
            paddingBottom: Math.max(insets.bottom, 8),
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E7EB",
          },
        }}
      >
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="verify"
          options={{
            title: "Verify",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="checkmark-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="flag-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="time-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      <Modal
        visible={drawerOpen}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => closeDrawer()}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.drawer,
              {
                width: DRAWER_WIDTH,
                paddingTop: insets.top + 22,
                paddingBottom: Math.max(insets.bottom, 14) + 12,
                transform: [{ translateX: slideX }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(currentUser?.fullName ?? "M")
                    .charAt(0)
                    .toUpperCase()}
                </Text>
              </View>

              <Text style={styles.userName}>
                {currentUser?.fullName ?? "Moderator"}
              </Text>

              <Text style={styles.userEmail}>
                {currentUser?.email ?? ""}
              </Text>
            </View>

            <View style={styles.menuList}>
              {MENU_ITEMS.map((item) => (
                <Pressable
                  key={item.path}
                  style={styles.menuItem}
                  onPress={() => navigateTo(item.path)}
                >
                  <Ionicons
                    name={item.icon}
                    size={23}
                    color="#334155"
                  />

                  <Text style={styles.menuText}>
                    {item.title}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={17}
                    color="#94A3B8"
                  />
                </Pressable>
              ))}
            </View>

            <View style={styles.drawerFooter}>
              <Pressable
                style={styles.menuItem}
                onPress={() =>
                  navigateTo("/moderator/account")
                }
              >
                <Ionicons
                  name="person-outline"
                  size={23}
                  color="#334155"
                />

                <Text style={styles.menuText}>
                  My Account
                </Text>
              </Pressable>

              <Pressable
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons
                  name="log-out-outline"
                  size={23}
                  color="#DC2626"
                />

                <Text style={styles.logoutText}>
                  Log Out
                </Text>
              </Pressable>
            </View>
          </Animated.View>

          <Pressable
            style={styles.backdrop}
            onPress={() => closeDrawer()}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#F7F8FC",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerButton: {
    width: 44,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(10,20,40,0.45)",
  },
  drawer: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  backdrop: {
    flex: 1,
  },
  drawerHeader: {
    paddingHorizontal: 22,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: {
    color: PRIMARY,
    fontSize: 25,
    fontWeight: "700",
  },
  userName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },
  userEmail: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 5,
  },
  menuList: {
    paddingHorizontal: 13,
    paddingTop: 18,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 13,
    paddingVertical: 15,
    borderRadius: 12,
  },
  menuText: {
    flex: 1,
    color: "#334155",
    fontSize: 15,
    fontWeight: "600",
  },
  drawerFooter: {
    marginTop: "auto",
    paddingHorizontal: 13,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: "#FFF2F2",
    paddingHorizontal: 13,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 7,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#DC2626",
  },
});
