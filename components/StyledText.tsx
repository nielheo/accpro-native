import React from 'react';
import { Text } from 'react-native';

const MonoText = (props: any) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export { MonoText };
