import React from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  View
} from 'react-native';

import moment from 'moment/min/moment-with-locales';

const DEFAULT_IMAGE =
  'https://aebrus.ru/local/templates/aeb2019en/img/contacts_image.jpg';
const PADDING = 14;

const Card = props => {
  const {
    navigation,
    deviceWidth,
    BAR_SPACE,
    data,
    height,
    width,
    locale
  } = props;
  const cardWidth = deviceWidth - PADDING - BAR_SPACE;

  moment.locale(locale);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Article', {
          itemId: data.id,
          otherParam: data
        });
      }}
      style={[styles.slide, { width: cardWidth, marginRight: BAR_SPACE }]}
    >
      <View
        style={{
          width: cardWidth,
          marginRight: BAR_SPACE
        }}
      >
        <Image
          source={{ uri: (data.img && data.img.preview[0]) || DEFAULT_IMAGE }}
          style={[styles.image, { width, height }]}
        />
        <Text numberOfLines={3} style={styles.title}>
          {data.name}
        </Text>
        <Text style={styles.date}>
          {moment(data.created * 1000).format('dddd, DD MMMM')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
