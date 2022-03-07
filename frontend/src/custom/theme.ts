import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

const theme = extendTheme({
  fonts: {
    heading: fontFamily,
    body: fontFamily,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        backgroundColor: colors.bg,
        color: colors.fg,
      },

      a: {
        textDecoration: null,
        _hover: {
          color: colors.accent,
        },
      },
    },
  },
});

export default theme;
