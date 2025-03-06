import type { Metadata } from 'next/types'

import { LocationArchive } from '@/components/LocationArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/CardLocation'

type Args = {
  searchParams: Promise<{
    q: string
    city: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, city } = await searchParamsPromise

  const payload = await getPayload({ config: configPromise })

  const searchConditions = []

  if (query) {
    searchConditions.push({
      title: {
        like: query,
      },
    })
  }

  if (city) {
    searchConditions.push({
      'city.title': {
        equals: city,
      },
    })
  }

  // const locations = await payload.find({
  //   collection: 'search',
  //   depth: 1,
  //   limit: 12,
  //   select: {
  //     title: true,
  //     slug: true,
  //   },
  //   // pagination: false reduces overhead if you don't need totalDocs
  //   pagination: false,
  //   ...(query
  //     ? {
  //         where: {
  //           or: [
  //             {
  //               title: {
  //                 like: query,
  //               },
  //             },
  //             {
  //               slug: {
  //                 like: query,
  //               },
  //             },
  //             {
  //               city: {
  //                 equals: city,
  //               },
  //             },
  //           ],
  //         },
  //       }
  //     : {}),
  //    }
  //   )

  const locations = await payload.find({
    collection: 'search', // Ensure this is the correct collection name
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      city: true,
      placeType: true,
    },
    pagination: false,
    ...(searchConditions.length > 0
      ? {
          where: {
            and: searchConditions,
          },
        }
      : {}),
  })
  return (
    <div className="pb-24">
      <PageClient />
      <div className="sticky top-[66px] lg:relative lg:top-0 bg-night w-full py-2 lg:py-16 border-b border-night">
        <div className="container mx-auto">
          {/* <div className="max-w-4xl lg:max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-8 lg:pb-12 h-full flex flex-col justify-end"> */}
          <h2 className="hidden lg:block text-xl md:text-5xl font-semibold text-slime text-center">
            Search for Bike Parking
          </h2>
          <div className="w-full lg:mt-8">
            <Search />
          </div>
        </div>
      </div>
      {/* Search results */}
      <div className="container mx-auto pt-6">
        {locations.totalDocs > 0 ? (
          <h4 className="text-md lg:text-xl font-semibold text-slate-500 mb-4">Search results</h4>
        ) : null}

        {locations.totalDocs > 0 ? (
          <LocationArchive locations={locations.docs as CardPostData[]} />
        ) : (
          <div className="mx-auto">Oops. No matching results. Maybe try another place?</div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Siklista Parking Search`,
  }
}
