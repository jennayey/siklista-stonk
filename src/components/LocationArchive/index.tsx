import { cn } from '@/utilities/ui'
import React from 'react'

import { CardLocation, CardPostData } from '@/components/CardLocation'

export type Props = {
  locations: CardPostData[]
}

export const LocationArchive: React.FC<Props> = (props) => {
  const { locations } = props

  return (
    <div className='w-full'>
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-6 lg:gap-x-6 xl:gap-x-6">
          {locations?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-3" key={index}>
                  <CardLocation className="h-full" doc={result} relationTo="locations" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
