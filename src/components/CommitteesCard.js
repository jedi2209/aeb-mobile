import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class CommitteesCard extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.slide,
          {
            // 14 это отсупы
            width: this.props.deviceWidth - 28 - this.props.BAR_SPACE
          }
        ]}
      >
        <View
          style={{
            width: this.props.deviceWidth - 28 - 28 - 70 - this.props.BAR_SPACE
          }}
        >
          <Text style={styles.title}>{this.props.data.name}</Text>
        </View>
        <Image
          source={{ uri: this.props.data.img.preview[0] }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.image, { width: 60, height: 60, marginLeft: 10 }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#fff',
    padding: 14,
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 }
  },
  image: {
    borderRadius: 4
  },
  title: {
    fontSize: 17,
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
  },
  commit: {
    color: '#007AFF',
    fontSize: 15
  }
});

export default CommitteesCard;
