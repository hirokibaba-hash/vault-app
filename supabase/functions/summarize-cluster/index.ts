const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CardInput {
  title: string
  summary: string
  body: string
  notes: string
  links: Array<{ title: string; url: string; description: string }>
  messages: string
}

function buildCardText(card: CardInput, index: number): string {
  const parts: string[] = [`### カード ${index + 1}：${card.title}`]
  if (card.summary) parts.push(`概要: ${card.summary}`)
  if (card.body?.trim()) parts.push(`ドキュメント:\n${card.body.trim()}`)
  if (card.notes?.trim()) parts.push(`メモ:\n${card.notes.trim()}`)
  if (card.links?.length) {
    const linkLines = card.links
      .map(l => `- ${l.title || l.url}${l.description ? ': ' + l.description : ''}`)
      .join('\n')
    parts.push(`参照リンク:\n${linkLines}`)
  }
  if (card.messages?.trim()) parts.push(`AIとの考察:\n${card.messages.trim()}`)
  return parts.join('\n')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { cards, clusterLabel } = await req.json()
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')
    if (!cards || cards.length === 0) throw new Error('cards is required')

    const cardTexts = (cards as CardInput[])
      .map((c, i) => buildCardText(c, i))
      .join('\n\n---\n\n')

    const prompt = `以下は「${clusterLabel}」カテゴリのカード群です。各カードにはタイトル、メモ、ドキュメント、参照リンク、AIとの考察などが含まれます。

${cardTexts}

---

これらのカードを横断して読み解き、次の観点でまとめてください：
- カード群全体から得られる重要な気づきやインサイト
- 共通するテーマや傾向
- 実践に活かせる示唆

3〜4文の自然な日本語で。箇条書きは使わないこと。`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    const summary: string = data.content?.[0]?.text ?? ''

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
