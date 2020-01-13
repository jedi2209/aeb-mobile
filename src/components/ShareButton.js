import React from 'react';
import { theme } from '../core/themeProvider';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Share,
  View
} from 'react-native';
import ShareImage from '../images/share.svg';

class ShareButton extends React.Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        title: this.props.data.name + '\r\n\r\n' + this.props.data.url,
        message: this.props.data.name + '\r\n\r\n' + this.props.data.url,
        url: this.props.data.url
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onShare}>
        <View style={[this.props.style, theme.goBackButton]}>
          <ShareImage style={[style.close]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  close: {
    marginTop: 0,
    marginRight: 20,
    width: 20,
    height: 20,
    paddingHorizontal: 12,
    paddingVertical: 12
    // borderColor: '#FFFFFF',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderRadius: 100
  }
});

export default ShareButton;
