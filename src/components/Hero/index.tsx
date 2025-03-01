import { cn } from '@/utilities/ui'
import React from 'react'

export type Props = {
  title: string
}

export const Hero: React.FC<Props> = (props) => {
  const { title } = props

  return (
    <div className="bg-night pt-16 pb-20 w-full">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-semibold text-slime">{title}</h2>
      </div>
    </div>
  )
}
