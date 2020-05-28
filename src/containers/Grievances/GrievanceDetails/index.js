import React from 'react';
import { ScrollView, Image } from 'react-native';
import commonStyles from '../../../theme/commonStyles';
import icGrievanceFlag from '../../../icons/ic-grievance-flag.png';
import DetailsTitleCard from '../../../components/DetailsTitleCard';

const GrievanceDetails = ({ route }) => {
  const { selectedItem } = route.params;

  return (
    <ScrollView style={{...commonStyles.screenContainer, ...commonStyles.screenContainer2}}>
      <DetailsTitleCard
        rightTitle={
          <Image source={icGrievanceFlag} style={commonStyles.iconStyle} />
        }
        title={selectedItem.title}
        description={selectedItem.description}
        tags={selectedItem.tags}
        createdBy={selectedItem.createdByName}
        dateText="Created on"
        fileUrls={selectedItem.fileUrls}
        lastUpdatedAt={
          selectedItem.createdDate
            ? new Date(selectedItem.createdDate.seconds * 1000).toLocaleDateString()
            : '-'
        }
      />
    </ScrollView>
  );
};

export default GrievanceDetails;
