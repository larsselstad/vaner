import { mergeDays } from './mergeDays';
import { type Schema } from '../../amplify/data/resource';

type Day = Schema['Day']['type'];

describe('mergeDays', () => {
    it('should merge days correctly when dbDays is empty', () => {
        const thisWeekDays = [new Date('2023-10-01'), new Date('2023-10-02')];
        const dbDays: Day[] = [];
        const weekId = '12345';

        const result = mergeDays(thisWeekDays, dbDays, weekId);

        expect(result).toEqual([
            {
                date: thisWeekDays[0],
                noChocolate: false,
                stretching: false,
                weekId
            },
            {
                date: thisWeekDays[1],
                noChocolate: false,
                stretching: false,
                weekId
            }
        ]);
    });

    it('should merge days correctly when dbDays has matching dates', () => {
        const thisWeekDays = [new Date('2023-10-01'), new Date('2023-10-02')];
        const dbDays: Day[] = [
            createDay('2023-10-01', true, true),
            createDay('2023-10-02', false, true)
        ];
        const weekId = '12345';

        const result = mergeDays(thisWeekDays, dbDays, weekId);

        expect(result).toEqual([
            {
                date: thisWeekDays[0],
                noChocolate: true,
                stretching: true,
                weekId
            },
            {
                date: thisWeekDays[1],
                noChocolate: false,
                stretching: true,
                weekId
            }
        ]);
    });

    it('should merge days correctly when dbDays has non-matching dates', () => {
        const thisWeekDays = [new Date('2023-10-01'), new Date('2023-10-02')];
        const dbDays: Day[] = [createDay('2023-10-03', true, true)];
        const weekId = '12345';

        const result = mergeDays(thisWeekDays, dbDays, weekId);

        expect(result).toEqual([
            {
                date: thisWeekDays[0],
                noChocolate: false,
                stretching: false,
                weekId
            },
            {
                date: thisWeekDays[1],
                noChocolate: false,
                stretching: false,
                weekId
            }
        ]);
    });
});

const createDay = (
    date: string,
    noChocolate: boolean,
    stretching: boolean
): Day => ({
    date,
    noChocolate,
    stretching,
    // eslint-disable-next-line
    week: {} as any,
    id: 'some-id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
});
