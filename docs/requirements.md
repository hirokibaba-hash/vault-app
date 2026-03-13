要件定義書: Vault
1. プロジェクト概要

    プロダクト名: Vault

    コンセプト: 溢れる情報を「記憶」から「知能」へ変える、AI強化型外部脳（Exocortex）。

    ビジョン: 整理という労働から人類を解放し、創造的な思考に没頭できる世界を創る。

2. 開発・運用スタック (Vibe Stack)

Claude Code は以下の技術を前提にコードを生成してください。
カテゴリ,選定ツール,理由
Frontend,Next.js (App Router),ディレクトリ構造の規約化によるAIの迷い防止
UI,shadcn/ui + Tailwind CSS,宣言的UIによる高速なプロトタイピング
Backend/DB,Supabase,"Auth, DB, Storage, Vector Searchの一気通貫性"
ORM,Prisma,スキーマによる厳格な型安全性の確保
AI,OpenAI / Anthropic,要約、タグ付け、RAGチャットの提供


3. システムアーキテクチャ

Vaultは、ユーザーが入力した非構造化データ（URLやメモ）を、AIが構造化データ（要約、タグ、埋め込みベクトル）に変換して保存する仕組みです。
4. 機能的要件
Phase 1: Foundation (MVP)

    [ ] 認証: Supabase Auth (Google/Email)。

    [ ] コア機能: テキストメモ、Webリンク、画像の保存・編集・削除。

    [ ] UI: ダッシュボードでの一覧表示（グリッド/リスト切り替え）。

    [ ] OGP自動取得: URL保存時にメタデータ（タイトル、画像等）を自動取得。

Phase 2: AI Intelligence

    [ ] AI Summarizer: 投稿内容を自動で3行要約。

    [ ] Smart Tagger: コンテンツに基づき、適切なタグを5つまで自動生成。

    [ ] Semantic Search: pgvector を用いた「意味」による曖昧検索。

Phase 3: Interactive Knowledge

    [ ] Vault Chat: ストックした全データをコンテキストとしたRAGチャット。

    [ ] Realtime: コンテンツの変更をブラウザ間で即座に同期。