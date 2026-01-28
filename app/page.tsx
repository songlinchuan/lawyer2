"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, ChevronRight, Copy, MapPin, Building2 } from "lucide-react";
import Image from "next/image";

// --- 类型定义 (这是解决红叉的关键，用正规定义代替 any) ---
type CaseItem = {
  title: string;
  desc: string;
};

type CasesDataType = Record<string, CaseItem[]>;

// --- 配置区域 ---
const AVATAR_IMAGE = "/avatar.jpg";
const WECHAT_QR_IMAGE = "/wechat-qr.jpg"; 
const PHONE_NUMBER = "15665792073"; 
const FIRM_NAME = "山东怀法律师事务所";

// --- 动画配置 ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- 数据配置 ---
const casesData: CasesDataType = {
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
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  
  // 弹窗状态管理
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false); 

  // 复制功能
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(PHONE_NUMBER);
      // alert("号码已复制！"); // 为了防止弹窗报错，暂时注释掉，只保留复制功能
    }
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
            "诚心诚意，尽心尽力"
          </motion.p>
        </motion.div>
      </section>

      {/* 按钮区域 */}
      <section className="px-6 mb-16">
        <div className="flex justify-center gap-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWeChatModalOpen(true)}
            className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md text-gray-700 hover:shadow-lg transition-all border border-gray-100"
            aria-label="添加微信"
          >
            <MessageCircle size={24} strokeWidth={1.5} />
          </motion.button>
          
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full shadow-md text-white hover:bg-gray-800 transition-all"
            aria-label="拨打电话"
          >
            <Phone size={24} strokeWidth={1.5} />
          </motion.a>
        </div>
      </section>

      {/* 2. 关于我 */}
      <section className="px-8 max-w-2xl mx-auto mb-20">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-l-2 border-gray-300 pl-3">
          关于我 / About
        </h2>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-6 text-gray-600 leading-loose text-justify"
        >
          <p>
            生于齐鲁，少时旁观世事变迁，深感法律于个体命运之重，遂立志以法安身。
          </p>
          <p>
            执业至今，我不仅是法律的诠释者，更是您合法权益的坚实捍卫者。任何时候我都诚心诚意对待每一位当事人的委托，尽心尽力争取哪怕百分之一的可能。我笃信“细节决定成败”，只为帮您争取最大的利益。
          </p>
        </motion.div>
      </section>

      {/* 3. 我的案例 (Tab 切换版) */}
      <section className="px-6 max-w-2xl mx-auto mb-24">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-l-2 border-gray-300 pl-3">
          我的案例 / Practice Areas
        </h2>

        {/* Tab 导航 */}
        <div className="flex p-1 bg-gray-200/50 rounded-xl mb-8 overflow-x-auto">
          {Object.keys(casesData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 案例列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="wait">
            {(casesData[activeTab] || []).map((item, index) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => setSelectedCase(item)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. 所谓荣耀 (紧接在案例之后) */}
      <section className="px-6 max-w-2xl mx-auto mb-12 space-y-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-l-2 border-gray-300 pl-3">
          所谓荣耀 / Honors
        </h2>
        <div className="space-y-6 border-l-2 border-gray-200 pl-6 relative">
          {honorsData.map((item, index) => (
