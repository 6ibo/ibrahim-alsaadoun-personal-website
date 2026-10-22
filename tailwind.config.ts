import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#1D1D1F", mist: "#F5F5F7" } } }, plugins: [] };
export default config;
