import config from '@payload-config'
import React, { cache } from 'react'

import type { Location as LocationType } from '@/payload-types'
// import { RenderBlocks } from '@/utils/RenderBlocks'
// import { generateMeta } from '@/utils/generateMeta'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { PageProps } from '.next/types/app/(payload)/layout'
import Image from 'next/image'
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

export async function generateStaticParams() {  
  const payload = await getPayload({ config })
  const locations = await payload.find({
    collection: 'locations',
    draft: false,
    limit: 1000,

    select: {
      slug: true,
    },
  })

  // return pages.docs
  //   ?.filter((doc) => {
  //     return doc.slug !== 'index'
  //   })
  //   .map(({ slug }) => slug)

  return (
    locations.docs
      ?.filter((doc) => {
        return doc.slug !== 'index'
      })
      .map((doc) => ({
        slug: doc.slug,
      })) || []
  )
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params)

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
        <h1 className="text-4xl">{location.name}</h1>
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
