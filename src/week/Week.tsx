import React, { useState, useEffect } from 'react';
import { Client } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import Day from '../day/Day';
import { formatDateISO } from '../utils/date';
import './Week.css';
import DayStatus from '../day/DayStatus';
import fetchWeek from './saveWeek';

export interface DayObject {
    date: Date;
    noChocolate: boolean;
    stretching: boolean;
    weekId: string;
    id?: string;
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
        setLoading(true);

        fetchWeek(date, weekNumber, client).then((days) => {
            setDays(days);
            setLoading(false);
        });
    }, [date, weekNumber, client]);

    const saveDay = async (
        day: DayObject,
        noChocolate: boolean,
        stretching: boolean
    ) => {
        if (day.id) {
            await client.models.Day.update({
                id: day.id,
                noChocolate,
                stretching
            });
        } else {
            await client.models.Day.create({
                weekId: day.weekId,
                date: formatDateISO(day.date),
                noChocolate,
                stretching
            });
        }
        setDays(await fetchWeek(date, weekNumber, client));
    };

    return (
        <div className="week">
            {loading ? (
                <p>Loading week {weekNumber}...</p>
            ) : (
                <>
                    <ul className="days-list">
                        {days.map((day, index) => (
                            <Day
                                key={index}
                                index={index}
                                day={day}
                                isToday={day.date.getTime() === date.getTime()}
                                save={saveDay}
                            />
                        ))}
                    </ul>
                    <ul>
                        {days.map((day, index) => (
                            <DayStatus day={day} key={index + '-daystatus'} />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Week;
