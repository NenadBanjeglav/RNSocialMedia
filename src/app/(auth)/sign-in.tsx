import { useAuth } from "@/providers/AuthProvider";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function SignIn() {
  const [username, setUsername] = useState("jeff");
  const { signIn } = useAuth();

  const handleSignIn = () => {
    signIn(username);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center w-full max-w-md mx-auto">
      <Text className="text-2xl mb-5">Sign in</Text>
      <TextInput
        className="w-4/5 h-10 border border-gray-300 rounded px-2.5 mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
}
