# LIFE X LP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 株式会社Gハウスの規格住宅「LIFE X」のランディングページを、THE BASE参考のスクロール型ワンページ構成で新規制作する

**Architecture:** 静的HTML/CSS/JSでLPを構築し、完成後にWordPressテーマ化する。まず静的版で全セクションのデザイン・コンテンツを完成させ、プレビューしながらイテレーションする。CSS変数でカラースキームを管理し、セクションごとにCSSを分割して保守性を確保する。

**Tech Stack:** HTML5, CSS3 (CSS Custom Properties, Flexbox, Grid), Vanilla JavaScript, Google Fonts (Noto Sans JP + Cormorant Garamond)

**Design Doc:** `docs/plans/2026-02-19-lifex-lp-design.md`

**Color Scheme:**
- Main: `#1a2744` (ダークネイビー)
- Accent: `#c8a96e` (ゴールド)
- Background: `#f8f6f3` (オフホワイト)
- Text: `#333333` (ダークグレー)

---

### Task 1: Project Setup — ディレクトリ構成 + ベースファイル

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `css/reset.css`
- Create: `js/main.js`
- Create: `images/` (ディレクトリ)

**Step 1: ディレクトリ構成を作成**

```
lifex-lp/
├── index.html
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── (placeholder)
└── docs/plans/
```

**Step 2: reset.css を作成**

モダンCSSリセット（box-sizing, margin, font-smoothing等）を記述。

**Step 3: style.css にCSS変数とベーススタイルを定義**

```css
:root {
  --color-main: #1a2744;
  --color-accent: #c8a96e;
  --color-bg: #f8f6f3;
  --color-text: #333333;
  --color-white: #ffffff;
  --font-ja: 'Noto Sans JP', sans-serif;
  --font-en: 'Cormorant Garamond', serif;
  --max-width: 1200px;
}
```

Google Fonts読み込み、body基本スタイル、セクション共通スタイルを定義。

**Step 4: index.html にHTML5ボイラープレートを作成**

meta viewport, OGP tags, Google Fonts link, CSS/JS読み込みを含むhead。
body内は空のセクションIDのみ配置。

**Step 5: ブラウザで開いて白いページが表示されることを確認**

**Step 6: Git初期化 + コミット**

```bash
git init
git add .
git commit -m "chore: initial project setup with base files"
```

---

### Task 2: Header — 固定ナビゲーション

**Files:**
- Modify: `index.html` (headerセクション追加)
- Modify: `css/style.css` (ヘッダースタイル追加)

**Step 1: index.html にheader要素を追加**

```html
<header class="header" id="header">
  <div class="header__inner">
    <a href="#" class="header__logo">
      <span class="header__logo-text">LIFE X</span>
    </a>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li><a href="#about">LIFE Xとは</a></li>
        <li><a href="#reasons">性能</a></li>
        <li><a href="#product">仕様</a></li>
        <li><a href="#modelhouse">モデルハウス</a></li>
        <li><a href="#contact">お問い合わせ</a></li>
      </ul>
    </nav>
    <a href="#contact" class="header__cta-btn">資料請求</a>
    <button class="header__hamburger" aria-label="メニュー">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

**Step 2: style.css にヘッダースタイルを追加**

- `position: fixed; top: 0; width: 100%; z-index: 1000`
- 背景: 半透明ダークネイビー `rgba(26, 39, 68, 0.95)`
- ロゴ: ゴールド、英語フォント
- CTAボタン: ゴールド背景、ダークネイビー文字
- モバイル: 768px以下でハンバーガー表示、ナビ非表示

**Step 3: ブラウザで確認 — 固定ヘッダーが画面上部に表示されること**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add fixed header navigation"
```

---

### Task 3: ハンバーガーメニュー（モバイル）

**Files:**
- Modify: `js/main.js` (ハンバーガートグル)
- Modify: `css/style.css` (モバイルメニュースタイル)

