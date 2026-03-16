export interface CardLink {
  id: string
  url: string
  title: string
  domain: string
  description?: string
  image?: string
  siteName?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

/** Minimal interface required by shared UI components (TopicWorkspace, CardPage) */
export interface CardItemBase {
  id: string
  title: string
  cluster: string
  tags: string[]
  connections: string[]
}
