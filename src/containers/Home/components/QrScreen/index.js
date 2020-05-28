import React from 'react';
import { IconButton, Modal, Portal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { SubHeading } from '../../../../components/Typography';
import colors from '../../../../theme/colors';
import GenerateQrCode from '../../../../components/GenerateQrCode';

const QrScreen = ({ handleClose, visible, userId }) => (
  <Portal>
    <Modal
      visible={visible}
      onDismiss={handleClose}
      animationType="slide"
      contentContainerStyle={styles.containerStyle}>
      <View style={styles.qrCodeContainer}>
        <GenerateQrCode val={userId} size={200} />
      </View>
      <SubHeading style={{ fontWeight: '500', marginTop: 24 }}>
        Scan this QR code for workplace access before entering
      </SubHeading>
      <IconButton
        icon="close"
        style={{
          borderColor: colors.gray100,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 48,
        }}
        color={colors.text}
        size={30}
        onPress={() => handleClose()}
      />
    </Modal>
  </Portal>
);

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.surface,
    flex: 1,
    paddingLeft: 48,
    paddingRight: 48,
  },
  qrCodeContainer: {
    height: 280,
    width: 280,
    borderRadius: 2,
    borderColor: colors.gray100,
    borderWidth: 1,
    paddingTop: 40,
    paddingLeft: 40,
  },
});

export default QrScreen;
