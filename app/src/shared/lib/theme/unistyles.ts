import { UnistylesRegistry } from "react-native-unistyles";
import { breakpoints } from "./themes/breakpoints";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

try {
  UnistylesRegistry
    .addBreakpoints(breakpoints)
    .addThemes({
      light: lightTheme,
      dark: darkTheme,
    })
    .addConfig({
      adaptiveThemes: true,
    });
} catch (e) {
  // Already registered or failed on native
}

export {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from "react-native-unistyles";

export { ThemeProvider, useTheme } from "./ThemeContext";
export { breakpoints, darkTheme, lightTheme } from "./themes";
