import React from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  View
} from 'react-native';

import moment from 'moment/min/moment-with-locales';
import { theme } from '../core/themeProvider';

const DEFAULT_IMAGE =
  'https://aebrus.ru/local/templates/aeb2019en/img/contacts_image.jpg';

const Card = props => {
  const { navigation, data, height, width, locale } = props;
  const cardWidth = width;

  moment.locale(locale);

  const toUpperdate = date => {
    date = date.toString().split('');
    date[0] = date[0].toUpperCase();
    return date;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Article', {
          itemId: data.id,
          otherParam: data
        });
      }}
      style={[styles.slide, theme.cardShadow, { width: cardWidth }]}
    >
      <View
        style={{
          width: cardWidth
        }}
      >
        <Image
          source={{ uri: (data.img && data.img.preview[0]) || DEFAULT_IMAGE }}
          style={[styles.image, { width: cardWidth, height }]}
        />
        <Text numberOfLines={3} style={styles.title}>
          {data.name}
        </Text>
        <Text style={styles.date}>
          {toUpperdate(moment(data.created * 1000).format('dddd, DD MMMM'))}
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
    lineHeight: 28,
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
