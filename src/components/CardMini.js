import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import {theme} from '../core/themeProvider';

const DEFAULT_IMAGE =
  'https://aebrus.ru/local/templates/aeb2019en/img/contacts_image.jpg';
const PADDING = 14;

const CardMini = props => {
  const {data, locale, translate} = props;
  const cardWidth = props.width - PADDING * 2;
  moment.locale(locale);

  const toUpperdate = date => {
    date = date.toString().split('');
    date[0] = date[0].toUpperCase();
    return date;
  };

  return (
    <View
      style={[
        styles.slide,
        theme.CardShadow,
        {
          width: cardWidth,
          // paddingHorizontal: 14,
          paddingHorizontal: props.padding || 0
        }
      ]}>
      <Image
        source={{
          uri: (data.img && data.img.preview[0]) || DEFAULT_IMAGE
        }}
        style={styles.image}
      />
      <View
        style={{
          // математика: cardWidth - ширина изображения - отступ изображения
          width: cardWidth - 78 - (props.padding || 0)
        }}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.date}>
          {toUpperdate(
            moment((data.created || data.date) * 1000).format(
              translate ? translate('const.timeFormat') : 'dddd, DD MMMM YYYY'
            )
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 6
  },
  slideBorder: {
    borderBottomColor: '#D7D8DA',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 10,
    borderRadius: 6
  },
  title: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0.32,
    textAlign: 'left',
    lineHeight: 22,
    fontFamily: 'SFUIDisplay-Regular'
  },
  date: {
    fontSize: 15,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 20
  }
});

export default CardMini;
