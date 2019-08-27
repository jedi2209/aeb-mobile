import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class PublicationsCard extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.slide,
          {
            width: this.props.deviceWidth - 14 - this.props.BAR_SPACE
          }
        ]}
      >
        <View style={{ width: this.props.deviceWidth - 64 - 35 }}>
          <Text style={styles.title}>{this.props.data.title}</Text>
        </View>
        <Image
          source={{ uri: this.props.data.image }}
          style={[styles.image, { width: 63, height: 88, marginLeft: 10 }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    borderBottomColor: '#D7D8DA',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 20,
    flexDirection: 'row'
  },
  image: {
    borderRadius: 4
  },
  title: {
    fontSize: 17,
    color: '#000000',
    letterSpacing: 0.32,
    textAlign: 'left',
    lineHeight: 22,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 15,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 20
  },
  commit: {
    color: '#007AFF',
    fontSize: 15
  }
});

export default PublicationsCard;
