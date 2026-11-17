
import { ModerationProvider } from "@/context/moderation";
import { Stack } from "expo-router";

export default function ModeratorLayout() {
  return (
    <ModerationProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verify/[id]"
          options={{ title: "Review Tutor" }}
        />
      </Stack>
    </ModerationProvider>
  );
}
