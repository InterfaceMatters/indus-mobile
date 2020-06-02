import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { FlatList, View } from 'react-native';
import ListCard from '../../../components/ListCard';
import Loader from '../../../components/Loader';
import EmptyComponent from '../../EmptyComponent';
import colors from '../../../theme/colors';
import icBlock from '../../../icons/ic-block.png';
import icAllow from '../../../icons/ic-allow.png';
import { fetchAllEmployees } from '../../../operations/accessManagement';
import { FAB } from 'react-native-paper';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);

  const fetchEmployeeList = async () => {
    const employeeList = await fetchAllEmployees();
    setEmployeeList(employeeList);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchEmployeeList();
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <View style={commonStyles.screenContainer}>
        <FlatList
          data={employeeList}
          renderItem={({ item, index }) => (
            <ListCard
              handlePress={() => {
                console.log('Pressed.');
              }}
              key={index}
              leftIcon={item.hasAccess ? icAllow : icBlock}
              leftContent={item.name}
              leftStyle={{ color: colors.text, fontWeight: '700' }}
              rightContent={item.phoneNumber}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshing={loading}
          onRefresh={async () => {
            setLoading(true);
            await fetchEmployeeList();
          }}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>

      <FAB
        style={commonStyles.fab}
        icon="qrcode-scan"
        color={colors.white}
        onPress={() => null}
      />
    </>
  );
};

export default EmployeeList;
