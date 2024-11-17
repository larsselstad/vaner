import React, { useEffect, useState } from 'react';
import {
    Button,
    Heading,
    View,
    Fieldset,
    CheckboxField,
    Text
} from '@aws-amplify/ui-react';
import { formatDate } from '../utils/date';
import { DayObject } from '../week/Week';

import './Day.css';

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
        <View className={className}>
            <Heading level={3}>{titles[index]}</Heading>
            <Text>{formatDate(day.date)}</Text>
            <form onSubmit={onSubmit}>
                <Fieldset
                    legend="Have you done your goals today?"
                    variation="plain"
                    direction="column"
                >
                    <CheckboxField
                        label="No chokolate"
                        name="no_chokolate"
                        onChange={() => setNoChokolate(!noChokolate)}
                        checked={noChokolate}
                    />
                    <CheckboxField
                        label="Stretching"
                        name="stretching"
                        onChange={() => setStretching(!stretching)}
                        checked={stretching}
                    />
                </Fieldset>
                <Button
                    variation="primary"
                    isLoading={saving}
                    loadingText="Saving..."
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </View>
    );
};

export default Day;