**Step 1: js/main.js にハンバーガーメニューのトグル処理を追加**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.header__hamburger');
  const nav = document.querySelector('.header__nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
  });

  // メニューリンククリックで閉じる
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      nav.classList.remove('is-open');
    });
  });
});
```

**Step 2: style.css にモバイルメニューのスライドインスタイルを追加**

- `.header__nav.is-open`: 右からスライドイン、全画面オーバーレイ
- `.header__hamburger.is-active span`: ×印に変形するアニメーション

**Step 3: ブラウザの開発ツールでモバイル幅にし、ハンバーガーが動作することを確認**

**Step 4: コミット**

```bash
git add js/main.js css/style.css
git commit -m "feat: add mobile hamburger menu"
```

---

### Task 4: Section 1 — ファーストビュー（ヒーロー）

**Files:**
- Modify: `index.html` (heroセクション追加)
- Modify: `css/style.css` (ヒーロースタイル追加)

**Step 1: index.html にheroセクションを追加**

```html
<section class="hero" id="hero">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">
      高性能デザイン住宅で<br>暮らしを、その先へ。
    </h1>
    <p class="hero__price">
      本体価格 <span class="hero__price-num">1,680</span>万円〜
      <span class="hero__price-tax">（税込1,848万円〜）</span>
    </p>
    <a href="#contact" class="hero__cta">無料で資料請求する</a>
  </div>
  <div class="hero__scroll-indicator">
    <span>SCROLL</span>
    <div class="hero__scroll-arrow"></div>
  </div>
</section>
```

**Step 2: style.css にヒーロースタイルを追加**

- `height: 100vh; background: url(...) center/cover`（プレースホルダー用にグラデーション背景を仮設定）
- overlay: `rgba(26, 39, 68, 0.4)` の半透明オーバーレイ
- タイトル: 白、大きめフォント、英語フォントで上品に
- 価格: ゴールドで強調、数字部分は特大
- CTAボタン: ゴールド背景、ホバーで明るく
- スクロールインジケーター: 下部中央、上下バウンスアニメーション

**Step 3: ブラウザでフルスクリーンヒーローが表示されることを確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add hero first view section"
```

---

### Task 5: Section 2 — 問題提起「なぜLIFE Xなのか？」

**Files:**
- Modify: `index.html` (aboutセクション追加)
- Modify: `css/style.css` (aboutスタイル追加)

**Step 1: index.html にaboutセクションを追加**

```html
<section class="about" id="about">
  <div class="about__inner">
    <h2 class="about__title">高性能住宅は、<br>本当に高いのか？</h2>
    <p class="about__lead">
      「高性能な家は高い」——それは業界の常識でした。<br>
      LIFE Xは、規格化という発想で常識を覆します。
    </p>
    <div class="about__points">
      <div class="about__point">
        <div class="about__point-icon"><!-- 性能アイコン --></div>
        <h3>高性能</h3>
        <p>耐震等級3・断熱等級6。<br>妥協のない住宅性能。</p>
      </div>
      <div class="about__point">
        <div class="about__point-icon"><!-- デザインアイコン --></div>
        <h3>デザイン</h3>
        <p>プロが厳選した<br>5つのインテリアテイスト。</p>
      </div>
      <div class="about__point">
        <div class="about__point-icon"><!-- コストアイコン --></div>
        <h3>コストパフォーマンス</h3>
        <p>本体価格1,680万円〜。<br>規格化で実現した適正価格。</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: style.css にaboutスタイルを追加**

- 背景: オフホワイト `var(--color-bg)`
- タイトル: ダークネイビー、大きめ、中央揃え
- リード文: グレー、中央揃え
- 3カラム: `display: grid; grid-template-columns: repeat(3, 1fr)` (モバイルは1カラム)
- アイコン: ゴールドの円形背景 + SVGアイコン

**Step 3: ブラウザで確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add about section with problem statement"
```

---

### Task 6: Section 3 — 選ばれる5つの理由（01〜03）

**Files:**
- Modify: `index.html` (reasonsセクション前半追加)
- Modify: `css/style.css` (reasonsスタイル追加)

**Step 1: index.html にreasonsセクション（01〜03）を追加**

THE BASE参考の交互レイアウト。番号 + 英語 + 日本語の二層見出し。

