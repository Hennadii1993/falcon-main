import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {colours, font} from '../config';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Icon} from '@rneui/themed';

const ManageImage = ({setImagesArray, imagesArray}) => {
  function addImage(data) {
    setImagesArray(imagesArray => [...imagesArray, data]);
  }

  function imageDelete(key) {
    setImagesArray(imagesArray => imagesArray.filter((_, i) => i !== key));
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <>
      <View style={styles.fixToText}>
        <View
          style={{
            margin: 5,
            width: '40%',
            backgroundColor: '#f7f7f5',
            justifyContent: 'center',
            borderColor: '#e6e6e3',
            borderWidth: 0.5,
            borderRadius: 5,
          }}>
          <TouchableOpacity
            onPress={() => {

              launchImageLibrary(
                {
                  includeBase64: true,
                  selectionLimit: 1,
                  maxWidth: 1000,
                  maxHeight: 1000,
                  includeExtra: true
                },
                data => {
                  if (data.assets) {
                    data.assets.map(image => addImage(image.base64));
                  }
                },
              );
            }}>
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Icon name="image" type="feather" color="#fdc73e" />

              <Text
                style={{
                  marginLeft: 5,
                  color: 'black',
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  fontSize: 17,
                }}>
                Upload Photo
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            margin: 5,
            width: '40%',
            backgroundColor: '#f7f7f5',
            borderColor: '#e6e6e3',
            borderWidth: 0.5,
            borderRadius: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                requestCameraPermission();
              }

              try {
                launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: true,
                    maxWidth: 1000,
                    maxHeight: 1000,
                    includeExtra: true
                  },
                  data => {
                    if (data.assets) {
                      data.assets.map(image => addImage(image.base64));
                    }
                  },
                );
              } catch (err) {
                Alert.alert(err);
              }
            }}>
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Icon name="camera" type="feather" color="#fdc73e" />

              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  fontSize: 17,
                }}>
                Take Photo
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {imagesArray.map((title, key) => (
          <TouchableOpacity
            onPress={() => {
              imageDelete(key);
            }}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${title}`,
              }}
              style={{height: 110, width: 100, margin: 5}}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
    marginBottom: 8,
  },
});

export default ManageImage;
