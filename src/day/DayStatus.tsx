import React from 'react';
import { DayObject } from '../week/Week';
import classNames from 'classnames';

import './DayStatus.css';

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

// function to take Date as an input and return a string with 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'
const getDayName = (date: Date): string => {
    const days = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
    return days[date.getDay()];
};

interface DayStatusProps {
    day: DayObject;
}

const DayStatus: React.FC<DayStatusProps> = ({ day }) => {
    console.log(day);

    return (
        <li>
            <div
                className={classNames('daystatus', {
                    'daystatus-saved': day.id,
                    'daystatus-noChocolate-done': day.noChocolate,
                    'daystatus-stretching-done': day.stretching
                })}
            >
                <span>{getEmoji(day)}</span>
            </div>
            <div className="textalign-center">{getDayName(day.date)}</div>
        </li>
    );
};

export default DayStatus;
