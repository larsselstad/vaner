// format date to string dd.mm.yyyy
export const formatDate = (date: Date) => {
    return date.toLocaleDateString('no-NO');
};

// get today's date and return this week in an array from monday to sunday
export const getAllDatesInWeek = (date: Date): Date[] => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setDate(diff);
    const week = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
    return week;
};

// get this weeks number from Date
export const getWeekNumber = (date: Date): number => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d as any) - (yearStart as any)) / 86400000 + 1) / 7);
};
