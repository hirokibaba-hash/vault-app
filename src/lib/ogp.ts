import { supabase } from './supabase'

export interface OgpData {
  url: string
  title: string
  description: string
  image: string
  siteName: string
  domain: string
}

export async function fetchOgp(url: string): Promise<OgpData> {
  const { data, error } = await supabase.functions.invoke('fetch-ogp', {
    body: { url },
  })

  if (error || data?.error) {
    // Fallback: return minimal data from URL only
    const domain = (() => { try { return new URL(url).hostname } catch { return url } })()
    return { url, title: domain, description: '', image: '', siteName: '', domain }
  }

  return data as OgpData
}
