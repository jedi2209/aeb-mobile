/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableHighlight
} from 'react-native';
import {DeviceWidth} from '../core/themeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../core/themeProvider';

class Plate extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress(link) {
    Linking.openURL(link);
  }

  renderPlate(person, customViewForTwo, padd) {
    const customViewStyle = StyleSheet.create({
      plateView: {
        // 12 это margin справа самого плейта и 8 паддинг на экранах
        width: Math.round(DeviceWidth / 2) - 12 - (padd || 8),
        paddingHorizontal: 2
      }
    });
    return (
      <TouchableHighlight
        key={'platePress' + person.id}
        underlayColor="transparent"
        onPress={() => {
          if (person.email) {
            return this.onPress(`mailto:${person.email}`);
          }
          return false;
        }}>
        <View
          key={'plateView' + person.id}
          style={[
            theme.cardBlock,
            theme.cardShadow,
            styles.plate,
            this.props.stylePlate,
            customViewForTwo ? customViewStyle.plateView : {}
          ]}>
          {person.name ? (
            customViewForTwo ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.plateTitle, {fontSize: 14}]}>
                {person.name}
              </Text>
            ) : (
              <Text style={[styles.plateTitle, {fontSize: 16}]}>
                {person.name}
              </Text>
            )
          ) : null}
          {person.company ? (
            customViewForTwo ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: '#0E4F9F',
                  fontSize: 11,
                  textAlign: 'center'
                }}>
                {person.company}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#0E4F9F',
                  fontSize: 11,
                  textAlign: 'center'
                }}>
                {person.company}
              </Text>
            )
          ) : null}
          {person.position ? (
            <Text style={styles.plateSubTitle}>{person.position}</Text>
          ) : null}
          {person.email ? (
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0
              }}>
              <Icon style={styles.icon} name="ios-mail" size={38} />
            </View>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let customViewForTwo = false;
    if (this.props.items.length === 2) {
      customViewForTwo = true;
    }
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View
          style={[
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 14,
              alignItems: 'center',
              justifyContent: 'space-between'
            },
            this.props.style
          ]}>
          {this.props.items.map(el => {
            if (el.name || el.position) {
              return this.renderPlate(el, customViewForTwo, this.props.padd);
            }
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  plate: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 15,
    marginRight: 12,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plateTitle: {
    color: '#000008',
    fontWeight: '500',
    paddingBottom: 5
  },
  plateSubTitle: {
    color: '#000008',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15
  },
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#0E4F9F'
  }
});

export default Plate;
