import React, { useState, useEffect } from 'react';
import { Client } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import Day from '../day/Day';
import { Heading, View } from '@aws-amplify/ui-react';
import { getAllDatesInWeek } from '../utils/date';
import { mergeDays } from '../utils/mergeDays';
import { formatDateISO } from '../utils/date';

import './Week.css';

export interface DayObject {
    date: Date;
    noChocolate: boolean;
    stretching: boolean;
    weekId: string;
}

interface WeekProps {
    date: Date;
    weekNumber: number;
    client: Client<Schema>;
}

const Week: React.FC<WeekProps> = ({ date, weekNumber, client }) => {
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState<DayObject[]>([]);

    useEffect(() => {
        const thisWeekDays = getAllDatesInWeek(date);

        const fetchWeek = async (thisWeekDays: Date[]) => {
            setLoading(true);

            const weekId = thisWeekDays[0].getTime().toString();
            // get week from database
            const { data: week } = await client.models.Week.get({
                id: weekId
            });

            // if week exists, set days
            if (week) {
                const { data: dbDays } = await week.days();
                const mergedDays = mergeDays(thisWeekDays, dbDays, week.id);
                setDays(mergedDays);
            } else {
                // if week does not exist, create week and set days
                await client.models.Week.create({
                    id: weekId,
                    weekNumber,
                    year: date.getFullYear()
                });
                setDays(
                    thisWeekDays.map((date) => ({
                        date,
                        noChocolate: false,
                        stretching: false,
                        weekId
                    }))
                );
            }
            setLoading(false);
        };

        fetchWeek(thisWeekDays);
    }, [date, weekNumber, client]);

    const saveDay = async (
        day: DayObject,
        noChocolate: boolean,
        stretching: boolean
    ) => {
        await client.models.Day.create({
            weekId: day.weekId,
            date: formatDateISO(day.date),
            noChocolate,
            stretching
        });
    };

    return (
        <View className="week">
            <Heading level={2}>Week {weekNumber}</Heading>
            {loading ? (
                <p>Loading...</p>
            ) : (
                days.map((day, index) => (
                    <Day
                        key={index}
                        index={index}
                        day={day}
                        isToday={day.date.getTime() === date.getTime()}
                        save={saveDay}
                    />
                ))
            )}
        </View>
    );
};

export default Week;
