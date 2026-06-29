import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cr:"#FFF8F8",r50:"#FFF0F5",r1:"#FFE1EC",r2:"#FFBCD5",
        r3:"#F08098",r4:"#D4638E",r5:"#B84A62",r6:"#92304A",r7:"#6B1F36",
        gold:"#C9A96E",ink:"#1A0A0F",
      },
      fontFamily: {
        cor:["var(--font-cor)","Georgia","serif"],
        pla:["var(--font-pla)","Georgia","serif"],
        int:["var(--font-int)","system-ui","sans-serif"],
      },
      keyframes: {
        petal:{"0%":{transform:"translateY(-60px) translateX(0) rotate(0deg)",opacity:"0.9"},"30%":{transform:"translateY(30vh) translateX(25px) rotate(100deg)",opacity:"0.8"},"60%":{transform:"translateY(60vh) translateX(-20px) rotate(220deg)",opacity:"0.55"},"100%":{transform:"translateY(110vh) translateX(0) rotate(430deg)",opacity:"0"}},
        breathe:{"0%,100%":{transform:"scale(1)"},"50%":{transform:"scale(1.05)"}},
        floatY:{"0%,100%":{transform:"translateY(0)"},"50%":{transform:"translateY(-15px)"}},
        fadeUp:{from:{opacity:"0",transform:"translateY(30px)"},to:{opacity:"1",transform:"translateY(0)"}},
        countUp:{from:{opacity:"0",transform:"scale(.7)"},to:{opacity:"1",transform:"scale(1)"}},
        grain:{"0%,100%":{backgroundPosition:"0 0"},"25%":{backgroundPosition:"40px -20px"},"50%":{backgroundPosition:"-30px 35px"},"75%":{backgroundPosition:"25px -45px"}},
      },
      animation: {
        petal:"petal 13s linear infinite",
        breathe:"breathe 6s ease-in-out infinite",
        floatY:"floatY 8s ease-in-out infinite",
        fadeUp:"fadeUp .9s cubic-bezier(.22,1,.36,1) forwards",
        grain:"grain .12s steps(1) infinite",
      },
    },
  },
  plugins:[],
};
export default config;
