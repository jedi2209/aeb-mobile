import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Plate extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress(link) {
    // console.log('link', link);
    Linking.openURL(link);
  }

  renderPlate(person) {
    return (
      <TouchableHighlight
        key={'platePress' + person.id}
        onPress={person.email ? this.onPress(`mailto:${person.email}`) : null}>
        <View
          key={'plateView' + person.id}
          style={{
            borderRadius: 8,
            backgroundColor: '#fff',
            paddingHorizontal: 12,
            paddingTop: 15,
            // paddingBottom: 10,
            marginRight: 12,
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text
            style={{
              color: '#000008',
              fontSize: 16,
              fontWeight: '500',
              paddingBottom: 5
            }}>
            {person.name}
          </Text>
          <Text style={{color: '#0E4F9F', fontSize: 11}}>
            {person.position}
          </Text>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {person.email ? (
              <Icon style={styles.icon} name="ios-mail" size={38} />
            ) : null}
            {/* <Icon style={styles.icon} name="ios-phone-portrait" size={38} /> */}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 16,
            marginBottom: 8
          }}>
          {this.props.items.map(el => {
            if (el.name || el.position) {
              return this.renderPlate(el);
            }
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#0E4F9F'
  }
});

export default Plate;
