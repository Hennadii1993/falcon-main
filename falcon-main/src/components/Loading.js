import * as React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

const Loading = () => {
  return <ActivityIndicator style={styles.loadingStyle} size="large" />;
};

const styles = StyleSheet.create({
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
