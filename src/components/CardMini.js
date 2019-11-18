import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import moment from 'moment/min/moment-with-locales';

const DEFAULT_IMAGE =
  'https://aebrus.ru/local/templates/aeb2019en/img/contacts_image.jpg';
const PADDING = 14;

const CardMini = props => {
  const { deviceWidth, BAR_SPACE, data, locale } = props;
  const cardWidth = deviceWidth - PADDING - BAR_SPACE;
  const extraPadding = props.extraPadding
    ? parseInt(this.props.extraPadding, 10)
    : 0;

  moment.locale(locale);

  return (
    <View
      style={[
        styles.slide,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: cardWidth,
          paddingHorizontal: extraPadding ? extraPadding / 2 : 0,
          paddingTop: extraPadding ? 20 : 0
        }
      ]}
    >
      <Image
        source={{
          uri: (data.img && data.img.preview[0]) || DEFAULT_IMAGE
        }}
        style={styles.image}
      />
      <View
        style={{
          // математика: cardWidth - ширина изображения - отступ изображения
          width: cardWidth - 64 - 10
        }}
      >
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.date}>
          {moment(data.created * 1000).format('dddd, DD MMMM')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    borderBottomColor: '#D7D8DA',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 4
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 10,
    borderRadius: 4
  },
  title: {
    fontSize: 16,
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
  }
});

export default CardMini;
