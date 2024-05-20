import { DateTime, Duration, type WeekdayNumbers } from 'luxon'
import type { Address } from 'square'

export const money = (value: any) => {
  const currency = Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    // maximumFractionDigits: 0
  })
  return currency.format(value)
}

export const date = (value: string) => {
  return DateTime.fromISO(value).setLocale('fr-CA').toLocaleString({ month: '2-digit', year: 'numeric' })
}

export const year = (value: string) => {
  return DateTime.fromISO(value).setLocale('fr-CA').toLocaleString({ year: 'numeric' })
}

export const time = (value: string, timezone: number) => {
  return DateTime.fromISO(value).setLocale('fr-CA').setZone(`UTC${timezone}`).toLocaleString({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}

export const capitalize = (value: string) => {
  return value && value[0].toUpperCase() + value.slice(1)
}

export const weektime = (value: [number, number, number]) => {
  // const format = Intl.DateTimeFormat('fr-CA', {
  //   weekday: "long"
  // })
  const date = DateTime.now().setLocale('fr-CA').set({ weekday: value[0] as WeekdayNumbers })
  return `${capitalize(date.weekdayLong)} ${value[1]}h à ${value[2]}h`
}

export const frequencyLabel = (value: number) => {
  return ['À chaque semaine', 'Au deux semaines'][value - 1]
}

export const adresse = (address: Address) => {
  return [address.addressLine1, address.locality, address.postalCode].filter(a => !!a).join(', ')
}