import React, { cache } from 'react'
import { Button } from '@/components/ui/button'
import type { Location as LocationType } from '@/payload-types'
// import { RenderBlocks } from '@/utils/RenderBlocks'
// import { generateMeta } from '@/utils/generateMeta'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
// import { PageProps } from '.next/types/app/(payload)/layout'
import Image from 'next/image'

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

  // return (
  //   locations.docs
  //     ?.filter((doc) => {
  //       return doc.slug !== 'index'
  //     })
  //     .map((doc) => ({
  //       slug: doc.slug,
  //     })) || []
  // )
}
type Args = {
  params: Promise<{
    slug?: string
  }>
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

  return (
    <article>
      <div className="bg-night h-[300px] lg:h-[400px] w-full">
        <div className="max-w-2xl lg:max-w-4xl mx-auto px-8 py-16 lg:pb-20 h-full flex items-end">
          <h2 className="text-4xl md:text-5xl font-semibold text-slime">{location.title}</h2>
        </div>
      </div>
      <div className="max-w-2xl lg:max-w-4xl mx-4 md:mx-auto px-4 md:px-8 py-5 bg-bone rounded-xl border border-night flex flex-col lg:flex-row justify-between gap-6 -translate-y-8 lg:items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 flex-1">
          <div>
            <p className="text-sm text-gray-600 mb-[2px]">Last updated</p>
            <p className="text-md font-semibold text-night">{location.updatedAt}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-[2px]">Category</p>
            <p className="text-md font-semibold text-night">Malls</p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Button variant="outline" size="default">
            Outdated info
          </Button>
          <Button variant="default" size="default">
            Contribute
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-4 lg:mx-auto mt-8 pb-16">
        <h4 className="text-xl font-semibold text-night mb-8">Parking Locations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {location.parkingList.map((item, index) => {
            return (
              <div className="rounded-xl border border-night overflow-clip" key={index}>
                <div className="h-[200px] w-full relative">
                  <Image
                    className="object-cover"
                    src={typeof item.parkingPhoto === 'string' ? ' ' : item.parkingPhoto?.url || ''}
                    fill
                    sizes="100vw"
                    alt="Parking Photo"
                    // onClick={() => {
                    //   setIndex(0)
                    //   setOpen(true)
                    // }}
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
                      <p className="text-xs font-medium text-gray-500 mb-[2px] text-center">
                        Secured
                      </p>
                      <p className="text-sm font-medium text-night text-center">
                        {item.parkingSecured ? 'Yes' : 'Not Secured'}
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
            )
          })}
        </div>
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
