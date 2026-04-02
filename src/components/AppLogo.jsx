import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const logoImg = require('../../assets/cesizen-logo.png'); 

const AppLogo = ({ size = 100, style }) => {
  const dynamicStyle = {
    width: 200,
    height: 200,
  };

  return (
    <View style={[styles.container, style]}>
      <Image 
        source={logoImg} 
        style={[styles.image, dynamicStyle]} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
  },
});

export default AppLogo;