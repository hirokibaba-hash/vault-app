const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function extractMeta(html: string, ...props: string[]): string {
  for (const prop of props) {
    const patterns = [
      new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, 'i'),
      new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${prop}["']`, 'i'),
    ]
    for (const re of patterns) {
      const m = html.match(re)
      if (m?.[1]?.trim()) return m[1].trim()
    }
  }
  return ''
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return m?.[1]?.trim() ?? ''
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    if (!url) throw new Error('url is required')

    const domain = (() => { try { return new URL(url).hostname } catch { return url } })()

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VaultBot/1.0; +https://vault.app)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    })

    const html = await res.text()

    const rawTitle = extractMeta(html, 'og:title', 'twitter:title') || extractTitle(html) || domain
    const rawDesc  = extractMeta(html, 'og:description', 'twitter:description', 'description')
    const image    = extractMeta(html, 'og:image', 'twitter:image')
    const siteName = extractMeta(html, 'og:site_name')

    const title       = decodeHtmlEntities(rawTitle)
    const description = decodeHtmlEntities(rawDesc)

    return new Response(
      JSON.stringify({ url, title, description, image, siteName, domain }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    const body = e instanceof Error ? e.message : 'unknown error'
    return new Response(
      JSON.stringify({ error: body }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
