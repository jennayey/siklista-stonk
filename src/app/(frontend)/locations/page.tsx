import type { Metadata } from 'next/types'

import { LocationArchive } from '@/components/LocationArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Hero } from '@/components/Hero'
// import { Search } from '@/search/Component'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const location = await payload.find({
    collection: 'locations',
    depth: 1,
    limit: 12,
    // overrideAccess: false,
    select: {
      title: true,
      slug: true,
      city: true,
      placeType: true,
      // categories: true,
      // meta: true,
    },
  })

  return (
    <div className="pb-24">
      <PageClient />
      <Hero title="Locations with bike parking" />

      <div className="container pt-8">
        <PageRange
          className="mb-8"
          collection="locations"
          currentPage={location.page}
          limit={12}
          totalDocs={location.totalDocs}
        />
        <LocationArchive locations={location.docs} />
      </div>

      <div className="container">
        {location.totalPages > 1 && location.page && (
          <Pagination page={location.page} totalPages={location.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Bike Parking`,
  }
}
