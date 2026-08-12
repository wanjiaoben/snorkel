# RECORDS — snorkel

> 此文件由 Claude / CC / Codex 共同维护。每次执行任务后更新对应区块。

---

## 📍 当前状态

- **阶段**：维护中
- **最后更新**：2026-08-09
- **负责人**：Wan

---

## ✅ 已完成

| 日期 | 执行者 | 内容 |
|------|--------|------|
| 2026-08-13 | Codex | M0813-06 根治首页 390px license 横滚；#25 record-only 查明已于 2026-08-09 合并 |
| 2026-08-09 | Codex | M0809-03 确认 #24 390px CSS 修复归因为既有缺陷后发车，squash merge 至 main，生产三页与中文 guide 译法点验通过 |
| 2026-08-09 | Codex | M0809-02 统一中文页面里 guide 对应译法：简体改为「向导」，繁体改为「嚮導」，不改英文/日文 |
| 2026-08-08 | Codex | M0808-09/M0808-18 新增 `/sunset-charter/` 英文夕阳包船落地页，发车前移除占位图，保留未来照片回填注释 |
| 2026-08-05 | Codex | M0805-17 rev2 紧急更正 `/blue-cave/` Chibishi 集合地为 Ginowan Marina，并补每日早下午与 sunset charter FAQ |
| 2026-08-05 | Codex | M0805-04 新增 `/blue-cave/` 英文截流落地页，放入两张 Blue Cave 拥挤/排队证据图，补 Article/BreadcrumbList/FAQPage JSON-LD、sitemap 与 llms AI 引用事实 |
| 2026-08-05 | Codex | M0805-10 补入 `/blue-cave/` Chibishi 对比图两张，替换占位并保持 PR #21 Draft |
| 2026-07-31 | Codex | M0731-18 将 inquiry Worker CORS 收紧为 snorkel / fishing / japanusedcars 三个精确 origin，新增 site 与 source_site 分栏落库及正反向自动测试 |
| 2026-07-27 | Codex | M0727-14 在 PR #18 分支补 Itsuki Person JSON-LD，并在 llms.txt 加真人区块指向 |
| 2026-07-27 | Codex | M0727-12 补齐 snorkel robots AI bot 显式 Allow 与 OG/Twitter 图片元数据；llms.txt 与结构化数据仅核查不改 |
| 2026-07-25 | Codex | M0724-25 按 Wan 定案替换 PR #17 首页 FAQ 事实，新增 Itsuki guide 照片与简介，并同步 FAQPage JSON-LD |
| 2026-07-25 | Codex | M0724-20 强化 AI 引擎可读性：首页补齐事实受控 FAQ 与 FAQPage/LocalBusiness/Organization JSON-LD，新增 `llms.txt`，明确放行 AI 搜索爬虫，并对齐浮潜商业意图元数据 |
| 2026-06-08 | Codex | 补充一批新的 SNS 宣发图片素材到 `images/sns/`，覆盖多组海上活动内容 |
| 2026-06-08 | Codex | 统一 `images/sns/` 现有图片比例与导出尺寸，适配 Meta / SNS 投放展示 |
| 2026-06-09 | Codex | 新增 `CLAUDE.md`、`RULES.md` 和 `records.md` |
| 2026-06-09 | Codex | 填入 snorkel 专属港口和服务信息 |
| 2026-06-09 | Codex | 清理首页 `🇭🇰` / `🇹🇼` / `🇨🇳` 和 Hong Kong / Taiwan 地域标签 |
| 2026-06-09 | Codex | 将中文客群标签改为 `繁`、`简`、`繁體中文客人` 等语言描述 |
| 2026-06-09 | Codex | 在 `RULES.md` 加入旅行活动保险与协调说明 |
| 2026-06-09 | Codex | 在 `RULES.md` 加入 `records.md` 收工维护规则 |
| 2026-06-09 | Codex | 将旧记录文件更名为 `records.md`，避免与 progress.nice.okinawa 混淆 |

---

## 🔄 进行中

| 任务 | 说明 | 开始日期 |
|------|------|----------|
|  |  |  |

---

## 📋 待办

| 优先级 | 任务 | 备注 |
|--------|------|------|
| 高 | 后续补冬季运营与水温说明 | M0724-25 本轮未写，待 Wan 后续定案 |
| 高 | 每次任务结束更新本文件 | 写入已完成、进行中、待办、技术备忘或操作日志 |
| 中 | 检查页面是否展示旅行保险与协调说明 | 规则已写入，页面文案需后续确认 |
| 低 |  |  |

---

## 🗒️ 技术备忘

> 记录这个项目的关键规则，防止 AI 重复犯错。

