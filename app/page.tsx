"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Phone, MessageCircle, X, ChevronRight, Copy, MapPin, Building2 } from "lucide-react";
import Image from "next/image";

// --- 配置区域 ---
const AVATAR_IMAGE = "/avatar.jpg";
const WECHAT_QR_IMAGE = "/wechat-qr.jpg"; 
const PHONE_NUMBER = "15665792073"; 
const FIRM_NAME = "山东怀法律师事务所";

// --- 动画配置 ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- 数据配置 ---
const casesData: Record<string, { title: string; desc: string }[]> = {
  "民事案件": [
    { title: "人格权纠纷", desc: "名誉权、隐私权及肖像权侵权诉讼与维权。" },
    { title: "婚姻家庭/继承纠纷", desc: "离婚财产分割、子女抚养及遗产继承规划。" },
    { title: "物权纠纷", desc: "不动产确权、所有权争议及相邻关系处理。" },
    { title: "合同纠纷", desc: "买卖、租赁、借款等各类合同违约与索赔。" },
    { title: "侵权责任纠纷", desc: "交通事故、医疗损害及其他人身财产损害赔偿。" },
    { title: "劳动争议纠纷", desc: "工伤认定、非法辞退赔偿及劳动仲裁代理。" },
    { title: "知识产权与竞争纠纷", desc: "商标侵权、著作权保护及不正当竞争诉讼。" },
  ],
  "刑事案件": [
    { title: "侵犯公民人身/民主权利罪", desc: "故意伤害、非法拘禁等重大人身犯罪辩护。" },
    { title: "侵犯财产罪", desc: "盗窃、诈骗、职务侵占等财产类犯罪辩护。" },
  ],
  "行政案件": [
    { title: "行政处罚类", desc: "不服行政拘留、罚款等处罚的复议与诉讼。" },
    { title: "行政强制类", desc: "针对违规查封、扣押、冻结措施的法律救济。" },
    { title: "行政征收类", desc: "土地征收、房屋拆迁补偿安置争议解决。" },
  ]
};

// --- 荣耀数据 ---
const honorsData = [
  "团队每年圆满解决数十起案件",
  "获得数位当事人的满意评价与锦旗感谢",
  "本人与团队十年如一日地保持对当事人的责任担当、对律师行业的使命坚守、对法律领域的深耕探索"
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("民事案件");
  const [selectedCase, setSelectedCase] = useState<{ title: string; desc: string } | null>(null);
  
  // 弹窗状态管理
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false); // 导航菜单开关

  // 复制微信号/电话功能
  const copyToClipboard = () => {
    navigator.clipboard.writeText(PHONE_NUMBER); 
    alert("号码已复制！");
  };

  return (
    <main className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-gray-200 pb-12">
      
      {/* 1. Hero 区域 */}
      <section className="px-6 pt-20 pb-12 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 mb-6 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white"
        >
          <Image 
            src={AVATAR_IMAGE} 
            alt="宋临川律师" 
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            宋临川
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            中华人民共和国执业律师
          </motion.p>
          <motion.p variants={fadeInUp} className="text-xl text-gray-700 italic font-serif leading-relaxed max-w-xs mx-auto">
            "诚心诚意
