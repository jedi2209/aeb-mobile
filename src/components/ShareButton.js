import React from 'react';
import { theme } from '../core/themeProvider';
import { TouchableWithoutFeedback, StyleSheet, Share } from 'react-native';
import ShareImage from '../images/share.svg';

class ShareButton extends React.Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        url: 'https://aebrus.ru',
        message:
          'React Native | A framework for building native apps using React'
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
      <TouchableWithoutFeedback
        onPress={this.onShare}
        style={[this.props.style, theme.goBackButton]}
      >
        <ShareImage style={style.close} />
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  close: {
    marginTop: 10,
    marginRight: 20,
    width: 18,
    height: 18
  }
});

export default ShareButton;
