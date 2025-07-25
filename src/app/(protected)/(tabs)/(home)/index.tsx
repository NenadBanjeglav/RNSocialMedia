import FeedPostItem from "@/components/FeedPostItem";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getPosts } from "@/services/postService";
import { useRefreshOnFocus } from "@/hooks/tanStack";
import { useIsFocused } from "@react-navigation/native";

export default function FeedScreen() {
  const { session } = useAuth();
  const isFocused = useIsFocused();

  const { width } = useWindowDimensions();

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4NTE3YzBhLWVmNmItNDk3Yy04ODQ5LTIzZmIyOGJhZTU1MyIsImlhdCI6MTc1MzM3MDE0OCwiZXhwIjoxNzU1OTYyMTQ4fQ.SXD40Em0RLbrVBv6NP2EzEH6jI20NkXbh1iVgIUP3VA

  const {
    data,
    error,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam, session?.accessToken!),
    initialPageParam: {
      limit: 20,
      cursor: undefined,
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length == 0) {
        return undefined;
      }
      return {
        limit: 5,
        cursor: lastPage[lastPage.length - 1].id,
      };
    },
    subscribed: isFocused,
  });

  useRefreshOnFocus(refetch);

  const posts = data?.pages.flat() || [];

  if (isLoading) return <ActivityIndicator />;

  if (error) {
    <Text>Error fetching the posts</Text>;
  }

  const numColumns = Math.ceil(width / 500);

  return (
    <>
      <FlatList
        data={posts}
        key={numColumns}
        numColumns={numColumns}
        className="bg-white sm:bg-red-100 lg:bg-red-200 xl:bg-red-300 2xl:bg-red-40"
        contentContainerClassName="w-full mx-auto"
        renderItem={({ item }) => (
          <Link href={`/post/${item.id}`} asChild>
            <Pressable className="flex-1">
              <FeedPostItem post={item} />
            </Pressable>
          </Link>
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReachedThreshold={2}
        onEndReached={() =>
          !isFetchingNextPage && hasNextPage && fetchNextPage()
        }
        ListFooterComponent={() => isFetchingNextPage && <ActivityIndicator />}
      />

      <Link href="/new" asChild>
        <Pressable className="absolute right-5 bottom-5 bg-[#007AFF] rounded-full w-[60px] h-[60px] items-center justify-center shadow-lg">
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </>
  );
}
