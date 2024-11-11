import { useState, useEffect } from 'react';
import {
    Button,
    Heading,
    Flex,
    View,
    Grid,
    Divider
} from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json';
import { type Schema } from '../amplify/data/resource';
import Week from './week/Week';
import { getNextWeek, getPreviousWeek, getWeekNumber } from './utils/date';
import NavigationButtons from './components/NavigationButtons';

// Extract the UserProfile type from Schema
type UserProfile = Schema['UserProfile']['type'];

Amplify.configure(outputs);

const client = generateClient<Schema>({
    authMode: 'userPool'
});

const now = new Date();
const currentWeekNumber = getWeekNumber(now);

export default function App() {
    const [userprofiles, setUserProfiles] = useState<UserProfile[]>([]);
    const { signOut } = useAuthenticator((context) => [context.user]);
    const [weekNumber, setWeekNumber] = useState<number>(currentWeekNumber);
    const [date, setDate] = useState<Date>(now);

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
        <Flex
            className="App"
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="70%"
            margin="0 auto"
        >
            <Heading level={1}>My Profile</Heading>

            <Divider />

            <Flex>
                <NavigationButtons goBack={goBack} goForward={goForward} />
            </Flex>

            <Week date={date} weekNumber={weekNumber} />

            <Flex>
                <NavigationButtons goBack={goBack} goForward={goForward} />
            </Flex>

            <Divider />

            <Grid
                margin="3rem 0"
                autoFlow="column"
                justifyContent="center"
                gap="2rem"
                alignContent="center"
            >
                {userprofiles.map((userprofile) => (
                    <Flex
                        key={userprofile.id || userprofile.email}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="2rem"
                        border="1px solid #ccc"
                        padding="2rem"
                        borderRadius="5%"
                        className="box"
                    >
                        <View>
                            <Heading level={3}>{userprofile.email}</Heading>
                        </View>
                    </Flex>
                ))}
            </Grid>

            <Divider />

            <Button onClick={signOut}>Sign Out</Button>
        </Flex>
    );
}
