import Knex from 'knex'
import dotenv from 'dotenv'
import { PubSub } from 'graphql-subscriptions';

dotenv.config()

export const connect = Knex({
    client:process.env.KNEX_CLIENT,
    connection:{
        host:process.env.HOST,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT
    }
})

export const pubsub = new PubSub();