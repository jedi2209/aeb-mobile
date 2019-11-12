import React from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  View
} from 'react-native';
import Moment from 'moment';

class Card extends React.Component {
  render() {
    const {
      navigation,
      deviceWidth,
      BAR_SPACE,
      data,
      height,
      width
    } = this.props;

    console.log(
      'card ===>',
      navigation,
      deviceWidth,
      BAR_SPACE,
      data,
      height,
      width
    );

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Article', {
            itemId: 86,
            otherParam: 'anything you want here'
          });
        }}
        style={[
          styles.slide,
          {
            width: deviceWidth - 14 - BAR_SPACE,
            marginRight: BAR_SPACE
          }
        ]}
      >
        <View
          style={{
            width: deviceWidth - 14 - BAR_SPACE,
            marginRight: BAR_SPACE
          }}
        >
          <Image
            source={{ uri: data.uri }}
            style={[styles.image, { width: width, height: height }]}
          />
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.date}>
            {Moment(data.created).format('MMMM Do, YYYY H:mma')}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    borderBottomColor: '#D7D8DA',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 20
  },
  image: {
    borderRadius: 4
  },
  title: {
    fontSize: 20,
    color: '#000000',
    letterSpacing: 0.25,
    textAlign: 'left',
    lineHeight: 32,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 17,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 22
  }
});

export default Card;
