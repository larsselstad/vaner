import { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { generateClient, Client } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json';
import { type Schema } from '../amplify/data/resource';
import Week from './week/Week';
import { getNextWeek, getPreviousWeek, getWeekNumber } from './utils/date';
import NavigationButtons from './components/NavigationButtons';

// Extract the UserProfile type from Schema
type UserProfile = Schema['UserProfile']['type'];

Amplify.configure(outputs);

const client: Client<Schema> = generateClient<Schema>({
    authMode: 'userPool'
});

const today = new Date();
today.setHours(0, 0, 0, 0);
const currentWeekNumber = getWeekNumber(today);

export default function App() {
    const [userprofiles, setUserProfiles] = useState<UserProfile[]>([]);
    const { signOut } = useAuthenticator((context) => [context.user]);
    const [weekNumber, setWeekNumber] = useState<number>(currentWeekNumber);
    const [date, setDate] = useState<Date>(today);

    useEffect(() => {
        fetchUserProfile();
    }, []);

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

    async function fetchUserProfile() {
        const result = await client.models.UserProfile.list();
        setUserProfiles(result.data);
    }

    return (
        <main>
            <header>
                <h1>Habits</h1>
                <nav>
                    <ul>
                        {userprofiles.map((userprofile) => (
                            <li>{userprofile.email}</li>
                        ))}
                        <li>
                            <button onClick={signOut}>Sign Out</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <section>
                <div>
                    <h2>Week {weekNumber}</h2>
                    <NavigationButtons goBack={goBack} goForward={goForward} />
                </div>
                <Week date={date} weekNumber={weekNumber} client={client} />
            </section>
        </main>
    );
}
