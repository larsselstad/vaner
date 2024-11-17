import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from '../auth/post-confirmation/resource';

const schema = a
    .schema({
        UserProfile: a
            .model({
                email: a.string(),
                profileOwner: a.string()
            })
            .authorization((allow) => [allow.ownerDefinedIn('profileOwner')]),
        Day: a
            .model({
                noChocolate: a.boolean(),
                stretching: a.boolean(),
                date: a.date().required(),
                weekId: a.id(),
                week: a.belongsTo('Week', 'weekId')
            })
            .authorization((allow) => [allow.ownerDefinedIn('profileOwner')]),
        Week: a
            .model({
                weekNumber: a.integer(),
                year: a.integer(),
                days: a.hasMany('Day', 'weekId')
            })
            .authorization((allow) => [allow.ownerDefinedIn('profileOwner')])
    })
    .authorization((allow) => [allow.resource(postConfirmation)]);
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 30
        }
    }
});
