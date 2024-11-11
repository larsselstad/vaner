import React, { useState } from 'react';
import {
    Button,
    Heading,
    View,
    Fieldset,
    CheckboxField,
    Text
} from '@aws-amplify/ui-react';
import { formatDate } from '../utils/date';

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
    date: Date;
    isToday?: boolean;
}

const Day: React.FC<DayProps> = ({ index, date, isToday }) => {
    const [saving, setSaving] = useState(false);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
        }, 2000);
    };

    const className = isToday ? 'day today' : 'day';

    return (
        <View className={className}>
            <Heading level={3}>{titles[index]}</Heading>
            <Text>{formatDate(date)}</Text>
            <form onSubmit={onSubmit}>
                <Fieldset
                    legend="Have you done your goals today?"
                    variation="plain"
                    direction="column"
                >
                    <CheckboxField label="No chokolate" name="no_chokolate" />
                    <CheckboxField label="Stretching" name="stretching" />
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
