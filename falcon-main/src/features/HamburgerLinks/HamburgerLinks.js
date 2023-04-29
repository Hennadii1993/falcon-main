import * as React from 'react';
import {View, Text, FlatList, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colours, font, input} from '../../config';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const SiteRecords = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CraneCalculator')}>
          <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Crane calculator
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SaddleCranes')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Saddle jib tower cranes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LuffingCranes')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Luffing jib tower cranes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SelfErecting')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Self erecting tower cranes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TruckMounted')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Truck mounted cranes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PowerGeneration')}>
          <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Power generation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SprayBooth')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Spray booth
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Documents')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Documents
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
        <Text style={{padding: 10, fontFamily: font.fontFamily, color: 'black'}}>
            Contact us
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SiteRecords;
