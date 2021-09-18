const graphql = require('graphql');

const _ = require('lodash');

const App = require('../models/app');
const Stage = require('../models/stage');
const Event = require('../models/event')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql;

// var apps = [
//     { id: "1", stageId: "1", eventId: "1", name: "HipHopFest 2020" },
//     { id: "2", stageId: "2", eventId: "2", name: "jazz 2030" },
//     { id: "3", stageId: "3", eventId: "3", name: "classical 2021" }
// ]
// var stages = [
//     { id: "1", eventId: "1", appId: "1", name: "Rizzle" },
//     { id: "2", eventId: "2", appId: "2", name: "Tizzle" },
//     { id: "3", eventId: "3", appId: "3", name: "FoShizzle" }
// ]

// const events = [
//     {
//         id: "1",
//         appId: "1",
//         stageId: "1",
//         name: "Kanye West",
//         description: "Kanye Omari West is an American rapper, singer, songwriter, record producer, fashion designer, and entrepreneur.",
//         image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/KanyeWest.jpeg",
//         startsAt: 1577916000,
//         endsAt: 1577919600
//     },
//     {
//         id: "2",
//         appId: "1",
//         stageId: "2",
//         name: "Drake",
//         description: "Aubrey Drake Graham is a Canadian rapper, singer, songwriter, record producer, actor, and entrepreneur. Drake initially gained recognition as an actor on the teen drama television series Degrassi: The Next Generation in the early 2000s.",
//         "image": "http://assets.aloompa.com.s3.amazonaws.com/rappers/Drake.jpeg",
//         startsAt: 1577919600,
//         endsAt: 1577923200
//     },
//     {
//         id: "3",
//         appId: "1",
//         stageId: "3",
//         name: "Kendrick Lamar",
//         description: "Kendrick Lamar Duckworth is an American rapper and songwriter. Raised in Compton, California, Lamar embarked on his musical career as a teenager under the stage name K-Dot, releasing a mixtape that garnered local attention and led to his signing with indie record label Top Dawg Entertainment (TDE)",
//         image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/Kendrick.jpeg",
//         startsAt: 1577916000,
//         endsAt: 1577919600
//     },
//     {
//         id: "4",
//         appId: "1",
//         stageId: "1",
//         name: "Future",
//         description: "Nayvadius DeMun Wilburn, known professionally as Future, is an American rapper, singer, songwriter, and record producer.",
//         image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/Future.jpeg",
//         startsAt: 1577919600,
//         endsAt: 1577923200
//     },
//     {
//         id: "5",
//         appId: "1",
//         stageId: "2",
//         name: "J. Cole",
//         description: "Jermaine Lamarr Cole, better known by his stage name J. Cole, is an American hip hop recording artist and record producer.",
//         image: "http://assets.aloompa.com.s3.amazonaws.com/rappers/JCole.jpeg",
//         startsAt: 1577923200,
//         endsAt: 1577930400
//     }
// ]

const AppType = new GraphQLObjectType({
    name: 'App',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        stage: {
            type: StageType,
            resolve(parent, args) {
                // return _.find(stages, { id: parent.stageId })
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parent, args) {
                // return _.filter(stages, { appId: parent.id })
            }
        },
        event: {
            type: EventType,
            resolve(parent, args) {
                // return _.find(events, { id: parent.eventId })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                // return _.filter(events, { appId: parent.id })
            }
        }
    })
});

const StageType = new GraphQLObjectType({
    name: 'Stage',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        app: {
            type: AppType,
            resolve(parent, args) {
                // return _.find(apps, { id: parent.appId })
            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parent, args) {
                // return _.filter(apps, { stageId: parent.id })
            }
        },
        event: {
            type: EventType,
            resolve(parent, args) {
                // return _.find(events, { id: parent.eventId })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                // return _.filter(events, { stageId: parent.id })
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        appId: { type: GraphQLID },
        stageId: { type: GraphQLID },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        startsAt: { type: GraphQLString },
        endsAt: { type: GraphQLString },
        name: { type: GraphQLString },
        app: {
            type: AppType,
            resolve(parent, args) {
                // return _.find(apps, { id: parent.appId })
            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parent, args) {
                // return _.filter(apps, { stageId: parent.id })
            }
        },
        stage: {
            type: StageType,
            resolve(parent, args) {
                // return _.find(stages, { id: parent.stageId })
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parent, args) {
                // return _.filter(stages, { appId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        app: {
            type: AppType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(apps, { id: args.id });
            }
        },
        stage: {
            type: StageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(stages, { id: args.id });
            }
        },
        event: {
            type: EventType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(events, { id: args.id });
            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parent, args) {
                // return apps
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parent, args) {
                // return stages
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                // return events
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addApp: {
            type: AppType,
            args: {
                name: { type: GraphQLString }

            },
            resolve(parent, args) {
                let app = new App({
                    name: args.name
                });
                return app.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});