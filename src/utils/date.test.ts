import {
    formatDate,
    getAllDatesInWeek,
    getWeekNumber,
    getPreviousWeek,
    getNextWeek
} from './date';

describe('formatDate', () => {
    test('formatDate for 2024-01-01', () => {
        const date = new Date('2024-01-01');
        expect(formatDate(date)).toBe('01.01.2024');
    });

    test('formatDate for 2024-12-31', () => {
        const date = new Date('2024-12-31');
        expect(formatDate(date)).toBe('31.12.2024');
    });
});

describe('getAllDatesInWeek', () => {
    test('getAllDatesInWeek for 2025-01-01', () => {
        const date = new Date('2025-01-01');
        const week = getAllDatesInWeek(date);
        expect(week.map(formatDate)).toEqual([
            '30.12.2024',
            '31.12.2024',
            '01.01.2025',
            '02.01.2025',
            '03.01.2025',
            '04.01.2025',
            '05.01.2025'
        ]);
    });

    test('getAllDatesInWeek for 2024-12-31', () => {
        const date = new Date('2024-12-31');
        const week = getAllDatesInWeek(date);
        expect(week.map(formatDate)).toEqual([
            '30.12.2024',
            '31.12.2024',
            '01.01.2025',
            '02.01.2025',
            '03.01.2025',
            '04.01.2025',
            '05.01.2025'
        ]);
    });
});

describe('getWeekNumber', () => {
    test('getWeekNumber for first week in 2024', () => {
        const date = new Date('2024-01-01');
        expect(getWeekNumber(date)).toBe(1);
    });

    test('getWeekNumber for last week in 2024', () => {
        const date = new Date('2024-12-30');
        expect(getWeekNumber(date)).toBe(1);
    });

    test('getWeekNumber for first week in 2025', () => {
        const date = new Date('2025-01-01');
        expect(getWeekNumber(date)).toBe(1);
    });
});

describe('getPreviousWeek', () => {
    test('getPreviousWeek for 2024-01-01', () => {
        const date = new Date('2024-01-01');
        expect(formatDate(getPreviousWeek(date))).toBe('25.12.2023');
    });

    test('getPreviousWeek for 2024-12-31', () => {
        const date = new Date('2024-12-31');
        expect(formatDate(getPreviousWeek(date))).toBe('24.12.2024');
    });
});

describe('getNextWeek', () => {
    test('getNextWeek for 2024-01-01', () => {
        const date = new Date('2024-01-01');
        expect(formatDate(getNextWeek(date))).toBe('08.01.2024');
    });

    test('getNextWeek for 2024-12-31', () => {
        const date = new Date('2024-12-31');
        expect(formatDate(getNextWeek(date))).toBe('07.01.2025');
    });
});
