// SEO Helper functions for dynamic content
export function useSEOHelper() {
  
  // Generate product SEO data
  const generateProductSEO = (product) => {
    if (!product) return {}
    
    return {
      title: `${product.name} - TamRahat | ${product.category?.name || 'Öý Harytlary'}`,
      description: `${product.name} - ${product.description || ''} Amatly bahadan satyn alyň! Tez eltip berme we ýokary hilli hyzmat.`,
      keywords: `${product.name}, ${product.category?.name || ''}, öý harytlary, amatly baha, TamRahat, Türkmenistanda satyn almak`,
      ogTitle: `${product.name} - TamRahat`,
      ogDescription: `${product.name} - Amatly bahadan satyn alyň! Tez eltip berme we ýokary hilli hyzmat.`,
      ogImage: product.image || 'https://tamrahat.com.tm/icons/logo.png',
      canonical: `https://tamrahat.com.tm/product/detail/${product.id}`
    }
  }

  // Generate category SEO data
  const generateCategorySEO = (category) => {
    if (!category) return {}
    
    return {
      title: `${category.name} - TamRahat | Öý Üçin Harytlar`,
      description: `${category.name} kategoriyasyda ähli harytlar. Amatly bahadan satyn alyň! Tez eltip berme we ýokary hilli hyzmat.`,
      keywords: `${category.name}, öý harytlary, kategoriya, amatly baha, TamRahat, Türkmenistanda satyn almak`,
      ogTitle: `${category.name} - TamRahat`,
      ogDescription: `${category.name} kategoriyasyda ähli harytlar. Amatly bahadan satyn alyň!`,
      ogImage: 'https://tamrahat.com.tm/icons/logo.png',
      canonical: `https://tamrahat.com.tm/product/list?category=${category.id}`
    }
  }

  // Generate search results SEO data
  const generateSearchSEO = (query, resultsCount = 0) => {
    return {
      title: `"${query}" üçin gözleg netijeleri - TamRahat`,
      description: `"${query}" üçin ${resultsCount} sany haryt tapyldy. Amatly bahadan satyn alyň! Tez eltip berme we ýokary hilli hyzmat.`,
      keywords: `${query}, gözleg netijeleri, öý harytlary, amatly baha, TamRahat, Türkmenistanda satyn almak`,
      ogTitle: `"${query}" üçin gözleg netijeleri - TamRahat`,
      ogDescription: `"${query}" üçin ${resultsCount} sany haryt tapyldy. Amatly bahadan satyn alyň!`,
      ogImage: 'https://tamrahat.com.tm/icons/logo.png',
      canonical: `https://tamrahat.com.tm/product/search?q=${encodeURIComponent(query)}`
    }
  }

  // Generate breadcrumb structured data
  const generateBreadcrumbSchema = (items) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    }
  }

  // Generate product structured data
  const generateProductSchema = (product) => {
    if (!product) return {}
    
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "brand": {
        "@type": "Brand",
        "name": "TamRahat"
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "TMT",
        "availability": product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "TamRahat"
        }
      }
    }
  }

  return {
    generateProductSEO,
    generateCategorySEO,
    generateSearchSEO,
    generateBreadcrumbSchema,
    generateProductSchema
  }
}