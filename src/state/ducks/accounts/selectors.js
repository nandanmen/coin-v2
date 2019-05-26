export const getAccounts = state => Object.values(state)

export const getDebitAccounts = state =>
  getAccounts(state).filter(account => account.accountType === 'debit')

export const getCreditAccounts = state =>
  getAccounts(state).filter(account => account.accountType === 'credit')

export const getTotalBalance = state => {
  const sum = key => (acc, obj) => acc + obj[key]
  const debitSum = getDebitAccounts(state).reduce(sum('balance'), 0)
  const creditSum = getCreditAccounts(state).reduce(sum('balance'), 0)
  return debitSum - creditSum
}