```html
<section class="reasons" id="reasons">
  <div class="reasons__inner">
    <h2 class="section-title">
      <span class="section-title__en">5 REASONS</span>
      <span class="section-title__ja">LIFE X が選ばれる5つの理由</span>
    </h2>

    <!-- Reason 01 -->
    <div class="reason reason--left">
      <div class="reason__image">
        <img src="images/reason-01.jpg" alt="耐震構造" loading="lazy">
      </div>
      <div class="reason__content">
        <span class="reason__number">01</span>
        <h3 class="reason__title">
          <span class="reason__title-en">EARTHQUAKE PROOF</span>
          <span class="reason__title-ja">地震に強い家</span>
        </h3>
        <p class="reason__text">
          耐震等級3<span class="reason__note">（最高等級）</span>を標準採用。
          さらに制振ダンパーを搭載し、繰り返しの地震にも強い構造です。
        </p>
        <p class="reason__detail">
          「許容応力度計算」——建物の強さを1本1本の柱から計算する、
          最も精密な構造計算で安全性を証明しています。
        </p>
        <p class="reason__highlight">震度7相当の揺れにも耐える構造</p>
      </div>
    </div>

    <!-- Reason 02 -->
    <div class="reason reason--right">
      <div class="reason__image">
        <img src="images/reason-02.jpg" alt="断熱性能" loading="lazy">
      </div>
      <div class="reason__content">
        <span class="reason__number">02</span>
        <h3 class="reason__title">
          <span class="reason__title-en">THERMAL INSULATION</span>
          <span class="reason__title-ja">一年中快適な断熱性能</span>
        </h3>
        <p class="reason__text">
          断熱等級6 / Ua値0.46を実現。
          北海道基準を超える断熱性能で、夏涼しく冬暖かい住まいです。
        </p>
        <p class="reason__highlight">年間光熱費を大幅に削減</p>
      </div>
    </div>

    <!-- Reason 03 -->
    <div class="reason reason--left">
      <div class="reason__image">
        <img src="images/reason-03.jpg" alt="太陽光発電" loading="lazy">
      </div>
      <div class="reason__content">
        <span class="reason__number">03</span>
        <h3 class="reason__title">
          <span class="reason__title-en">SOLAR ENERGY</span>
          <span class="reason__title-ja">太陽光で光熱費ゼロへ</span>
        </h3>
        <p class="reason__text">
          最大積載量11.04kWの太陽光パネルを搭載可能。
          月々の電気代が実質ゼロ、さらに売電収入も見込めます。
        </p>
        <p class="reason__highlight">最大11.04kW搭載可能</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: style.css にreasonsスタイルを追加**

- セクションタイトル: 英語（Cormorant Garamond、大きめ、ゴールド）＋日本語（小さめ）
- 各reason: `display: grid; grid-template-columns: 1fr 1fr; gap: 4rem`
- `reason--right`: 写真と文章の順番を `order` で入れ替え（交互レイアウト）
- 番号: ゴールド、巨大フォント（120px）、英語フォント
- タイトル: 英語＋日本語の二層
- `.reason__highlight`: ゴールドの左ボーダー＋太字
- モバイル: 1カラムに変更

**Step 3: ブラウザで確認 — 交互レイアウトで3つの理由が表示されること**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add reasons section (01-03)"
```

---

### Task 7: Section 3 — 選ばれる5つの理由（04〜05）+ 中間CTA

**Files:**
- Modify: `index.html` (reason 04, 05, 中間CTA追加)

**Step 1: index.html にreason 04, 05を追加**

