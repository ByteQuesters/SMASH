import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF2F2",
        foreground: "#fce7c8",
        time: "#2d336b",
        toolbar: "#7886C7",
        button: "#493628",
        //code: "#f5e1da",
        code:"#faf3e0",
        pre:"#"
      },
    },
  },
  plugins: [],
} satisfies Config;