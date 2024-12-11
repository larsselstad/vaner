import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient, Client } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json';
import { type Schema } from '../amplify/data/resource';
import Week from './week/Week';
import { getNextWeek, getPreviousWeek, getWeekNumber } from './utils/date';
import './App.css';
import Menu from './components/Menu';

Amplify.configure(outputs);

const client: Client<Schema> = generateClient<Schema>({
    authMode: 'userPool'
});

const today = new Date();
today.setHours(0, 0, 0, 0);
const currentWeekNumber = getWeekNumber(today);

const App: React.FC = () => {
    const [weekNumber, setWeekNumber] = useState<number>(currentWeekNumber);
    const [date, setDate] = useState<Date>(today);

    const goBack = () => {
        const newDate = getPreviousWeek(date);
        setDate(newDate);
        setWeekNumber(getWeekNumber(newDate));
    };

    const goForward = () => {
        const newDate = getNextWeek(date);
        setDate(newDate);
        setWeekNumber(getWeekNumber(newDate));
    };

    return (
        <main>
            <header>
                <h1 id="logo">Habits</h1>
                <Menu client={client} />
            </header>
            <section>
                <div id="week-nav">
                    <h2>Week {weekNumber}</h2>
                    <button
                        className="week-button"
                        id="week-back-button"
                        onClick={goBack}
                    >
                        &lt; Back
                    </button>
                    <button
                        className="week-button"
                        id="week-next-button"
                        onClick={goForward}
                    >
                        Next &gt;
                    </button>
                </div>
                <Week date={date} weekNumber={weekNumber} client={client} />
            </section>
        </main>
    );
};

export default App;
