import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: ' Find Establishments with Bike Parking in the Philippines',
  images: [
    {
      url: `${getServerSideURL()}/siklista-website-OG.png`,
    },
  ],
  siteName: 'Siklista Parking PH',
  title: 'Siklista Parking PH',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
