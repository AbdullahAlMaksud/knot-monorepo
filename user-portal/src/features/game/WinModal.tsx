"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Clock, XCircle, RotateCcw, Home, ChevronRight, 
  Share2, Copy, Download, Check 
} from "lucide-react";
import { useRouter } from "next/navigation";

// Inline brand SVGs since Lucide-react doesn't export them in this version
const TwitterIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 1.978 14.113.953 11.49.951c-5.441 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.873L1.938 22l6.232-1.614c-1.46.8-2.585 1.254-1.523 1.768z" />
  </svg>
);
import { GlassCard } from "@/components/ui/GlassCard";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { formatTime, loadStats } from "@/shared/lib/storage";
import type { Difficulty } from "@/shared/lib/sudoku";
import { useTranslation } from "react-i18next";
import { translateNumber } from "@/shared/lib/i18n";
import { api } from "@/shared/lib/api";

const DIFF_ORDER: Difficulty[] = ["easy", "medium", "hard", "expert"];

// --- Canvas Helper to Draw a Gorgeous Glassmorphic Result Card Image ---
const generateScorecard = (
  difficulty: string,
  timeStr: string,
  mistakesStr: string,
  accentColor: string,
  t: (key: string) => string
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 750;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject("No canvas context");

    // Draw background gradient
    const bgGrad = ctx.createRadialGradient(300, 375, 50, 300, 375, 500);
    bgGrad.addColorStop(0, "#121a24");
    bgGrad.addColorStop(1, "#080c10");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 750);

    // Draw grid mesh lines in the background
    ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 600; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 750);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(600, i);
      ctx.stroke();
    }

    // Glow effect behind the logo
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 100;
    ctx.fillStyle = accentColor + "15";
    ctx.beginPath();
    ctx.arc(300, 180, 90, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset glow

    // Draw outer glow card border
    ctx.strokeStyle = accentColor + "55";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 560, 710);

    // Draw inner thin glass line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, 536, 686);

    // Draw the Logo in the center top (logo SVG path elements)
    const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 815.27 870.67" width="140" height="150">
      <rect fill="#025d3e" x="52.42" y="629.23" width="235.21" height="235.21" rx="43.78" ry="43.78" transform="translate(-65.24 17.92) rotate(-5.06)"/>
      <rect fill="#83a84b" x="313.12" y="606.14" width="235.22" height="235.21" rx="43.78" ry="43.78" transform="translate(-62.18 40.83) rotate(-5.06)"/>
      <path fill="#142537" d="M802.06,616.74l13.03,147.07c2.13,24.09-15.66,45.34-39.75,47.47l-147.07,13.03c-24.09,2.13-45.34-15.66-47.47-39.75l-5.72-64.52c-6.17-69.68,45.31-131.17,114.99-137.34l64.52-5.72c24.09-2.13,45.34,15.66,47.47,39.75Z"/>
      <path fill="#025d3e" d="M257.56,402.22l13.03,147.07c2.13,24.09-15.66,45.34-39.75,47.47l-147.07,13.03c-24.09,2.13-45.34-15.66-47.47-39.75l-5.91-66.71c-6.07-68.47,44.52-128.89,112.99-134.96l66.71-5.91c24.09-2.13,45.34,15.66,47.47,39.75Z"/>
      <rect fill="#142537" x="290.02" y="345.44" width="235.22" height="235.21" transform="translate(-39.27 37.77) rotate(-5.06)"/>
      <rect fill="#025d3e" x="550.73" y="322.34" width="235.21" height="235.21" rx="43.78" ry="43.78" transform="translate(-36.21 60.69) rotate(-5.06)"/>
      <rect fill="#00443e" x="6.23" y="107.83" width="235.21" height="235.21" rx="43.78" ry="43.78" transform="translate(-19.41 11.81) rotate(-5.06)"/>
      <rect fill="#81a84b" x="266.93" y="84.74" width="235.22" height="235.21" rx="43.78" ry="43.78" transform="translate(-16.35 34.72) rotate(-5.06)"/>
      <path fill="#83a84b" d="M782.99,109.59l9.56,107.95c1.76,19.84-12.9,37.35-32.75,39.11l-162.44,14.39c-19.84,1.76-37.35-12.9-39.11-32.75l-14.39-162.44c-1.76-19.84,12.9-37.35,32.75-39.11l107.95-9.56c49.93-4.42,94,32.47,98.42,82.41Z"/>
      <path fill="#83a84b" d="M700.09,6.11c11.69-6.12,25.34-7.28,38.29-5.09,34.64,5.67,64.11,38.19,63.23,73.77-.15,4.87-.84,9.73-2.34,14.36,0,0-1.39.12-1.39.12-.64-5.86-1.84-11.65-3.6-17.26-10.03-33.98-41.24-60.1-76.45-64-5.83-.74-11.74-.91-17.62-.51,0,0-.12-1.39-.12-1.39h0Z"/>
      <path fill="#fff" stroke="#fff" stroke-width="5" stroke-miterlimit="10" d="M436.13,479.15c.83,9.35-2.27,17.93-9.29,25.72-7.13,7.81-15.26,12.11-24.39,12.92-4.25.38-8.08-.51-11.48-2.68-4.18-2.41-6.43-5.48-6.76-9.2-.42-4.78,1.24-8.94,5-12.49,3.95-3.78,8.31-5.88,13.1-6.3,8.39-.74,14.75.94,19.08,5.06,1.94-2.31,3.26-4.63,3.96-6.94.7-2.31.95-4.64.75-6.97-.47-5.31-4.76-11.41-12.86-18.3-3.57-2.79-7.31-5.7-11.21-8.72-3.91-3.03-7.7-5.88-11.36-8.55-3.33-2.49-6.26-5.41-8.81-8.78-2.55-3.36-3.91-6.05-4.09-8.07-.28-3.19.53-6.04,2.45-8.57,1.92-2.52,4.47-3.93,7.66-4.21,5.84-.52,9.13,3.31,9.85,11.5l.2,2.31c.07.8.09,1.68.07,2.64,5.54,4.54,10.32,8.59,14.33,12.14,4.01,3.56,7.21,6.73,9.6,9.51,8.68,9.73,13.41,19.05,14.2,27.98Z"/>
      <path fill="#fff" stroke="#fff" stroke-miterlimit="10" d="M169.58,280.41c-5.22-4.57-10.79-8.76-16.69-12.58-5.91-3.81-12.11-7.31-18.6-10.48-6.72-3.36-13.61-6.1-20.64-8.21-7.04-2.11-13.8-3.52-20.29-4.23l-11.19-28.4c2.56,3.52,8.35,6.6,17.36,9.22,4.4,1.32,8.45,2.3,12.15,2.94,3.7.64,6.93.83,9.69.59,4.25-.38,8.25-1.8,11.99-4.27,4.45-2.96,6.5-6.36,6.16-10.18-.52-5.84-4.87-10.86-13.06-15.07-3.57-1.61-7.22-3.19-10.94-4.73-3.73-1.54-7.42-3.06-11.09-4.56-7.8-3.38-11.86-6.93-12.19-10.65-.24-2.76.47-5.29,2.14-7.58,1.67-2.29,3.89-3.56,6.65-3.8,6.16-.55,9.74,2.4,10.74,8.85,9.99,3.93,17.51,7.87,22.57,11.81,7.49,5.98,11.6,13.05,12.32,21.24,1.27,14.34-6.31,24.87-22.74,31.57,5.69,2.6,12.12,6.26,19.28,10.98,7.16,4.72,15,10.4,23.51,17.03l2.86,10.51Z"/>
      <path fill="#fff" stroke="#fff" stroke-width="5" stroke-miterlimit="10" d="M466.6,747.05c.23,5.01-.54,9.28-2.32,12.81s-4.25,6.43-7.42,8.69c-3.17,2.26-6.9,4.01-11.18,5.25-4.28,1.24-8.76,2.06-13.43,2.47-3.4.3-6.96,0-10.68-.9-3.72-.9-7.17-2.31-10.33-4.22-3.17-1.91-5.85-4.35-8.04-7.32-2.19-2.96-3.45-6.36-3.79-10.18-.48-5.42,1.24-10.44,5.17-15.08,3.93-4.63,8.6-7.77,14.02-9.43-12.52-2.32-19.29-9.27-20.32-20.85-.39-4.36.11-8.39,1.5-12.1,1.38-3.71,3.48-6.95,6.29-9.71,2.81-2.76,6.27-5.03,10.4-6.78,4.13-1.76,8.69-2.86,13.68-3.3,7.01-.62,13.25.86,18.71,4.45,6.04,4.18,9.36,9.51,9.93,15.99.4,4.57-.83,9.07-3.7,13.5-2.88,4.43-6.5,7.91-10.88,10.44,13.65,2.97,21.12,11.73,22.41,26.29ZM453.78,750.91c-.24-2.76-1.14-5.36-2.7-7.79-1.56-2.43-3.43-4.57-5.63-6.41-2.2-1.84-4.65-3.23-7.36-4.17-2.71-.94-5.33-1.29-7.88-1.07-2.28.84-4.43,2.03-6.43,3.54-2.01,1.52-3.87,3.18-5.58,4.99-1.71,1.81-3.02,3.94-3.93,6.37-.91,2.44-1.31,4.88-1.2,7.33.76,2.5,1.82,4.58,3.2,6.22,1.38,1.64,3.05,2.97,5.01,3.97,1.96,1.01,4.09,1.7,6.37,2.09,2.28.39,4.38.5,6.29.33,4.89-.33,9.49-1.94,13.79-4.84,4.29-2.9,6.31-6.42,6.05-10.58ZM448.19,698.72c-.21-2.34-.98-4.44-2.32-6.3-1.34-1.86-3.01-3.43-4.99-4.7-1.99-1.27-4.16-2.23-6.52-2.88-2.36-.65-4.71-.87-7.05-.66-2.01.29-4.02.81-6.04,1.58-2.02.77-3.85,1.81-5.5,3.14-1.65,1.33-3.01,2.89-4.08,4.7-1.07,1.81-1.56,3.89-1.46,6.23.33,3.72,1.26,6.72,2.8,8.99,1.54,2.27,3.38,4.04,5.53,5.29,2.14,1.26,4.44,2.12,6.9,2.6,2.45.48,4.81.78,7.07.9,10.93-7.18,16.15-13.48,15.67-18.9Z"/>
      <path fill="#fff" stroke="#fff" stroke-width="5" stroke-miterlimit="10" d="M707.73,152.83c.48,5.42.25,10.45-.67,15.08-.93,4.63-2.61,8.93-5.04,12.9-5.31,8.93-13.12,13.85-23.43,14.76-15.09,1.34-28.57-7.05-40.46-25.17-9.54-14.58-15.76-30.46-18.68-47.66l5.15,1.95c4.19,14.62,10.14,26.89,17.88,36.81,10.05,13.14,21.45,19.14,34.2,18.01,7.75-.69,13.76-3.57,18.03-8.66,4.47-5.11,6.38-11.38,5.72-18.82-.2-2.23-.74-4.46-1.64-6.68-.89-2.22-2.19-4.44-3.88-6.64-1.6,4.96-4.46,8.94-8.58,11.92-4.13,2.99-8.74,4.71-13.84,5.16-8.93.79-15.58-3.6-19.96-13.17-.66-1.44-1.51-4.36-2.54-8.77-1.03-4.41-2.3-10.24-3.8-17.49-2.34.21-4.41-.52-6.22-2.18-1.81-1.66-2.81-3.61-3.01-5.84s.52-4.44,2.17-6.3c1.65-1.86,3.65-2.89,5.99-3.1,8.5-.75,13.34,5.51,14.51,18.79l.17,1.91c.07.74.11,1.81.12,3.2.02,1.39.07,3.23.17,5.53.1,2.3.25,5.25.46,8.87.66,6.26,3.12,9.2,7.37,8.82,2.12-.19,4.23-1.15,6.33-2.89,2.1-1.74,4.24-4.15,6.43-7.24,1.7-2.61,3.15-5.2,4.37-7.78,1.22-2.57,2.08-5.22,2.59-7.94,12.12,7.49,18.81,18.36,20.07,32.6Z"/>
      <path fill="#fff" stroke="#fff" stroke-width="5" stroke-miterlimit="10" d="M708.79,478.24c.55,6.16-2.16,9.51-8.11,10.03-8.18.72-14.43-23.3-.37-4.14-.5-8.09-.41-11.85.09-3.76-.02-7.49-.35-11.21l-27.57,2.44c-5.63.5-10.84-1.47-15.62-5.92-4.79-4.45-7.42-9.43-7.91-14.96-.69-7.75,1.57-14.92,6.77-21.48,5.19-6.67,11.66-10.35,19.42-11.04,12.32-1.09,21.48,3.72,27.46,14.43,4.56,7.95,7.54,19.79,8.93,35.51.1,1.17.2,2.61.3,4.31.1,1.71.2,3.52.32,5.43.11,1.92.23,3.86.36,5.83.12,1.97.26,3.81.41,5.51l.78,8.77c2.76-.24,5,.25,6.72,1.49,1.72,1.24,2.7,3.24,2.94,6ZM684.16,425.01c-.23-2.55-.8-5.09-1.72-7.64-.92-2.54-2.26-5.23-4.01-8.08-4.22-6.59-8.41-9.7-12.55-9.33-2.76.24-5.39,1.17-7.87,2.78-2.48,1.61-4.68,3.73-6.58,6.37-4.12,5.5-5.93,11.02-5.44,16.54.38,4.25,3.65,6.1,9.81,5.56l28.53-2.53-.17-3.68Z"/>
    </svg>`;

    const img = new Image();
    const svgBlob = new Blob([logoSvg], { type: "image/svg+xml;charset=utf-8" });
    const reader = new FileReader();
    reader.onloadend = () => {
      img.onload = () => {
        // Draw SVG Logo
        ctx.drawImage(img, 300 - 60, 80, 120, 130);

        // Draw subtitle
        ctx.font = "normal 14px sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        ctx.fillText("MINIMAL FOCUS SUDOKU", 300, 255);

        // Draw divider
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(100, 285);
        ctx.lineTo(500, 285);
        ctx.stroke();

        // Draw success title
        ctx.font = "bold 32px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(t("game.win.title"), 300, 340);

        // Stats card box
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(80, 380, 440, 210, 16);
        ctx.fill();
        ctx.stroke();

        // Write Stats columns
        const stats = [
          { label: t("difficulty.difficulty_label"), val: difficulty },
          { label: t("game.win.time"), val: timeStr },
          { label: t("game.win.mistakes"), val: mistakesStr }
        ];

        stats.forEach((stat, i) => {
          const colX = 160 + i * 140;
          ctx.font = "bold 11px sans-serif";
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          ctx.fillText(stat.label.toUpperCase(), colX, 445);

          ctx.font = "bold 26px sans-serif";
          ctx.fillStyle = i === 0 ? accentColor : "#ffffff";
          ctx.fillText(stat.val, colX, 495);
        });

        // CTA
        ctx.font = "italic 13px sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("Can you beat my score? Play at:", 300, 640);

        ctx.font = "bold 16px sans-serif";
        ctx.fillStyle = accentColor;
        ctx.fillText("sudoku-focus.vercel.app", 300, 670);

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject("Blob generation failed");
        }, "image/png");
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(svgBlob);
  });
};

interface WinModalProps {
  onClose: () => void;
}

export function WinModal({ onClose }: WinModalProps) {
  const { elapsed, mistakes, difficulty, startGame, resetGame } = useGameStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const stats = loadStats();
  const currentStats = difficulty ? stats[difficulty] : null;
  const isPersonalBest = !!(currentStats?.bestTime && currentStats.bestTime === elapsed);
  const nextDiff = difficulty ? DIFF_ORDER[DIFF_ORDER.indexOf(difficulty) + 1] : null;
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharingImage, setSharingImage] = useState(false);

  // Score submission and Auth states
  const [user, setUser] = useState<any>(null);
  const [playerName, setPlayerName] = useState("");
  const [submittingScore, setSubmittingScore] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(false);
  const [authMode, setAuthMode] = useState<"none" | "login" | "signup">("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Fetch session on load
  useEffect(() => {
    api.getSession().then((data) => {
      if (data && data.user) {
        setUser(data.user);
        setPlayerName(data.user.name);
      }
    });
  }, []);

  const handlePostScore = async () => {
    setSubmittingScore(true);
    try {
      const gameKey = `sudoku_${difficulty || "easy"}`;
      await api.postScore(gameKey, elapsed, playerName.trim() || "Guest");
      setSubmittedScore(true);
    } catch (err: any) {
      alert(err.message || "Failed to submit score");
    } finally {
      setSubmittingScore(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      if (authMode === "login") {
        const res = await api.signIn(email, password);
        setUser(res.user);
        setPlayerName(res.user.name);
        setAuthMode("none");
      } else {
        const res = await api.signUp(email, password, name);
        setUser(res.user);
        setPlayerName(res.user.name);
        setAuthMode("none");
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    }
  };

  const timeStr = translateNumber(formatTime(elapsed), i18n.language);
  const mistakesStr = translateNumber(mistakes, i18n.language);
  const diffStr = difficulty ? t(`difficulty.${difficulty}`) : "";
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}?shared=true&diff=${difficulty || "easy"}&time=${elapsed}&errors=${mistakes}`
    : "";

  const shareText = t("game.win.share_text", {
    difficulty: diffStr,
    time: timeStr,
    mistakes: mistakesStr,
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setSharingImage(true);
      const blob = await generateScorecard(diffStr, timeStr, mistakesStr, theme.accent, t);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sudoku-win-${difficulty || "game"}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setSharingImage(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        setSharingImage(true);
        const blob = await generateScorecard(diffStr, timeStr, mistakesStr, theme.accent, t);
        const file = new File([blob], "sudoku-result.png", { type: "image/png" });

        await navigator.share({
          title: t("game.win.share_title"),
          text: shareText,
          url: shareUrl,
          files: [file],
        });
      } catch (err) {
        console.warn("Native file share failed, falling back to text share", err);
        try {
          await navigator.share({
            title: t("game.win.share_title"),
            text: shareText,
            url: shareUrl,
          });
        } catch (e) {
          setShowShareMenu(true);
        }
      } finally {
        setSharingImage(false);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappIntent = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  const facebookIntent = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(14px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 20, stiffness: 260, delay: 0.05 }}
        className="w-full max-w-[288px] mx-4"
      >
        <GlassCard intensity="high" className="p-5 flex flex-col items-center text-center gap-4 overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            {!showShareMenu ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                {/* Trophy icon */}
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.15 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${theme.accent}1e`,
                      border: `1.5px solid ${theme.accent}44`,
                      boxShadow: `0 0 24px ${theme.glow}`,
                    }}
                  >
                    <Trophy size={26} style={{ color: theme.accent }} />
                  </motion.div>
                  {isPersonalBest && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                      className="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                      style={{ background: theme.accent, color: theme.accentFg }}
                    >
                      {t("game.win.pb")}
                    </motion.div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-[17px] font-semibold text-white/90 leading-tight">
                    {t("game.win.title")}
                  </h2>
                  <p className="text-[11px] text-white/35 capitalize mt-0.5">
                    {t("game.win.difficulty_desc", { diff: difficulty ? t(`difficulty.${difficulty}`) : "" })}
                  </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  {[
                    { label: t("game.win.time"), value: timeStr, icon: <Clock size={11} />, color: theme.accent },
                    { label: t("game.win.mistakes"), value: mistakesStr, icon: <XCircle size={11} />, color: mistakes > 0 ? "#ef4444" : "rgba(255,255,255,0.5)" },
                  ].map(({ label, value, icon, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 rounded-xl py-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {icon}
                        <span className="text-[9px] uppercase tracking-widest">{label}</span>
                      </div>
                      <span className="text-[22px] font-thin tabular-nums leading-none" style={{ color }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Online Score Submission */}
                <div className="w-full flex flex-col gap-2 p-2.5 rounded-xl border border-white/5 bg-white/5">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/30 text-left">
                    {i18n.language === "bn" ? "অনলাইন লিডারবোর্ড" : "Online Leaderboard"}
                  </p>
                  
                  {submittedScore ? (
                    <div className="text-xs font-medium text-green-400 py-1">
                      ✓ {i18n.language === "bn" ? "স্কোর জমা দেওয়া হয়েছে!" : "Score submitted!"}
                    </div>
                  ) : authMode === "login" ? (
                    <form onSubmit={handleAuth} className="flex flex-col gap-2 text-left">
                      <p className="text-xs font-semibold text-white/80">
                        {i18n.language === "bn" ? "লগইন করুন" : "Sign In"}
                      </p>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                      />
                      {authError && (
                        <p className="text-[10px] text-red-400 font-medium leading-tight">{authError}</p>
                      )}
                      <div className="flex gap-1.5">
                        <button
                          type="submit"
                          className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all active:scale-95"
                          style={{ background: theme.accent, color: theme.accentFg }}
                        >
                          {i18n.language === "bn" ? "লগইন" : "Sign In"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setAuthMode("none"); setAuthError(null); }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white"
                        >
                          {i18n.language === "bn" ? "বাতিল" : "Cancel"}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setAuthMode("signup"); setAuthError(null); }}
                        className="text-[10px] text-accent/80 hover:text-accent text-center mt-1 outline-none"
                      >
                        {i18n.language === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create an account"}
                      </button>
                    </form>
                  ) : authMode === "signup" ? (
                    <form onSubmit={handleAuth} className="flex flex-col gap-2 text-left">
                      <p className="text-xs font-semibold text-white/80">
                        {i18n.language === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account"}
                      </p>
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                      />
                      {authError && (
                        <p className="text-[10px] text-red-400 font-medium leading-tight">{authError}</p>
                      )}
                      <div className="flex gap-1.5">
                        <button
                          type="submit"
                          className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all active:scale-95"
                          style={{ background: theme.accent, color: theme.accentFg }}
                        >
                          {i18n.language === "bn" ? "তৈরি করুন" : "Sign Up"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setAuthMode("none"); setAuthError(null); }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white"
                        >
                          {i18n.language === "bn" ? "বাতিল" : "Cancel"}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setAuthMode("login"); setAuthError(null); }}
                        className="text-[10px] text-accent/80 hover:text-accent text-center mt-1 outline-none"
                      >
                        {i18n.language === "bn" ? "লগইন করুন" : "Already have an account? Sign In"}
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {user ? (
                        <div className="flex flex-col gap-1.5 items-stretch">
                          <p className="text-xs text-white/70 text-left">
                            {i18n.language === "bn" ? "প্লেয়ার:" : "Player:"}{" "}
                            <span className="font-semibold text-white">{user.name}</span>
                          </p>
                          <button
                            onClick={handlePostScore}
                            disabled={submittingScore}
                            className="w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all active:scale-95 disabled:opacity-60"
                            style={{ background: theme.accent, color: theme.accentFg }}
                          >
                            {submittingScore
                              ? (i18n.language === "bn" ? "জমা হচ্ছে..." : "Submitting...")
                              : (i18n.language === "bn" ? "স্কোর জমা দিন" : "Submit Score")}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 items-stretch">
                          <input
                            type="text"
                            placeholder={i18n.language === "bn" ? "প্লেয়ারের নাম (Guest)" : "Player name (Guest)"}
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-accent/50"
                          />
                          <div className="flex gap-1.5">
                            <button
                              onClick={handlePostScore}
                              disabled={submittingScore}
                              className="flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all active:scale-95 disabled:opacity-60"
                              style={{ background: theme.accent, color: theme.accentFg }}
                            >
                              {submittingScore
                                ? (i18n.language === "bn" ? "জমা হচ্ছে..." : "Submitting...")
                                : (i18n.language === "bn" ? "জমা দিন" : "Submit")}
                            </button>
                            <button
                              onClick={() => setAuthMode("login")}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all active:scale-95"
                            >
                              {i18n.language === "bn" ? "লগইন" : "Login"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => difficulty && startGame(difficulty)}
                      className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      style={{ background: theme.accent, color: theme.accentFg }}
                    >
                      <RotateCcw size={12} />
                      {t("game.win.play_again")}
                    </button>
                    
                    <button
                      onClick={handleNativeShare}
                      disabled={sharingImage}
                      className="px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {sharingImage ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Share2 size={13} />
                          <span className="text-[11px] font-medium">{t("game.win.share_score")}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {nextDiff && (
                    <button
                      onClick={() => startGame(nextDiff)}
                      className="w-full py-2.5 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1 transition-all active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {t("game.win.try_next", { diff: t(`difficulty.${nextDiff}`) })}
                      <ChevronRight size={13} />
                    </button>
                  )}

                  <button
                    onClick={() => { resetGame(); router.push("/"); }}
                    className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <Home size={12} />
                    {t("game.win.home")}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="share"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-3.5 w-full"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white/90 leading-tight">
                    {t("game.win.share_modal_title")}
                  </h3>
                  <p className="text-[10px] text-white/40 mt-0.5">
                    {t("game.win.difficulty_desc", { diff: diffStr })}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 w-full">
                  {/* Share image card button */}
                  <button
                    onClick={handleDownloadImage}
                    disabled={sharingImage}
                    className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{
                      background: `${theme.accent}1c`,
                      border: `1px solid ${theme.accent}44`,
                      color: theme.accent,
                    }}
                  >
                    {sharingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download size={13} />
                        {t("game.win.download_image")}
                      </>
                    )}
                  </button>

                  <div className="h-px bg-white/10 w-full my-0.5" />

                  {/* Copy Link Button */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 rounded-xl text-[11px] font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-green-400" />
                        <span className="text-green-400">{t("game.win.link_copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        {t("game.win.copy_link")}
                      </>
                    )}
                  </button>

                  {/* Twitter Share */}
                  <a
                    href={twitterIntent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{
                      background: "#1da1f215",
                      border: "1px solid #1da1f240",
                      color: "#1da1f2",
                    }}
                  >
                    <TwitterIcon size={12} />
                    Twitter / X
                  </a>

                  {/* WhatsApp Share */}
                  <a
                    href={whatsappIntent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{
                      background: "#25d36615",
                      border: "1px solid #25d36640",
                      color: "#25d366",
                    }}
                  >
                    <WhatsAppIcon size={12} />
                    WhatsApp
                  </a>

                  {/* Facebook Share */}
                  <a
                    href={facebookIntent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl text-[11px] font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{
                      background: "#1877f215",
                      border: "1px solid #1877f240",
                      color: "#1877f2",
                    }}
                  >
                    <FacebookIcon size={12} />
                    Facebook
                  </a>
                </div>

                <button
                  onClick={() => setShowShareMenu(false)}
                  className="mt-1 text-[10px] text-white/30 hover:text-white/60 transition-colors"
                >
                  Back to Stats
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
