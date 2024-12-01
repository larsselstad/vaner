import React, { useState, useEffect } from 'react';
import { Client } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import { useAuthenticator } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import './Menu.css';

// Extract the UserProfile type from Schema
type UserProfile = Schema['UserProfile']['type'];

interface Props {
    client: Client<Schema>;
}

const Menu: React.FC<Props> = ({ client }) => {
    const [userprofiles, setUserProfiles] = useState<UserProfile[]>([]);
    const { signOut } = useAuthenticator((context) => [context.user]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        fetchUserProfile();

        async function fetchUserProfile() {
            const result = await client.models.UserProfile.list();
            setUserProfiles(result.data);
        }
    }, [client.models.UserProfile]);

    return (
        <nav
            id="menu"
            className={classNames({
                'menu-expanded': showMenu
            })}
        >
            <button id="menu-button" onClick={() => setShowMenu(!showMenu)}>
                Menu
            </button>
            <ul className="list">
                {userprofiles.map(({ email }) => (
                    <li>{email}</li>
                ))}
                <li>
                    <button id="menu-signout" onClick={signOut}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};
export default Menu;
