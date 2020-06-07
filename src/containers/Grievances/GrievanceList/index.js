import React, { useState, useEffect } from 'react';
import { FlatList, View, Image } from 'react-native';
import ListCard from '../../../components/ListCard';
import commonStyles from '../../../theme/commonStyles';
import { FAB } from 'react-native-paper';
import colors from '../../../theme/colors';
import { fetchAllGrievances } from '../../../operations/grievances';
import icGrievanceFlag from '../../../icons/ic-grievance-flag.png';
import Loader from '../../../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import EmptyComponent from "../../../components/EmptyComponent";

const GrievanceList = ({ navigation }) => {
  const [list, setGrievanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const fetchGrievanceList = async () => {
    const result = await fetchAllGrievances();
    setGrievanceList(result);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchGrievanceList();
    }
    isFocused ? fetchData() : null;
  }, [isFocused]);

  if (loading) return <Loader />;

  return (
    <>
      <View style={commonStyles.screenContainer}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <ListCard
              key={index}
              handlePress={() =>
                navigation.navigate('Grievance report', {
                  selectedItem: item,
                })
              }
              title={item.title}
              rightTitle={
                <Image
                  source={icGrievanceFlag}
                  style={commonStyles.iconStyle}
                />
              }
              leftContent={new Date(
                item.createdDate.seconds * 1000,
              ).toLocaleTimeString()}
              rightContent={new Date(
                item.createdDate.seconds * 1000,
              ).toLocaleDateString()}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            fetchGrievanceList();
          }}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>

      <FAB
        style={commonStyles.fab}
        icon="plus"
        color={colors.white}
        onPress={() => navigation.navigate('New grievance report')}
      />
    </>
  );
};

export default GrievanceList;
