import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  defaultPopulate: {
    title: true,
  },

  slug: 'locations',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Name of Establishment',
      type: 'text',

      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parkingList',
      label: 'List of Parking',
      type: 'array',
      fields: [
        {
          name: 'parkingLocation',
          label: 'Name of Location',
          type: 'text',
          required: true,
        },
        {
          name: 'parkingPhoto',
          label: 'Photo of Parking Location',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'parkingCovered',
          label: 'Is the Parking Covered? (Yes/No)',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'parkingSecured',
          label: 'Is the Parking Secured? (Yes/No)',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'parkingRates',
          label: 'Parking Fees',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'parkingRateFee',
          label: 'How much are the Parking Fees',
          type: 'text',
        },
      ],
      minRows: 1,
      required: true,
    },
  ],
}
