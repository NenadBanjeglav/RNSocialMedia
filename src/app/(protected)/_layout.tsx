import { Slot, Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { ActivityIndicator } from "react-native";

export default function PortectedLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
