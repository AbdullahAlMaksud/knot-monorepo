import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { useTheme } from "@/shared/lib/theme/ThemeContext";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ThemedText variant="caption" color={theme.colors.textSecondary}>
        © ২০২৬ বাংলা সুডোকু
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default Footer;
