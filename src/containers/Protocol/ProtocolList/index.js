import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ListCard from '../../../components/ListCard';
import commonStyles from '../../../theme/commonStyles';
import { fetchAllProtocols } from '../../../operations/protocols';
import Loader from '../../../components/Loader';
import EmptyComponent from "../../EmptyComponent";

const ProtocolList = ({ navigation }) => {
  const [list, setProtocolList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProtocolList = async () => {
    const result = await fetchAllProtocols();
    setProtocolList(result);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchProtocolList();
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={commonStyles.screenContainer}>
      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <ListCard
            handlePress={() =>
              navigation.navigate('Protocol details', {
                selectedItem: item,
              })
            }
            key={index}
            title={item.name}
            leftContent={new Date(item.createdDate.seconds * 1000).toLocaleTimeString()}
            rightContent={new Date(
              item.createdDate.seconds * 1000,
            ).toLocaleDateString()}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          fetchProtocolList();
        }}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};

export default ProtocolList;
