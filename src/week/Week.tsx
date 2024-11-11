import React from 'react';
import Day from '../day/Day';
import { Heading, View } from '@aws-amplify/ui-react';
import { getAllDatesInWeek } from '../utils/date';

import './Week.css';

interface WeekProps {
    date: Date;
    weekNumber: number;
}

const Week: React.FC<WeekProps> = ({ date, weekNumber }) => {
    const days = getAllDatesInWeek(date);

    return (
        <View className="week">
            <Heading level={2}>Week {weekNumber}</Heading>
            {days.map((day, index) => (
                <Day
                    key={index}
                    index={index}
                    date={day}
                    isToday={day.getTime() === date.getTime()}
                />
            ))}
        </View>
    );
};

export default Week;
