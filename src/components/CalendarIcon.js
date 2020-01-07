/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CalendarIconSvg from '../images/calendarIcon.svg';
import { TouchableOpacity, View } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

import moment from 'moment';

const utcDateToString = momentInUTC => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;
};

class CalendarIcon extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.data.registration.active) {
              return;
            }

            const startDateUTC = moment(this.props.data.date * 1000);
            const regex = /(<([^>]+)>)/ig;

            const eventConfig = {
              title: this.props.data.name,
              startDate: utcDateToString(startDateUTC),
              endDate: utcDateToString(
                moment.utc(startDateUTC).add(2, 'hours')
              ),
              location: this.props.data.place.name,
              notes: this.props.data.text.replace(regex, ''),
              url: this.props.data.url
            };

            AddCalendarEvent.presentEventCreatingDialog(eventConfig)
              .then(eventInfo => {
                console.log(JSON.stringify(eventInfo));
              })
              .catch(error => {
                console.log('error', error);
              });
          }}
          style={{
            position: 'absolute',
            // right: 14,
            // top: -25,
            backgroundColor: '#FF2D55',
            borderRadius: 30,
            width: 50,
            height: 50,
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            shadowOpacity: 0.4,
            shadowRadius: 4,
            shadowColor: '#FF2D55',
            shadowOffset: { height: 1, width: 0 },
            elevation: 10
          }}
        >
          <CalendarIconSvg />
        </TouchableOpacity>
      </View>
    );
  }
}

export default CalendarIcon;
