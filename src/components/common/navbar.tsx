import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { useTheme } from "@/shared/lib/theme/ThemeContext";

export const NavBar: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ThemedText variant="body" weight="bold">
        ন্যাভিগেশন বার
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default NavBar;
