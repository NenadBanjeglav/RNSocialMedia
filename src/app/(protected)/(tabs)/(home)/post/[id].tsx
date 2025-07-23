import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  return <Text>Post details: {id}</Text>;
}
