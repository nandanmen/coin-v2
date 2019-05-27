export const getAccounts = ({ accounts }) => Object.values(accounts)

export const getPopulatedAccounts = ({ accounts, transactions }) =>
  getAccounts({ accounts }).map(account => ({
    ...account,
    transactions: account.transactions.map(id => transactions.byId[id])
  }))

export const getAccountById = (id, state) =>
  getPopulatedAccounts(state).find(account => account.id === id)

export const getDebitAccounts = state =>
  getAccounts(state).filter(account => account.accountType === 'debit')

export const getCreditAccounts = state =>
  getAccounts(state).filter(account => account.accountType === 'credit')

export const getTotalBalance = state => {
  const sum = key => (acc, obj) => acc + Number(obj[key])
  const debitSum = getDebitAccounts(state).reduce(sum('balance'), 0)
  const creditSum = getCreditAccounts(state).reduce(sum('balance'), 0)
  return debitSum - creditSum
}