```html
    <!-- Reason 04 -->
    <div class="reason reason--right">
      <div class="reason__image">
        <img src="images/reason-04.jpg" alt="インテリアデザイン" loading="lazy">
      </div>
      <div class="reason__content">
        <span class="reason__number">04</span>
        <h3 class="reason__title">
          <span class="reason__title-en">DESIGN SELECT</span>
          <span class="reason__title-ja">選べる5つのインテリア</span>
        </h3>
        <p class="reason__text">
          プロがコーディネートした5つのインテリアテイストから、
          お好みの空間を選ぶだけ。打ち合わせの手間なく、理想の住まいが実現します。
        </p>
        <p class="reason__highlight">打ち合わせ不要、迷わない家づくり</p>
      </div>
    </div>

    <!-- Reason 05 -->
    <div class="reason reason--left">
      <div class="reason__image">
        <img src="images/reason-05.jpg" alt="コストパフォーマンス" loading="lazy">
      </div>
      <div class="reason__content">
        <span class="reason__number">05</span>
        <h3 class="reason__title">
          <span class="reason__title-en">COST PERFORMANCE</span>
          <span class="reason__title-ja">驚きのコストパフォーマンス</span>
        </h3>
        <p class="reason__text">
          高性能住宅がこの価格で手に入る理由——それは規格化によるコスト削減。
          設計・資材・施工をパッケージ化することで、品質を落とさず価格を実現しました。
        </p>
        <p class="reason__highlight">本体価格 1,680万円〜</p>
      </div>
    </div>
  </div>
</section>

<!-- 中間CTA -->
<section class="mid-cta">
  <div class="mid-cta__inner">
    <p class="mid-cta__text">LIFE X の詳しい資料を無料でお届けします</p>
    <a href="#contact" class="mid-cta__btn">無料で資料請求する</a>
  </div>
</section>
```

**Step 2: style.css に中間CTAスタイルを追加**

- 背景: ダークネイビー
- テキスト: 白
- ボタン: ゴールド背景

**Step 3: ブラウザで確認 — 5つの理由全て＋中間CTAが表示されること**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add reasons 04-05 and mid-page CTA"
```

---

### Task 8: Section 4 — 商品仕様（PREMIUM FULL PACKAGE）

**Files:**
- Modify: `index.html` (productセクション追加)
- Modify: `css/style.css` (productスタイル追加)

**Step 1: index.html にproductセクションを追加**

THE BASE参考: アイコン＋短い説明テキストのグリッド表示。

```html
<section class="product" id="product">
  <div class="product__inner">
    <h2 class="section-title">
      <span class="section-title__en">PREMIUM FULL PACKAGE</span>
      <span class="section-title__ja">充実の標準仕様</span>
    </h2>
    <div class="product__grid">
      <div class="product__item">
        <div class="product__icon"><!-- アイコン --></div>
        <h3>ハイグレードキッチン</h3>
        <p>使いやすさとデザイン性を両立した標準仕様</p>
      </div>
      <div class="product__item">
        <div class="product__icon"><!-- アイコン --></div>
        <h3>省令準耐火構造</h3>
        <p>火災保険料を大幅に軽減できる構造</p>
      </div>
      <div class="product__item">
        <div class="product__icon"><!-- アイコン --></div>
        <h3>長期優良住宅認定</h3>
        <p>税制優遇を受けられる高品質住宅</p>
      </div>
      <div class="product__item">
        <div class="product__icon"><!-- アイコン --></div>
        <h3>高性能サッシ</h3>
        <p>断熱・遮音性に優れたペアガラスサッシ</p>
      </div>
      <div class="product__item">
        <div class="product__icon"><!-- アイコン --></div>
        <h3>制振ダンパー</h3>
        <p>繰り返しの地震から家を守る装置</p>
      </div>
      <div class="product__item">
        <div class="product__icon"><!-- アイコン --></div>
        <h3>第一種換気システム</h3>
        <p>24時間きれいな空気を循環する全館換気</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: style.css にproductスタイルを追加**

- グリッド: `grid-template-columns: repeat(3, 1fr)` (モバイルは2カラム)
- カード: 白背景、角丸、影、パディング
- アイコン: ゴールド系の円形、60x60px
- テキスト: 20〜40字で簡潔に

**Step 3: ブラウザで確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add product specifications section"
```

---

### Task 9: Section 5 — モデルハウス + 中間CTA

**Files:**
- Modify: `index.html` (modelhouseセクション追加)
- Modify: `css/style.css` (modelhouseスタイル追加)

**Step 1: index.html にmodelhouseセクションを追加**

```html
<section class="modelhouse" id="modelhouse">
  <div class="modelhouse__inner">
    <h2 class="section-title">
      <span class="section-title__en">MODEL HOUSE</span>
      <span class="section-title__ja">モデルハウス</span>
    </h2>
    <div class="modelhouse__gallery">
      <div class="modelhouse__main-image">
        <img src="images/modelhouse-main.jpg" alt="LIFE X モデルハウス外観" loading="lazy">
      </div>
      <div class="modelhouse__sub-images">
        <img src="images/modelhouse-sub1.jpg" alt="モデルハウス内装1" loading="lazy">
        <img src="images/modelhouse-sub2.jpg" alt="モデルハウス内装2" loading="lazy">
        <img src="images/modelhouse-sub3.jpg" alt="モデルハウス内装3" loading="lazy">
      </div>
    </div>
    <div class="modelhouse__info">
      <h3>大阪箕面モデルハウス</h3>
      <p class="modelhouse__badge">2026年3月 OPEN</p>
      <p class="modelhouse__address">大阪府箕面市（詳細住所はお問い合わせください）</p>
      <a href="#contact" class="modelhouse__btn">見学予約はこちら</a>
    </div>
  </div>
