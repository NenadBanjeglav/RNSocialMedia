import FeedPostItem from "@/components/FeedPostItem";
import { Button, FlatList, Pressable } from "react-native";
import dummyPosts from "@/dummyPosts";
import { Link } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function FeedScreen() {
  const fetchApi = async () => {
    const response = await fetch("/hello");
    const json = await response.json();
    console.log("Response from cliend side request: ", json);
    console.log("From client side: ", process.env.SECRET_KEY);
    console.log("From client side: ", process.env.EXPO_PUBLIC_SHARED_KEY);
  };

  return (
    <>
      <FlatList
        data={dummyPosts}
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

      <Button onPress={fetchApi} title="Fetch API" />
    </>
  );
}
