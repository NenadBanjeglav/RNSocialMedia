import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={signOut} title="Sign out" />
    </View>
  );
}
