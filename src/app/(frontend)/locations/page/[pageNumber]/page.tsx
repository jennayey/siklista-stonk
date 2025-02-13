import type { Metadata } from 'next/types'

import { LocationArchive } from '@/components/LocationArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const location = await payload.find({
    collection: 'locations',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="bg-night h-[300px] lg:h-[400px] w-full">
        <div className="max-w-4xl lg:max-w-7xl mx-auto px-8 py-16 lg:pb-20 h-full flex items-end">
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
        {location?.page && location?.totalPages > 1 && (
          <Pagination page={location.page} totalPages={location.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Bike Parking Locations ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'locations',
    //needs to have an published API data to work
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
