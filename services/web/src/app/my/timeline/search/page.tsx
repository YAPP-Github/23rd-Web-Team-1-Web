'use client';
import { useAtomValue } from 'jotai';
import { NextPage } from 'next';

import TimelineSearch from '../component/TimelineSearch/TimelineSearch';
import { useGetSearchSchedule } from '../hooks/useGetSearchSchedule';
import { selectDateAtom } from '../stores/store';

const TimelineSearchPage: NextPage = () => {
  const selectedDate = useAtomValue(selectDateAtom);

  const startTime = `${selectedDate} 00:00:00`;
  const endTime = `${selectedDate} 23:59:59`;

  const { data: selectedData } = useGetSearchSchedule(startTime, endTime, 32);

  return <TimelineSearch schedules={selectedData.schedules} />;
};

export default TimelineSearchPage;