</section>

<!-- 中間CTA 2 -->
<section class="mid-cta">
  <div class="mid-cta__inner">
    <p class="mid-cta__text">まずは資料でLIFE Xの魅力をご確認ください</p>
    <a href="#contact" class="mid-cta__btn">無料で資料請求する</a>
  </div>
</section>
```

**Step 2: style.css にmodelhouseスタイルを追加**

- ギャラリー: メイン画像（大）＋サブ画像3枚（小、横並び）
- info: 中央揃え、バッジはゴールド背景
- ボタン: CTAスタイルと統一

**Step 3: ブラウザで確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add model house section with gallery"
```

---

### Task 10: Section 6 — 施工事例・お客様の声

**Files:**
- Modify: `index.html` (worksセクション追加)
- Modify: `css/style.css` (worksスタイル追加)

**Step 1: index.html にworksセクションを追加**

```html
<section class="works" id="works">
  <div class="works__inner">
    <h2 class="section-title">
      <span class="section-title__en">WORKS</span>
      <span class="section-title__ja">施工事例</span>
    </h2>
    <div class="works__grid">
      <div class="works__item">
        <img src="images/work-01.jpg" alt="施工事例1" loading="lazy">
        <div class="works__item-info">
          <h3>○○邸</h3>
          <p>テイスト: ナチュラルモダン</p>
        </div>
      </div>
      <div class="works__item">
        <img src="images/work-02.jpg" alt="施工事例2" loading="lazy">
        <div class="works__item-info">
          <h3>○○邸</h3>
          <p>テイスト: シンプルモダン</p>
        </div>
      </div>
      <div class="works__item">
        <img src="images/work-03.jpg" alt="施工事例3" loading="lazy">
        <div class="works__item-info">
          <h3>○○邸</h3>
          <p>テイスト: ジャパニーズモダン</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: style.css にworksスタイルを追加**

- グリッド: 3カラム（モバイルは1カラム）
- カード: 画像＋オーバーレイ情報、ホバーで拡大エフェクト

**Step 3: ブラウザで確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add works/case studies section"
```

---

### Task 11: Section 7 — FC加盟のご案内

**Files:**
- Modify: `index.html` (fcセクション追加)
- Modify: `css/style.css` (fcスタイル追加)

**Step 1: index.html にfcセクションを追加**

```html
<section class="fc" id="fc">
  <div class="fc__inner">
    <h2 class="section-title">
      <span class="section-title__en">FRANCHISE</span>
      <span class="section-title__ja">工務店の皆様へ</span>
    </h2>
    <p class="fc__lead">LIFE X フランチャイズ加盟で、貴社の事業を次のステージへ。</p>
    <div class="fc__merits">
      <div class="fc__merit">
        <span class="fc__merit-num">01</span>
        <h3>集客力のある商品</h3>
        <p>高性能×低価格の規格住宅で新規顧客を獲得</p>
      </div>
      <div class="fc__merit">
        <span class="fc__merit-num">02</span>
        <h3>設計・プランの標準化</h3>
        <p>打ち合わせ工数を大幅削減し、業務効率UP</p>
      </div>
      <div class="fc__merit">
        <span class="fc__merit-num">03</span>
        <h3>充実のサポート体制</h3>
        <p>研修・マーケティング支援で安心の導入</p>
      </div>
    </div>
    <a href="#contact" class="fc__btn">FC加盟について詳しく見る</a>
  </div>
</section>
```

