import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  NativeModules
} from 'react-native';

import { theme } from '../core/themeProvider';
import { API } from '../core/server';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import Moment from 'moment/min/moment-with-locales';

import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.eng = {
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
  today: 'Today'
};

LocaleConfig.locales.rus = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: [
    'янв.',
    'фев.',
    'мар',
    'апр',
    'май',
    'июн',
    'июл.',
    'авг',
    'сен.',
    'окт.',
    'ноя.',
    'дек.'
  ],
  dayNames: [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ],
  dayNamesShort: ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'],
  today: 'Сегодня'
};

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);

    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    this.lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';
    LocaleConfig.defaultLocale = this.lang;

    Moment.locale(this.props.screenProps.locale);

    this.state = {
      title: this.props.screenProps.translate('upcoming_events'),
      now: Moment().format('YYYY-MM-DD'),
      responsedData: [],
      selected: Moment().format('YYYY-MM-DD'),
      markedDates: {},
      params: {
        date_from: Moment().format('YYYY-MM-DD')
      }
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('events')}
        />
      ),
      headerStyle: [
        theme.headerShadow,
        {
          height: Platform.OS === 'ios' ? 60 : 68,
          borderBottomWidth: 0
        }
      ]
    };
  };

  async componentDidMount() {
    this.api = new API({ lang: this.lang, platform: Platform.OS });

    const data = await this._fetchMarkedDates(Moment().format('YYYY-MM'));

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      responsedData: data.responsedData,
      markedDates: Object.assign(data.markedDates, {
        [this.state.now]: { selected: true }
      })
    });
  }

  _fetchMarkedDates = async date => {
    const responsedData = await this.api.getAllEventsByMonth(date);

    const markedDates = responsedData.items
      ? responsedData.items.reduce((acc, item) => {
          acc[item] = { marked: true };
          return acc;
        }, {})
      : {};

    return {
      responsedData: responsedData.items,
      markedDates
    };
  };

  _changeMonth = async month => {
    const data = await this._fetchMarkedDates(`${month.year}-${month.month}`);

    this.setState({
      responsedData: data.responsedData,
      markedDates: Object.assign(data.markedDates)
    });
  };

  render() {
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Calendar
              markedDates={this.state.markedDates}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              // minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                // изначальные данные с сервера
                const responsedData = this.state.responsedData;
                const selectedDay = day.dateString;

                if (!responsedData.includes(selectedDay)) {
                  return;
                }

                // снова их приводим к сооответсвующему объекту
                const markedDates = responsedData
                  ? responsedData.reduce((acc, item) => {
                      acc[item] = { marked: true };
                      return acc;
                    }, {})
                  : {};

                // то что запишем в markedDates в итоге
                const calculated = Object.assign(markedDates, {
                  [selectedDay]: { selected: true }
                });

                let params;
                let title;

                if (selectedDay === this.state.now) {
                  params = {
                    date_from: selectedDay
                  };
                  title = this.props.screenProps.translate('upcoming_events');
                } else {
                  params = {
                    date_from: selectedDay,
                    date_to: selectedDay
                  };

                  title = `${this.props.screenProps.translate(
                    'upcoming_events_on'
                  )} ${Moment(selectedDay).format('DD MMMM YYYY')}`;
                }

                this.setState({
                  selected: selectedDay,
                  markedDates: calculated,
                  params,
                  title
                });
              }}
              // Handler which gets executed on day long press. Default = undefined
              // onDayLongPress={day => {
              //   alert('change date long', day);
              // }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'MMMM yyyy'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                this._changeMonth(month);
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
                paramsForFetch={this.state.params}
                translate={this.props.screenProps.translate}
                navigation={this.props.navigation}
                type="events"
                title={this.state.title}
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
