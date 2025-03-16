import React, { cache } from 'react'
import { Button } from '@/components/ui/button'
import type { Location as LocationType } from '@/payload-types'
import { formatDateTime } from 'src/utilities/formatDateTime'

// import { RenderBlocks } from '@/utils/RenderBlocks'
// import { generateMeta } from '@/utils/generateMeta'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Badge } from '@/components/ui/badge'
import { FoldingBadge } from '@/components/FoldingBikeFriendlyBadge/FoldingBadge'
// import { PageProps } from '.next/types/app/(payload)/layout'
import { Hero } from '@/components/Hero'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'node:fs/promises'

import { getPlaiceholder } from 'plaiceholder'
export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const locations = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = locations.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}
type Args = {
  params: Promise<{
    slug?: string
  }>
}

// Define types for parking items
interface ParkingPhotoType {
  url?: string
  // Add other possible properties you need
  [key: string]: any
}

type ParkingItem = {
  parkingPhoto: string | Media
  parkingLocation: string
  parkingDescription: string
  parkingCovered: boolean
  parkingSecured: boolean
  parkingRates: boolean
  parkingRateFee?: string | null | undefined
  blurDataURL?: string
}
// Helper function to generate blur data URLs
async function getBlurDataURL(imageUrl: string): Promise<string> {
  try {
    // For remote images
    const buffer = await fetch(imageUrl).then(async (res) => Buffer.from(await res.arrayBuffer()))

    const { base64 } = await getPlaiceholder(buffer)
    return base64
  } catch (error) {
    console.error('Error generating placeholder:', error)
    // Return a default blur data URL if generation fails
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  }
}

// Enhanced parking list component with blur placeholders
async function ParkingList({ parkingList }: { parkingList: ParkingItem[] }) {
  // Process each parking item to add blur placeholders
 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {parkingList.map((item, index) => (
        <div className="rounded-xl border border-night overflow-clip" key={index}>
          <div className="h-[200px] w-full relative bg-gray-100">
            <Image
              className="object-cover"
              placeholder="blur"
              blurDataURL={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
              }
              src={typeof item.parkingPhoto === 'string' ? '' : item.parkingPhoto?.url || ''}
              fill
              sizes="100vw"
              alt="Parking Photo"
            />
          </div>
          <div className="flex flex-col gap-4 p-4 pt-6">
            <div>
              <p className="text-lg font-semibold text-night mb-1">{item.parkingLocation}</p>
              <p className="text-sm font-medium text-gray-500">{item.parkingDescription}</p>
            </div>
            <hr />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-[2px] text-center">
                  Parking type
                </p>
                <p className="text-sm font-medium text-night text-center">
                  {item.parkingCovered ? 'Covered' : 'Outdoor'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-[2px] text-center">Secured</p>
                <p className="text-sm font-medium text-night text-center">
                  {item.parkingSecured ? '✅' : '❌'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-[2px] text-center">
                  Parking Fees
                </p>
                <p className="text-sm font-medium text-night text-center">
                  {item.parkingRates ? item.parkingRateFee : 'Free'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function LocationPage({ params: paramsPromise }: Args) {
  const resolvedParams = await Promise.resolve(paramsPromise)

  const { slug = 'index' } = resolvedParams

  const location: LocationType | null = await queryPageBySlug({
    slug,
  })

  if (!location) {
    return notFound()
  }

  const city = location.city
  const titleCity = typeof city === 'object' ? city.title : city
  const placeType =
    typeof location.placeType === 'object' ? location.placeType.title : location.placeType

  return (
    <article className="pb-24">
      {location.foldingBikeFriendly ? (
        <Hero title={location.title} foldingBikeFriendly />
      ) : (
        <Hero title={location.title} />
      )}

      <div className="container bg-bone rounded-xl border border-night py-4 flex flex-col lg:flex-row justify-between gap-6 -translate-y-8 lg:items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 flex-1">
          <div>
            <p className="text-sm text-gray-600 mb-[2px]">Last updated</p>
            <p className="text-md font-semibold text-night">{formatDateTime(location.updatedAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-[2px]">Location</p>
            <p className="text-md font-semibold text-night">{titleCity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-[2px]">Category</p>
            <Badge>{placeType}</Badge>
          </div>
          {location.contributor && (
            <div>
              <p className="text-sm text-gray-600 mb-[2px]">Contributor</p>
              <p className="text-md font-semibold text-night">{location.contributor}</p>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-4">
          {/* 
          
          */}
          <Button variant="default" size="default">
            <Link href="https://forms.gle/Y9iaNirFSrxEZPqw7">Contribute</Link>
          </Button>
        </div>
      </div>
      <div className="container">
        <h4 className="text-xl font-semibold text-night mb-8">
          {location.parkingList.length} Parking Locations
        </h4>
        <ParkingList parkingList={location.parkingList} />
      </div>

      {/* <div className="">
        <h1 className="text-4xl">{location.title}</h1>
        <h2>Available parking</h2>
        <p>{location.updatedAt}</p>
        <p>{location.foldingBikeFriendly ? 'Folding F' : 'Not friendly'}</p>

        <hr />
        <div>
          {location.parkingList.map((item, index) => {
            return (
              <div key={index}>
                <Image
                  src={typeof item.parkingPhoto === 'string' ? ' ' : item.parkingPhoto?.url || ''}
                  height={256}
                  width={256}
                  alt="Parking Photo"
                  className="object-contain"
                />
                <h3 className="text-blue text-base">{item.parkingLocation}</h3>
                <p className="text-base">{item.parkingCovered ? 'Covered' : 'Not Covered'}</p>
                <p className="text-base">{item.parkingSecured ? 'Secured' : 'Not Secured'}</p>
                <p className="text-base">{item.parkingRates ? item.parkingRateFee : 'Free'}</p>

                <hr />
              </div>
            )
          })}
        </div>
      </div> */}
    </article>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'locations',
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })

  return result.docs?.[0] || null
})
