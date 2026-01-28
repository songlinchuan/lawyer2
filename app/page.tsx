"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Phone, MessageCircle, X, ChevronRight, Copy, MapPin, Building2 } from "lucide-react";

// --- 配置区域 ---
const AVATAR_IMAGE = "/avatar.jpg";
const WECHAT_QR_IMAGE = "/wechat-qr.jpg";
const PHONE_NUMBER = "15665792073";

// --- 动画配置 ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- 数据配置 ---
const casesData = {
  civil: [
    { title: "人格权纠纷", desc: "名誉权、隐私权及肖像权侵权诉讼与维权。" },
    { title: "婚姻家庭/继承纠纷", desc: "离婚财产分割、子女抚养及遗产继承规划。" },
    { title: "物权纠纷", desc: "不动产确权、所有权争议及相邻关系处理。" },
    { title: "合同纠纷", desc: "买卖、租赁、借款等各类合同违约与索赔。" },
    { title: "侵权责任纠纷", desc: "交通事故、医疗损害及其他人身财产损害赔偿。" },
    { title: "劳动争议纠纷", desc: "工伤认定、非法辞退赔偿及劳动仲裁代理。" },
    { title: "知识产权与竞争纠纷", desc: "商标侵权、著作权保护及不正当竞争诉讼。" },
  ],
  criminal: [
    { title: "侵犯公民人身/民主权利罪", desc: "故意伤害、非法拘禁等重大人身犯罪辩护。" },
    { title: "侵犯财产罪", desc: "盗窃、诈骗、职务侵占等财产类犯罪辩护。" },
  ],
  admin: [
    { title: "行政处罚类", desc: "不服行政拘留、罚款等处罚的复议与诉讼。" },
    { title: "行政强制类", desc: "针对违规查封、扣押、冻结措施的法律救济。" },
    { title: "行政征收类", desc: "土地征收、房屋拆迁补偿安置争议解决。" },
  ]
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"civil" | "criminal" | "admin">("civil");
  const [showWeChat, setShowWeChat] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [selectedCase, setSelectedCase] = useState<{title: string, desc: string} | null>(null);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
        navigator.clipboard.writeText(PHONE_NUMBER);
    }
  };

  return (
    // 最外层容器
    <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-gray-200 lg:flex">
      
      {/* ———————— 左侧区域 (电脑端固定) ———————— */}
      {/* 修改重点：lg:w-[35%] -> lg:w-[30%] 让左侧栏稍微窄一点，更精致 */}
      <aside className="
        w-full lg:w-[30%] lg:h-screen lg:sticky lg:top-0 
        bg-[#FBFBFD] lg:bg-white lg:border-r border-gray-100 
        flex flex-col justify-center items-center 
        px-6 py-20 lg:p-0 z-10
      ">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center space-y-6 lg:space-y-8" // 电脑端拉大一点间距
        >
          {/* 1. 头像区 */}
          <motion.div variants={fadeInUp} className="relative group">
            <div className="absolute inset-0 bg-gray-200 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <img 
              src={AVATAR_IMAGE} 
              alt="Song Linchuan" 
              // 修改重点：md:w-40 md:h-40 -> lg:w-28 lg:h-28 (电脑上头像变小，更精致)
              // 手机保持 w-32 (w-32)
              className="relative w-32 h-32 lg:w-28 lg:h-28 object-cover rounded-2xl shadow-sm transition-all duration-700"
            />
          </motion.div>
          
          {/* 2. 姓名与头衔 */}
          <motion.div variants={fadeInUp} className="space-y-3 lg:space-y-4">
            {/* 名字：手机大(3xl)，电脑稍微克制一点(2xl) */}
            <h1 className="text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">宋临川</h1>
            
            {/* 执业证号：字体变小，加宽字间距，显得更高级 */}
            <p className="text-sm lg:text-xs text-gray-400 font-medium tracking-[0.2em] uppercase">
              中华人民共和国执业律师 
            </p>
            
            {/* Slogan：稍微调小字号，用灰色 */}
            <p className="text-lg lg:text-base text-gray-600 font-serif italic pt-2">
              &quot;诚心诚意，尽心尽力&quot;
            </p>
          </motion.div>

          {/* 3. 社交按钮 (调整 padding 让按钮看起来更小巧) */}
          <motion.div variants={fadeInUp} className="flex space-x-5 pt-2">
            <SocialButton icon={<MessageCircle size={18} />} label="微信" onClick={() => setShowWeChat(true)} />
            <SocialButton icon={<Phone size={18} />} label="电话" onClick={() => setShowPhone(true)} />
          </motion.div>
        </motion.div>
      </aside>

      {/* ———————— 右侧区域 (内容滚动) ———————— */}
      {/* 对应调整宽度：lg:w-[65%] -> lg:w-[70%] */}
      <main className="w-full lg:w-[70%] bg-[#FBFBFD]">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto px-6 pb-20 pt-0 lg:pt-32 lg:pb-32 lg:px-16"
        >
          
          {/* 1. 关于我 / Bio */}
          <motion.section variants={fadeInUp} className="space-y-8">
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest">关于我 / About</h2>
            <div className="text-lg lg:text-base leading-loose text-gray-600 space-y-6">
              <p>
                生于齐鲁，少时旁观世事变迁，深感法律于个体命运之重，遂立志以法安身。
              </p>
              <p>
                执业至今，我不仅是法律的诠释者，更是您合法权益的坚实捍卫者。任何时候我都诚心诚意对待每一位当事人的委托，尽心尽力争取哪怕百分之一的可能。我笃信“细节决定成败”，只为帮您争取最大的利益。
              </p>
            </div>
          </motion.section>

          {/* 2. 我的案例 / Case Studies */}
          <motion.section variants={fadeInUp} className="mt-32 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest">我的案例 / Practice Areas</h2>
            </div>

            <div className="flex space-x-1 bg-white border border-gray-100 p-1 rounded-lg w-fit">
              <TabButton active={activeTab === "civil"} onClick={() => setActiveTab("civil")}>民事案件</TabButton>
              <TabButton active={activeTab === "criminal"} onClick={() => setActiveTab("criminal")}>刑事案件</TabButton>
              <TabButton active={activeTab === "admin"} onClick={() => setActiveTab("admin")}>行政案件</TabButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {casesData[activeTab].map((item) => (
                  <CaseCard 
                    key={item.title} 
                    title={item.title} 
                    desc={item.desc} 
                    onClick={() => setSelectedCase(item)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        
          {/* 3. 所谓荣耀 / Honors */}
          <motion.section variants={fadeInUp} className="mt-32 mb-12 space-y-8">
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest">所谓荣耀 / Honors</h2>
            <div className="space-y-6 border-l border-gray-200 pl-8">
              <HonorItem>
                团队每年圆满解决数十起案件
              </HonorItem>
              <HonorItem>
                获得数位当事人的满意评价与锦旗感谢
              </HonorItem>
              <HonorItem>
                本人与团队十年如一日地保持对当事人的责任担当、对律师行业的使命坚守、对法律领域的深耕探索
              </HonorItem>
            </div>
          </motion.section>

          {/* 4. 页脚 / Footer */}
          <motion.footer variants={fadeInUp} className="mt-32 pt-12 border-t border-gray-100 text-gray-500 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* 律所信息 */}
              <div className="space-y-4">
                <a 
                  href="http://www.shandonghuaifa.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <h4 className="text-gray-900 font-bold text-base group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    <Building2 size={16}/> 山东怀法律师事务所
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 pl-6">点击访问官网</p>
                </a>
                
                <div 
                  onClick={() => setIsNavModalOpen(true)}
                  className="group cursor-pointer block"
                >
                   <p className="leading-relaxed group-hover:text-gray-900 flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 shrink-0"/> 山东省济南市历下区城投环贸中心C座6号楼1801室
                   </p>
                   <p className="text-xs text-gray-400 mt-1 pl-6">点击导航</p>
                </div>
              </div>

              {/* 联系与版权 */}
              <div className="space-y-4 md:text-right">
                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  className="group block"
                >
                   <p className="group-hover:text-gray-900 font-medium text-lg tracking-wider">
                     {PHONE_NUMBER}
                   </p>
                   <p className="text-xs text-gray-400 mt-1">
                     (手机同微信号)
                   </p>
                </a>
                <div className="text-xs text-gray-300 pt-4">
                  <p>© 2026 宋临川律师团队.</p>
                  <p>All rights reserved.</p>
                </div>
              </div>

            </div>
          </motion.footer>

        </motion.div>
      </main>

      {/* --- Modals / 弹窗组件 (逻辑保持不变) --- */}
      
      {/* 微信弹窗 */}
      <Modal isOpen={showWeChat} onClose={() => setShowWeChat(false)} title="扫码添加微信">
        <div className="flex flex-col items-center">
          <img src={WECHAT_QR_IMAGE} alt="WeChat QR" className="w-64 h-64 object-contain rounded-lg" />
          <p className="mt-4 text-sm text-gray-500">请使用微信扫一扫</p>
        </div>
      </Modal>

      {/* 电话弹窗 */}
      <Modal isOpen={showPhone} onClose={() => setShowPhone(false)} title="联系方式">
        <div className="text-center space-y-6 py-4">
          <p className="text-2xl font-bold tracking-wider">{PHONE_NUMBER}</p>
          <div className="flex justify-center space-x-4">
            <button onClick={copyToClipboard} className="flex items-center px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <Copy size={16} className="mr-2"/> 复制
            </button>
            <a href={`tel:${PHONE_NUMBER}`} className="flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              <Phone size={16} className="mr-2"/> 拨打
            </a>
          </div>
        </div>
      </Modal>

      {/* 案例详情弹窗 */}
      <Modal isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} title={selectedCase?.title || ""}>
        <div className="space-y-4">
          <div className="w-8 h-1 bg-black mb-6"></div>
          <p className="text-lg text-gray-700 leading-relaxed font-serif">
            {selectedCase?.desc}
          </p>
          <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100">
            * 案情细节因隐私保护已做脱敏处理
          </p>
        </div>
      </Modal>

      {/* 导航菜单弹窗 */}
      <AnimatePresence>
        {isNavModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4"
            onClick={() => setIsNavModalOpen(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100 text-center">
                <h3 className="text-sm font-bold text-gray-500">选择地图导航</h3>
              </div>
              
              <div className="flex flex-col">
                <a href="https://uri.amap.com/marker?position=117.11906,36.65756&name=山东怀法律师事务所&coordinate=Gaode" target="_blank" className="py-4 text-center text-gray-800 font-medium hover:bg-gray-50 border-b border-gray-100 transition-colors">高德地图</a>
                <a href="http://api.map.baidu.com/marker?location=36.6636,117.1255&title=山东怀法律师事务所&content=山东省济南市历下区城投环贸中心C座6号楼1801室&output=html" target="_blank" className="py-4 text-center text-gray-800 font-medium hover:bg-gray-50 border-b border-gray-100 transition-colors">百度地图</a>
                <a href="https://apis.map.qq.com/uri/v1/search?keyword=山东怀法律师事务所&region=济南" target="_blank" className="py-4 text-center text-gray-800 font-medium hover:bg-gray-50 border-b border-gray-100 transition-colors">腾讯地图</a>
                <a href="http://maps.apple.com/?q=山东怀法律师事务所&address=山东省济南市历下区城投环贸中心C座" target="_blank" className="py-4 text-center text-gray-800 font-medium hover:bg-gray-50 transition-colors">苹果地图</a>
              </div>

              <div className="bg-gray-100 p-2">
                <button onClick={() => setIsNavModalOpen(false)} className="w-full py-3 bg-white rounded-xl text-gray-600 font-bold shadow-sm hover:bg-gray-50 transition-colors">取消</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- 子组件 (样式微调：更精致的圆角和阴影) ---

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-3 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-black hover:border-black transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 rounded-md text-xs font-bold tracking-wide transition-all duration-300 ${
        active ? "bg-black text-white shadow-md" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

function CaseCard({ title, desc, onClick }: { title: string, desc: string, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group p-6 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 group-hover:text-black transition-colors">{title}</h3>
        <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
      </div>
      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
    </motion.div>
  );
}

function HonorItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -left-[37px] top-2 w-2 h-2 bg-gray-200 rounded-full ring-4 ring-white"></div>
      <p className="text-gray-600 leading-relaxed text-sm">{children}</p>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-white/80 backdrop-blur-md" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative bg-white rounded-2xl w-full max-w-sm p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-black transition"><X size={18}/></button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
