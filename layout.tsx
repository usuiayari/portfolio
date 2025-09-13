import type { Metadata } from 'next';
import './globals.css'; // もしグローバルなCSSファイルがあればインポートします

/*
 * SEOのためのメタデータを設定します。
 * このオブジェクトに記述した内容が、ページの<head>タグ内に自動的に出力されます。
 */
export const metadata: Metadata = {
  // サイトのタイトルを設定します。検索結果やブラウザのタブに表示されます。
  title: 'Ayari - Web Developer Portfolio', 
  
  // サイトの説明文です。検索結果でタイトルの下に表示される重要なテキストです。
  description: 'Web Developer / Software Engineer/Ayariのポートフォリオサイトです。GitHubのプロジェクトやスキルを掲載しています。',
  
  // OGP (Open Graph Protocol) の設定です。
  // SNSなどでサイトがシェアされたときに、リッチなプレビューカードを表示させるために使います。
  openGraph: {
    title: 'Ayari - Web Developer Portfolio',
    description: 'Web Developer / Software Engineer/Ayariのポートフォリオサイト。',
    // プレビューカードに表示する画像のURLを指定します。
    // publicフォルダに画像を配置し、そのパスを指定するのが一般的です。例: '/ogp-image.png'
    // ここでは仮の画像URLを入れています。
    images: ['https://placehold.co/1200x630/1F2937/FFFFFF?text=Ayari%27s%20Portfolio'],
    type: 'website',
    locale: 'ja_JP',
  },
  
  // X (旧Twitter) でシェアされた際のカード表示に関する設定です。
  twitter: {
    card: 'summary_large_image',
    title: 'Ayari - Web Developer Portfolio',
    description: 'Web Developer / Software Engineer/Ayariのポートフォリオサイト。',
    // OGPと同様に、Twitterカード用の画像を指定します。
    images: ['https://placehold.co/1200x630/1F2937/FFFFFF?text=Ayari%27s%20Portfolio'],
  },
};

/*
 * これはルートレイアウトコンポーネントです。
 * page.tsx など、この階層以下のすべてのページがこのコンポーネントの子 (`children`) として描画されます。
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

