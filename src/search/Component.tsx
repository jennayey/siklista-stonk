'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const [city, setCity] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)
  const debouncedCity = useDebounce(city)


  // useEffect(() => {
  //   router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  // }, [debouncedValue, debouncedCategory, router])
  useEffect(() => {
    const query = new URLSearchParams()
    if (debouncedValue) query.set('q', debouncedValue)
    if (debouncedCity) query.set('city', debouncedCity)
    router.push(`/search?${query.toString()}`)
  }, [debouncedValue, debouncedCity, router])
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          className='bg-bone border border-night rounded-xl px-4 py-6 lg:py-8 w-full texd-md lg:text-lg'
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
        />
           <Input
          id="search"
          className='bg-bone border border-night rounded-xl px-4 py-6 lg:py-8 w-full texd-md lg:text-lg'
          onChange={(event) => {
            setCity(event.target.value)
          }}
          placeholder="City"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
 