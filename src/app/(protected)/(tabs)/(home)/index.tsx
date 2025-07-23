import FeedPostItem from "@/components/FeedPostItem";
import { Button, FlatList, Pressable } from "react-native";
import dummyPosts from "@/dummyPosts";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Post } from "@/types/models";

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Link href={`/post/${item.id}`}>
            <FeedPostItem post={item} />
          </Link>
        )}
      />
      <Link href="/new" asChild>
        <Pressable className="absolute right-5 bottom-5 bg-[#007AFF] rounded-full w-[60px] h-[60px] items-center justify-center shadow-lg">
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </>
  );
}
