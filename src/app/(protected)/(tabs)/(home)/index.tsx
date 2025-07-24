import FeedPostItem from "@/components/FeedPostItem";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getPosts } from "@/services/postService";

export default function FeedScreen() {
  const { session } = useAuth();

  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(session?.accessToken!),
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) {
    <Text>Error fetching the posts</Text>;
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Link href={`/post/${item.id}`} asChild>
            <Pressable>
              <FeedPostItem post={item} />
            </Pressable>
          </Link>
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
      <Link href="/new" asChild>
        <Pressable className="absolute right-5 bottom-5 bg-[#007AFF] rounded-full w-[60px] h-[60px] items-center justify-center shadow-lg">
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </>
  );
}
