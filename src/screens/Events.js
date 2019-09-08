import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

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
      selected: Moment().format('YYYY-MM-DD'),
      dataForThumbList: dataFrom
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Header onPress={() => navigation.navigate('Menu')} />
    };
  };

  render() {
    const current = Moment().format('YYYY-MM-DD');

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
                data={this.state.dataForThumbList}
                type="news"
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


// background: #FFFFFF;
// box-shadow: 0 2px 23px 0 #EDEDED;
// border-radius: 6px;
// font-family: Helvetica;
// font-size: 15px;
// color: #6B7897;
// letter-spacing: 0.59px;
// text-align: center;
// background: #4A90E2;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #E1E4E7;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #E1E4E7;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #FFFFFF;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #E1E4E7;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #E1E4E7;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 14.54px;
// color: #7C86A2;
// text-align: center;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// font-family: HelveticaNeue-Medium;
// font-size: 15.65px;
// color: rgba(52,72,94,0.54);
// text-align: center;
// line-height: 19.01px;
// background: #F7F8FC;
// border-radius: 70.59px;
// opacity: 0.26;
// transform: scaleX(-1) rotate(-92deg);
// background: #8C96AB;
// background: #F7F8FC;
// border-radius: 70.59px;
// opacity: 0.25;
// transform: rotate(-92deg);
// background: #8C96AB;