import React, { Fragment } from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Moment from 'moment';

class Card extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate("Article", {
            itemId: 86,
            otherParam: "anything you want here"
          });
        }}
        style={[
          styles.slide,
          {
            width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
            marginRight: this.props.BAR_SPACE,
          },
        ]}
      >
        <View
          style={{
            width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
            marginRight: this.props.BAR_SPACE
          }}
        >
          <Image
            source={{ uri: this.props.data.uri }}
            style={[
              styles.image,
              { width: this.props.width, height: this.props.height },
            ]}
          />
          <Text style={styles.title}>{this.props.data.title}</Text>
          <Text style={styles.date}>
            {Moment().format('MMMM Do, YYYY H:mma')}
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
    paddingBottom: 20,
  },
  image: {
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    color: '#000000',
    letterSpacing: 0.25,
    textAlign: 'left',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 17,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 22,
  },
});

export default Card;