**Step 2: style.css にfcスタイルを追加**

- 背景: ダークネイビー `var(--color-main)`
- テキスト: 白
- メリット: 3カラム、番号はゴールド

**Step 3: ブラウザで確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add franchise section"
```

---

### Task 12: Section 8 — お問い合わせフォーム + フッター

**Files:**
- Modify: `index.html` (contactセクション + footer追加)
- Modify: `css/style.css` (contact + footerスタイル追加)

**Step 1: index.html にcontactセクションとfooterを追加**

```html
<section class="contact" id="contact">
  <div class="contact__inner">
    <h2 class="section-title">
      <span class="section-title__en">CONTACT</span>
      <span class="section-title__ja">まずは無料で資料請求</span>
    </h2>
    <p class="contact__lead">LIFE Xの詳しい資料をお届けします。お気軽にお問い合わせください。</p>
    <form class="contact__form" action="#" method="post">
      <div class="contact__form-group">
        <label for="name">お名前 <span class="required">必須</span></label>
        <input type="text" id="name" name="name" required placeholder="山田 太郎">
      </div>
      <div class="contact__form-group">
        <label for="tel">電話番号</label>
        <input type="tel" id="tel" name="tel" placeholder="090-1234-5678">
      </div>
      <div class="contact__form-group">
        <label for="email">メールアドレス <span class="required">必須</span></label>
        <input type="email" id="email" name="email" required placeholder="example@email.com">
      </div>
      <div class="contact__form-group">
        <label for="message">お問い合わせ内容</label>
        <textarea id="message" name="message" rows="4" placeholder="ご質問やご要望をご記入ください"></textarea>
      </div>
      <button type="submit" class="contact__submit">送信する</button>
    </form>
  </div>
</section>

<footer class="footer">
  <div class="footer__inner">
    <div class="footer__logo">LIFE X</div>
    <div class="footer__info">
      <p>株式会社Gハウス</p>
      <p>〒000-0000 住所（要確認）</p>
      <p>TEL: 000-000-0000</p>
    </div>
    <div class="footer__links">
      <a href="#">プライバシーポリシー</a>
      <a href="#">会社概要</a>
    </div>
    <p class="footer__copy">&copy; 2026 LIFE X All Rights Reserved.</p>
  </div>
</footer>
```

**Step 2: style.css にcontact + footerスタイルを追加**

- contact背景: オフホワイト
- フォーム: 最大幅600px、中央揃え
- input/textarea: ボーダー、角丸、大きめパディング
- 送信ボタン: ゴールド背景、幅100%
- footer: ダークネイビー背景、白テキスト、3カラムレイアウト

**Step 3: ブラウザで確認**

**Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add contact form and footer"
```

---

### Task 13: スクロールアニメーション

**Files:**
- Modify: `js/main.js` (Intersection Observer追加)
- Modify: `css/style.css` (アニメーションスタイル追加)

**Step 1: style.css にフェードインアニメーション用のクラスを追加**

