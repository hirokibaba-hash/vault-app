import { useRef, useState } from 'react'
import { Bot, ExternalLink, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
  references?: { title: string; url: string }[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    content: '先月保存したNext.jsの記事について教えて',
  },
  {
    id: 2,
    role: 'assistant',
    content:
      'Next.js 15に関する記事を見つけました。主なポイントをまとめます：\n\n**主要な変更点：**\n• React 19のサポートが正式に追加されました\n• Turbopackが安定版になり、ビルド速度が大幅に向上\n• Server Actionsの改善により、フォーム送信がよりシンプルに\n• キャッシュ戦略が見直され、より細かい制御が可能に\n\nパフォーマンス面でも大幅な改善が報告されており、特にコールドスタート時間の短縮が注目されています。',
    references: [
      {
        title: 'Next.js 15の新機能まとめ',
        url: 'https://nextjs.org/blog/next-15',
      },
    ],
  },
  {
    id: 3,
    role: 'user',
    content: 'TypeScriptの型に関連する記事はある？',
  },
  {
    id: 4,
    role: 'assistant',
    content:
      'TypeScript関連の記事が1件見つかりました：\n\n**TypeScriptの型システム完全ガイド**では以下のトピックが詳しく解説されています：\n\n• **ジェネリクス** - 型安全なコードの再利用方法\n• **条件型** - `T extends U ? X : Y` の形式による型分岐\n• **マップ型** - 既存の型を変換して新しい型を作成\n• **テンプレートリテラル型** - 文字列型の高度な操作\n\n読了時間は約12分で、実践的なサンプルコードが豊富に含まれています。',
    references: [
      {
        title: 'TypeScriptの型システム完全ガイド',
        url: 'https://typescriptlang.org/docs',
      },
    ],
  },
  {
    id: 5,
    role: 'user',
    content: 'パフォーマンスに関する記事も教えて',
  },
  {
    id: 6,
    role: 'assistant',
    content:
      'パフォーマンス最適化に関する記事を見つけました：\n\n**Webパフォーマンス最適化2024**の主なポイント：\n\n• **Core Web Vitals** - LCP、FID、CLSの改善方法\n• **画像最適化** - next/imageや最新フォーマット（AVIF/WebP）の活用\n• **コード分割** - 動的インポートとルートベースの分割\n• **キャッシュ戦略** - サービスワーカーとHTTPキャッシュの組み合わせ\n\nNext.jsとの組み合わせで特に効果的な最適化手法も紹介されています。読了時間は約11分です。',
    references: [
      {
        title: 'Webパフォーマンス最適化2024',
        url: 'https://web.dev/performance-2024',
      },
    ],
  },
]

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
    }

    const aiResponse: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content:
        'ご質問ありがとうございます。保存されたナレッジベースを検索しています...\n\n現在、関連する記事を分析中です。保存済みのアイテムから最も関連性の高い情報を取得してお答えします。\n\n具体的な検索クエリや絞り込みたいトピックがあれば、もう少し詳しく教えていただけますか？',
      references: [],
    }

    setMessages([...messages, userMessage, aiResponse])
    setInputValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AIチャット</h1>
        <p className="text-muted-foreground mt-1">
          保存したコンテンツについてAIに質問する
        </p>
      </div>

      {/* Suggested questions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          'React関連の記事を教えて',
          'デザインの記事をまとめて',
          '今週保存したものは？',
          'パフォーマンス改善のコツは？',
        ].map((q) => (
          <Badge
            key={q}
            variant="outline"
            className="cursor-pointer hover:bg-accent"
            onClick={() => setInputValue(q)}
          >
            {q}
          </Badge>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] space-y-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
              {message.references && message.references.length > 0 && (
                <div className="space-y-1.5">
                  {message.references.map((ref) => (
                    <Card key={ref.url} className="border-l-primary border-l-2">
                      <CardContent className="py-2 px-3">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs hover:underline"
                        >
                          <ExternalLink className="text-muted-foreground h-3 w-3 shrink-0" />
                          <span className="font-medium">{ref.title}</span>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            {message.role === 'user' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-secondary">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t pt-4">
        <div className="flex gap-3">
          <Input
            ref={inputRef}
            placeholder="保存したコンテンツについて質問する..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Enter で送信 • AIはあなたの保存済みコンテンツを参照して回答します
        </p>
      </div>
    </div>
  )
}
