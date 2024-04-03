'use client';

import clsx from 'clsx';
import { differenceInDays, differenceInWeeks, format, startOfMonth } from 'date-fns';
import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { Calendar as ReactCalendar, CalendarProps } from 'react-calendar';
import { LooseValue, Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';

import { calendar, container, buttonWrapper, dot } from './Calendar.css';
import { Icon } from '../Icon';

interface Props extends Omit<CalendarProps, 'value' | 'onChange'> {
  value?: LooseValue;
  mark?: Array<Date | string>;
  className?: string;
  withModeChange?: boolean;
  onChange?: (date: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
  data: Array<Date | string>;
}

const Calendar = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { value, mark, className, withModeChange, onChange, data, ...rest } = props;

  const [isWeekMode, setIsWeekMode] = useState(false);

  return (
    <motion.div
      className={container}
      style={{ height: isWeekMode ? '11.6rem' : '100%' }}
      animate={{ height: isWeekMode ? '11.6rem' : '100%' }}
      transition={{ duration: 0.3 }}
    >
      {withModeChange && (
        <button className={buttonWrapper} onClick={() => setIsWeekMode((prev) => !prev)}>
          <Icon name="calendar" size={24} />
        </button>
      )}
      <ReactCalendar
        {...rest}
        ref={ref}
        value={value ?? new Date()}
        onChange={onChange}
        tileContent={({ date }) => (
          <TileContent date={date} mark={mark ?? [new Date()]} data={data} />
        )}
        formatDay={(_, date) => format(date, 'dd')}
        locale="ko-KO"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        nextLabel={<Icon name="next" size={24} />}
        prevLabel={<Icon name="back" size={24} />}
        calendarType="gregory"
        className={clsx(calendar, className)}
        maxDate={isWeekMode ? endOfWeek(value as Date) : undefined}
        minDate={isWeekMode ? startOfWeek(value as Date) : undefined}
        tileClassName={({ date }) => {
          if (!isWeekMode) {
            return 'monthmode';
          }

          const weekNumber = getWeekNumber(value as Date);
          const dday = differenceInDays(date, startOfWeek(value as Date));

          if (dday >= 0 && dday <= 6) {
            return isWeekMode ? `weekmode__${weekNumber}` : '';
          }
        }}
      />
    </motion.div>
  );
});

export default Calendar;

const TileContent = ({
  date,
  mark,
  data,
}: {
  date: Date;
  mark?: Array<Date | string>;
  data: Array<Date | string>;
}) => {
  const html = [];
  const isMarked = mark?.find((x: Date | string) => {
    return format(x, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  });

  data.forEach((item) => {
    const key = item instanceof Date ? item.toString() : `${item}`;

    if (format(item, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
      html.push(<div key={key} className={dot}></div>);
    }
  });

  if (isMarked) {
    html.push(<div key={Date.now()}></div>);
  }

  return <div>{html}</div>;
};

const startOfWeek = (date: Date) => {
  const start = new Date(date);

  start.setDate(date.getDate() - date.getDay());

  return start;
};

const endOfWeek = (date: Date) => {
  const end = new Date(date);

  end.setDate(date.getDate() - date.getDay() + 6);

  return end;
};

const getWeekNumber = (date: Date) => {
  const firstDayOfMonth = startOfMonth(date);
  const startOfFirstWeek = startOfWeek(firstDayOfMonth);

  return differenceInWeeks(date, startOfFirstWeek) + 1;
};
