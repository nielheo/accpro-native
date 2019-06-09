import { BalanceAccountType, BalanceAccountTypeType } from '../_types';

const calcTotal = (accountTypes: BalanceAccountTypeType[]) : number => {
  let accounts: BalanceAccountType[] = accountTypes.map(at => at.accounts.map(ac => ac))
    .reduce((prev: BalanceAccountType[], curr: BalanceAccountType[]) => prev.concat(curr));

  return accounts.reduce((total: number, account: BalanceAccountType) => total + account.amount, 0);
}

function groupBy(list :any[], keyGetter: Function) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

export { calcTotal, groupBy }