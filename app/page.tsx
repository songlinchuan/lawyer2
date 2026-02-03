"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Phone, MessageCircle, X, ChevronRight, Copy, MapPin, Building2, ChevronLeft, FileText } from "lucide-react";

// --- 类型定义 ---
// 1. 子案例（具体的文章）
interface Article {
  title: string;
  content: string;
}

// 2. 案由分类（外面的大卡片）
interface CaseCategoryItem {
  title: string;
  desc: string;
  articles?: Article[]; // 这是一个数组，可以放多个案例
}

type CaseType = "civil" | "criminal" | "admin";

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

// --- 数据配置 (这里是您的案例库) ---
const casesData: Record<CaseType, CaseCategoryItem[]> = {
  civil: [
 {
      title: "人格权纠纷",
      desc: "生命权、身体权、健康权及名誉隐私等精神损害维权。",
      articles: [
        {
          title: "违法施工致新婚青年截瘫，20年后三被告借口“过期”拒赔？我强力回击再争51万",
          content: "【案情困境】\n二十年前，两家被告公司与一名被告个人的违法施工行为，彻底改变了我当事人的人生走向。施工现场竟未设置任何警示标志，导致年仅20岁出头、刚组建家庭的原告坠入断桥，高位截瘫。这是一场彻头彻尾的工程“人祸”。\n\n如今，法院原判的“20年赔偿期”届满。面对原告延续的生存护理需求，三名被告不仅毫无悔意，反而互相推诿，一致祭出“20年最长诉讼时效已过”的挡箭牌。他们试图利用法律时限来“洗白”当年的重大过错，拒绝承担后续任何费用，企图将受害者彻底抛弃。\n\n【办案经过】\n面对被告方“资本与推诿”的合围，我方制定了“严打过错、锁定连带”的硬核策略：\n1. 【痛击违法根源】锁定连带责任：针对建筑公司试图甩锅给个人的意图，我方紧扣当年“违法分包、无证施工”的过错根源，在庭审中强力主张：违法的恶果不应由受害者买单，无论过去多久，两家建筑公司必须承担连带赔偿责任，不仅要赔，更要由有偿付能力的公司来赔；\n2. 【粉碎时效抗辩】驳斥“免责论”：针对被告强势的“20年时效已过”主张，我精准援引司法解释，向法庭论证：20年仅是普通计算周期，对于确需护理的重残受害者，生存保障权高于被告的时效利益，责任方不能因时间流逝而“逃单”；\n3. 【程序护航】申请费用减免：鉴于原告经济困难，我方依法申请并成功免交了高额诉讼费，确保维权之路不因缺钱而中断，最大限度地减轻原告的负担。\n\n【案件结果】\n法院最终采纳了我方观点，认定三被告的侵权责任不因20年期满而免除！判决三被告继续连带支付原告未来6年的护理费、残疾辅助器具费及赔偿金共计51.8万余元。\n\n这一判决不仅击碎了被告“拖过20年就没事”的幻想，更让违法者付出了应有的代价。"
        }
      ]
    },
    {
      title: "婚姻家庭、继承纠纷",
      desc: "离婚财产分割、子女抚养及遗产继承规划。",
      articles: [
        {
          title: "收入仅500元的患病母亲无人管？我方助其打破推诿，锁定终身医疗保障",
          content: "【案情困境】\n委托人是一位年过七旬的老母亲，丧偶多年独自生活。虽育有两子，但她每月仅靠从村委会领取共计500余元的保险与补助度日，生活极度拮据。近期，老人不幸确诊“血管炎”，短短数月医药费已高达3万余元，且医生告知后续需长期治疗。面对高昂账单，两个儿子因往日积怨与分担比例争执不下，导致老人治疗资金断裂，无奈含泪诉至法院。\n\n【办案经过】\n接手案件后，我方深知单纯判决可能导致亲情彻底破裂，且执行困难。为帮老人真正解决问题，我制定了“分步破局”策略：\n1. 算清“糊涂账”：庭审中，针对被告抗辩“以前垫付过钱”的混战局面，我方引导法庭逐笔核对单据，通过精准算账查明了小儿子的实际垫付额，锁定了大儿子未尽义务的事实，让被告无可辩驳；\n2. 攻心“亲情牌”：在调解阶段，我方严厉指出老人“收入不足千元”的生存危机，并释明遗弃患病老人的法律后果，从法理与伦理双重维度向被告施压；\n3. 设计“最优解”：提出“既往费用一次性切割结清，未来费用凭单据均摊”的方案，彻底解决了兄弟间的心理不平衡。\n\n【案件结果】\n双方当庭签署《民事调解书》：\n1. 现金补偿：大儿子一次性支付母亲1.5万元，结清了既往医疗费差额；\n2. 制度保障：二被告每人每月直接向老人支付赡养费，并补齐欠款；后续所有医疗费由兄弟二人凭票据均摊。这一方案不仅帮老人拿回了“救命钱”，更为她的晚年撑起了法律保护伞。"
        }
      ]
    },
    { title: "物权纠纷", desc: "不动产确权、所有权争议及相邻关系处理。" },
   {
      title: "合同、不当得利纠纷",
      desc: "买卖、租赁、借款等各类合同违约与索赔。",
      articles: [
        {
          title: "签约6年无动静，突遭起诉索赔75万？我方戳穿原告“独角戏”式履约，助四被告零责胜诉",
          content: "【案情困境】\n原告（某检测公司）依据一份6年前签署的合同，突然将我的四位委托人（三家关联公司及一名个人股东）告上法庭，索要高达75万余元的检测费。原告来势汹汹，不仅提交了厚厚一摞《检测报告》，还当庭展示了在政府监管系统中的备案记录，试图证明“活已干完，钱必须付”。若抗辩失败，四被告不仅要承担巨额债务，还面临公司与股东人格混同下的连带赔偿风险。\n\n【办案经过】\n透过原告看似完美的“证据闭环”，我方没有被表象吓退，而是精准抓住了其“单方履约”的致命硬伤，实施降维打击：\n1. 卡住“启动键”：深入剖析合同条款，发现检测启动的约定前提是甲方出具《委托书》。我方向法庭一针见血地指出：原告拿不出任何经被告盖章确认的《委托书》，其所谓的“进场检测”纯属违背合同的“强行加戏”；\n2. 揭秘“伪交付”：针对最具迷惑性的“系统备案记录”，我当庭拆解其操作流程，论证上传报告仅需原告单方操作即可完成。未经被告验收确认的报告，只是原告的“自娱自乐”，根本不具备法律效力；\n3. 击碎“定价权”：指出合同根本未约定具体价格，原告事后擅自套用高额计价标准索赔，属于无中生有。\n\n【案件结果】\n法院最终全面采纳了我的代理意见，认定合同虽签署但缺失关键条款，且原告无法证明合同已实际履行。最终判决驳回原告全部诉讼请求。面对75万的天价索赔，我方助四被告“一分不赔”，取得完胜。"
        },
        {
          title: "对方想用“诉讼时效”赖掉70万货款？我方用一套账单让他哑口无言",
          content: "【案情困境】\n我方与被告有长达十年的供货合作，长期“先货后款”且未签书面合同。被告拖欠了一笔多年前的大额货款近70万元。起诉时，对方狠抓“发货时间久远”这一痛点，强势主张“诉讼时效已过”，同时一口咬定货款已全部结清且无法对帐，试图“合法赖账”。若抗辩成立，企业将面临货款全损。\n\n【办案经过】\n面对“时效”难题与“回款”压力，我制定了“兵马未动，粮草先行”的战术：\n1. 雷霆保全，施压经营：立案伊始即启动财产保全，并精准向法院补充提交被告账户线索。成功查封对方公户，卡住其经营命脉，掌握了谈判与诉讼的主动权；\n2. 抽丝剥茧，重构账目：梳理跨度长达十年的《辅助核算明细账》，将数百笔“发货-开票-付款”一一对应，用数据还原交易全貌；\n3. 庭审破局，击穿谎言：精准指出被告近期的付款行为已构成“时效中断”，从法律与事实双重维度击碎对方的赖账企图。\n\n【案件结果】\n一审法院全面采纳代理意见，认定诉讼时效未届满，判决被告支付全部货款及利息。在铁证与公户被封的双重压力下，对方自知理亏放弃上诉，判决直接生效。执行期限届满后我方立即推进执行阶段，回款指日可待。"
        },
        {
          title: "起诉公司竟想“株连”95%控股大股东？我方用证据筑起防火墙，助其0责任全身而退",
          content: "【案情困境】\n原告（某公司）因另案纠纷，以“不当得利”为由起诉我方两被告，公司及持股95%的大股东。原告不仅要求返还10万余元款项及4倍LPR高额利息，更死死抓住“股东持股高达95%”这一把柄，指控其为实际控制人且与公司财产混同，要求对公司债务承担连带赔偿责任。一旦防守失败，这位几乎全资持股的老板将面临个人家庭资产被执行的灾难。\n\n【办案经过】\n面对原告“公司欠债，老板连坐”的猛烈攻势，以及“95%绝对控股”带来的巨大举证压力，我制定了“认账不认人，止损保大局”的策略：\n1. 【筑牢防火墙】死保股东：我方敏锐指出，持股比例高并不等同于人格混同。在庭审中，我死磕“公司独立法人人格”这一法律底线，紧扣原告未能证明“财产混同”的证据短板，坚决阻断了原告利用高持股比例刺破公司面纱的企图；\n2. 【寸土必争】核减债务：针对原告主张的4倍罚息，我方引经据典，论证不当得利非借贷纠纷，不应适用惩罚性利率；同时，我仔细翻阅旧案卷宗，找出了双方在另案中的诉讼费分担凭证，主张以此抵扣本案债务；\n3. 【降维打击】以法破局：将案件定性严格限制在“公司债务”范畴，防止风险外溢至股东。\n\n【案件结果】\n法院最终全面采纳了我方关于“股东无责”的代理意见！\n1. 股东免单：判决驳回原告要求95%控股股东承担连带责任的诉求，股东0责任胜诉；\n2. 利息打折：驳回原告4倍利息的过分主张，仅按标准LPR计算；\n3. 债务抵扣：采纳我方意见，成功将另案的诉讼成本从本案债务中抵扣。在必输的局势下，我方成功守住了底线，避免了当事人损失扩大化。"
        }
      ]
    },
 {
      title: "侵权责任纠纷",
      desc: "交通事故、医疗损害及其他人身财产损害赔偿。",
      articles: [
        {
          title: "承担主责且被告恶意失联？我方启用公告程序，咬定“无保全赔”底线获赔21万",
          content: "【案情困境】\n本案原告在交通事故中被认定负主要责任（一般为70%），且已构成十级伤残。更为棘手的是，被告方不仅车辆“裸奔”未投保交强险，事后更是采取了极端的逃避态度：拒接电话、拒收传票、拒绝应诉，处于完全“失联”状态。原告作为主责方，本就面临赔偿比例低的风险，现在连赔偿主体都找不到，维权陷入了“有理无处说，有钱没人赔”的僵局。\n\n【办案经过】\n面对“主责劣势+被告失联”的双重阻碍，我摒弃了情绪化的纠缠，严格按照法律程序步步为营：\n1. 【程序破局】解决“找不到人”：针对被告恶意缺席的情况，我方果断申请法院进行公告送达，依法启动缺席审判程序。这一举措彻底打破了被告试图通过“玩消失”来拖死案件的幻想，确保诉讼流程如期推进；\n2. 【法理定责】落实“无保全赔”：虽然原告负主责，但我紧扣《道路交通安全法》及司法解释的核心规定：未投保交强险的机动车，必须在交强险限额内承担赔偿责任，且该部分不划分责任比例。我向法庭严正主张：被告必须先在交强险限额20万元内承担100%的赔偿责任，剩余部分再按比例分担。这一策略，成功为原告守住了近20万元的“全额赔偿区”，避免了所有损失都被打“七折”；\n3. 【顶格主张】做大基数：在缺席审判中，我方提交了详实的医疗、护理、伤残等证据链，确保各项赔偿标准均获法院顶格支持。\n\n【案件结果】\n法院完全采纳了我方的代理意见，判决被告在交强险限额内全额赔偿19.9万元，超出部分再按30%比例赔偿，共计判赔21.4万余元。\n\n本案证明，即使面对“主责+失联”的恶劣开局，只要用对法律程序，依然能让逃避责任者付出应有的代价。"
        }
      ]
    },
    {
      title: "劳动争议纠纷",
      desc: "工伤认定、非法辞退赔偿及劳动仲裁代理。",
      articles: [
        {
          title: "面对“碰瓷式”维权，我用合规证据链守住底线",
          content: "【案情困境】\n员工以“腰痛”为由长期不到岗，拒不提供合规医疗证明，并把公司的善意沟通视为软弱，反手提起劳动仲裁索赔5万余元。这种行为不仅侵害了企业的合法权益，更破坏了职场公平，若妥协赔钱，将给公司管理留下巨大隐患。\n\n【办案经过】\n正义需要证据支撑。我摒弃了情绪化的争辩，专注于构建严密的“合规防线”：1. 溯源“知情权”，调取入职培训签到表，证明其明知故犯；2. 固化“违纪事实”，通过梳理数十页微信催岗记录，还原公司已尽管理义务的真相；3. 庭审中厘清“医疗建议≠休假特权”的法律边界。\n\n【案件结果】\n仲裁委全面采纳代理意见，认定公司解除劳动合同合法合规，驳回对方全部金钱诉求。这不仅是一次零赔偿的胜诉，更是对“谁闹谁有理”歪风的有力回击。"
        },
        {
          title: "仲裁败诉仍不收手？我让“碰瓷”止步于一审，再次零封对手",
          content: "【案情困境】\n员工因“假病假”旷工被辞退后，仲裁请求已被全部驳回。但对方抱有“赌徒心理”，认为法院会比仲裁委更偏袒劳动者，遂提起一审诉讼，坚持索赔5万余元。对企业而言，这不仅是经济纠纷，更是一场关于“管理权威是否会被司法挑战”的信心之战。\n\n【办案经过】\n面对二茬苦战，我没有掉以轻心，而是将证据链升级为“司法视角”：\n1. 锚定“恶意”：在庭审中，通过对比其“拒绝沟通”与“起诉索赔”的时间线，向法官展示其利用病假规则漏洞的恶意；\n2. 法理降维：再次重申“医嘱建议≠休假权利”的法律底线，并引用同类指导案例，打破对方“我有病历我就有理”的幻想；\n3. 程序自证：严密论证公司从“催告”到“解除”的每一步都符合法定程序，无懈可击。\n\n【案件结果】\n一审法院完全采纳了我方的代理意见，认为公司规章制度合法有效，解除程序合规。判决驳回原告全部诉讼请求，维持了仲裁的“零赔偿”结果。这一纸判决，彻底粉碎了对方的侥幸心理，也为企业确立了不可撼动的管理红线。"
        },
        {
          title: "造成巨损还想拿高薪？我帮老板粉碎“伪合伙人”的贪婪双标",
          content: "【案情困境】\n公司与一名区域负责人签署了《销售激励细则》，双方是“合伙模式”：给予其高比例提成预期，且全额报销其展业费用。然而，该负责人占着“合伙人”的高收益通道，却不愿承担一丝风险：他不仅业绩惨淡（仅完成承诺目标的7%），更因重大失误导致公司直接损失十余万元。闯下大祸后，他竟利用公司缺席仲裁的漏洞，摇身一变以“弱势劳动者”自居，要求公司按“固定高薪”兜底并支付赔偿金。老板找到我时，面对的是“既定败诉”的裁决和“农夫与蛇”的愤怒。\n\n【办案经过】\n面对这种“赚了算我的，赔了算公司的，公司还要赔我钱的”无耻双标，我制定了“撕开伪装，责权对等”的策略：\n1. 揭穿“暴利”野心：提交《激励细则》与承诺书，向法官证明他入职是冲着“700万业绩下的高额提成”来的，其本质是“自负盈亏”的经营者，绝非拿死工资的普通员工；\n2. 坐实“巨额”过失：将十余万元的损失清单与物流证据摆在庭上，直击痛点——你不仅没创造价值，反而搞砸了生意，根据权责对等原则，根本无权要求“旱涝保收”；\n3. 薪酬降维打击：通过精细核算证明，按其实际仅不足50万的业绩，公司此前支付的款项已属于“超额支付”。\n\n【案件结果】\n一审法院透过“劳动维权”的表象，看清了其“转嫁经营风险”的贪婪本质。最终判决全面采纳了我方关于“绩效考核”的观点，认定按实绩核算公司不仅不欠高薪，甚至已超额支付。从而撤销了仲裁委关于补发工资及赔偿金的裁决。这一战，不仅挽回了经济损失，更狠狠教训了职场中“只想分利不想担责”的投机分子。"
        }
      ]
    },
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
  const [activeTab, setActiveTab] = useState<CaseType>("civil");
  const [showWeChat, setShowWeChat] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  // --- 新的交互逻辑 ---
  // 1. 选中的大分类 (例如：劳动争议)
  const [selectedCategory, setSelectedCategory] = useState<CaseCategoryItem | null>(null);
  // 2. 选中的具体文章 (例如：碰瓷维权案)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // 打开大分类时
  const handleCategoryClick = (item: CaseCategoryItem) => {
    setSelectedCategory(item);
    // 如果该分类下只有一个案例，直接打开文章详情（更智能）
    // 如果有多个，或者没有，则显示列表
    if (item.articles && item.articles.length === 1) {
      setSelectedArticle(item.articles[0]);
    } else {
      setSelectedArticle(null);
    }
  };

  // 关闭弹窗时，全部清空
  const handleCloseModal = () => {
    setSelectedCategory(null);
    setSelectedArticle(null);
  };
  
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
        navigator.clipboard.writeText(PHONE_NUMBER);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-gray-200 lg:flex">
      
      {/* 左侧区域 */}
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
              alt="Song Linchuan" 
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

      {/* 右侧区域 */}
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

          {/* 2. 我的案例 */}
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
                    onClick={() => handleCategoryClick(item)}
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

      {/* --- 全新升级：案例详情弹窗 (支持列表+详情+滚动) --- */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal} className="absolute inset-0 bg-white/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              // 关键修改：max-w-2xl(加宽)，max-h-[85vh](限高)，overflow-y-auto(允许滚动)
              className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* 弹窗头部：返回按钮 + 标题 + 关闭按钮 */}
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  {/* 如果在看具体文章，显示返回按钮 */}
                  {selectedArticle && (selectedCategory.articles?.length || 0) > 1 && (
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {selectedArticle ? "案例详情" : selectedCategory.title}
                  </h3>
                </div>
                <button onClick={handleCloseModal} className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-black transition"><X size={20}/></button>
              </div>

              {/* 弹窗内容区域 */}
              <div className="flex-1">
                
                {/* 场景A：显示具体文章内容 */}
                {selectedArticle ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                     <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                        {selectedArticle.title}
                     </h2>
                     <div className="w-12 h-1 bg-black"></div>
                     <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line text-justify">
                        {selectedArticle.content}
                     </p>
                     <p className="text-xs text-gray-400 pt-8 mt-8 border-t border-gray-100">
                        * 案情细节因隐私保护已做脱敏处理
                     </p>
                  </div>

                ) : (
                  
                  // 场景B：显示案例列表 (或者是默认简介)
                  <div className="space-y-6">
                    {/* 默认简介 */}
                    <p className="text-gray-500 text-sm mb-4">{selectedCategory.desc}</p>
                    
                    {/* 如果有案例列表，显示列表 */}
                    {selectedCategory.articles && selectedCategory.articles.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">精选案例 / Featured Cases</p>
                        {selectedCategory.articles.map((article, index) => (
                          <div 
                            key={index}
                            onClick={() => setSelectedArticle(article)}
                            className="group p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-black hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                               <FileText size={18} className="text-gray-400 group-hover:text-black transition-colors"/>
                               <span className="font-medium text-gray-700 group-hover:text-black">{article.title}</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-transform"/>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // 如果没有案例，显示占位符
                      <div className="py-10 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        暂无公开案例详情
                      </div>
                    )}
                  </div>
                )}
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
