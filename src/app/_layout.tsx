import "../../global.css";
import React, { PropsWithChildren } from "react";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { AuthProvider } from "@/providers/AuthProvider";
import { Slot } from "expo-router";

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: "#0A0A0A",
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={CustomTheme}>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}
