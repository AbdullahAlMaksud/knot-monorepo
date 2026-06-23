import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navigation: {
        home: "Home",
        sudoku: "Sudoku",
        scores: "Scores",
        settings: "Settings",
        theme: "Theme (D)",
        fullscreen: "Fullscreen (F)",
        exitFullscreen: "Exit Fullscreen (F)",
        pinSidebar: "Pin Sidebar (P)",
        unpinSidebar: "Unpin Sidebar (P)",
      },
      difficulty: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        expert: "Expert",
        clues: "{{count}} clues",
        easy_desc: "36 clues · relaxed",
        medium_desc: "30 clues · balanced",
        hard_desc: "24 clues · intense",
        expert_desc: "18 clues · extreme",
        difficulty_label: "Difficulty",
      },
      home: {
        focus: "Focus",
        sudoku: "sudoku",
        resume: "↩ Resume last game",
        footer: "Focus · Rest · Repeat",
      },
      game: {
        home_tooltip: "Home",
        new_game_tooltip: "New Game",
        time: "time",
        errors: "errors",
        filled: "filled",
        erase: "Erase",
        notes: "Notes",
        keyboard_hint: "arrows · 1-9 · N note · D theme · F fullscreen · P pin",
        win: {
          title: "Puzzle Complete",
          difficulty_desc: "{{diff}} difficulty",
          time: "Time",
          mistakes: "Mistakes",
          play_again: "Play Again",
          try_next: "Try {{diff}}",
          home: "Home",
          pb: "PB!",
        },
      },
      settings: {
        preferences: "Preferences",
        title: "Settings",
        theme: "Theme",
        press_d: "Press D to cycle",
        gameplay: "Gameplay",
        sound: {
          label: "Sound Effects",
          desc: "Play sounds on input and completion",
        },
        highlight: {
          label: "Highlight Related",
          desc: "Dim unrelated cells when selected",
        },
        mistakes: {
          label: "Show Mistakes",
          desc: "Display error count during play",
        },
        notes: {
          label: "Auto Notes",
          desc: "Automatically fill possible notes",
        },
        language: {
          label: "Language / ভাষা",
          desc: "Switch between English and Bengali",
        },
        fullscreen: {
          label: "Fullscreen Mode",
          desc: "Toggle window fullscreen mode",
        },
        shortcuts: {
          title: "Keyboard Shortcuts",
          cycle_theme: "Cycle theme",
          fullscreen: "Fullscreen",
          pin_sidebar: "Pin sidebar",
          toggle_language: "Toggle language",
          note_mode: "Note mode",
          enter_number: "Enter number",
          navigate: "Navigate",
          erase_cell: "Erase cell",
        },
      },
      scores: {
        performance: "Performance",
        scoreboard: "Scoreboard",
        overall: "Overall",
        played: "Played",
        won: "Won",
        time: "Time",
        win_rate: "Win %",
        avg_time: "Avg",
        no_games: "No games played yet",
        play_first: "Play your first game to see stats here",
        won_count: "{{count}} won",
      },
      themes: {
        obsidian: "Obsidian",
        rose: "Rose",
        emerald: "Emerald",
        violet: "Violet",
        amber: "Amber",
        sapphire: "Sapphire",
        coral: "Coral",
        snow: "Snow",
        sakura: "Sakura",
        mint: "Mint",
        lavender: "Lavender",
        honey: "Honey",
      },
    },
  },
  bn: {
    translation: {
      navigation: {
        home: "হোম",
        sudoku: "সুডোকু",
        scores: "স্কোর",
        settings: "সেটিংস",
        theme: "থিম (D)",
        fullscreen: "ফুল স্ক্রিন (F)",
        exitFullscreen: "স্বাভাবিক স্ক্রিন (F)",
        pinSidebar: "পিন সাইডবার (P)",
        unpinSidebar: "আনপিন সাইডবার (P)",
      },
      difficulty: {
        easy: "সহজ",
        medium: "মাঝারি",
        hard: "কঠিন",
        expert: "অভিজ্ঞ",
        clues: "{{count}}টি ক্লু",
        easy_desc: "৩৬টি ক্লু · আরামদায়ক",
        medium_desc: "৩০টি ক্লু · ভারসাম্যপূর্ণ",
        hard_desc: "২৪টি ক্লু · তীব্র",
        expert_desc: "১৮টি ক্লু · চরম",
        difficulty_label: "কঠিনতার মাত্রা",
      },
      home: {
        focus: "মনোযোগ",
        sudoku: "সুডোকু",
        resume: "↩ পূর্ববর্তী গেম চালু করুন",
        footer: "মনোযোগ · বিশ্রাম · পুনরাবৃত্তি",
      },
      game: {
        home_tooltip: "হোম",
        new_game_tooltip: "নতুন গেম",
        time: "সময়",
        errors: "ভুল",
        filled: "পূরণকৃত",
        erase: "মুছুন",
        notes: "নোট",
        keyboard_hint: "অ্যারো কি · ১-৯ · N নোট · D থিম · F ফুল স্ক্রিন · P পিন",
        win: {
          title: "ধাঁধা সম্পূর্ণ",
          difficulty_desc: "{{diff}} জটিলতা",
          time: "সময়",
          mistakes: "ভুলসমূহ",
          play_again: "আবার খেলুন",
          try_next: "{{diff}} খেলুন",
          home: "হোম",
          pb: "সেরা!",
        },
      },
      settings: {
        preferences: "পছন্দসমূহ",
        title: "সেটিংস",
        theme: "থিম",
        press_d: "থিম পরিবর্তন করতে D চাপুন",
        gameplay: "গেমপ্লে",
        sound: {
          label: "শব্দ প্রভাব",
          desc: "ইনপুট এবং গেম শেষ হলে শব্দ বাজান",
        },
        highlight: {
          label: "সম্পর্কিত সেল হাইলাইট",
          desc: "সিলেক্ট করার সময় অমিল সেলগুলো আবছা করুন",
        },
        mistakes: {
          label: "ভুল প্রদর্শন",
          desc: "খেলার সময় ভুলের সংখ্যা প্রদর্শন করুন",
        },
        notes: {
          label: "অটো নোট",
          desc: "সম্ভাব্য নোটগুলো স্বয়ংক্রিয়ভাবে পূরণ করুন",
        },
        language: {
          label: "ভাষা / Language",
          desc: "বাংলা এবং ইংরেজির মধ্যে পরিবর্তন করুন",
        },
        fullscreen: {
          label: "ফুল স্ক্রিন মোড",
          desc: "উইন্ডো ফুল স্ক্রিন টগল করুন",
        },
        shortcuts: {
          title: "কীবোর্ড শর্টকাট",
          cycle_theme: "থিম পরিবর্তন",
          fullscreen: "ফুল স্ক্রিন",
          pin_sidebar: "সাইডবার পিন",
          toggle_language: "ভাষা পরিবর্তন",
          note_mode: "নোট মোড",
          enter_number: "সংখ্যা বসানো",
          navigate: "ন্যাভিগেশন",
          erase_cell: "সেল মুছুন",
        },
      },
      scores: {
        performance: "পারফরম্যান্স",
        scoreboard: "স্কোরবোর্ড",
        overall: "সামগ্রিক",
        played: "খেলেছেন",
        won: "জিতেছেন",
        time: "সময়",
        win_rate: "জয়ের হার %",
        avg_time: "গড়",
        no_games: "এখনো কোনো গেম খেলা হয়নি",
        play_first: "পরিসংখ্যান দেখতে প্রথম গেমটি খেলুন",
        won_count: "{{count}}টি জয়",
      },
      themes: {
        obsidian: "অবসিডিয়ান",
        rose: "রোজ",
        emerald: "মরকত",
        violet: "বেগুনী",
        amber: "অ্যাম্বার",
        sapphire: "নীলা",
        coral: "প্রবাল",
        snow: "তুষার",
        sakura: "সাকুরা",
        mint: "পুদিনা",
        lavender: "ল্যাভেন্ডার",
        honey: "মধু",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "bn", // fallback default, will be overridden by store value in AppShell
    fallbackLng: "bn",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

const EN_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function translateNumber(num: number | string, currentLanguage: string): string {
  const str = String(num);
  if (currentLanguage !== "bn") return str;
  return str
    .split("")
    .map((char) => {
      const idx = EN_DIGITS.indexOf(char);
      return idx !== -1 ? BN_DIGITS[idx] : char;
    })
    .join("");
}
