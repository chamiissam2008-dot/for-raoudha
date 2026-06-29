import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const cor=Cormorant_Garamond({subsets:["latin"],weight:["300","400","500","600"],style:["normal","italic"],variable:"--font-cor",display:"swap",preload:true});
const pla=Playfair_Display({subsets:["latin"],weight:["400","500","700"],style:["normal","italic"],variable:"--font-pla",display:"swap"});
const int=Inter({subsets:["latin"],weight:["300","400","500"],variable:"--font-int",display:"swap"});

export const metadata:Metadata={title:"For Raoudha Riham — A Special Journey",description:"A luxury birthday experience crafted with love.",robots:"noindex,nofollow"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en" suppressHydrationWarning>
      <body className={`${cor.variable} ${pla.variable} ${int.variable}`}>{children}</body>
    </html>
  );
}
