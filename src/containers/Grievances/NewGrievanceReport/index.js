import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, FlatList, View, Image } from 'react-native';
import commonStyles from '../../../theme/commonStyles';
import { Button, Checkbox, Chip, List, Surface } from 'react-native-paper';
import colors from '../../../theme/colors';
import MenuModal from '../../../components/MenuModal';
import { screenHeight } from '../../../utils';
import { fetchTags, submitGrievance } from '../../../operations/grievances';
import ImagePicker from 'react-native-image-picker';
import Loader from '../../../components/Loader';
import { RequiredError } from '../../../operations/utils';
import icAttachfile from '../../../icons/ic-attach-file.png';
import { Text } from '../../../components/Typography';

const options = {
  title: 'Upload Image',
  quality: 0.9,
  maxWidth: 1200,
  maxHeight: 1200,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const NewGrievanceReport = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);

  const handleSelectTag = item => {
    let updatedSelection = [];
    if (selectedTags.indexOf(item) !== -1) {
      updatedSelection = selectedTags.filter(checkedItem => {
        return item !== checkedItem;
      });
    } else {
      updatedSelection = selectedTags;
      updatedSelection.push(item);
    }
    setSelectedTags([...updatedSelection]);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetchTags();
      setTags([...result.list]);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const imageHandler = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response);
      }
    });
  };

  return (
    <View
      style={{
        ...commonStyles.screenContainer,
        ...commonStyles.screenContainer2,
      }}>
      <ScrollView>
        <TextInput
          style={{ ...commonStyles.textInput, backgroundColor: colors.surface }}
          placeholder="Grievance title *"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={{
            ...commonStyles.textInput,
            marginTop: 16,
            height: 'auto',
            backgroundColor: colors.surface,
          }}
          multiline
          numberOfLines={5}
          placeholder="Description *"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Button
          mode="contained"
          icon={() => (
            <Image source={icAttachfile} style={commonStyles.smallIcon} />
          )}
          labelStyle={{
            color: colors.primary,
          }}
          color={colors.white}
          style={{ marginTop: 16 }}
          uppercase={false}
          contentStyle={{
            height: 49,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          onPress={async () => {
            imageHandler();
          }}>
          <Text style={{ ...commonStyles.buttonLabel, color: colors.primary }}>
            Upload images or files
          </Text>
        </Button>

        <Button
          mode="contained"
          color={colors.white}
          style={{ marginTop: 16 }}
          uppercase={false}
          contentStyle={{
            height: 49,
            width: '100%',
            justifyContent: 'flex-start',
          }}
          onPress={async () => {
            setModalState(true);
          }}>
          <Text style={{ ...commonStyles.buttonLabel, color: colors.primary }}>
            Add tags
          </Text>
        </Button>
        {selectedTags && selectedTags.length ? (
          <Surface>
            <View
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                display: 'flex',
                flexDirection: 'row',
              }}>
              {selectedTags.map((item, index) => (
                <Chip style={{ marginRight: 8 }} key={index}>
                  {item}
                </Chip>
              ))}
            </View>
          </Surface>
        ) : null}

        <MenuModal
          title={'Select tags'}
          isModalVisible={modalState}
          handleMenuClose={() => setModalState(false)}>
          <FlatList
            data={tags}
            style={{ maxHeight: screenHeight - 140 }}
            renderItem={({ item }) => (
              <List.Item
                title={item}
                left={() => (
                  <Checkbox
                    status={
                      selectedTags.indexOf(item) !== -1
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleSelectTag(item)}
                    color={colors.primary}
                    theme={{ roundness: 0 }}
                  />
                )}
                onPress={() => handleSelectTag(item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </MenuModal>
      </ScrollView>

      <Button
        mode="contained"
        disabled={title === '' || description === ''}
        color={colors.primary}
        style={{ position: 'absolute', bottom: 0, left: 20, width: '100%' }}
        uppercase={false}
        contentStyle={{
          height: 49,
        }}
        onPress={async () => {
          if (title !== '' && description !== '') {
            setLoading(true);
            await submitGrievance({ title, description, file: image, tags });
            setLoading(false);
            navigation.goBack();
          } else {
            RequiredError();
          }
        }}>
        <Text style={{ ...commonStyles.buttonLabel, color: colors.white }}>
          Submit Grievance Report
        </Text>
      </Button>
    </View>
  );
};

export default NewGrievanceReport;
