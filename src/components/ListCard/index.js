import React from 'react';
import { Card } from 'react-native-paper';
import { Text } from '../Typography';
import { View } from 'react-native';
import colors from '../../theme/colors';

const ListCard = ({
  title,
  leftContent,
  rightContent,
  rightTitle,
  handlePress,
}) => {
  return (
    <Card
      style={{ marginTop: 8, borderRadius: 0, marginRight: 20, marginLeft: 20 }}
      onPress={handlePress}>
      <Card.Title
        subtitle={title}
        subtitleNumberOfLines={2}
        subtitleStyle={{
          fontSize: 16,
          fontWeight: '700',
          lineHeight: 21,
          flexWrap: 'wrap',
          color: colors.text,
        }}
        right={() => (rightTitle ? rightTitle : null)}
        rightStyle={{
          marginRight: 16,
        }}
      />
      <Card.Content
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: colors.accent }}>{leftContent}</Text>
        </View>
        <View>
          <Text>{rightContent}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListCard;
