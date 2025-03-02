import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
// import { title } from 'process'
const Messages = [
  {
    title: 'Whoops! Not Found',
    message: 'Parang yung mga bike lanes sa Pilipinas 😭',
  },
  {
    title: 'Hala! Wala yung page',
    message: 'Tinanggal na ata yung page... Parang yung mga bike lanes sa Pilipinas 🚲',
  },
  {
    title: 'The path you seek is shrouded in shadow.',
    message: 'Perhaps another route? 🤔',
  },
  {
    title: 'Hinanap namin pero wala talaga',
    message: 'Balik ka nalang sa Homepage please 🥹',
  },
  {
    title: 'Oo na, kasanalan na namin',
    message: 'Pero wala talaga kaming mahanap na ganong page 🙄',
  },
  {
    title: 'This page is gone',
    message: 'Parang siya, este bike lanes pala. Wala na. 😒',
  },
  {
    title: 'This location is unknown',
    message: 'Proceed with caution... or go back? 🚧',
  },
  {
    title: 'Wala na yung page. Inalis na siguro.',
    message: 'Parang yung mga bike lanes sa Pilipinas 🚲',
  },
  {
    title: 'This page is missing',
    message: 'Parang yung care ng gobyerno sa bike lanes 🤷‍♂️',
  },
]

export default function NotFound() {
  const messageNo = Math.floor(Math.random() * Messages.length)

  return (
    <div className="container py-28 flex flex-col gap-y-4 items-center">
      <Badge className="text-md uppercase text-center">404: Page Not found</Badge>
      <div className="prose max-w-none">
        <h1 className="text-night font-bold text-center">{Messages[messageNo]?.title}</h1>
        <p className="text-slate-600 text-center">{Messages[messageNo]?.message}</p>
      </div>
      <Button asChild variant="default" className="mt-8">
        <Link href="/">Go back to Search</Link>
      </Button>
    </div>
  )
}
