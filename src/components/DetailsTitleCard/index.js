import React from 'react';
import { Card, Chip, Divider } from 'react-native-paper';
import { Text } from '../Typography';
import { View } from 'react-native';
import colors from '../../theme/colors';
import PreviewImage from '../PreviewImage';

const DetailsTitleCard = ({
  title,
  description,
  tags,
  lastUpdatedAt,
  dateText,
  rightTitle,
  fileUrls,
}) => {
  return (
    <Card
      style={{
        marginTop: 8,
        borderRadius: 0,
        paddingTop: 8,
        paddingBottom: 16,
      }}>
      <Card.Title
        subtitle={title}
        subtitleStyle={{
          fontSize: 16,
          fontWeight: '700',
          lineHeight: 21,
          color: colors.text,
        }}
        subtitleNumberOfLines={2}
        right={() => (rightTitle ? rightTitle : null)}
        style={{ paddingLeft: 24, paddingRight: 24 }}
      />
      <Divider />
      <Card.Content
        style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 20 }}>
        <View style={{ marginTop: 12 }}>
          <Text>{description}</Text>
        </View>
        <View style={{ marginTop: 16, display: 'flex', flexDirection: 'row' }}>
          {tags &&
            tags.map((item, index) => (
              <Chip style={{ marginRight: 8 }} key={index}>
                {item}
              </Chip>
            ))}
        </View>
      </Card.Content>
      {fileUrls && fileUrls.length ? (
        <>
          <Divider />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              paddingBottom: 14,
              paddingLeft: 24,
              paddingRight: 24,
            }}>
            {fileUrls.map((item, index) => (
              <PreviewImage uri={item} index={index} key={index} />
            ))}
          </View>
        </>
      ) : null}
      <Divider />
      <Divider />
      <View
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 14,
          ...(fileUrls && fileUrls.length ? { paddingBottom: 14 } : null),
        }}>
        <Text>
          <Text style={{ color: colors.accent }}>{dateText}</Text>{' '}
          {lastUpdatedAt || '-'}
        </Text>
      </View>
    </Card>
  );
};

export default DetailsTitleCard;
