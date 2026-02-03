"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Phone, MessageCircle, X, ChevronRight, Copy, MapPin, Building2, ChevronLeft, FileText } from "lucide-react";
// 引入我们刚才创建的数据文件
import { casesData } from './data';

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

export default function Portfolio() {
  // 基础弹窗状态
  const [showWeChat, setShowWeChat] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  // --- 新的交互逻辑：选中案例 ---
  const [selectedCaseId, setSelectedCaseId] = useState<string | number | null>(null);

  // 查找当前选中的案例数据
  const activeCase = casesData.find(c => c.id === selectedCaseId);
  
  // 关闭弹窗
  const handleCloseModal = () => {
    setSelectedCaseId(null);
  };
  
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
        navigator.clipboard.writeText(PHONE_NUMBER);
        alert("手机号已复制");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-gray-200 lg:flex">
      
      {/* 左侧区域 (侧边栏) */}
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
          className="flex flex-col items-center text-center space-y-6 lg:space-y-8"
        >
          {/* 头像 */}
          <motion.div variants={fadeInUp} className="relative group">
            <div className="absolute inset-0 bg-gray-200 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={AVATAR_IMAGE} 
              alt="Avatar" 
              className="relative w-32 h-32 lg:w-28 lg:h-28 object-cover rounded-2xl shadow-sm transition-all duration-700"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp} className="space-y-3 lg:space-y-4">
            <h1 className="text-3xl lg:text-3xl font-bold tracking-tight text-gray-900">宋临川</h1>
            <p className="text-sm lg:text-xs text-gray-400 font-medium tracking-[0.2em] uppercase">
              中华人民共和国执业律师 
            </p>
            <p className="text-lg lg:text-base text-gray-600 font-serif italic pt-2">
              &quot;诚心诚意，尽心尽力&quot;
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex space-x-5 pt-2">
            <SocialButton icon={<MessageCircle size={18} />} label="微信" onClick={() => setShowWeChat(true)} />
            <SocialButton icon={<Phone size={18} />} label="电话" onClick={() => setShowPhone(true)} />
          </motion.div>
        </motion.div>
      </aside>

      {/* 右侧区域 (主要内容) */}
      <main className="w-full lg:w-[70%] bg-[#FBFBFD]">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto px-6 pb-20 pt-0 lg:pt-32 lg:pb-10 lg:px-16"
        >
          
          {/* 1. 关于我 */}
          <motion.section variants={fadeInUp} className="space-y-8">
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest">关于我 / About</h2>
            <div className="text-lg lg:text-base leading-loose text-gray-600 space-y-6 text-justify break-all">
              <p>
                生于齐鲁，少时旁观世事变迁，深感法律于个体命运之重，遂立志以法安身。
              </p>
              <p>
                执业至今，我不仅是法律的诠释者，更是您合法权益的坚实捍卫者。任何时候我都诚心诚意对待每一位当事人的委托，尽心尽力争取哪怕百分之一的可能。我笃信“细节决定成败”，只为帮您争取最大的利益。
              </p>
            </div>
          </motion.section>

          {/* 2. 我的案例 (列表展示) */}
          <motion.section variants={fadeInUp} className="mt-32 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest">精选案例 / Featured Cases</h2>
            </div>

            {/* 案例网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {casesData.map((item) => (
                  <CaseCard 
                    key={item.id} 
                    tag={item.tag}
                    title={item.title} 
                    // 自动截取一段内容作为简介，并去掉可能的换行符
                    desc={item.content.substring(0, 50).replace(/[\n\r]/g, '') + "..."} 
                    onClick={() => setSelectedCaseId(item.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        
          {/* 3. 所谓荣耀 */}
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

          {/* 4. 页脚 */}
          <motion.footer variants={fadeInUp} className="mt-32 bg-gray-50 border-t border-gray-200 text-gray-600 py-10 px-6 -mx-6 lg:mx-0 lg:rounded-xl text-sm rounded-t-3xl">
            <div className="max-w-2xl mx-auto space-y-8"> 
              
              <div className="space-y-5">
                <a 
                  href="http://www.shandonghuaifa.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block w-fit"
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className="text-gray-900" />
                    <h4 className="text-gray-900 font-bold text-base group-hover:text-blue-600 transition-colors">
                      山东怀法律师事务所
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 pl-8 group-hover:text-gray-600 transition-colors">
                    (点击访问律所官网)
                  </p>
                </a>

                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  className="group block w-fit"
                >
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="flex-shrink-0 text-gray-400 group-hover:text-green-500 transition-colors" />
                    <p className="group-hover:text-gray-900 font-medium tracking-wider text-lg">
                      {PHONE_NUMBER}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 pl-8 group-hover:text-gray-600 transition-colors">
                    (点击拨打或复制 · 手机号同微信)
                  </p>
                </a>
                
                <div 
                  onClick={() => setIsNavModalOpen(true)}
                  className="group cursor-pointer block w-fit"
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <p className="leading-relaxed text-gray-600 group-hover:text-gray-900">
                      山东省济南市历下区城投环贸中心C座6号楼<span className="whitespace-nowrap">1801室</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 pl-8 group-hover:text-gray-600 transition-colors">
                    (点击选择地图导航)
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 text-xs text-gray-400 text-center">
                <p className="mb-2">© 2026 宋临川律师团队. All rights reserved.</p>
                <p>本网站内容仅供参考，不构成正式法律意见。</p>
              </div>

            </div>
          </motion.footer>

        </motion.div>
      </main>

      {/* --- 弹窗区域 --- */}

      {/* 微信弹窗 */}
      <Modal isOpen={showWeChat} onClose={() => setShowWeChat(false)} title="扫码添加微信">
        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

    {/* 案例详情弹窗 (UI 升级版：固定头部 + 独立滚动) */}
      <AnimatePresence>
        {selectedCaseId && activeCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* 1. 背景遮罩 (点击关闭) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-colors" 
            />
            
            {/* 2. 弹窗主体卡片 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} // 防止点击卡片关闭
              // 关键修改：flex flex-col 让头部和内容垂直排列，max-h-[85vh] 限制最大高度
              className="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              
              {/* --- A. 头部区域 (固定不动) --- */}
              <div className="flex-none bg-white p-5 border-b border-gray-100 flex justify-between items-start z-10">
                <div className="pr-8"> {/* 右侧留白给关闭按钮 */}
                   {/* 案由标签 (美化版) */}
                   <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100 mb-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                     {activeCase.tag}
                   </span>
                   {/* 标题移到头部，这样用户一眼就能看到重点 */}
                   <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                    {activeCase.title}
                   </h2>
                </div>
                
                {/* 关闭按钮 */}
                <button 
                  onClick={handleCloseModal} 
                  className="flex-shrink-0 p-2 -mr-2 -mt-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <X size={24}/>
                </button>
              </div>

              {/* --- B. 内容区域 (只有这里滚动) --- */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white scroll-smooth">
                  
                  {/* 正文内容 */}
                  <div className="text-lg text-gray-700 leading-loose font-serif whitespace-pre-line text-justify space-y-4">
                    {/* 我们给内容加一点装饰性的首字下沉或段落间距 */}
                    {activeCase.content}
                  </div>
                  
                  {/* 底部免责声明 */}
                  <div className="mt-10 pt-6 border-t border-dashed border-gray-200">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FileText size={12}/> 案情细节因隐私保护已做脱敏处理，仅供参考。
                    </p>
                  </div>

                  {/* 底部行动按钮 */}
                  <button 
                    onClick={() => window.location.href = `tel:${PHONE_NUMBER}`}
                    className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-center active:scale-95 transition-all shadow-lg shadow-slate-200"
                  >
                   联系宋律师咨询此类案件
                 </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

// --- 子组件 ---

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

// 升级版 CaseCard：支持显示 tag (案由)
function CaseCard({ title, desc, tag, onClick }: { title: string, desc: string, tag: string, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group p-6 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer flex flex-col items-start"
    >
      {/* 案由标签 */}
      <div className="mb-3">
         <span className="inline-block bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded font-bold">
           {tag}
         </span>
      </div>
      
      <div className="flex w-full justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800 group-hover:text-black transition-colors leading-snug">
          {title}
        </h3>
      </div>
      
      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-2">
        {desc}
      </p>

      <div className="mt-auto pt-2 flex items-center text-gray-300 group-hover:text-blue-600 text-xs font-medium transition-colors">
         <span>查看详情</span>
         <ChevronRight size={12} className="ml-1" />
      </div>
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

// 基础弹窗（用于微信和电话）
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
