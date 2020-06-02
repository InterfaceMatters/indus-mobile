import React, { useState, useEffect } from 'react';
import commonStyles from '../../../theme/commonStyles';
import { TextInput, View } from 'react-native';
import Loader from '../../../components/Loader';
import colors from '../../../theme/colors';
import EmptyComponent from "../../../components/EmptyComponent";

const QRScanner = () => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <View
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <TextInput
        style={{ ...commonStyles.textInput, backgroundColor: colors.surface }}
        mode="outlined"
        keyboardType={'numeric'}
        placeholder="Phone number"
        value={phoneNumber}
        maxLength={10}
        onChangeText={text => setPhoneNumber(text)}
      />
      <EmptyComponent text={"OR"} style={{marginTop: 16}}/>

    </View>
  );
};

export default QRScanner;
