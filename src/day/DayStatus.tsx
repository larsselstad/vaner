import React from 'react';
import { DayObject } from '../week/Week';

import './DayStatus.css';

interface DayStatusProps {
    day: DayObject;
}

const DayStatus: React.FC<DayStatusProps> = ({ day }) => {
    let emoji = '';
    if (day.noChocolate && day.stretching) {
        emoji = '🥳';
    } else if (!day.noChocolate && !day.stretching) {
        emoji = '💀';
    }

    return <li className="daystatus">{emoji}</li>;
};

export default DayStatus;
