export type LayoutContextType = {
  isDrawerOpened: boolean,
  isBalanceDetailed: boolean,
  handleDrawerChanged(state: boolean): void,
  handleBalanceDetailedChanged(state: boolean): void,
};

export type UserContextType = {
  isAuthenticated: boolean,
  name: string,
  handleLogin(): void,
  handleLogout(): void
};

export type BalanceAccountType = {
  id: string,
  name: string,
  currency: string,
  localAmount: number,
  amount: number
}

export type BalanceAccountTypeType = {
  code: string,
  name: string,
  isDebit: string,
  accounts: [BalanceAccountType]
}

export type BalanceType = {
  currency: string,
  accountTypes: BalanceAccountTypeType[] 
}

export type TransactionType = {
  id: number,
  date: Date,
  amount: number,
  localAmount: number,
  account: string,
  category: string,
  subCategory: string,
  description: string,
  payeePayer: string,
  currency: string
}