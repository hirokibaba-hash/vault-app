import { Bell, Database, Download, Shield, Sparkles, Upload, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Settings() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">設定</h1>
        <p className="text-muted-foreground mt-1">
          アカウントとアプリの設定を管理する
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="text-muted-foreground h-5 w-5" />
            <CardTitle>プロフィール</CardTitle>
          </div>
          <CardDescription>
            アカウント情報を編集できます
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">表示名</Label>
              <Input id="name" defaultValue="山田 太郎" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" defaultValue="taro@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">自己紹介</Label>
            <Textarea
              id="bio"
              defaultValue="フロントエンドエンジニア。React・TypeScript・デザインシステムが好き。"
              rows={3}
            />
          </div>
          <Button>変更を保存</Button>
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-muted-foreground h-5 w-5" />
            <CardTitle>AI設定</CardTitle>
          </div>
          <CardDescription>
            AIの動作をカスタマイズします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ai-language">要約言語</Label>
            <Select defaultValue="ja">
              <SelectTrigger id="ai-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="en">英語</SelectItem>
                <SelectItem value="both">日英両方</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">
              AIが生成する要約の言語を選択します
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="summary-length">要約の長さ</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="summary-length">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">短め (1-2文)</SelectItem>
                <SelectItem value="medium">標準 (3-4文)</SelectItem>
                <SelectItem value="long">詳細 (5-6文)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="max-tags">自動タグの最大数</Label>
            <Select defaultValue="5">
              <SelectTrigger id="max-tags">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3個まで</SelectItem>
                <SelectItem value="5">5個まで</SelectItem>
                <SelectItem value="10">10個まで</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>カスタムタグカテゴリ</Label>
            <div className="flex flex-wrap gap-2">
              {['フロントエンド', 'バックエンド', 'デザイン', 'AI/ML', 'DevOps'].map(
                (tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer">
                    {tag} ×
                  </Badge>
                )
              )}
            </div>
            <div className="flex gap-2">
              <Input placeholder="新しいカテゴリを追加..." className="flex-1" />
              <Button variant="outline">追加</Button>
            </div>
          </div>
          <Button>AI設定を保存</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="text-muted-foreground h-5 w-5" />
            <CardTitle>通知設定</CardTitle>
          </div>
          <CardDescription>
            通知の受け取り方を設定します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              id: 'weekly-digest',
              label: '週次ダイジェスト',
              desc: '毎週月曜日に保存したコンテンツのまとめを受け取る',
            },
            {
              id: 'ai-done',
              label: 'AI処理完了通知',
              desc: 'URLの保存とAI分析が完了したときに通知する',
            },
            {
              id: 'reading-reminder',
              label: '読書リマインダー',
              desc: '保存したコンテンツを読むよう定期的にリマインド',
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
              <Button variant="outline" size="sm">
                ON
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="text-muted-foreground h-5 w-5" />
            <CardTitle>データ管理</CardTitle>
          </div>
          <CardDescription>
            データのエクスポートとインポート
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="font-medium text-sm">エクスポート</p>
              <p className="text-muted-foreground text-xs">
                保存したすべてのデータをJSONまたはCSV形式でダウンロードします
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  JSON
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-sm">インポート</p>
              <p className="text-muted-foreground text-xs">
                ブックマークのHTMLファイルや他サービスからのデータをインポートします
              </p>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                ファイルを選択
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="text-destructive h-4 w-4" />
              <p className="font-medium text-sm">危険な操作</p>
            </div>
            <p className="text-muted-foreground text-xs">
              以下の操作は取り消せません。実行前によく確認してください。
            </p>
            <Button variant="destructive" size="sm">
              すべてのデータを削除
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