```css
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: js/main.js にIntersection Observerを追加**

```javascript
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));
```

**Step 3: index.html の各セクション要素に `class="fade-in"` を追加**

対象: `.about__inner`, `.reason`, `.product__item`, `.modelhouse__inner`, `.works__item`, `.fc__merit`, `.contact__inner`

**Step 4: ブラウザでスクロール時にフェードインすることを確認**

**Step 5: コミット**

```bash
git add js/main.js css/style.css index.html
git commit -m "feat: add scroll fade-in animations"
```

---

### Task 14: スムーススクロール + ヘッダー スクロール変化

**Files:**
- Modify: `js/main.js` (スムーススクロール + ヘッダー変化)
- Modify: `css/style.css` (ヘッダー変化スタイル)

**Step 1: style.css にスクロール後のヘッダースタイルを追加**

```css
html { scroll-behavior: smooth; }
.header.is-scrolled {
  background: rgba(26, 39, 68, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
```

**Step 2: js/main.js にスクロール検知を追加**

```javascript
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 100);
});
```

**Step 3: アンカーリンクのスムーススクロール（ヘッダー高さ分オフセット）を追加**

```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});
```

**Step 4: ブラウザで確認 — ナビリンククリックで各セクションにスムースにスクロールすること**

**Step 5: コミット**

```bash
git add js/main.js css/style.css
git commit -m "feat: add smooth scroll and header scroll effect"
```

---

### Task 15: レスポンシブ最終調整

**Files:**
- Modify: `css/style.css` (メディアクエリ追加・調整)

**Step 1: 全セクションのレスポンシブ対応を確認・調整**

ブレークポイント:
- `768px` 以下: タブレット（2カラム → 1カラム）
- `480px` 以下: スマートフォン（フォントサイズ縮小）

対象:
- ヘッダー: ハンバーガー表示確認
- ヒーロー: フォントサイズ調整
- 3カラム → 1カラム（about, product, fc）
- 理由セクション: 画像＋テキスト縦積み
- ギャラリー: サブ画像2カラム or 縦積み
- フォーム: 幅100%
- フッター: 縦積み

**Step 2: 各画面幅でブラウザ確認**

Chrome DevToolsで iPhone SE / iPhone 14 / iPad / Desktop で確認。

**Step 3: コミット**

```bash
git add css/style.css
git commit -m "feat: responsive design final adjustments"
```

---

### Task 16: プレースホルダー画像 + SVGアイコン設置

**Files:**
- Create: `images/` 内にプレースホルダーSVG画像
- Modify: `index.html` (アイコンSVGをインライン挿入)

**Step 1: プレースホルダー画像を生成**

各セクション用のプレースホルダーとして、SVGまたはCSS背景グラデーションで仮画像を設置。
- hero背景: CSSグラデーション（ダークネイビー → グレー）
- reason画像: `via.placeholder.com` または SVG
- modelhouse画像: 同上
- works画像: 同上

**Step 2: SVGアイコンをインラインで配置**

about / product セクションのアイコンを、シンプルなSVGで作成。
- 高性能: シールドアイコン
- デザイン: パレットアイコン
- コスト: コインアイコン
- その他仕様アイコン: 適切なSVG

**Step 3: ブラウザで全体を通して確認**

**Step 4: コミット**

```bash
git add images/ index.html
git commit -m "feat: add placeholder images and SVG icons"
```

---

### Task 17: 最終確認 + OGP / SEO メタ情報

**Files:**
- Modify: `index.html` (meta tags, OGP追加)

**Step 1: SEO・OGPメタタグを追加**

```html
<meta name="description" content="LIFE X — 高性能デザイン住宅。耐震等級3・断熱等級6の高性能を本体価格1,680万円〜で実現。株式会社Gハウス">
<meta property="og:title" content="LIFE X | 高性能デザイン住宅で暮らしを、その先へ。">
<meta property="og:description" content="耐震等級3・断熱等級6・太陽光発電。高性能住宅を1,680万円〜で。">
<meta property="og:type" content="website">
<meta property="og:url" content="https://lifex-house.jp/">
<meta property="og:image" content="https://lifex-house.jp/images/ogp.jpg">
```

**Step 2: 全ページを通しで最終確認**

- 全セクション表示確認
- 全リンク動作確認
- フォーム入力確認
- スクロールアニメーション確認
- レスポンシブ確認

**Step 3: コミット**

```bash
git add index.html
git commit -m "feat: add SEO meta tags and OGP"
```

---

## Summary

| Task | Section | Est. |
|------|---------|------|
| 1 | Project Setup | 5 min |
| 2 | Header | 5 min |
| 3 | Hamburger Menu | 5 min |
| 4 | Hero / First View | 5 min |
| 5 | About / Problem Statement | 5 min |
| 6 | Reasons 01-03 | 5 min |
| 7 | Reasons 04-05 + Mid CTA | 5 min |
| 8 | Product Specs | 5 min |
| 9 | Model House + Mid CTA | 5 min |
| 10 | Works / Case Studies | 5 min |
| 11 | Franchise Section | 5 min |
| 12 | Contact Form + Footer | 5 min |
| 13 | Scroll Animations | 5 min |
| 14 | Smooth Scroll + Header | 5 min |
| 15 | Responsive Final | 5 min |
| 16 | Placeholders + Icons | 5 min |
| 17 | SEO / OGP / Final Check | 5 min |

**Total: 17 tasks**
