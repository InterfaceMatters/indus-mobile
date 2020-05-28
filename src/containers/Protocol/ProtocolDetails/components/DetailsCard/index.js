import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '../../../../../components/Typography';
import PreviewImage from "../../../../../components/PreviewImage";

const DetailsCard = ({ description, imageUrls }) => {
  return (
    <Card
      style={{
        marginTop: 8,
        borderRadius: 0,
        paddingTop: 16,
        paddingBottom: 16,
      }}>
      <Card.Content style={{ paddingLeft: 24, paddingRight: 24 }}>
        <View>
          <Text>{description}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {imageUrls &&
            imageUrls.map((item, index) => (
              <PreviewImage
                uri={item}
                key={index}
                index={index}
              />
            ))}
        </View>
      </Card.Content>
    </Card>
  );
};

export default DetailsCard;
