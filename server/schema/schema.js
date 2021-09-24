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
        startsAt: { type: GraphQLString },
        endsAt: { type: GraphQLString },
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
        appById: {
            type: AppType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return App.findById(args.id)
            }
        },
        stageById: {
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
        eventById: {
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
        },
        eventsBetweenDates: {
            type: new GraphQLList(EventType),
            args: {
                startTime: { type: GraphQLNonNull(GraphQLString) },
                endTime: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args) => {

                await Event.find({}).then((events) => {
                    args.startTime = Date.parse(args.startTime)
                    args.endTime = Date.parse(args.endTime)
                    let nameList = []

                    events.forEach(el => {

                        el.startsAt = Date.parse(el.startsAt)
                        el.endsAt = Date.parse(el.endsAt)
                        if (el.startsAt > args.startTime && el.endsAt < args.endTime) {
                            events.forEach(ev => {
                                if (ev.name == el.name) {
                                    nameList.push(ev.name)
                                }
                            })
                        }
                    })
                    console.log("1", nameList)
                    nList = nameList
                })

                console.log(nList.length)
                return Event.find({ name: nList })
            }
        },
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
                    startsAt: new Date(args.startsAt * 1000).toISOString().substring(0, 10),
                    endsAt: new Date(args.endsAt * 1000).toISOString().substring(0, 10),
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
                image: { type: new GraphQLNonNull(GraphQLString) },
                startsAt: { type: new GraphQLNonNull(GraphQLInt) },
                endsAt: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                args.startsAt = new Date(args.startsAt * 1000).toISOString().substring(0, 10),
                    args.endsAt = new Date(args.endsAt * 1000).toISOString().substring(0, 10)

                return Event.findByIdAndUpdate(args.id, args);
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});



