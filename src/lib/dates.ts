import { datetime, RRule, RRuleSet, Weekday } from 'rrule'
import type { Saison } from '../routes/fermes/[id]/+layout.server'
import { dt } from './formatters'


export const rule = (saison: Saison, interval: number, byweekday: number, byhour: number, exceptions?: string[]) => {
  const rruleSet = new RRuleSet()

  const dtstart = dt(saison.debut)
  const until = saison.fin && dt(saison.fin)

  rruleSet.rrule(new RRule({
    freq: RRule.WEEKLY,
    interval,
    byweekday: byweekday - 1,
    byhour: byhour + 4,
    byminute: 0,
    bysecond: 0,
    dtstart,
    until,
  }))

  exceptions?.forEach(exception => {
    rruleSet.exdate(dt(exception, byhour + 4, 0, 0))
  })

  return rruleSet
}

export const dates = (saison: Saison, interval: number, byweekday: number, byhour: number, exceptions?: string[]) => {
  return rule(saison, interval, byweekday, byhour, exceptions).all()
}