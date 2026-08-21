# SNS direct-flight campaign plan

Updated: 2026-05-28
Website: https://snorkel.nice.okinawa

## Asset storage policy

Keep the public website assets in this repository only when the page references
them directly, such as compressed `images/*.webp` files and small PDFs.

Do not commit Instagram/Facebook source media, generated reels, or daily posting
exports to Git. Store those files in an external working folder, object storage,
or the scheduler machine, then let the future posting automation read from there.

Reserved local paths are ignored by Git:

- `images/sns/`
- `videos/sns/`
- `social-assets/`
- `social-output/`

This keeps `snorkel.nice.okinawa` deployable as a small static site while leaving
room for future automated Instagram and Facebook publishing.

## Direct-flight audiences today

| Market | Flights today | Primary language | Best channels | Main CTA |
| --- | ---: | --- | --- | --- |
| Taiwan | 13 | Traditional Chinese | Instagram, Facebook, Threads | Book before flying to Okinawa |
| Korea | 8 | Korean | Instagram, Naver Blog, Threads | Reserve a snorkeling day before arrival |
| Hong Kong | 4 | Traditional Chinese / Cantonese | Instagram, Facebook, Threads | Short-trip Okinawa snorkeling |
| Thailand | 4 | Thai / English | Instagram, TikTok, Facebook | Book Okinawa snorkeling before departure |
| Mainland China | 1 | Simplified Chinese | Xiaohongshu, WhatsApp | Message WhatsApp and confirm the tour |

## Daily posting rhythm

Post 1 hero photo or short video every day, then reuse the same asset in local-language captions for each market.

Recommended daily asset order:

1. Drone reef or sandbar image for first impression.
2. People snorkeling or boarding image for trust.
3. Underwater fish/coral image for desire.
4. Short video/Reel for reach.
5. Booking reminder with weather, availability, and contact link.

## Regional captions

### Taiwan

沖繩直飛很方便，來之前先把浮潛行程預約好。
透明海水、珊瑚礁、無人機照片，一次安排。

預約：
https://snorkel.nice.okinawa

Hashtags:
#沖繩自由行 #沖繩浮潛 #沖繩旅遊 #沖繩景點 #日本自由行 #沖繩親子旅遊

### Korea

오키나와 여행 전 스노클링을 미리 예약하세요.
투명한 바다, 산호초, 드론 사진까지 하루 일정으로 즐길 수 있습니다.

Book:
https://snorkel.nice.okinawa

Hashtags:
#오키나와여행 #오키나와스노클링 #일본여행 #오키나와바다 #오키나와액티비티

### Hong Kong

香港直飛沖繩，短假期都可以玩到靚海。
浮潛、船程、無人機相片，一次預約好。

預約：
https://snorkel.nice.okinawa

Hashtags:
#沖繩旅行 #沖繩浮潛 #香港去沖繩 #日本旅行 #沖繩自由行

### Thailand

บินตรงไปโอกินาว่า แล้วจองทริปดำน้ำตื้นไว้ก่อนเดินทาง
ทะเลใส ปะการังสวย พร้อมภาพโดรนและภาพใต้น้ำ

Book:
https://snorkel.nice.okinawa

Hashtags:
#Okinawa #OkinawaTrip #OkinawaSnorkeling #JapanTravel #เที่ยวญี่ปุ่น #เที่ยวโอกินาว่า

### Mainland China

来冲绳前，先把浮潜预约好。
中文沟通，集合方式清楚，可用 WhatsApp 确认行程。

预约：
https://snorkel.nice.okinawa

Hashtags:
#冲绳旅行 #冲绳浮潜 #日本自由行 #冲绳攻略 #亲子旅行 #海岛旅行

## Creative rules

Use real Okinawa water, boats, coral, guests, and drone angles. Avoid generic stock-style images.

Keep the first line local and direct:

- "台湾直飞冲绳"
- "한국에서 오키나와"
- "香港直飛沖繩"
- "บินตรงไปโอกินาว่า"
- "中国大陆直飞冲绳"

Every post should include one clear action:

- Book before arrival.
- Message WhatsApp.
- Message WhatsApp.
- Choose a date.

## Website landing path

SNS post -> https://snorkel.nice.okinawa -> direct-flight market card -> WhatsApp or Email -> booking confirmation.
