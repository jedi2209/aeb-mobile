import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';

import { theme } from '../core/themeProvider';
import Header from '../components/Header';

import ThumbList from '../components/ThumbList';
import Moment from 'moment';

import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul.',
    'Aug',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'
  ],
  dayNames: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  dayNamesShort: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'en';

const dataFrom = [
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
    date: new Date()
  },
  {
    title: 'Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  }
];

const dataFromAjax = [
  {
    title: 'ajax Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  },
  {
    title: 'ajax Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
    date: new Date()
  },
  {
    title: 'ajax Reliable internet - a regulatory challenge For business',
    uri:
      'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
    date: new Date()
  }
];

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: Moment().format('dddd, DD MMMM'),
      dataForThumbList: dataFrom
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Header onPress={() => navigation.navigate('Menu')} title="Events" />
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 100 : 108
      }
    };
  };

  render() {
    const current = Moment().format('dddd, DD MMMM');

    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Calendar
              markedDates={{ [this.state.selected]: { selected: true } }}
              // Initially visible month. Default = Date()
              current={current}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              // minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                this.setState({ selected: day.dateString });
                // WTF ???
                this.setState({ dataForThumbList: dataFromAjax });
              }}
              // Handler which gets executed on day long press. Default = undefined
              // onDayLongPress={day => {
              //   alert('change date long', day);
              // }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'MMMM yyyy'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                // тут что-то нужно будет сделать? Может здесь загружать events?
              }}
              // Hide month navigation arrows. Default = false
              // hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={direction => <Arrow />}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              // disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={true}
              // Show week numbers to the left. Default = false
              // showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon left. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
            />
            <View style={styles.body}>
              <ThumbList
                navigation={this.props.navigation}
                data={this.state.dataForThumbList}
                type="events"
                title="Upcoming events"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    paddingLeft: 14
  }
});

export default EventsScreen;
