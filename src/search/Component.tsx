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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import { cities } from './cities'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const [city, setCity] = useState('')
  // const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const debouncedValue = useDebounce(value)
  const debouncedCity = useDebounce(city)

  // useEffect(() => {
  //   router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  // }, [debouncedValue, debouncedCategory, router])
const handleValueChange = (value: string) => {
setCity(value)
}


  useEffect(() => {
    const query = new URLSearchParams()
    if (debouncedValue) query.set('q', debouncedValue)
    if (debouncedCity) query.set('city', debouncedCity)
    router.push(`/search?${query.toString()}`)
  }, [debouncedValue, debouncedCity, router])
  return (
    <div className="mx-auto">
      <form
        className="grid grid-cols-12 md:grid-cols-3 gap-2 lg:gap-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {/* input Field */}
        <div className="col-span-7 md:col-span-2">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            className="bg-bone border border-night rounded-xl px-2 lg:px-4 py-2 lg:py-6 w-full text-sm lg:text-lg"
            onChange={(event) => {
              setValue(event.target.value)
            }}
            placeholder="Search for places or establishments..."
          />
        </div>
        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full lg:w-[300px] bg-bone border border-night rounded-xl px-4 py-6 justify-between  texd-md"
            >
              {city ? cities.find((cities) => cities.value === city)?.label : 'Select cities...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full lg:w-[300px] p-0 rounded-xl border border-night overflow-clip">
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
        </Popover> */}
        <Select onValueChange={handleValueChange} >
          <SelectTrigger className="col-span-5 md:col-span-1 w-full bg-bone border border-night rounded-xl px-2 lg:px-4 py-2 lg:py-6 justify-between text-sm lg:text-lg ">
            <SelectValue defaultValue={city} placeholder="Select City" className='text-sm'/>
          </SelectTrigger>
          <SelectContent className="w-full p-0 rounded-xl border border-night overflow-clip">
            {cities.map((cities) => (
              <SelectItem
                key={cities.value}
                value={cities.value}
                className='py-2 text-md'
              >
                {cities.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
