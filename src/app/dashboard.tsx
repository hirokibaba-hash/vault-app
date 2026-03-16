import { BookOpen, Clock, Plus, Tag, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const stats = [
  {
    label: '保存済みアイテム',
    value: '127件',
    icon: BookOpen,
    description: '合計保存数',
  },
  {
    label: '今週追加',
    value: '12件',
    icon: TrendingUp,
    description: '先週比 +3件',
  },
  {
    label: 'AIタグ数',
    value: '48個',
    icon: Tag,
    description: '自動生成タグ',
  },
  {
    label: '節約した読書時間',
    value: '6.5時間',
    icon: Clock,
    description: '今月の累計',
  },
]

const recentSaves = [
  {
    id: 1,
    title: 'Next.js 15の新機能まとめ',
    url: 'https://nextjs.org/blog/next-15',
    summary:
      'Next.js 15ではReact 19のサポートが追加され、Turbopackが安定版になりました。Server Actionsの改善やキャッシュ戦略の見直しも含まれています。',
    tags: ['React', 'フロントエンド', 'Next.js'],
    savedAt: '2時間前',
    readTime: '5分',
    favicon: 'N',
  },
  {
    id: 2,
    title: 'デザインシステム構築のベストプラクティス',
    url: 'https://example.com/design-system',
    summary:
      'スケーラブルなデザインシステムを構築するための手法を解説。トークン設計からコンポーネントの命名規則まで体系的に説明しています。',
    tags: ['デザイン', 'UI/UX', '設計'],
    savedAt: '5時間前',
    readTime: '8分',
    favicon: 'D',
  },
  {
    id: 3,
    title: 'TypeScriptの型システム完全ガイド',
    url: 'https://typescriptlang.org/docs',
    summary:
      'TypeScriptの高度な型システムを完全解説。ジェネリクス、条件型、マップ型などの応用テクニックを豊富なサンプルコードと共に紹介。',
    tags: ['TypeScript', '型システム'],
    savedAt: '昨日',
    readTime: '12分',
    favicon: 'T',
  },
  {
    id: 4,
    title: 'Tailwind CSS v4 移行ガイド',
    url: 'https://tailwindcss.com/docs/v4',
    summary:
      'Tailwind CSS v4の大きな変更点と移行方法を詳しく解説。新しいCSS変数ベースのアプローチやviteプラグインの使い方も含みます。',
    tags: ['CSS', 'Tailwind', 'フロントエンド'],
    savedAt: '2日前',
    readTime: '6分',
    favicon: 'T',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground mt-1">
          あなたのナレッジベースの概要
        </p>
      </div>

      {/* Quick Add URL */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              placeholder="URLを入力して保存... (例: https://example.com/article)"
              className="flex-1"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              保存
            </Button>
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            AIが自動的にタグ付け・要約・分類を行います
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-muted-foreground text-xs">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Saves */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">最近保存したアイテム</h2>
          <Button variant="ghost" size="sm">
            すべて見る
          </Button>
        </div>
        <div className="space-y-3">
          {recentSaves.map((item) => (
            <Card
              key={item.id}
              className="transition-shadow hover:shadow-md cursor-pointer"
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  {/* Favicon placeholder */}
                  <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold">
                    {item.favicon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-tight truncate">
                        {item.title}
                      </h3>
                      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-xs">
                        <Clock className="h-3 w-3" />
                        {item.readTime}
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <span className="text-muted-foreground ml-auto text-xs">
                        {item.savedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
