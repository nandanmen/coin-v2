const data = {
  today: {
    spent: 29.55
  },
  accounts: {
    0: {
      bank: 'bmo',
      accountType: 'debit',
      cardType: 'mastercard',
      balance: 1197.47,
      number: 6556,
      transactions: [0, 1, 2, 3],
      color: 'blue'
    },
    1: {
      bank: 'scotia',
      accountType: 'debit',
      cardType: 'visa',
      balance: 184.98,
      number: 5010,
      transactions: [],
      color: 'teal'
    },
    2: {
      bank: 'amex',
      accountType: 'credit',
      cardType: 'amex',
      balance: 184.98,
      number: 5701,
      transactions: [],
      color: 'turq'
    }
  },
  budgets: {
    food: {
      budget: 800,
      spent: 117.35,
      daily: 30.77,
      transactions: [0, 2],
      color: '#6D97AA'
    },
    groceries: {
      budget: 100,
      spent: 24.66,
      daily: null,
      transactions: [1, 3],
      color: '#bce8ff'
    },
    gas: {
      budget: 200,
      spent: 50,
      daily: null,
      transactions: [],
      color: '#f7e6d5'
    }
  },
  transactions: {
    byId: {
      0: {
        vendor: 'tim hortons',
        amount: -2.09,
        date: '2019-05-07'
      },
      1: {
        vendor: 'london drugs',
        amount: -7.83,
        date: '2019-05-06'
      },
      2: {
        vendor: 'chipotle',
        amount: -11.03,
        date: '2019-05-06'
      },
      3: {
        vendor: 'tnt',
        amount: -7.28,
        date: '2019-05-06'
      }
    },
    allIds: [0, 1, 2, 3]
  }
};

export const getTodayInfo = () => data.today;

export const getTotalBalance = () =>
  Object.values(data.accounts).reduce(
    (acc, account) => acc + account.balance,
    0
  );

export const getBudgets = () =>
  Object.entries(data.budgets).map(([name, info]) => {
    const result = { name, ...info };
    result.transactions = result.transactions.map(
      id => data.transactions.byId[id]
    );
    return result;
  });

export const getAccounts = () =>
  Object.entries(data.accounts).map(([id, info]) => ({ id, ...info }));
