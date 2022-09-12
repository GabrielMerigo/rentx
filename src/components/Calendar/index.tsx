import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Calendar as CustomCalendar, DateData } from 'react-native-calendars';
import { useTheme } from 'styled-components';
import { generateInterval } from './generateInterval'

type MarkedDateProps = {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

type CalendarProps = {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}

type DayProps = {
  dateString: string;
  dayNumber: number;
  month: number;
  timestamp: string;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) =>
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color={theme.colors.shape}
        />
      }

      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}

      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 25,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      minDate={String(new Date())}
      firstDay={1}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export {
  Calendar,
  generateInterval
};

export type { DayProps, MarkedDateProps };
