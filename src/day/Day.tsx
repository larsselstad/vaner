import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils/date';
import { DayObject } from '../week/Week';
import EmojiCheckbox from '../components/EmojiCheckbox';

import './Day.css';
import SaveButton from '../components/SaveButton';

const titles = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

interface DayProps {
    index: number;
    day: DayObject;
    isToday?: boolean;
    save: (day: DayObject, noChokolate: boolean, stretching: boolean) => void;
}

const Day: React.FC<DayProps> = ({ index, day, isToday, save }) => {
    const [saving, setSaving] = useState(false);
    const [noChokolate, setNoChokolate] = useState(
        day.noChocolate ? true : false
    );
    const [stretching, setStretching] = useState(day.stretching ? true : false);

    useEffect(() => {
        setNoChokolate(day.noChocolate ? true : false);
        setStretching(day.stretching ? true : false);
    }, [day]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        await save(day, noChokolate, stretching);
        setSaving(false);
    };

    const className = isToday ? 'day today' : 'day';

    return (
        <li className={className}>
            <h3>{titles[index]}</h3>
            <p className="day-date">{formatDate(day.date)}</p>
            <form onSubmit={onSubmit}>
                <fieldset className="day-fieldset">
                    <legend className="day-legend">
                        Have you done your goals today?
                    </legend>
                    <ul className="day-checkboxes">
                        <li>
                            <EmojiCheckbox
                                name="no_chokolate"
                                label="🍫"
                                checked={noChokolate}
                                onChange={() => setNoChokolate(!noChokolate)}
                            />
                        </li>
                        <li>
                            <EmojiCheckbox
                                name="stretching"
                                label="🧘‍♂️"
                                checked={stretching}
                                onChange={() => setStretching(!stretching)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <SaveButton
                    text="Save"
                    saving={saving}
                    savingText="Saving..."
                    saved={day.id ? true : false}
                    savedText="Saved"
                />
            </form>
        </li>
    );
};

export default Day;
