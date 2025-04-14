const stripTags = (html: string | null): string | null => {
  if (!html) return null
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.body.textContent || null
}

export default stripTags
