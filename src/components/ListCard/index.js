import React from 'react';
import { Card } from 'react-native-paper';
import { Text } from '../Typography';
import { Image, View } from 'react-native';
import colors from '../../theme/colors';
import commonStyles from '../../theme/commonStyles';

const ListCard = ({
  title,
  leftContent,
  rightContent,
  rightTitle,
  handlePress,
  leftIcon,
  leftStyle,
}) => {
  return (
    <Card
      style={{ marginTop: 8, borderRadius: 0, marginRight: 20, marginLeft: 20 }}
      onPress={handlePress}>
      {title && (
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
      )}
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...(!title ? { paddingTop: 12 } : null),
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {leftIcon && (
            <Image source={leftIcon} style={{...commonStyles.smallIcon, marginRight: 12}} />
          )}
          <Text style={{ color: colors.accent, ...leftStyle }}>
            {leftContent}
          </Text>
        </View>
        <View>
          <Text>{rightContent}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListCard;
