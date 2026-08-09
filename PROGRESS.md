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
