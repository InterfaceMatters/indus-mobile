import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import commonStyles from '../../../theme/commonStyles';
import { fetchProtocolDetails } from '../../../operations/protocols';
import DetailsTitleCard from '../../../components/DetailsTitleCard';
import DetailsCard from './components/DetailsCard';
import Loader from '../../../components/Loader';

const ProtocolDetails = ({ route }) => {
  const [list, setProtocolDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedItem } = route.params;

  const fetchDetails = async () => {
    const result = await fetchProtocolDetails(selectedItem.id);
    setProtocolDetails(result);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchDetails();
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <ScrollView
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <DetailsTitleCard
        title={selectedItem.name}
        description={selectedItem.description}
        tags={selectedItem.tags}
        createdBy={selectedItem.createdBy}
        dateText="Updated on"
        lastUpdatedAt={
          selectedItem.updatedDate
            ? new Date(
                selectedItem.updatedDate.seconds * 1000,
              ).toLocaleDateString()
            : '-'
        }
      />
      {list &&
        list.map((item, index) => (
          <DetailsCard
            key={index}
            description={item.description}
            imageUrls={item.fileUrls}
          />
        ))}
    </ScrollView>
  );
};

export default ProtocolDetails;
