import React from 'react';
import { Divider } from 'react-native-paper';
import { View, Text } from 'react-native';
import colors from "../../theme/colors";

function EmptyComponent() {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Divider style={{ flex: 1 }} />
      <Text style={{ marginLeft: 10, marginRight: 10, color: colors.accent }}>No Results</Text>
      <Divider style={{ flex: 1 }} />
    </View>
  );
}

export default EmptyComponent;
