'use client';

import { Calendar, Spacing } from '@linker/lds';
import { Txt } from '@linker/lds';
import { colors } from '@linker/styles';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { timelineItemWrapper, timelineMonthWrapper } from './TimelineDefault.css';
import { useGetPrevSchedule, useGetUpComingSchedule } from '../../hooks/useGetNearSchedule';
import { useGetSearchSchedule } from '../../hooks/useGetSearchSchedule';
import { selectDateAtom } from '../../stores/store';
import { GetTimelineRes, TimelineItemProps } from '../../types/schedule';
import TimelineItem from '../TimelineItem/TimelineItem';

interface TimelineDefaultProps {
  prevData: GetTimelineRes;
  upComingData: GetTimelineRes;
}

const TimelineDefault = ({ prevData, upComingData }: TimelineDefaultProps) => {
  const router = useRouter();
  const setAtomDate = useSetAtom(selectDateAtom);
  const { prevTimelineData } = useGetPrevSchedule(prevData);
  const { upcomingTimelineData } = useGetUpComingSchedule(upComingData);
  const [schedules, setSchedules] = useState<TimelineItemProps[]>();

  useEffect(() => {
    const concatSchedules = [];

    concatSchedules.push(...prevTimelineData.schedules);
    concatSchedules.push(...upcomingTimelineData.schedules);

    const uniqueSchedules = [...new Set(concatSchedules)];

    setSchedules(uniqueSchedules);
  }, []);

  const [selectDate, setSelectDate] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [prevYear, setPrevYear] = useState<TimelineItemProps[]>();
  // const [nextYear, setNextYear] = useState<TimelineItemProps[]>();
  const [dropdownClick, setDropdownClick] = useState(-1);
  const [calendarDotData, setCalendarDotData] = useState<Array<Date | string>>([]);

  // const startDateYear = format(uniqueSchedules[0][0].startDateTime, 'yyyy');
  const firstDayOfMonth = format(startOfMonth(date), 'yyyy-MM-dd 00:00:00');
  const lastDayOfMonth = format(endOfMonth(date), 'yyyy-MM-dd 23:59:59');
  const { data } = useGetSearchSchedule(firstDayOfMonth, lastDayOfMonth, 32);

  // // 받아온 데이터들 중 다른 연도가 있는지
  // // 연도가 하나라도 다른게 판단이 되면 diffYear가 true가됨
  // const hasDifferentYear = uniqueSchedules[0].some((item) => {
  //   const formattedYear = format(item.startDateTime, 'yyyy');

  //   return formattedYear === startDateYear;
  // });
  // // 연도가 다른 원소의 첫번째 인덱스를 리턴
  // const diffIdx = uniqueSchedules[0].findIndex((item, index) => {
  //   return format(item.startDateTime, 'yyyy').toString() !== startDateYear.toString();
  // });

  // useEffect(() => {
  //   // prevYear에는 0부터 diffIdx-1까지의 원소 저장
  //   setPrevYear(uniqueSchedules[0].slice(0, diffIdx));

  //   // nextYear에는 diffIdx부터 끝까지의 원소 저장
  //   setNextYear(uniqueSchedules[0].slice(diffIdx));
  // }, [diffIdx, hasDifferentYear, concatSchedules]);

  useEffect(() => {
    setAtomDate(format(date, 'yyyy-MM-dd'));
  }, [date, router, setAtomDate]);
  useEffect(() => {
    if (selectDate) {
      router.push('/my/timeline/search');
    }
  }, [selectDate, router]);
  useEffect(() => {
    let tempData: Array<string | Date> = [];

    tempData = [...tempData, ...data.schedules.map((item) => item.startDateTime)];
    setCalendarDotData(tempData);
  }, []);

  return (
    <>
      <Calendar
        data={calendarDotData}
        value={date}
        onChange={(value) => {
          setSelectDate(true);
          setDate(value as Date);
        }}
        withModeChange
      />
      <Spacing size={20} />

      {/*특정 날짜를 선택하지 않은 경우 */}

      {/*연도가 다른 경우 */}
      {/* {!selectDate && hasDifferentYear === false && prevYear && nextYear && (
        <div>
          <section className={timelineMonthWrapper}>
            <Txt typography="h7" fontWeight="bold" color={colors.black}>
              12월
            </Txt>
          </section>
          <section className={timelineItemWrapper}>
            {prevYear.map((item) => (
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
          <section className={timelineMonthWrapper}>
            <Txt typography="h7" fontWeight="bold" color={colors.black}>
              {format(new Date(nextYear[0].startDateTime), 'yyyy년 M월')}
            </Txt>
          </section>
          <section className={timelineItemWrapper}>
            {nextYear.map((item) => (
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
        </div>
      )} */}
      {/*연도가 다르지 않은 경우 */}

      <div>
        <section className={timelineMonthWrapper}>
          <Txt typography="h7" fontWeight="bold" color={colors.black}>
            {format(date, 'M월')}
          </Txt>
        </section>
        <section className={timelineItemWrapper}>
          {schedules?.map((item) => (
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
      </div>
    </>
  );
};

export default TimelineDefault;
