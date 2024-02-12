'use client';

import { Calendar, Spacing } from '@linker/lds';
import { Txt } from '@linker/lds';
import { colors } from '@linker/styles';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { timelineItemWrapper, timelineMonthWrapper } from './TimelineDefault.css';
import { TimelineItemProps, TimelineRes } from '../../types/schedule';
import TimelineItem from '../TimelineItem/TimelineItem';

const TimelineDefault = ({ schedules }: TimelineRes) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(false);
  const startDateYear = format(schedules[0].startDateTime, 'yyyy');
  const [prevYear, setPrevYear] = useState<TimelineItemProps[]>();
  const [nextYear, setNextYear] = useState<TimelineItemProps[]>();
  const [dropdownClick, setDropdownClick] = useState(-1);

  useEffect(() => {
    if (selectDate === true) {
      router.push(
        `/my/timeline/search?from=${`${format(date, 'yyyy-MM-dd')} 00:00:00`}&to=${`${format(date, 'yyyy-MM-dd')} 11:59:59`}&limit=32`,
      );
    }
  }, [selectDate]);

  // 받아온 데이터들 중 다른 연도가 있는지
  // 연도가 하나라도 다른게 판단이 되면 diffYear가 true가됨
  const hasDifferentYear = schedules.some((item) => {
    const formattedYear = format(item.startDateTime, 'yyyy');

    return formattedYear === startDateYear;
  });
  // 연도가 다른 원소의 첫번째 인덱스를 리턴
  const diffIdx = schedules.findIndex((item, index) => {
    return format(item.startDateTime, 'yyyy').toString() !== startDateYear.toString();
  });

  useEffect(() => {
    // prevYear에는 0부터 diffIdx-1까지의 원소 저장
    setPrevYear(schedules.slice(0, diffIdx));

    // nextYear에는 diffIdx부터 끝까지의 원소 저장
    setNextYear(schedules.slice(diffIdx));
  }, [diffIdx, hasDifferentYear, schedules]);

  return (
    <>
      <Calendar
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
      {!selectDate && hasDifferentYear === false && prevYear && nextYear && (
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
      )}
      {/*연도가 다르지 않은 경우 */}
      {!selectDate && hasDifferentYear === true && (
        <div>
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
        </div>
      )}
    </>
  );
};

export default TimelineDefault;
