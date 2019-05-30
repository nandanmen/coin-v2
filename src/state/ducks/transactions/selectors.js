import { isToday } from 'date-fns'

export const getTransactions = ({ transactions: { byId, allIds } }) =>
  allIds.map(id => ({ ...byId[id] }))

export const getTodayTransactions = state =>
  getTransactions(state).filter(tr => isToday(tr.date))
