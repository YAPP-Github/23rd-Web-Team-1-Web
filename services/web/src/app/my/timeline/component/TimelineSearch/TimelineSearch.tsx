'use client';

import { Calendar, Spacing } from '@linker/lds';
import { Txt } from '@linker/lds';
import { colors } from '@linker/styles';
import { format } from 'date-fns';
import { useSetAtom } from 'jotai';
import { useState, useEffect } from 'react';

import { timelineItemWrapper, timelineMonthWrapper } from './TimelineSearch.css';
import { selectDateAtom } from '../../stores/store';
import { GetTimelineRes } from '../../types/schedule';
import TimelineItem from '../TimelineItem/TimelineItem';

const TimelineSearch = ({ schedules }: GetTimelineRes) => {
  const [date, setDate] = useState(new Date());
  const [dropdownClick, setDropdownClick] = useState(-1);
  const setAtomDate = useSetAtom(selectDateAtom);

  useEffect(() => {
    setAtomDate(format(date, 'yyyy-MM-dd'));
  }, [date, setAtomDate]);

  return (
    <>
      <Calendar
        value={date}
        onChange={(value) => {
          setDate(value as Date);
        }}
        withModeChange
      />
      <Spacing size={20} />
      <section className={timelineMonthWrapper}>
        <Txt typography="h7" fontWeight="bold" color={colors.black}>
          {format(date, 'M월')}
        </Txt>
      </section>
      <section className={timelineItemWrapper}>
        {schedules.map((item) => (
          <button key={item.scheduleId}>
            <TimelineItem
              scheduleId={item.scheduleId}
              profileImgUrl={item.profileImgUrl}
              title={item.title}
              startDateTime={item.startDateTime}
              endDateTime={item.endDateTime}
              contacts={item.contacts}
              color={item.color}
              description={item.description}
              dropdownClick={dropdownClick}
              setDropdownClick={setDropdownClick}
            />
          </button>
        ))}
      </section>
    </>
  );
};

export default TimelineSearch;
