const graphql = require('graphql');
const App = require('../models/app');
const Stage = require('../models/stage');
const Event = require('../models/event');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
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
                return Stage.findById(parent.stageId)
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parent, args) {
                return Stage.find({ appId: parent.id })
            }
        },
        event: {
            type: EventType,
            resolve(parent, args) {
                return Event.findById(parent.eventId)
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({ appId: parent.id })
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
                return App.findById(parent.appId)
            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parent, args) {
                return App.find({ stageId: parent.id })
            }
        },
        event: {
            type: EventType,
            resolve(parent, args) {
                return Event.findById(parent.eventId)
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({ stageId: parent.id })
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
        startsAt: { type: GraphQLInt },
        endsAt: { type: GraphQLInt },
        name: { type: GraphQLString },
        app: {
            type: AppType,
            resolve(parent, args) {
                return App.findById(parent.appId)
            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parent, args) {
                return App.find({ eventId: parent.id })
            }
        },
        stage: {
            type: StageType,
            resolve(parent, args) {
                return Stage.findById(parent.stageId)
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parent, args) {
                return Stage.find({ eventId: parent.id })
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
                return App.findById(args.id)
            }
        },
        stage: {
            type: StageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Stage.findById(args.id)
            }
        },
        stageByName: {
            type: StageType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return Stage.findOne({ name: args.name })
            }
        },
        event: {
            type: EventType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Event.findById(args.id)
            }
        },
        eventByName: {
            type: EventType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return Event.findOne({ name: args.name })
            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parent, args) {
                return App.find({})
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parent, args) {
                return Stage.find({})
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({})
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                stageId: { type: GraphQLID },
                eventId: { type: GraphQLID },

            },
            resolve(parent, args) {
                let app = new App({
                    name: args.name,
                    stageId: args.stageId,
                    eventId: args.eventId
                });
                return app.save();
            }
        },
        addStage: {
            type: StageType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                appId: { type: GraphQLID },
                eventId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let stage = new Stage({
                    name: args.name
                });
                return stage.save();
            }
        },
        addEvent: {
            type: EventType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                stageId: { type: new GraphQLNonNull(GraphQLString) },
                appId: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                startsAt: { type: new GraphQLNonNull(GraphQLInt) },
                endsAt: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let event = new Event({
                    name: args.name,
                    stageId: args.stageId,
                    appId: args.appId,
                    description: args.description,
                    image: args.image,
                    startsAt: args.startsAt,
                    endsAt: args.endsAt
                });
                return event.save();
            }
        },
        deleteApp: {
            type: AppType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return App.findByIdAndDelete(args.id);
            }
        },
        deleteStage: {
            type: StageType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Stage.findByIdAndDelete(args.id);
            }
        },
        deleteEvent: {
            type: EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Event.findByIdAndDelete(args.id);
            }
        },
        updateApp: {
            type: AppType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                stageId: { type: GraphQLID },
                eventId: { type: GraphQLID },
            },
            resolve(parent, args) {

                return App.findByIdAndUpdate(args.id, args);
            }
        },
        updateStage: {
            type: StageType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                appId: { type: GraphQLID },
                eventId: { type: GraphQLID },
            },
            resolve(parent, args) {

                return Stage.findByIdAndUpdate(args.id, args);
            }
        },
        updateEvent: {
            type: EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                appId: { type: GraphQLNonNull(GraphQLID) },
                stageId: { type: GraphQLNonNull(GraphQLID) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: graphql.GraphQLString },
                startsAt: { type: new GraphQLNonNull(graphql.GraphQLInt) },
                endsAt: { type: new GraphQLNonNull(graphql.GraphQLInt) }
            },
            resolve(parent, args) {

                return Event.findByIdAndUpdate(args.id, args);
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});




// var date = new Date(1577916000 * 1000)
// date.toUTCString()
// 'Wed, 01 Jan 2020 22:00:00 GMT'