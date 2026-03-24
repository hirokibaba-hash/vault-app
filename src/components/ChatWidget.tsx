import { useEffect, useRef, useState } from 'react'
import { Bot, MessageSquare, Send, User, X, ExternalLink } from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
  references?: { title: string; url: string }[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'こんにちは！保存したナレッジについて何でも聞いてください。',
  },
]

const SUGGESTIONS = [
  'React関連の記事を教えて',
  'デザインの記事をまとめて',
  '今週保存したものは？',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120)
  }, [open])

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: messages.length + 1, role: 'user', content: input }
    const aiMsg: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content: 'ご質問ありがとうございます。保存されたナレッジベースを検索しています…\n\n関連する情報を取得してお答えします。具体的な絞り込みがあればお知らせください。',
    }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setInput('')
    inputRef.current?.focus()
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const unread = !open && messages.length > initialMessages.length

  return (
    <>
      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          bottom: 76,
          right: 24,
          width: 360,
          height: 520,
          background: '#fff',
          borderRadius: 18,
          border: '1px solid #e5e7eb',
          boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          // slide-up animation
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px', borderBottom: '1px solid #f3f4f6',
          background: '#fff', flexShrink: 0,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 10,
            background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Bot size={15} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>AIチャット</p>
            <p style={{ fontSize: 10.5, color: '#9ca3af', margin: 0 }}>保存したナレッジに質問する</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ width: 26, height: 26, borderRadius: 8, border: 'none', background: '#f3f4f6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={13} color="#6b7280" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', gap: 8, marginBottom: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              {/* Avatar */}
              <div style={{
                width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                background: msg.role === 'user' ? '#111827' : '#f3f4f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {msg.role === 'user'
                  ? <User size={12} color="white" />
                  : <Bot size={12} color="#6b7280" />}
              </div>
              {/* Bubble */}
              <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 6, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  padding: '9px 12px',
                  borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                  background: msg.role === 'user' ? '#111827' : '#f9fafb',
                  border: msg.role === 'assistant' ? '1px solid #f0f0f0' : 'none',
                  fontSize: 12.5, lineHeight: 1.65,
                  color: msg.role === 'user' ? '#fff' : '#374151',
                  whiteSpace: 'pre-line',
                }}>
                  {msg.content}
                </div>
                {msg.references?.map(ref => (
                  <a key={ref.url} href={ref.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '5px 9px', borderRadius: 8,
                      background: '#fff', border: '1px solid #e5e7eb',
                      fontSize: 11, color: '#374151', textDecoration: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}
                  >
                    <ExternalLink size={10} color="#9ca3af" />
                    {ref.title}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Suggestions (shown only at start) */}
          {messages.length === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => setInput(s)}
                  style={{
                    padding: '7px 10px', borderRadius: 9,
                    border: '1px solid #e5e7eb', background: '#fafafa',
                    fontSize: 11.5, color: '#374151', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.1s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #f3f4f6', flexShrink: 0, background: '#fff' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="質問を入力…"
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 10,
                border: '1px solid #e5e7eb', background: '#f9fafb',
                fontSize: 12.5, color: '#111827', outline: 'none',
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              style={{
                width: 34, height: 34, borderRadius: 10, border: 'none', flexShrink: 0,
                background: input.trim() ? '#111827' : '#e5e7eb',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >
              <Send size={13} color={input.trim() ? 'white' : '#9ca3af'} />
            </button>
          </div>
          <p style={{ fontSize: 10, color: '#d1d5db', margin: '5px 0 0', textAlign: 'center' }}>
            Enter で送信
          </p>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 46,
          height: 46,
          borderRadius: 14,
          border: 'none',
          background: open ? '#374151' : '#111827',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          transition: 'background 0.15s, transform 0.15s',
          transform: open ? 'scale(0.94)' : 'scale(1)',
        }}
      >
        {open ? <X size={18} color="white" /> : <MessageSquare size={18} color="white" />}
        {/* Unread dot */}
        {unread && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            width: 8, height: 8, borderRadius: '50%',
            background: '#ef4444', border: '2px solid #111827',
          }} />
        )}
      </button>
    </>
  )
}
