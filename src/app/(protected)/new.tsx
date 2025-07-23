import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function NewPost() {
  const [content, setContent] = useState("");

  const handleCreate = () => {
    // send the post to the server

    setContent("");
    router.back();
  };
  return (
    <View className="flex-1 p-4">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="text-lg" onPress={() => router.back()}>
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Button
              onPress={() => handleCreate()}
              title="Post"
              disabled={content.trim().length === 0}
            />
          ),
        }}
      />
      <TextInput
        className="text-lg min-h-40"
        placeholder="What's happening?"
        multiline
        value={content}
        onChangeText={setContent}
        autoFocus
      />
    </View>
  );
}
