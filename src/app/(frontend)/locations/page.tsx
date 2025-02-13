import type { Metadata } from 'next/types'

import { LocationArchive } from '@/components/LocationArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
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
      // categories: true,
      // meta: true,
    },
  })

  return (
    <div className="pb-24">
      <PageClient />
      <div className="bg-night h-[300px] lg:h-[400px] w-full">
        <div className="max-w-4xl lg:max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-8 lg:pb-20 h-full flex items-end">
          <h2 className="text-4xl md:text-5xl font-semibold text-slime">
            Locations with Bike Parking
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-4 lg:mx-auto my-8">
        <PageRange
          className="px-4 md:px-8 mb-8"
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