- M0813-06 首页 390px 横滚根因：英文 license badge 在 390px 下仍保持横向 flex，64px seal + 20px gap 后，长 uppercase label 的最小宽度把 `.license-badge` 撑到 409.23px、右边界 466.23px；修法是在移动端让 badge 改为竖排居中并恢复正常换行，不使用 `overflow:hidden` 或 `overflow-wrap:anywhere` 遮盖。
- 出发港口：Ginowan Marina；Kerama 海域；Blue Cave / 离岛项目按实际安排说明。
- 服务类型：半日 4 小时、全日 8 小时、4 小时/6 小时包船、夜间体验、SUP / 皮划艇 / 体验潜水支持。
- 儿童、安全说明、健康声明、天气取消/改期规则必须清楚。
- 中文用户不得用中国、台湾、中国香港、香港或对应旗帜区分；使用 `简体中文`、`繁体中文`、`中文圈`。
- 旅行活动页面必须说明现场活动保险、自行购买海外旅行保险、翻译协调边界和联系担当。
- M0724-25 已按 Wan 定案写入价格、包含项、集合时间、年龄健康限制、不会游泳政策、携带物、取消退款、登船须知与预约字段；冬季运营与水温说明本轮不写。
- M0805-14 `/blue-cave/` 发车回滚锚：合并前 main=`75f910ca249becf5e022dadb8e7d81a48dfb3a68`；PR #21 发车前补充提交所在分支 `agent/m0805-04-blue-cave-landing`。若生产需回滚，优先 revert 本次 #21 squash merge commit。
- M0805-17 `/blue-cave/` 事实更正：Chibishi 行程集合地必须写 Ginowan Marina，不能写 Naha；旺季口径写 July, August and September。
- M0808-18 `/sunset-charter/` 发车回滚锚：上一生产点 `698bc3545abf87a2cb87d42efcbf8c955a3a14aa`。占位 JPG 已删除；未来照片回填位置写在 `sunset-charter/index.html` 注释中，文件名仍按 `sunset-hero.jpg` / `sunset-boat.jpg`。

---

## 📝 操作日志

| 日期 | 执行者 | 操作 | 结果 |
|------|--------|------|------|
| 2026-08-13 | Codex | M0813-06 复现 base `27be24a` 首页英文/日文 390px 横滚 `scrollWidth=466`，将移动端 license badge 改为竖排根治撑宽；#25 record-only 查明已于 2026-08-09 合并 | Draft PR 待 Wan 验收 |
| 2026-08-09 | Codex | M0809-03 在 base commit `27be24a` 复测确认首页英文/日文 390px 横滚为既有缺陷，#24 Ready 后 squash merge；生产点验三页 200、错译零命中、14 处向导/嚮導在线、390px 零横滚 | ✅ |
| 2026-08-09 | Codex | M0809-02 扫描页面中文 guide 译词，将「导师/導師/教练/guide」等指代 guide 的中文表达统一为「向导/嚮導」并准备 Draft PR | ✅ |
| 2026-08-08 | Codex | M0808-18 发车前将夕阳包船页占位 JPG 改为深色日落渐变 hero，删除 B 位空图容器与两个占位文件，准备合并 PR #23 | ✅ |
| 2026-08-08 | Codex | M0808-09 新建夕阳包船页，沿用 snorkel 询盘 site/sourceSite，取消政策逐字抄首页 Kerama FAQ | ✅ |
| 2026-08-05 | Codex | M0805-17 rev2 修正生产 `/blue-cave/` 集合地错误，FAQPage 增至 5 问，并同步 llms AI 事实 | ✅ |
| 2026-08-05 | Codex | M0805-04 新建 Blue Cave 英文落地页与首页入口；本地校验 JSON-LD mainEntity=4、390px 零横滚、图片 200、robots AI bot Allow 不变 | ✅ |
| 2026-08-05 | Codex | M0805-10 补入两张 Chibishi 对比图片，390px/1280px 零横滚，四图 preview 200，叠推 PR #21 保持 Draft | ✅ |
| 2026-08-05 | Codex | M0805-14 发车前补齐 Article image 四图数组并写入回滚锚，准备 #21 Ready / squash merge / 生产验证 | ✅ |
| 2026-07-31 | Codex | M0731-18 新增三站精确 CORS 门禁、来源绑定、D1 `site` 迁移与 Node 自动测试；未部署 Worker、未写远端 D1、未发送邮件 | ✅ |
| 2026-07-27 | Codex | M0727-14 仅补 Itsuki Person JSON-LD 与 llms.txt #guide 指向，保持 FAQ/价格/正文文案不变 | ✅ |
| 2026-07-27 | Codex | M0727-12 更新 `robots.txt` AI bot 显式 Allow、新增 `images/og-snorkel.jpg` 并补首页 OG/Twitter 元数据；保留 llms.txt 与 FAQ/Person 结构化数据为只读核查 | ✅ |
| 2026-07-25 | Codex | M0724-25 在 PR #17 同分支灌入 FAQ 终稿事实、Itsuki guide 照片与简介，并更新 records/PROGRESS | ✅ |
| 2026-07-25 | Codex | M0724-20 在独立分支更新首页 FAQ/JSON-LD/SEO、`robots.txt`、`llms.txt`，完成本地校验并提交 Draft PR 供 Wan 审核 | ✅ |
| 2026-06-10 | Codex | 日更检查 2026-06-09 的提交与当前工作区；相关提交已记录，未发现除 `records.md` 外的未完成工作 | ✅ |
| 2026-06-09 | Codex | 按 2026-06-08 git 提交补记 SNS 素材新增与图片比例标准化记录，确认当前无未提交工作 | ✅ |
| 2026-06-09 | Codex | 创建并填充此文件 | ✅ |
| 2026-06-09 | Codex | 推送规则初始化提交 | ✅ |
| 2026-06-09 | Codex | 推送中文标识页面修正 | ✅ |
| 2026-06-09 | Codex | 推送旅行保险协调规则 | ✅ |
| 2026-06-09 | Codex | 记录本次 records.md 维护规则更新 | ✅ |
| 2026-06-09 | Codex | 重命名记录文件并同步更新规则引用 | ✅ |
