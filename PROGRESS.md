T0705-08 design tokens synced to RULES.md; no existing page styles changed.
T0705-04 merged T0705-04/07/08 wan-rules PRs; main is on WAN constitution v1.2 and design tokens, pending tag v2026.07.05-wan-rules-v1.2.
T0705-04 tag v2026.07.05-wan-rules-v1.2 pushed; main check_wan_constitution.sh PASS.
T0705-13 wan-rules v1.3 synced to CLAUDE.md.
T0705-15 rules slimmed: archived audit items to docs/archive, rewrote BJT entitlement/language/payment/security/architecture notes where applicable.

T0706-04 WAN 宪法 v1.4 已同步到 CLAUDE.md，MERGE_GATE 宪法版本校验保持启用；bjt 新题 mode 门禁在 bjt repo 落地。

T0706-24 WAN 宪法 v1.5 已同步到 CLAUDE.md；新增域名/API入口切换三同步与手动权益 entitlement_log 留痕红线。

T0707-14 WAN 宪法 v1.6 已同步到 CLAUDE.md，FREEZE.md 冻结区同步到仓库根目录；新增冻结区、任务三分类、CC 交付六栏规则。
M0724-20 强化 snorkel AI 引擎可读性：首页 FAQ/JSON-LD、预约邮箱与 Okinawa 地区字段、llms.txt、AI 爬虫放行及商业意图元数据已完成。
M0724-25 FAQ 事实灌入 + guide 上站：按 Wan 定案更新首页 FAQ/FAQPage JSON-LD，新增 Itsuki guide 照片与简介，保持 PR #17 Draft 待 Wan 终验。
M0727-12 SEO/GEO 补齐：robots 显式 Allow GPTBot/ClaudeBot，补 OG/Twitter 图片元数据，llms 与结构化数据仅核查不改。
M0727-14 SEO/GEO 补齐：在 PR #18 分支补 Itsuki Person JSON-LD，并让 llms.txt 指向 #guide 真人区块。
M0731-18 咨询链路三站收口：Worker CORS 精确允许 snorkel/fishing/japanusedcars，拒绝其他 origin，并将 site/source_site 分栏落库且以自动正反向测试固化。
M0805-04 新建 Blue Cave 英文截流页：新增 /blue-cave/ 落地页、两张证据图、Article/BreadcrumbList/FAQPage JSON-LD、首页入口、sitemap 与 llms AI 引用事实，Draft PR 待 Wan 预览。
M0805-14 /blue-cave/ 发车：补齐 Article image 四图数组与 records 回滚锚，#21 准备 Ready、squash merge 并做生产验证。

M0805-17 rev2 /blue-cave/ 事实更正：修正 Chibishi 集合地为 Ginowan Marina，移除 from Naha/high season，FAQPage 增至 5 问并同步 llms。

M0808-09/M0808-18 夕阳包船页：新增 /sunset-charter/ 英文落地页，发车前删除两张占位 JPG，改为日落渐变 hero，保留未来照片回填注释，准备合并 PR #23。

M0808-18 夕阳包船页发车：上一生产点 698bc3545abf87a2cb87d42efcbf8c955a3a14aa；占位图删除，PR #23 准备 squash merge。

M0809-02 中文 guide 译法统一：页面中文中指代 guide 的「导师/導師/教练/guide」统一为「向导/嚮導」，英文与日文文案不改。

M0809-03 #24 发车：base 390px 横滚归因为既有 license badge 缺陷，#24 已 squash merge，上线后三页 200、错译零命中、14 处向导/嚮導在线。

M0813-06 首页 390px 横滚根治：base `27be24a` 复现英文/日文 `scrollWidth=466`，根因是移动端 license badge 横排被长 uppercase label 撑宽；本车改为移动端竖排 license badge，三语 390px 均 `scrollWidth=clientWidth=390`，#25 record-only 已查明为 merged。

M0813-43 价格审计：发现并修正 snorkel 首页 Kerama 拼船旧 JPY 价格残留，统一为 `¥19,830/人（含税）`，同步 FAQ JSON-LD、llms 与 Blue Cave 标准 trip 含税口径；其它非 Kerama 金额只列不改。

M0813-44 价格审计余项：Wan 定案后删除首页 Blue Cave 人民币缩写口径、Island/SUP 条目、旧 half/full/night 三套餐卡与 booking modal；纠正 Blue Cave `¥9,000` 为每人价，统一为 `¥9,000/人(税込)` / `¥9,000 per person tax included`。

GEO-0814-01 英文浮潜注意事项攻略页：新增 `/en/guides/snorkeling-safety-tips/`，覆盖 Ginowan Marina 集合、健康限制、晕船、装备、防晒、天气退款、相机贵重品与 FAQ，并同步 sitemap/llms，Draft PR 待 Wan 目检。

GEO-0814-01 叠推 PR #30 修正：攻略页已把 Blue Cave 集合点改为 Maedamisaki Parking Lot（真栄田岬駐車場）及普通車停车费口径，Ginowan Marina/¥600 仅用于 Kerama (Chibishi) 拼船；同步补 1 人起订/max 12、共享拼船包含项、天气允许时 drone 航拍照片、fun diving / Discovery Scuba Diving 另询。

GEO-0814-02 /blue-cave/ 集合点补充：Blue Cave 页新增 Maedamisaki Parking Lot（真栄田岬駐車場）、普通車停车费与包船集合点另行通知；FAQPage JSON-LD 同步到可见 FAQ 6 条 exact match，Draft PR 待 Wan 目检。

SNS0819-02 Itsuki 长视频区：收 Wan 直传长视频，转 H.264 MP4 与 poster，上传 R2 `snorkel-media/homepage/guide/`，并在首页 `#guide` 原图文下方新增点播式大版面视频；Draft PR 待 Wan 目检。
