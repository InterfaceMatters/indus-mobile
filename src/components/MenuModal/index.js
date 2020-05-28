import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Divider, IconButton, Menu } from 'react-native-paper';
import { IS_IOS, screenHeight, screenWidth } from '../../utils';
import colors from '../../theme/colors';

function MenuModal({
  isModalVisible,
  _hideModal,
  handleMenuClose,
  title,
  children,
  titleStyle,
}) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={handleMenuClose}>
      <View style={styles.modalCtr}>
        <View
          style={[styles.modalInnerCtr, { backgroundColor: colors.surface }]}>
          <View style={styles.menuHeader}>
            <Menu.Item title={title} style={titleStyle} />
            <IconButton icon="close" onPress={handleMenuClose} />
          </View>
          <Divider />
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalCtr: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalInnerCtr: {
    width: screenWidth,
    maxHeight: screenHeight - (IS_IOS ? 32 : 25),
    position: 'absolute',
    bottom: 0,
    borderRadius: 4,
  },
  menuHeader: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MenuModal;
