import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Locations: CollectionConfig<'locations'> = {
  defaultPopulate: {
    title: true,
  },

  slug: 'locations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
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
      name: '_status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'placeType',
      type: 'relationship',
      hasMany: false,
      relationTo: 'place-categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'city',
      type: 'relationship',
      hasMany: false,
      relationTo: 'cities',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
       ...slugField(),
   
    {
      name: 'foldingBikeFriendly',
      label: 'Is the Location Folding Bike Friendly? (Yes/No)',
      type: 'checkbox',
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
          name: 'parkingDescription',
          label: 'Description of Parking Location',
          type: 'textarea',
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
