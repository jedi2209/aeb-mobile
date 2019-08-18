import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Moment from 'moment';

class CardMini extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.slide,
          {
            width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
          },
        ]}
      >
        <Image
          source={{ uri: this.props.data.uri }}
          style={[styles.image, { width: 64, height: 64, marginRight: 10 }]}
        />
        <View style={{width: this.props.deviceWidth - 64 - 10 - 15}}>
          <Text style={styles.title}>{this.props.data.title}</Text>
          <Text style={styles.date}>
            {Moment().format('MMMM Do, YYYY H:mma')}
          </Text>
        </View>
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
    flexDirection: "row"
  },
  image: {
    borderRadius: 4,
  },
  title: {
    fontSize: 17,
    color: '#000000',
    letterSpacing: 0.32,
    textAlign: 'left',
    lineHeight: 22,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 20,
  },
});

export default CardMini;
