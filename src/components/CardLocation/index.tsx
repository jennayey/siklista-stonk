'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Location } from '@/payload-types'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
export type CardPostData = Pick<Location, 'slug' | 'title' | 'city' | 'placeType'>

export const CardLocation: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'locations'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, title, city, placeType } = doc || {}
  // const { } = city || {}

  // const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const titleCity = typeof city === 'object' ? city.title : city
  const titlePlaceType = typeof placeType === 'object' ? placeType.title : placeType

  // const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  console.log(doc)
  return (
    <article
      className={cn(
        'border border-night rounded-xl overflow-hidden bg-slate-50 hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {/* <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div> */}
      <div className="p-4">
        {/* {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )} */}
        <Badge className="mb-4">{titlePlaceType}</Badge>
        {titleToUse && (
          <div className="prose mb-1">
            <h4 className="text-lg font-semibold">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h4>
          </div>
        )}
        <p className="text-slate-600 text-sm font-medium">{titleCity}</p>
        {/* {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>} */}
      </div>
    </article>
  )
}
