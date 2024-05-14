import { DateTime } from 'luxon'

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


import { randomBytes, createHmac } from 'crypto'

export const randomPassword = (bytes=12)=> {
  return randomBytes(bytes).toString('hex')
}

export const hashPassword = (password: string, salt?: string)=> {
  const _salt = salt ? salt : randomPassword()
  const hash = createHmac('sha512', _salt)
  hash.update(password)

  return {
    salt: _salt,
    password: hash.digest('hex')
  }
}
