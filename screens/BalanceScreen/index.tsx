import React from 'react';
import numeral from 'numeral';
import { useQuery } from 'react-apollo-hooks';
import { gql } from "apollo-boost";
import { BalanceAccountTypeType } from '../../_types';
import { calcTotal }  from '../../_functions';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BalanceGroup from './BalanceGroup';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';
import Colors from '../../constants/Colors';

const GET_BALANCE = gql`
{
  balance {
    currency
    accountTypes {
      code
      name
      isDebit
      accounts {
        id
        name
        currency
        localAmount
        amount
      }
    }
  }
}
`;

export default function BalanceScreen() {
  const { data, error, loading } = useQuery(GET_BALANCE);

  if(loading) return <LoadingScreen />
  if(error) return <ErrorScreen message={error.message} />

  const debits: BalanceAccountTypeType[] = data.balance.accountTypes.filter((accountType: any) => accountType.isDebit);
  const credits: BalanceAccountTypeType[] = data.balance.accountTypes.filter((accountType: any) => !accountType.isDebit);

  const totalDebit = calcTotal(debits);
  const totalCredit = calcTotal(credits);
  const totalBalance = totalDebit - totalCredit;

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <View style={styles.option}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 0.5}}>
            <Text style={styles.h1Text}>Balance</Text>
          </View>
          <View style={{ flex: 0.5}}>
            <Text style={styles.h1TextRight}>{data.balance.currency} {numeral(totalBalance).format('0,0.00')}</Text>
          </View>
        </View>
        <BalanceGroup 
          currency={data.balance.currency}
          accountTypes={debits}
          title='Debit'
          color={Colors.positive}
        />
        <BalanceGroup 
          currency={data.balance.currency}
          accountTypes={credits}
          title='Credit'
          color={Colors.negative}
        />
      </View>
    </ScrollView>
  );
}

BalanceScreen.navigationOptions = {
  title: 'Balance',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
    flex: 1,
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
  h1Text: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 1,
    color: Colors.positive
  },
  h1TextRight: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 1,
    color: Colors.positive,
    textAlign: 'right',
  },
});
