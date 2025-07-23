import { Stack } from "expo-router";
import React from "react";

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Feed" }} />
      <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
    </Stack>
  );
}
