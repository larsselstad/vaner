import { DayObject } from '../week/Week';
import { type Schema } from '../../amplify/data/resource';
import { formatDateISO } from './date';

export const mergeDays = (
    thisWeekDays: Date[],
    dbDays: Schema['Day']['type'][],
    weekId: string
): DayObject[] => {
    return thisWeekDays.map((date) => {
        const dbDay = dbDays.find(
            (dbDay) => dbDay.date === formatDateISO(date)
        );

        return {
            date,
            noChocolate: dbDay?.noChocolate ? true : false,
            stretching: dbDay?.stretching ? true : false,
            weekId,
            id: dbDay?.id
        };
    });
};
