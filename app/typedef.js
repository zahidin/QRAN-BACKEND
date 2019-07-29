import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Query{
        queues: [Queue]
        lastQueue: Queue
        difference(number: String!): Number
        listQueue: [Queue]
        counter(number: String!): Number
    }
    type Mutation{
        addQueue(ip:String!,number:String!,time:String!): Status
        addOperator(number:String!): Queue
    }
    type Subscription {
        newQueue: Number
        newDifference(number: String!): Number
        newCounter: StatusCounter
        newQueues: [Queue]
    }
    type Queue{
        id:Int
        operator:String
        number:String
        time:String
        hash:String
    }
    type Status{
        success:Int
    }
    type Number{
        number:String
    }
    type StatusCounter{
        number:String
    }
   
`

export default typeDefs