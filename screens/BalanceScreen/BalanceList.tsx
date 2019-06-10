import React from 'react';
import numeral from 'numeral';

import { Text, View } from 'react-native';

const BalanceList = (props: any) => {
  const totalAmount = props.accounts.reduce((total: any, row:any) => total + row.amount, 0);
  let idx = 1;
  return(
  <React.Fragment>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{ flex: 0.5}}>
        <Text style={{fontSize: 14,
            fontWeight: '800',
            marginTop: 1,
            marginBottom: 5,
            marginLeft: 8,
            color: '#333'
          }}>{props.title}</Text>
      </View>
      <View style={{ flex: 0.5}}>
        <Text style={{fontSize: 14,
            fontWeight: '800',
            marginTop: 1,
            marginBottom: 5,
            color: props.color,
            textAlign: 'right'
          }}>{props.currency} {numeral(totalAmount).format('0,0.00')}</Text>
      </View>
    </View>
    {props.accounts.map(account => (
      <React.Fragment  key={idx++}>
        <View style={{ flexDirection: 'row', flex: 1 }} key={idx++}>
          <View style={{ flex: 0.5}}>
            <Text style={{fontSize: 14,
                marginTop: 1,
                marginBottom: 5,
                marginLeft: 15,
                color: '#333'
              }}>{account.name}</Text>
          </View>
          <View style={{ flex: 0.5}}>
            <Text style={{fontSize: 14,
                marginTop: 1,
                marginBottom: 5,
                color: '#333',
                textAlign: 'right'
              }}>{account.currency} {numeral(account.localAmount).format('0,0.00')}</Text>
          </View>
        </View>
        { props.currency != account.currency &&
        <View style={{ flexDirection: 'row', flex: 1 }} key={'-' + idx}>
          <View style={{ flex: 0.5}}>
            <Text style={{fontSize: 14,
                marginTop: 1,
                marginBottom: 5,
                marginLeft: 15,
                color: '#A9A9A9'
              }}></Text>
          </View>
          <View style={{ flex: 0.5}}>
            <Text style={{fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                color: '#A9A9A9',
                textAlign: 'right'
              }}>{props.currency} {numeral(account.amount).format('0,0.00')}</Text>
          </View>
        </View>}
      </React.Fragment>
    ))}
  </React.Fragment>)
}

export default BalanceList;