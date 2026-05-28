/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  snorkel.nice.okinawa — 照片管理文件                      ║
 * ║                                                          ║
 * ║  要换照片？只需：                                          ║
 * ║  1. 把新图片放进 images/ 文件夹（建议转成 .webp）          ║
 * ║  2. 在下面改文件名 + 日期 + 说明                          ║
 * ║  3. 在 log 里加一条记录                                   ║
 * ║  4. 保存，刷新网站即生效                                  ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const PHOTOS = {

  // ── 首页全屏大图 ──────────────────────────────────────────
  hero: {
    file:    "images/k01-keramas-boat-lagoon.webp",
    date:    "2025-08-28",
    caption: "慶良間珊瑚礁与透明海域 · 冲绳",
    credit:  "Privacy-safe aerial selection · snorkel.nice.okinawa",
  },

  // ── 画廊照片 ──────────────────────────────────────────────
  // layout: "wide"=横幅(2格宽)  "square"=方形  "tall"=竖版(2格高)
  // tag:    "drone" | "underwater" | "activity" | "sunset"
  gallery: [
    {
      id: "k01", file: "images/k01-keramas-boat-lagoon.webp",
      date: "2025-08-28", caption: "慶良間 · 透明珊瑚礁与船只航拍",
      tag: "drone", layout: "wide",
    },
    {
      id: "k02", file: "images/k02-keramas-island-reef.webp",
      date: "2025-08-28", caption: "小岛、礁盘与深蓝海面",
      tag: "drone", layout: "wide",
    },
    {
      id: "k03", file: "images/k03-keramas-blue-coral-field.webp",
      date: "2025-08-28", caption: "蓝色珊瑚海域俯瞰",
      tag: "drone", layout: "square",
    },
    {
      id: "k04", file: "images/k04-keramas-sandbar-blue.webp",
      date: "2025-08-20", caption: "白沙洲与深蓝渐层",
      tag: "drone", layout: "wide",
    },
    {
      id: "k05", file: "images/k05-keramas-white-sand-island.webp",
      date: "2025-06-17", caption: "白沙岛远景",
      tag: "drone", layout: "wide",
    },
    {
      id: "k06", file: "images/k06-keramas-reef-shelf.webp",
      date: "2025-06-17", caption: "珊瑚礁边缘与清澈海水",
      tag: "drone", layout: "square",
    },
    {
      id: "k07", file: "images/k07-keramas-wide-island.webp",
      date: "2025-08-26", caption: "慶良間岛屿与环礁宽景",
      tag: "drone", layout: "wide",
    },
    {
      id: "k08", file: "images/k08-keramas-coral-ridges.webp",
      date: "2025-08-20", caption: "珊瑚礁脊线航拍",
      tag: "drone", layout: "square",
    },
    {
      id: "k09", file: "images/k09-keramas-underwater-coral.webp",
      date: "2025-06-22", caption: "水下珊瑚花园",
      tag: "underwater", layout: "square",
    },
    {
      id: "k10", file: "images/k10-keramas-table-coral.webp",
      date: "2025-06-22", caption: "桌状珊瑚与透明海水",
      tag: "underwater", layout: "square",
    },
    {
      id: "k11", file: "images/k11-keramas-clownfish.webp",
      date: "2025-03-18", caption: "小丑鱼与珊瑚特写",
      tag: "underwater", layout: "square",
    },
    {
      id: "k12", file: "images/k12-keramas-sea-turtle.webp",
      date: "2025-10-17", caption: "海龟与蓝色海水",
      tag: "underwater", layout: "square",
    },
  ],

  // ── 无人机视频 ────────────────────────────────────────────
  videos: [],

  // ── 更新日志 ──────────────────────────────────────────────
  log: [
    {
      date:   "2026-05-28",
      action: "added",
      files:  ["k01~k12"],
      note:   "隐私安全精选：仅使用不可识别客人身份的航拍、珊瑚、海龟、小丑鱼素材",
    },
  ],

};
