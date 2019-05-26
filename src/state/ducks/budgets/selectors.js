export const getBudgets = ({ budgets }) => Object.values(budgets)

export const getPopulatedBudgets = ({ budgets, transactions }) => {
  return Object.values(budgets).map(budget => ({
    ...budget,
    transactions: budget.transactions.map(id => transactions.byId[id])
  }))
}
