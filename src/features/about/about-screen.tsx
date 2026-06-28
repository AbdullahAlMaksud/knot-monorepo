import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/common/Header";
import { ThemedText } from "@/components/ui/ThemedText";
import { useTheme } from "@/shared/lib/theme/ThemeContext";
import hapticService from "@/shared/lib/hapticService";

interface InfoRowProps {
    icon: string;
    label: string;
    value: string;
    onPress?: () => void;
    styles: any;
    colors: any;
}

const InfoRow: React.FC<InfoRowProps> = ({
    icon,
    label,
    value,
    onPress,
    styles,
    colors,
}) => (
    <Pressable
        style={styles.infoRow}
        onPress={onPress}
        disabled={!onPress}
    >
        <View style={styles.infoLeft}>
            <MaterialCommunityIcons
                name={icon as any}
                size={20}
                color={colors.primary}
            />
            <ThemedText variant="body">{label}</ThemedText>
        </View>
        <ThemedText
            variant="body"
            color={onPress ? colors.primary : colors.textSecondary}
        >
            {value}
        </ThemedText>
    </Pressable>
);

export default function AboutScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const colors = theme.colors as any;

    const handleEmail = () => {
        hapticService.lightTap();
        Linking.openURL("mailto:abdullah.al.maksud@outlook.com");
    };

    const handleGitHub = () => {
        hapticService.lightTap();
        Linking.openURL("https://github.com/AbdullahAlMaksud/BanglaSudokuApp");
    };

    return (
        <View style={styles.container}>
            <Header title="আমাদের সম্পর্কে" showBack />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Logo and Name */}
                <View style={styles.logoSection}>
                    <View style={styles.logoBg}>
                        <View style={styles.logoGrid}>
                            {[1, 2, 3, 4].map((i) => (
                                <View key={i} style={styles.logoCell} />
                            ))}
                        </View>
                    </View>

                    <ThemedText variant="h1" weight="bold" style={styles.appName}>
                        সুডোকু
                    </ThemedText>
                    <ThemedText variant="caption" color={colors.textSecondary}>
                        ক্লাসিক পাজল গেম
                    </ThemedText>
                </View>

                {/* App Info Card */}
                <Card padding="lg" style={styles.infoCard}>
                    <InfoRow
                        icon="application"
                        label="ভার্সন"
                        value="১.০.০"
                        styles={styles}
                        colors={colors}
                    />
                    <View style={styles.divider} />
                    <InfoRow
                        icon="calendar"
                        label="রিলিজ"
                        value="জানুয়ারি ২০২৬"
                        styles={styles}
                        colors={colors}
                    />
                    <View style={styles.divider} />
                    <InfoRow
                        icon="cellphone"
                        label="প্ল্যাটফর্ম"
                        value="Android / iOS"
                        styles={styles}
                        colors={colors}
                    />
                </Card>

                {/* Developer Info */}
                <ThemedText variant="h3" weight="bold" style={styles.sectionTitle}>
                    ডেভেলপার
                </ThemedText>
                <Card padding="lg" style={styles.infoCard}>
                    <InfoRow
                        icon="account"
                        label="নির্মাতা"
                        value="আব্দুল্লাহ আল মাকসুদ"
                        styles={styles}
                        colors={colors}
                    />
                    <View style={styles.divider} />
                    <InfoRow
                        icon="email"
                        label="ইমেইল"
                        value="যোগাযোগ করুন"
                        onPress={handleEmail}
                        styles={styles}
                        colors={colors}
                    />
                    <View style={styles.divider} />
                    <InfoRow
                        icon="github"
                        label="GitHub"
                        value="সোর্স কোড"
                        onPress={handleGitHub}
                        styles={styles}
                        colors={colors}
                    />
                </Card>

                {/* Description */}
                <ThemedText variant="h3" weight="bold" style={styles.sectionTitle}>
                    বিবরণ
                </ThemedText>
                <Card padding="lg">
                    <ThemedText variant="body" color={colors.textSecondary} style={{ lineHeight: 24 }}>
                        সুডোকু হলো একটি লজিক-ভিত্তিক সংখ্যা পাজল গেম। এই অ্যাপটি বাংলা ভাষায়
                        তৈরি করা হয়েছে বাংলাভাষী ব্যবহারকারীদের জন্য। তিনটি ভিন্ন স্তরে খেলুন
                        এবং আপনার লজিক্যাল থিংকিং দক্ষতা উন্নত করুন।
                    </ThemedText>
                </Card>

                {/* Copyright */}
                <View style={styles.footer}>
                    <ThemedText variant="caption" color={colors.textSecondary} align="center">
                        © ২০২৬ সুডোকু অ্যাপ
                    </ThemedText>
                    <ThemedText variant="caption" color={colors.textSecondary} align="center">
                        সর্বস্বত্ব সংরক্ষিত
                    </ThemedText>
                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            padding: theme.spacing.lg,
            paddingBottom: 40,
        },
        logoSection: {
            alignItems: "center",
            marginBottom: 32,
        },
        logoContainer: {
            marginBottom: 16,
        },
        gridLogo: {
            backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
            borderRadius: 16,
            padding: 10,
            gap: 4,
        },
        gridRow: {
            flexDirection: "row",
            gap: 4,
        },
        gridCell: {
            width: 28,
            height: 28,
            backgroundColor: theme.colors.surface,
            borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.boardLine || theme.colors.border,
        },
        gridCellHighlight: {
            borderColor: theme.colors.primary,
            borderWidth: 2,
        },
        appName: {
            fontSize: 36,
            marginTop: 8,
        },
        infoCard: {
            gap: 0,
        },
        infoRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
        },
        infoLeft: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.border,
        },
        sectionTitle: {
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
        },
        footer: {
            marginTop: 40,
            gap: 4,
        },
    });
