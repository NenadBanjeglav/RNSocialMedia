import FeedPostItem from "@/components/FeedPostItem";
import dummyPosts from "@/dummyPosts";
import { useAuth } from "@/providers/AuthProvider";
import { getPostWithId } from "@/services/postService";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text } from "react-native";

export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostWithId(id, session?.accessToken!),
    staleTime: 10 * 1000,
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) {
    return <Text>Post not found</Text>;
  }

  return <FeedPostItem post={post} />;
}
