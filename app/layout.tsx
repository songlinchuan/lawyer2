import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. 保留你原有的 Geist 字体配置
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. 注入刚才商定的 SEO 内容 (去掉了夸大宣传，保留了核心业务)
export const metadata: Metadata = {
  // 网页标题
  title: '宋临川律师 | 民商事与刑事法律服务',
  
  // 网页描述
  description: '宋临川律师，中华人民共和国执业律师。诚心诚意，尽心尽力，专业承接济南及山东省内各类案件：包括刑事辩护（取保候审、罪轻无罪辩护）、民商事诉讼（合同纠纷、房产争议、债权债务）及企业法律顾问服务。欢迎来电咨询。',
  
  // 关键词 (方案 B)
  keywords: [
    "济南律师", 
    "山东律师", 
    "宋临川", 
    "山东怀法律师事务所", 
    "济南刑事辩护律师", 
    "济南取保候审", 
    "济南合同纠纷律师", 
    "济南房产律师", 
    "济南债权债务律师",
    "济南公司法律顾问",
    "济南法律咨询",
    "济南律师事务所电话"
  ].join(", "),

  // 社交分享卡片配置 (保留你原有的结构，但同步更新文案)
  openGraph: {
    title: '宋临川律师 | 民商事与刑事法律服务',
    description: '诚心诚意，尽心尽力。中华人民共和国执业律师。',
    url: 'https://www.songlinchuan.com',
    siteName: '宋临川律师个人官网',
    images: [
      {
        url: '/avatar.jpg',
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
    // 3. 将语言改为中文 zh-CN，利于百度收录
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
