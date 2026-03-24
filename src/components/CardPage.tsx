import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Edit3, Eye, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getClusterVisual, getClusterIcon } from '@/lib/card-constants'
import type { CardItemBase } from '@/lib/card-types'

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}
function charCount(text: string) {
  return text.replace(/\s/g, '').length
}

export function CardPage({
  item, body, onBodyChange, onClose, backLabel = 'キャンバスに戻る',
  docStatus = 'writing', onDocStatusToggle,
}: {
  item: CardItemBase
  body: string
  onBodyChange: (v: string) => void
  onClose: () => void
  backLabel?: string
  docStatus?: 'writing' | 'done'
  onDocStatusToggle?: () => void
}) {
  const [mode, setMode] = useState<'edit' | 'preview'>(body.trim() ? 'preview' : 'edit')
  const cfg = getClusterVisual(item.cluster)
  const ClusterIcon = getClusterIcon(item.cluster)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (mode === 'edit') setTimeout(() => textareaRef.current?.focus(), 50)
  }, [mode])

  const coverStyle = {
    background: `linear-gradient(135deg, ${cfg.accent}18 0%, ${cfg.accent}38 100%)`,
    borderBottom: `1px solid ${cfg.accent}28`,
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-b border-neutral-100 shrink-0">
        <button onClick={onClose}
          className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft size={13} />{backLabel}
        </button>
        <div className="flex-1" />
        {onDocStatusToggle && (
          <button
            onClick={onDocStatusToggle}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: docStatus === 'done' ? '#10b98118' : `${cfg.accent}18`,
              borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
              border: `1px solid ${docStatus === 'done' ? '#10b98140' : `${cfg.accent}40`}`,
              transition: 'all 0.15s',
            }}>
            {docStatus === 'done'
              ? <><span style={{ fontSize: 10 }}>✓</span><span style={{ fontSize: 11, fontWeight: 700, color: '#10b981' }}>完了</span></>
              : <><Edit3 size={10} color={cfg.accent} /><span style={{ fontSize: 11, fontWeight: 700, color: cfg.accent }}>執筆中</span></>}
          </button>
        )}
        <div className="flex items-center bg-neutral-100 rounded-lg p-0.5">
          <button onClick={() => setMode('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${mode === 'edit' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
            <Edit3 size={11} />編集
          </button>
          <button onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${mode === 'preview' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
            <Eye size={11} />プレビュー
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Cover banner */}
        <div className="w-full flex flex-col items-center pt-12 pb-8 px-8" style={coverStyle}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-5" style={{ backgroundColor: cfg.accent }}>
            <ClusterIcon size={28} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 text-center leading-tight max-w-xl">{item.title}</h1>
          <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
            <span className={`text-[10.5px] px-2.5 py-1 rounded-full border font-medium ${cfg.badge}`}>{cfg.label}</span>
            {body.trim() ? (
              <>
                <span className="text-[10.5px] text-neutral-400">{charCount(body).toLocaleString()} 字</span>
                <span className="text-neutral-300 text-xs">·</span>
                <span className="text-[10.5px] text-neutral-400">約 {Math.ceil(charCount(body) / 400)} 分で読める</span>
              </>
            ) : (
              <span className="text-[10.5px] text-neutral-400">まだ書かれていません</span>
            )}
          </div>
        </div>

        {/* Document area */}
        <div className="max-w-2xl mx-auto px-8 py-10">
          {mode === 'edit' ? (
            <textarea ref={textareaRef} value={body} onChange={e => onBodyChange(e.target.value)}
              placeholder={`ここに思考を書き出しましょう。Markdown が使えます。\n\n## 見出し\n\n- リスト\n- **太字** · *斜体* · \`コード\`\n\n> 引用\n\n\`\`\`js\nconsole.log('コードブロック')\n\`\`\``}
              className="w-full resize-none outline-none text-[14px] font-mono text-neutral-800 leading-[1.85] bg-transparent placeholder:text-neutral-300"
              style={{ minHeight: '60vh' }}
            />
          ) : body.trim() ? (
            <div className="prose prose-sm prose-neutral max-w-none
              prose-headings:font-bold prose-headings:text-neutral-900
              prose-h1:text-2xl prose-h1:mb-6 prose-h1:pb-3 prose-h1:border-b prose-h1:border-neutral-200
              prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:my-3
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-900
              prose-code:text-[12px] prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-neutral-800
              prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:text-[12px] prose-pre:rounded-xl prose-pre:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 prose-blockquote:pl-4 prose-blockquote:text-neutral-500 prose-blockquote:italic prose-blockquote:my-4
              prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-li:text-neutral-700
              prose-table:text-[12px] prose-th:bg-neutral-50 prose-th:font-semibold prose-td:border prose-td:border-neutral-200 prose-th:border prose-th:border-neutral-200
              prose-hr:border-neutral-200 prose-hr:my-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <FileText size={24} className="text-neutral-300" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-neutral-500">まだ何も書かれていません</p>
                <p className="text-[12px] text-neutral-400 mt-1">リンクやAIとの対話をもとに、思考を整理しましょう</p>
              </div>
              <button onClick={() => setMode('edit')}
                className="mt-2 px-5 py-2.5 bg-neutral-900 text-white text-[12px] font-medium rounded-xl hover:bg-neutral-700 transition-colors">
                書き始める
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center gap-4 px-6 py-2 bg-white border-t border-neutral-100 shrink-0">
        <span className="text-[10.5px] text-neutral-400">
          {charCount(body).toLocaleString()} 字 · {wordCount(body).toLocaleString()} 語
        </span>
        <div className="flex-1" />
        {mode === 'edit' && <span className="text-[10.5px] text-neutral-300">Markdown 記法が使えます</span>}
      </div>
    </div>
  )
}
