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
    q: string,
    city: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const {  q: query, city } = await searchParamsPromise

  const payload = await getPayload({ config: configPromise })

  const searchConditions = []

  if (query) {
    searchConditions.push(
      {
        title: {
          like: query,
        },
      },
      {
        slug: {
          like: query,
        },
      },
    )
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
      },
      pagination: false,
      ...(searchConditions.length > 0
        ? {
            where: {
              or: searchConditions,
            },
          }
        : {}),
    })
  return (
    <div className="pb-24">
      <PageClient />
      <div className="bg-night h-[300px] lg:h-[400px] w-full">
        <div className="max-w-4xl lg:max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-8 lg:pb-12 h-full flex flex-col justify-end">
          <h2 className="text-4xl md:text-5xl font-semibold text-slime">Search for Bike Parking</h2>
          <div className="w-full mt-8">
            <Search />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-4 lg:mx-auto my-8">
        <h4 className="text-xl font-semibold text-night mb-8">Search results</h4>
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
