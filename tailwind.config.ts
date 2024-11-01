const {nextui} = require("@nextui-org/react");
import { Config } from "tailwindcss";
import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
  "color-1": "#231F20",
  "color-2": "#F2757A",
  "color-3": "#D6CECE",
  "color-4": "#1B1B4E",
  "color-5": "#2BABFB",
  "color-6": "#525252",
  "color-7": "#CFCFCF",
  "color-8": "#E1E1E1",
  "color-9": "#3571EC",
  "color-10": "#717171",
  "color-11": "#FBFCFF",
  "color-12": "#0C134A",
  "color-13": "#172066",
  "color-14": "#718EBF",
  "color-15": "#FE5C73",
  "color-16": "#FFFFFF",
  "color-17": "#333B69",
  "color-18": "#BABABA",
  "color-19": "#CCC4B8",
  "color-20": "#777777",
  "color-21": "#396AFF",
  "color-22": "#232323",
  "color-23": "#F7F7F7",
  "color-24": "#4785FF",
  "color-25": "#D5E4FF",
};
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ...colors,
      },
      backgroundColors: {
        ...colors,
      },
      screens: {
        "custom-sm": "500px",
        "custom-md": "918px",
        "custom-xs":"400px"
      },
      width: {
        "450px": "450px",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
