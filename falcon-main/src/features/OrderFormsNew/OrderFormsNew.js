import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {Formik} from 'formik';
import Loading from '../../components/Loading';
import NoResults from '../../components/NoResults';
import {colours, font, input} from '../../config';

const OrderFormsNew = () => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/customer-products', {});

  function handleSubmit(values) {
    const products = [];

    Object.entries(values).map(product =>
      product[1] ? products.push(product) : undefined,
    );

    if (products.length == 0) {
      Alert.alert('You must select at least one item');
    } else {
      navigation.navigate('OrderFormsNewDetails', {products});
    }
  }

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    if (data.count === 0) {
      return <NoResults title="No products found" />;
    }

    return (
      <>
        <ScrollView style={{flex: 1, padding: 5}}>
          <View
            style={{
              backgroundColor: 'white',
              paddingLeft: 10,
              height: '100%',
            }}>
            <Formik
              initialValues={{}}
              onSubmit={values => handleSubmit(values)}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <View>
                  {data.results.map((item, key) => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 20,
                        key: `item${key}`,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          paddingTop: 10,
                          key: `row${key}`,
                        }}>
                        <Text
                          style={{
                            fontFamily: font.fontFamily,
                            fontWeight: '400',
                            fontSize: 15,
                            color: 'black'
                          }}>
                          {item.productName}
                        </Text>
                        <Text
                          style={{
                            fontFamily: font.fontFamily,
                            fontSize: 12,
                            color: 'black'
                          }}>
                          £{item.productPrice}
                        </Text>
                      </View>

                      <View style={(key = `input${key}`)}>
                        <TextInput
                          style={[
                            input.textInputNarrow,
                            (key = `input2${key}`),
                          ]}
                          keyboardType="numeric"
                          onChangeText={handleChange(item.productID)}
                          value={values.fieldName}
                        />
                      </View>
                    </View>
                  ))}
                  <View style={{alignItems: 'center', marginBottom: 30}}>
                    <TouchableOpacity
                      style={input.button}
                      onPress={handleSubmit}>
                      <Text
                        style={{fontFamily: font.fontFamily, color: 'black'}}>
                        Next Step
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </>
    );
  }
};

export default OrderFormsNew;
