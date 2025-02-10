import config from '@payload-config'
import React, { cache } from 'react'

import type { Location as LocationType } from '@/payload-types'
// import { RenderBlocks } from '@/utils/RenderBlocks'
// import { generateMeta } from '@/utils/generateMeta'
import configPromise from '@payload-config'

import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
// import { PageProps } from '.next/types/app/(payload)/layout'
import Image from 'next/image'



export async function generateStaticParams() {  
  const payload = await getPayload({ config: configPromise })
  const locations = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1000,

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
    <article className="pt-16 pb-24">
      <div>
        <h1 className="text-4xl">{location.title}</h1>
        <h2>Available parking</h2>
        <p>{location.updatedAt}</p>
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
                <p className="text-white">{item.parkingCovered ? 'Covered' : 'Not Covered'}</p>
                <p className="text-white">{item.parkingSecured ? 'Secured' : 'Not Secured'}</p>
                <hr />
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config })

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