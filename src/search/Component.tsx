'use client'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
// import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

const cities = [
  {
    value: 'Pasig',
    label: 'Pasig',
  },
  {
    value: 'Quezon City',
    label: 'Quezon City',
  },
  {
    value: 'Mandaluyong',
    label: 'Mandaluyong',
  },
]

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const [city, setCity] = useState('')
  const [open, setOpen] = React.useState(false)
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
          className="bg-bone border border-night rounded-xl px-4 py-6 lg:py-8 w-full texd-md lg:text-lg"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {city ? cities.find((cities) => cities.value === city)?.label : 'Select cities...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No cities found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((cities) => (
                    <CommandItem
                      key={cities.value}
                      value={cities.value}
                      onSelect={(currentValue) => {
                        setCity(currentValue === city ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          city === cities.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />{' '}
                      {cities.label}

                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
