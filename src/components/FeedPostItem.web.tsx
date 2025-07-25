import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "@/types/models";
import React from "react";
import { Image, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostRequest, unlikePostRequest } from "@/services/postService";
import { useAuth } from "@/providers/AuthProvider";

dayjs.extend(relativeTime);

type FeedPostItemProps = {
  post: Post;
};

export default function FeedPostItem({ post }: FeedPostItemProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => likePostRequest(post.id, session?.accessToken!),
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: () => unlikePostRequest(post.id, session?.accessToken!),
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <View className="flex-row gap-3 p-4 border-b-gray-200 border-b-[1px]">
      <Image
        source={{ uri: post.author.avatar }}
        className="size-12 rounded-full"
      />
      <View className="gap-2 flex-1">
        <View className="flex-row gap-1">
          <Text className="font-semibold">{post.author.name}</Text>
          <Text className="text-gray-500">{post.author.handle}</Text>
          <Text className="text-gray-500">·</Text>
          <Text className="text-grey-500">
            {dayjs(post.created_at).fromNow()}
          </Text>
        </View>
        <Text className="leading-5">{post.content}</Text>

        <View className="flex-row gap-5">
          <View className="flex-row gap-1 items-center">
            <MaterialCommunityIcons
              name="message-outline"
              size={20}
              color="grey"
            />
            <Text className="text-grey-500">{post.replies_count}</Text>
          </View>

          <View className="flex-row gap-1 items-center">
            <MaterialCommunityIcons name="repeat" size={20} color="grey" />
            <Text className="text-grey-500">{post.retweets_count}</Text>
          </View>

          {likeMutation.isPending ? (
            <>
              <MaterialCommunityIcons name={"heart"} size={20} color={"pink"} />
              <Text className="text-gray-500">{post.likes_count + 1}</Text>
            </>
          ) : unlikeMutation.isPending ? (
            <>
              <MaterialCommunityIcons
                name={"heart-outline"}
                size={20}
                color={"pink"}
              />
              <Text className="text-gray-500">{post.likes_count - 1}</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons
                name={post.is_liked ? "heart" : "heart-outline"}
                size={20}
                color={post.is_liked ? "crimson" : "gray"}
                onPress={() =>
                  post.is_liked
                    ? unlikeMutation.mutate()
                    : likeMutation.mutate()
                }
              />
              <Text className="text-gray-500">{post.likes_count}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
