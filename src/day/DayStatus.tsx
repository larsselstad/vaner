import React from 'react';
import { DayObject } from '../week/Week';
import classNames from 'classnames';

import './DayStatus.css';

interface DayStatusProps {
    day: DayObject;
}

const getEmoji = (day: DayObject): string => {
    if (!day.id) {
        return '';
    } else if (day.noChocolate && day.stretching) {
        return '🥳';
    } else if (!day.noChocolate && !day.stretching) {
        return '💀';
    }
    return '';
};

const DayStatus: React.FC<DayStatusProps> = ({ day }) => {
    return (
        <li
            className={classNames('daystatus', {
                'daystatus-saved': day.id,
                'daystatus-noChocolate-done': day.noChocolate,
                'daystatus-stretching-done': day.stretching
            })}
        >
            <span>{getEmoji(day)}</span>
        </li>
    );
};

export default DayStatus;
