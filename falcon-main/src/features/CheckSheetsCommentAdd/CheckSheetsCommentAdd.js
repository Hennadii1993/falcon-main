import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import ManageImage from '../../components/ManageImage';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';
import { StackActions } from '@react-navigation/native';


const CheckSheetsCommentAdd = ({route}) => {
  const navigation = useNavigation();

  const popAction = StackActions.pop(2);

  const User = useUserStore();

  const params = route.params;

  const [imagesArray, setImagesArray] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async values => {
    
    setSubmitting(true);

    const requestBody = {
    //   latitude: '52.622175037756',
    //   longitude: '0.94407096593361',
      date: params.date,
      linkID: params.linkID,
      commentBody: values.comment,
      selectedPhoto: imagesArray[0],
    };

    const res = await sendRequest(
      '/api/checklist-comment-add',
      User.token,
      requestBody,
    );

    navigation.dispatch(popAction);

  };

  const loginValidationSchema = yup.object().shape({});

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            comment: '',
          }}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isValid,
            setFieldValue,
          }) => (
            <>
              <Text style={styles.label}>Add your comment</Text>
              <TextInput
                name="comment"
                style={input.textInputWorkComment}
                onChangeText={handleChange('comment')}
                onBlur={handleBlur('comment')}
                value={values.comment}
                multiline={true}
                numberOfLines={5}
              />

              <ManageImage
                setImagesArray={setImagesArray}
                imagesArray={imagesArray}
              />

              <View style={{alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                  style={!submitting ? input.button : [input.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={submitting}>
                  <Text
                    style={{fontFamily: font.fontFamily, fontWeight: '400', color: 'black'}}>
                    {submitting ? 'Saving comment' : 'Save comment'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  label: {
    fontFamily: font.fontFamily,
    fontWeight: '400',
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#f72d2d',
  },
  buttonOpenBlank: {
    backgroundColor: '#24B659',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
    fontFamily: font.fontFamily,
    color: 'black'
  },
});

export default CheckSheetsCommentAdd;
