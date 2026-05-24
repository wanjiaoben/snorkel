/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  snorkel.nice.okinawa — 照片管理文件                      ║
 * ║  Photo Management Config                                  ║
 * ║                                                          ║
 * ║  要换照片？只需：                                          ║
 * ║  1. 把新图片放进 images/ 文件夹                           ║
 * ║  2. 在下面对应位置改文件名 + 日期 + 说明                  ║
 * ║  3. 保存，刷新网站就生效                                  ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const PHOTOS = {

  // ────────────────────────────────────────────────
  // 首页全屏英雄大图 (Hero)
  // 建议: 横版, 1920×1080 或更宽, WebP格式
  // ────────────────────────────────────────────────
  hero: {
    file:    "images/hero.webp",
    date:    "2025-08-01",
    caption: "珊瑚礁俯拍 · 冲绳本岛",
    credit:  "DJI Mavic 3",
  },

  // ────────────────────────────────────────────────
  // 画廊照片列表 (Gallery)
  // layout 选项: "tall" 竖版大图 | "wide" 横版大图 | "square" 方形
  // tag 选项: "drone" 无人机 | "underwater" 水下 | "activity" 活动 | "sunset" 日落
  // ────────────────────────────────────────────────
  gallery: [
    {
      id:      "g01",
      file:    "images/coral-aerial.webp",
      date:    "2025-08-01",
      caption: "珊瑚礁全景",
      tag:     "drone",
      layout:  "wide",
    },
    {
      id:      "g02",
      file:    "images/underwater-fish.webp",
      date:    "2025-07-15",
      caption: "热带鱼群",
      tag:     "underwater",
      layout:  "square",
    },
    {
      id:      "g03",
      file:    "images/turtle.webp",
      date:    "2025-07-20",
      caption: "海龟伴游",
      tag:     "underwater",
      layout:  "square",
    },
    {
      id:      "g04",
      file:    "images/drone-coast.webp",
      date:    "2025-08-05",
      caption: "海岸线航拍",
      tag:     "drone",
      layout:  "tall",
    },
    {
      id:      "g05",
      file:    "images/sunset.webp",
      date:    "2025-08-10",
      caption: "冲绳日落",
      tag:     "sunset",
      layout:  "wide",
    },
    {
      id:      "g06",
      file:    "images/snorkelers.webp",
      date:    "2025-08-12",
      caption: "浮潜者与珊瑚",
      tag:     "activity",
      layout:  "square",
    },
    {
      id:      "g07",
      file:    "images/night-bioluminescence.webp",
      date:    "2025-08-18",
      caption: "夜间荧光浮游生物",
      tag:     "underwater",
      layout:  "square",
    },
    {
      id:      "g08",
      file:    "images/drone-boat.webp",
      date:    "2025-09-02",
      caption: "出海航拍",
      tag:     "drone",
      layout:  "wide",
    },
  ],

  // ────────────────────────────────────────────────
  // 更新日志 (Log) — 每次换图片在这里记一条
  // ────────────────────────────────────────────────
  log: [
    {
      date:    "2025-10-13",
      action:  "added",
      files:   ["hero.webp"],
      note:    "无人机珊瑚礁主图上线",
    },
    {
      date:    "2025-08-01",
      action:  "added",
      files:   ["coral-aerial.webp", "underwater-fish.webp"],
      note:    "八月首批画廊照片",
    },
  ],

};

// 导出供 index.html 使用
// (如果用 Node.js 构建工具可改为 export default PHOTOS)
