import React, { Fragment } from "react";
import { theme } from "../core/themeProvider";

import Moment from "moment";
import Header from "../components/Header";
import Title from "../components/Title";
import FavoritesButton from "../components/FavoritesButton";
import ShareButton from "../components/ShareButton";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet
} from "react-native";

const data = {
  title: 'Reliable internet - a regulatory challenge For business',
  uri:
    'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
  date: new Date()
};

class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Fragment>
          <FavoritesButton onPress={() => navigation.navigate('Menu')} />
          <ShareButton onPress={() => navigation.navigate('Menu')} />
        </Fragment>
      ),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'transparent',
      }
    };
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <Fragment>
        <View style={{ height: 300 }}>
          <SafeAreaView style={styles.attribution}>
            <ImageBackground
              source={{
                uri:
                  "https://aebrus.ru/upload/iblock/1b6/whatsapp-image-2019_05_30-at-11.01.33.jpeg"
              }}
              style={{ width: "100%", height: 400 }}
            >
              <Text
                style={[
                  { position: "absolute", bottom: 0, color: "#fff" },
                  styles.title
                ]}
              >
                {data.title}
              </Text>
            </ImageBackground>
          </SafeAreaView>
        </View>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at urna ipsum. Mauris eu faucibus nulla. Fusce vel consectetur
                ipsum. Sed non erat sodales, finibus ligula vitae, facilisis
                neque. In fringilla massa leo, vehicula lobortis est efficitur
                eu. Praesent magna risus, suscipit at enim blandit, gravida
                pharetra sapien. Sed volutpat interdum varius. Vivamus
                tincidunt, neque ac aliquet viverra, turpis ex dignissim tellus,
                sit amet iaculis mi massa id nulla. Suspendisse rhoncus ultrices
                nibh. Aliquam aliquet, eros vitae sollicitudin semper, sem ipsum
                finibus turpis, sit amet sagittis libero metus nec tellus.
                Aenean molestie vestibulum maximus. Sed non tellus ac lorem
                vestibulum vulputate eu id ante. Maecenas diam massa, euismod
                nec gravida ac, porttitor at libero. Proin tellus enim,
                porttitor vel risus nec, congue vehicula felis. Fusce ut euismod
                dui. Nunc fringilla purus dui, in cursus eros mattis eu.
                Curabitur ut lacus nisl. Donec congue mattis dolor, non
                venenatis ante vestibulum eu. Aenean elementum, lorem nec tempus
                facilisis, erat justo facilisis nunc, et varius nibh velit vel
                mi. Cras id convallis est. Quisque accumsan condimentum
                placerat. Mauris fringilla tellus et ornare suscipit. Nullam
                venenatis, risus eget hendrerit scelerisque, purus lorem
                hendrerit ex, id lobortis turpis sapien nec ante. Integer
                consequat libero enim, non aliquet dui ornare ac. Fusce ac risus
                eget urna luctus elementum vel eget tortor. Suspendisse sagittis
                ornare odio. Proin ac odio ut urna iaculis placerat ultrices
                convallis quam. Aenean non feugiat turpis. Praesent at nisi in
                libero suscipit gravida. Sed vitae tincidunt eros, a tincidunt
                nulla. Ut porta turpis vel elit posuere aliquam. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; In hac habitasse platea dictumst. Quisque luctus at ante
                sit amet suscipit. Quisque a odio eu est maximus convallis.
                Praesent pulvinar vestibulum ullamcorper. Phasellus bibendum,
                purus ut interdum efficitur, dui sapien sollicitudin lectus, ut
                bibendum dui velit et lectus. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Phasellus
                tincidunt nisi ut hendrerit ornare. Mauris mollis ligula nec
                nulla luctus, sit amet tempor nulla varius. Mauris ornare
                tincidunt elit sed hendrerit. Donec ultrices convallis felis eu
                dictum. Cras sagittis vel ligula sed sodales. Aenean id purus ut
                sem mattis dictum vitae non est. Maecenas magna nisi, consequat
                ut elit tempus, aliquet ultrices sem. Aliquam sit amet nibh ut
                enim ornare lacinia. Morbi non mauris tortor. Maecenas accumsan
                turpis ac diam accumsan tempor non ac velit. Mauris eget
                ultricies lacus. Aenean magna ligula, venenatis eget dui sed,
                vestibulum dapibus mi. In ac porta leo. Nunc urna arcu,
                dignissim non euismod ac, tempor id ligula. Aenean id odio
                auctor mi ultrices elementum. Vestibulum vitae elit purus. Donec
                imperdiet lectus arcu, a fermentum erat vestibulum eget. Aenean
                a eros ornare, condimentum orci vel, efficitur risus. Vestibulum
                id rhoncus odio. Fusce vitae justo sit amet nibh blandit luctus.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 15,
    color: '#1E2432',
  },
  attribution: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 34,
    color: "#fff",
    paddingHorizontal: 14
  }
});

export default NewsScreen;
