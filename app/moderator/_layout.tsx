
import { ModerationProvider } from "@/context/moderation";
import { ReportsProvider } from "@/context/reports";
import { Stack } from "expo-router";

export default function ModeratorLayout() {
  return (
    <ModerationProvider>
      <ReportsProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="verify/[id]"
            options={{ title: "Review Tutor" }}
          />
          <Stack.Screen
            name="reports/[id]"
            options={{ title: "Report Details" }}
          />
          <Stack.Screen
            name="reports/[id]/action"
            options={{ title: "Moderation Action" }}
          />
        </Stack>
      </ReportsProvider>
    </ModerationProvider>
  );
}
