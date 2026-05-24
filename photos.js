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
  // 建议: 横版 1920×1080，WebP 格式
  hero: {
    file:    "images/hero.webp",
    date:    "2025-08-01",
    caption: "珊瑚礁与远岛全景 · 冲绳",
    credit:  "DJI Mavic · snorkel.nice.okinawa",
  },

  // ── 画廊照片 ──────────────────────────────────────────────
  // layout: "wide"=横幅大图(占2格)  "square"=方形  "tall"=竖版大图
  // tag:    "drone" | "underwater" | "activity" | "sunset"
  gallery: [
    {
      id:      "g01",
      file:    "images/g01-reef-boats.webp",
      date:    "2025-08-01",
      caption: "珊瑚礁全景 · 5艘船俯瞰",
      tag:     "drone",
      layout:  "wide",
    },
    {
      id:      "g02",
      file:    "images/g02-sandbar.webp",
      date:    "2025-08-01",
      caption: "白沙洲与珊瑚礁航拍",
      tag:     "drone",
      layout:  "square",
    },
    {
      id:      "g03",
      file:    "images/g03-activity.webp",
      date:    "2025-08-01",
      caption: "浮潜活动现场",
      tag:     "activity",
      layout:  "square",
    },
    {
      id:      "g04",
      file:    "images/g04-overhead.webp",
      date:    "2025-08-01",
      caption: "垂直俯拍 · 珊瑚礁纹理",
      tag:     "drone",
      layout:  "wide",
    },
    {
      id:      "g05",
      file:    "images/g05-gradient.webp",
      date:    "2025-08-01",
      caption: "白沙洲 · 深蓝渐变",
      tag:     "drone",
      layout:  "square",
    },
    {
      id:      "g06",
      file:    "images/g06-three-boats.webp",
      date:    "2025-08-01",
      caption: "三艘船 · 沙洲旁停泊",
      tag:     "activity",
      layout:  "square",
    },
    {
      id:      "g07",
      file:    "images/g07-action.webp",
      date:    "2025-08-01",
      caption: "出海归途 · 孤岛地平线",
      tag:     "drone",
      layout:  "wide",
    },
    {
      id:      "g08",
      file:    "images/g08-coral-top.webp",
      date:    "2025-08-01",
      caption: "珊瑚礁俯拍 · 光影交错",
      tag:     "drone",
      layout:  "square",
    },
  ],

  // ── 无人机视频 ────────────────────────────────────────────
  // 可嵌入画廊或单独展示
  video: {
    file:    "images/drone-video.mp4",
    date:    "2025-08-01",
    caption: "无人机航拍视频 · 冲绳珊瑚礁",
    duration: "22秒",
  },

  // ── 更新日志 ──────────────────────────────────────────────
  // 每次换图在这里加一条，网站上会显示
  log: [
    {
      date:   "2025-10-13",
      action: "added",
      files:  ["hero.webp", "g01~g08 系列", "drone-video.mp4"],
      note:   "首批无人机航拍照片及视频上线，共9张精选",
    },
  ],

};
