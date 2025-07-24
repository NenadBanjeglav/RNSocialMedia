import { useAuth } from "@/providers/AuthProvider";
import { createPostRequest } from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function NewPost() {
  const [content, setContent] = useState("");
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: () => createPostRequest({ content }, session?.accessToken!),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      console.log("Failed to create a post", error);
    },
  });

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
              onPress={() => createPostMutation()}
              title="Post"
              disabled={content.trim().length === 0 || isPending}
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
