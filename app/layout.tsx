import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '宋临川律师 | 民商事与刑事法律服务',
  description: '诚心诚意，尽心尽力。中华人民共和国执业律师。任何时候我都视委托如山，只为帮您争取最大的利益。',
  openGraph: {
    title: '宋临川律师 | 民商事与刑事法律服务',
    description: '诚心诚意，尽心尽力。中华人民共和国执业律师。任何时候我都视委托如山，只为帮您争取最大的利益。',
    url: 'https://www.songlinchuan.com',
    siteName: '宋临川律师个人官网',
    images: [
      {
        url: '/avatar.jpg', // 这里直接用你的头像做封面
        width: 800,
        height: 800,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
