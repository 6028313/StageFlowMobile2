import { Tabs } from "expo-router";
<<<<<<< Updated upstream
import React from "react";
=======

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
>>>>>>> Stashed changes

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
<<<<<<< Updated upstream
        headerShown: false,
        tabBarStyle: { display: "none" },
=======
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
>>>>>>> Stashed changes
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
<<<<<<< Updated upstream
          title: "Bedrijven",
=======
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="kaart"
        options={{
          title: "Kaart",
>>>>>>> Stashed changes
        }}
      />
    </Tabs>
  );
}
