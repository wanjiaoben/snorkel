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
    file:    "images/hero.webp",
    date:    "2025-08-01",
    caption: "白沙洲与珊瑚礁全景 · 冲绳",
    credit:  "DJI Mavic · snorkel.nice.okinawa",
  },

  // ── 画廊照片 ──────────────────────────────────────────────
  // layout: "wide"=横幅(2格宽)  "square"=方形  "tall"=竖版(2格高)
  // tag:    "drone" | "underwater" | "activity" | "sunset"
  gallery: [
    // ── 2025-08-01 上午 ──────────────────────────────────
    {
      id: "g01", file: "images/g01-reef-boats.webp",
      date: "2025-08-01", caption: "珊瑚礁全景 · 5艘船俯瞰",
      tag: "drone", layout: "wide",
    },
    {
      id: "g02", file: "images/g02-sandbar.webp",
      date: "2025-08-01", caption: "白沙洲与珊瑚礁航拍",
      tag: "drone", layout: "square",
    },
    {
      id: "g03", file: "images/g03-activity.webp",
      date: "2025-08-01", caption: "浮潜活动现场",
      tag: "activity", layout: "square",
    },
    {
      id: "g04", file: "images/g04-overhead.webp",
      date: "2025-08-01", caption: "垂直俯拍 · 珊瑚礁纹理",
      tag: "drone", layout: "wide",
    },
    {
      id: "g05", file: "images/g05-gradient.webp",
      date: "2025-08-01", caption: "白沙洲 · 深蓝渐变",
      tag: "drone", layout: "square",
    },
    {
      id: "g06", file: "images/g06-three-boats.webp",
      date: "2025-08-01", caption: "三艘船 · 沙洲旁停泊",
      tag: "activity", layout: "square",
    },
    {
      id: "g07", file: "images/g07-action.webp",
      date: "2025-08-01", caption: "出海归途 · 孤岛地平线",
      tag: "drone", layout: "wide",
    },
    {
      id: "g08", file: "images/g08-coral-top.webp",
      date: "2025-08-01", caption: "珊瑚礁俯拍 · 光影交错",
      tag: "drone", layout: "square",
    },
    // ── 2025-08-01 下午 ──────────────────────────────────
    {
      id: "g09", file: "images/g09-people-snorkel.webp",
      date: "2025-08-01", caption: "浮潜者入水 · 近距离拍摄",
      tag: "activity", layout: "wide",
    },
    {
      id: "g10", file: "images/g10-boat-close.webp",
      date: "2025-08-01", caption: "我们的船 · 珊瑚礁中央",
      tag: "activity", layout: "square",
    },
    {
      id: "g11", file: "images/g11-sandbar-wide.webp",
      date: "2025-08-01", caption: "沙洲远景 · 浮潜者入水",
      tag: "drone", layout: "square",
    },
    {
      id: "g12", file: "images/g12-lone-boat.webp",
      date: "2025-08-01", caption: "孤舟 · 沙洲深蓝",
      tag: "drone", layout: "wide",
    },
    {
      id: "g13", file: "images/g13-afternoon.webp",
      date: "2025-08-01", caption: "下午时分 · 碧绿礁海",
      tag: "drone", layout: "square",
    },
    // ── 2025-07-05 竖版特写 ──────────────────────────────
    {
      id: "g14", file: "images/g14-snorkel-tall.webp",
      date: "2025-07-05", caption: "礁脊旁浮潜 · 游客入水特写",
      tag: "activity", layout: "tall",
    },
    {
      id: "g15", file: "images/g15-kayak-reef.webp",
      date: "2025-07-05", caption: "皮划艇 · 浮潜者 · 珊瑚礁",
      tag: "activity", layout: "tall",
    },
  ],

  // ── 无人机视频 ────────────────────────────────────────────
  videos: [
    { file: "images/drone-video.mp4",  date: "2025-08-01", caption: "珊瑚礁航拍", duration: "22秒" },
    { file: "images/video-0448.mp4",   date: "2025-08-01", caption: "浮潜活动现场", duration: "25秒" },
    { file: "images/video-0480.mp4",   date: "2025-08-01", caption: "下午全景航拍", duration: "31秒" },
  ],

  // ── 更新日志 ──────────────────────────────────────────────
  log: [
    {
      date:   "2025-08-01",
      action: "added",
      files:  ["hero.webp", "g01~g08", "drone-video.mp4"],
      note:   "首批上午无人机航拍，9张精选",
    },
    {
      date:   "2025-08-01",
      action: "updated",
      files:  ["hero.webp (升级)", "g09~g13", "video-0448.mp4", "video-0480.mp4"],
      note:   "升级Hero大图，新增5张下午照片+2段视频",
    },
    {
      date:   "2025-07-05",
      action: "added",
      files:  ["g14-snorkel-tall.webp", "g15-kayak-reef.webp"],
      note:   "新增2张竖版特写：礁脊浮潜+皮划艇活动，画廊共15张",
    },
  ],

};
