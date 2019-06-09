import React from 'react'
import numeral from 'numeral';
import { StyleSheet, Text, View } from 'react-native';

import { BalanceAccountTypeType } from '../../_types';
import { calcTotal } from '../../_functions';

import BalanceList from './BalanceList';

interface IBalanceGroupProps {
  currency: string,
  color: string,
  accountTypes: BalanceAccountTypeType[],
  title: string
}

const BalanceGroup = (props: IBalanceGroupProps) => {
  const totalAmount = calcTotal(props.accountTypes);
 
  return(
    <React.Fragment>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flex: 0.5}}>
          <Text style={{fontSize: 16,
              fontWeight: '800',
              marginTop: 10,
              marginBottom: 5,
              color: props.color,
              borderBottomWidth: 1,
              borderBottomColor: props.color,
            }}>{props.title}</Text>
        </View>
        <View style={{ flex: 0.5}}>
          <Text style={{fontSize: 16,
              fontWeight: '800',
              marginTop: 10,
              marginBottom: 5,
              color: props.color,
              borderBottomWidth: 1,
              borderBottomColor: props.color,
              textAlign: 'right'
            }}>{props.currency} {numeral(totalAmount).format('0,0.00')}</Text>
        </View>
      </View>
      { props.accountTypes.map((accountType: BalanceAccountTypeType) => 
          <BalanceList 
            key={accountType.code}
            currency={props.currency} 
            accounts={accountType.accounts} 
            color={props.color} 
            title={accountType.name} />)
      }
    </React.Fragment>
  )
}

export default BalanceGroup;

