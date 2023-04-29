import React, {useRef, useState, useEffect} from 'react';
import Signature from 'react-native-signature-canvas';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {colours, font} from '../config';

const MySignaturePad = ({text, setScrollEnabled, signatureHandler}) => {
  const ref = useRef();

  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    setHasSignature(hasSignature);
  }, [hasSignature]);

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = signature => {
    setHasSignature(true);
    signatureHandler(signature);
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('handleEmpty');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('handleClear');
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  const clearSignature = () => {
    ref.current.clearSignature();
    // params.signature = null;
    setHasSignature(false);

    console.log('clearSignature');
  };

  const style = `body,html { width: 500px; height: 280px}`;

  const clearButton = hasSignature ? (
    <TouchableOpacity
      style={{
        backgroundColor: '#e5e5e5',
        padding: 10,
        fontFamily: font.fontFamily,
        width: 100,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
        color: 'black'
      }}
      onPress={clearSignature}>
      <Text>Clear</Text>
    </TouchableOpacity>
  ) : null;

  return (
    <>
      <ScrollView
        style={{width: '100%', marginTop: 5}}
        onTouchStart={() => {
          setScrollEnabled(false);
        }}
        onTouchEnd={() => {
          setScrollEnabled(true);
        }}
        scrollEnabled={false}>
        <View style={{width: '100%', height: 300, backgroundColor: 'white'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                padding: 20,
                alignItems: 'center',
                fontFamily: font.fontFamily,
                fontWeight: '400',
                color: 'black'
              }}>
              Please Sign Below
            </Text>
            {clearButton}
          </View>

          <View
            onTouchStart={() => {
              setScrollEnabled(false);
            }}
            onTouchEnd={() => {
              setScrollEnabled(true);
            }}
            style={{width: '100%', height: 250, backgroundColor: 'yellow'}}>
            <Signature
              ref={ref}
              backgroundColor={'rgba(255,255,255,0)'}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onClear={handleClear}
              autoClear={false}
              descriptionText={text}
              webStyle={style}
              imageType={'image/png'}
              height={300}
              minWidth={3}
              androidHardwareAccelerationDisabled={true}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MySignaturePad;
