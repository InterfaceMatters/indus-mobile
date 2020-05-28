import React, { useState } from 'react';
import { Menu, IconButton, Divider } from 'react-native-paper';
import { ScrollView, View, Image, TouchableOpacity, Modal } from 'react-native';
import { screenHeight, screenWidth } from '../../utils';
import commonStyles from '../../theme/commonStyles';
import colors from '../../theme/colors';

const PreviewImage = ({ uri, index }) => {
  const [previewImage, setPreview] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setPreview(true)}>
        <Image source={{ uri }} key={index} style={commonStyles.imageStyle} />
      </TouchableOpacity>
      {previewImage ? (
        <Modal
          key={index}
          transparent
          animationType="fade"
          visible={previewImage}
          onRequestClose={() => setPreview(false)}>
          <ScrollView removeClippedSubviews={true}>
            <View
              style={[
                {
                  backgroundColor: colors.surface,
                  flex: 1,
                  height: screenHeight,
                },
              ]}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Menu.Item title={'Preview'} />
                <IconButton icon="close" onPress={() => setPreview(false)} />
              </View>
              <Divider />
              <View
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
                  paddingBottom: 8,
                }}>
                <Image
                  source={{ uri }}
                  style={{
                    height: screenHeight - 92,
                    width: screenWidth - 32,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
      ) : null}
    </>
  );
};

export default PreviewImage;
