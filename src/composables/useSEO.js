import { ref, watch } from 'vue'

export function useSEO() {
  const title = ref('')
  const description = ref('')
  const keywords = ref('')
  const ogTitle = ref('')
  const ogDescription = ref('')
  const ogImage = ref('')
  const canonical = ref('')

  const updateMeta = () => {
    // Title
    if (title.value) {
      document.title = title.value
    }

    // Description
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta && description.value) {
      descMeta.setAttribute('content', description.value)
    }

    // Keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (keywordsMeta && keywords.value) {
      keywordsMeta.setAttribute('content', keywords.value)
    }

    // Open Graph Title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    if (ogTitleMeta && ogTitle.value) {
      ogTitleMeta.setAttribute('content', ogTitle.value)
    }

    // Open Graph Description
    const ogDescMeta = document.querySelector('meta[property="og:description"]')
    if (ogDescMeta && ogDescription.value) {
      ogDescMeta.setAttribute('content', ogDescription.value)
    }

    // Open Graph Image
    const ogImageMeta = document.querySelector('meta[property="og:image"]')
    if (ogImageMeta && ogImage.value) {
      ogImageMeta.setAttribute('content', ogImage.value)
    }

    // Canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink && canonical.value) {
      canonicalLink.setAttribute('href', canonical.value)
    }
  }

  const setSEO = (options) => {
    if (options.title) title.value = options.title
    if (options.description) description.value = options.description
    if (options.keywords) keywords.value = options.keywords
    if (options.ogTitle) ogTitle.value = options.ogTitle
    if (options.ogDescription) ogDescription.value = options.ogDescription
    if (options.ogImage) ogImage.value = options.ogImage
    if (options.canonical) canonical.value = options.canonical

    updateMeta()
  }

  // Watch for changes and update meta tags
  watch([title, description, keywords, ogTitle, ogDescription, ogImage, canonical], updateMeta)

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonical,
    setSEO
  }
}
