import React from 'react'
import { Monitor, Palette, Database, Sparkles } from 'lucide-react'

export interface ClusterVisual {
  label: string
  accent: string
  badge: string
}

const CLUSTER_VISUAL_MAP: Record<string, ClusterVisual> = {
  frontend: { label: 'フロントエンド', accent: '#3b82f6', badge: 'bg-blue-50/60 text-blue-500 border-blue-100' },
  design:   { label: 'デザイン / UX',  accent: '#8b5cf6', badge: 'bg-violet-50/60 text-violet-500 border-violet-100' },
  backend:  { label: 'バックエンド',   accent: '#10b981', badge: 'bg-emerald-50/60 text-emerald-600 border-emerald-100' },
  ai:       { label: 'AI',             accent: '#f59e0b', badge: 'bg-amber-50/60 text-amber-500 border-amber-100' },
}

const DEFAULT_VISUAL: ClusterVisual = {
  label: 'その他',
  accent: '#6b7280',
  badge: 'bg-neutral-50 text-neutral-500 border-neutral-100',
}

export function getClusterVisual(cluster: string): ClusterVisual {
  return CLUSTER_VISUAL_MAP[cluster] ?? DEFAULT_VISUAL
}

export const CLUSTER_ICON: Record<string, React.ElementType> = {
  frontend: Monitor,
  design:   Palette,
  backend:  Database,
  ai:       Sparkles,
}

export function getClusterIcon(cluster: string): React.ElementType {
  return CLUSTER_ICON[cluster] ?? Sparkles
}

export const ASSIGNEE_COLORS: Record<string, string> = {
  '木村': '#6366f1',
  '田中': '#f59e0b',
  '佐藤': '#10b981',
  '鈴木': '#3b82f6',
}
