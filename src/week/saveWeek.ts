import { Client } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import { getAllDatesInWeek } from '../utils/date';
import { mergeDays } from '../utils/mergeDays';
import { DayObject } from './Week';

const fetchWeek = async (
    date: Date,
    weekNumber: number,
    client: Client<Schema>
): Promise<DayObject[]> => {
    const thisWeekDays = getAllDatesInWeek(date);

    const weekId = thisWeekDays[0].getTime().toString();

    // get week from database
    const { data: week } = await client.models.Week.get({
        id: weekId
    });

    // if week exists, merge with week days
    if (week) {
        const { data: dbDays } = await week.days();
        const mergedDays = mergeDays(thisWeekDays, dbDays, week.id);
        return mergedDays;
    } else {
        // if week does not exist, create week and return days
        await client.models.Week.create({
            id: weekId,
            weekNumber,
            year: date.getFullYear()
        });
        return thisWeekDays.map((date) => ({
            date,
            noChocolate: false,
            stretching: false,
            weekId
        }));
    }
};

export default fetchWeek;
