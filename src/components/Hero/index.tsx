import { cn } from '@/utilities/ui'
import React from 'react'
import { FoldingBadge } from '../FoldingBikeFriendlyBadge/FoldingBadge'
export type Props = {
  title: string
  foldingBikeFriendly?: boolean
}

export const Hero: React.FC<Props> = (props) => {
  const { title, foldingBikeFriendly } = props

  return (
    <div className="bg-gradient-to-r from-night to-nightlite w-full">
      <div className="container pt-12 lg:pt-16 pb-24 lg:pb-20 relative">
        <h2 className="text-4xl md:text-5xl w-3/4	 font-semibold text-slime">{title}</h2>
        {foldingBikeFriendly ? <div className="absolute bottom-6 right-10 rotate-[-10deg]"><FoldingBadge /></div> : null}

      </div>
    </div>
  )
}
