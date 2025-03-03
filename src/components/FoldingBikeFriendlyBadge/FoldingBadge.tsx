import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const FoldingBadge = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="Siklista Parking"
      width={250}
      height={50}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[15rem] w-full h-[64px] md:h-[80px] lg:h-[100px]', className)}
      src="/folding-bike-friendly-badge.svg"
    />
  )
}
// public\folding-bike-friendly-badge.svg
