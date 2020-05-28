import React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SubHeading, Text } from '../../../../components/Typography';
import colors from '../../../../theme/colors';
import { getTimeFromSeconds } from '../../../../utils';
import GenerateQrCode from '../../../../components/GenerateQrCode';

const AccessCard = ({ userDetails, handleQRCodePress }) => {
  const { hasAccess, entryTime, exitTime, userId } = userDetails;
  const date = new Date();

  return (
    <Card style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <SubHeading
            style={{ color: hasAccess ? colors.primary : colors.error }}>
            {hasAccess ? 'Access Granted' : 'Access Denied'}
          </SubHeading>
          <Text
            style={{
              color: hasAccess ? colors.text : colors.error,
              marginTop: 28,
              fontSize: 16,
              fontWeight: '700',
            }}>
            {date.toDateString()}
          </Text>
          {hasAccess && (
            <Text
              style={{
                color: colors.accent,
                fontSize: 16,
                fontWeight: '500',
                marginTop: 8,
              }}>
              {hasAccess
                ? `${getTimeFromSeconds(entryTime)} to ${getTimeFromSeconds(
                    exitTime,
                  )}`
                : 'No access'}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={() => handleQRCodePress()}>
          <View style={styles.qrCodeContainer}>
            <GenerateQrCode val={userId} size={70} />
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    paddingTop: 24,
  },
  qrCodeContainer: {
    height: 90,
    width: 90,
    borderRadius: 2,
    borderColor: colors.accent,
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default AccessCard;
