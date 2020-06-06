import React from 'react';
import { Card } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { SubHeading, Text } from '../../../../components/Typography';
import colors from '../../../../theme/colors';
import commonStyles from '../../../../theme/commonStyles';
import icAllow from '../../../../icons/ic-allow.png';
import icBlock from '../../../../icons/ic-block.png';

const AccessCard = ({ employeeDetails }) => {
  const { hasAccess, name, phoneNumber, userId } = employeeDetails;
  const date = new Date();

  return (
    <Card>
      <View
        style={{
          display: 'flex',
        }}>
        <View
          style={{
            ...styles.container,
            borderTopRightRadius: 2,
            borderTopLeftRadius: 2,
            backgroundColor: hasAccess ? colors.primary : colors.error,
          }}>
          <SubHeading
            style={{
              color: colors.white,
            }}>
            {hasAccess ? 'Access Available' : 'Access Denied'}
          </SubHeading>
          <Text
            style={{
              color: colors.white,
            }}>
            Today, {date.toDateString()}
          </Text>
        </View>
        <View style={{ ...styles.container, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <SubHeading>{name}</SubHeading>
            <Text
              style={{
                color: colors.accent,
              }}>
              {phoneNumber}
            </Text>
          </View>
          <View>
            <Image
              source={hasAccess ? icAllow : icBlock}
              style={commonStyles.largeIconStyle}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },
});

export default AccessCard;
