import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://aiagenttoolkit.xyz'

    // Pages with direct routes
    const directRoutes = [
        '',
        '/dashboard',
        '/dashboard/upgrade',
        '/form/[form_id]',
        '/form/[form_id]/edit',
        '/form/responses',
        '/checkout',
        '/checkout/success',
        '/sign-in/[...sign-in]',
        '/sign-up/[...sign-up]',
    ]

    // Combine and format all routes
    const routes = [...directRoutes].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
} 