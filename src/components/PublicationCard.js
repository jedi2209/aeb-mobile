import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import { theme } from '../core/themeProvider';

class PublicationsCard extends React.Component {
  render() {
    const extraPadding = this.props.extraPadding
      ? parseInt(this.props.extraPadding, 10)
      : 0;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(this.props.data.file[0]);
        }}
      >
        <View
          style={[
            theme.cardBlock,
            theme.cardShadow,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
              paddingHorizontal: extraPadding ? extraPadding / 2 : 0,
              paddingTop: extraPadding ? 20 : 0,
              marginLeft: 14
            }
          ]}
        >
          <View
            style={{
              width: this.props.deviceWidth - 64 - 35 - (extraPadding || 0)
            }}
          >
            <Text style={styles.title}>{this.props.data.name}</Text>
          </View>
          <Image
            source={{ uri: this.props.data.img.preview[0] }}
            style={[styles.image, { width: 63, height: 88, marginLeft: 10 }]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 4
  },
  title: {
    fontSize: 17,
    color: '#000000',
    letterSpacing: 0.32,
    textAlign: 'left',
    lineHeight: 22
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
