import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div>
      <img
        alt="Siklista Parking"
        width={250}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('hidden md:block max-w-[175px] md:max-w-[12.5rem] w-full h-[34px]', className)}
        src="https://raw.githubusercontent.com/jennayey/siklista-stonk/refs/heads/master/public/logo-full-dark.svg"
      />
      <img
        alt="Siklista Parking"
        width={250}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('md:hidden max-w-[175px] md:max-w-[12.5rem] w-full h-[34px]', className)}
        src="https://raw.githubusercontent.com/jennayey/siklista-stonk/refs/heads/master/public/logo-icon-dark.svg"
      />
    </div>
  )
}
