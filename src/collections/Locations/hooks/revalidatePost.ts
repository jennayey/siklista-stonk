import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Location } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Location> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/locations/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('locations-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/locations/${previousDoc.slug}`

      payload.logger.info(`Revalidating old location at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('locations-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Location> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/locations/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('locations-sitemap')
  }

  return doc
}
