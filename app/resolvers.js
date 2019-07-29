import {connect,pubsub} from './connection'
import {encrypt} from './commons/hash'

const resolvers = {
    Subscription:{
        newQueue:{
            resolve:(payload) => {
                return payload.number
            },
            subscribe:() => pubsub.asyncIterator('NEW_QUEUE')
        },
        newDifference:{
            resolve:async (payload,args) => {
                const resultQuery = await connect('queues').where('operator','0').orderBy('number')
                const resultOperator = await connect('queues').where('number',args.number)

                if(resultOperator[0]){
                    pubsub.publish('NEW_COUNTER', {  
                        number:resultOperator[0].operator,
                    })
                }

                if(resultQuery[0]){
                    let difference = parseInt(args.number) - parseInt(resultQuery[0].number)
                    return difference.toString()
                }else{
                    return null
                }
            },
            subscribe:() => pubsub.asyncIterator('NEW_DIFFERENCE')
        },
        newQueues:{
            resolve:async (payload) => {
                return payload
            },
            subscribe:() => pubsub.asyncIterator('NEW_QUEUES')
        },
        newCounter:{
            resolve:async (payload) => {
                return payload
            },
            subscribe:() => pubsub.asyncIterator('NEW_COUNTER')
        }
    },
    Query:{
        queues: async () => {
            const results = await connect('queues').where('operator','0').orderBy('number')
            return results
        },
        counter: async (_,args) => {
            const results = await connect('queues').where('number',args.number)
            return results[0].operator
        },
        listQueue: async () => {
            const results = await connect('queues').where('operator','0').orderBy('number')
            return results
        },
        lastQueue: async () => {
            const results = await connect('queues').orderBy('number')
            return results[results.length -1]
        },
        difference: async (_,args) => {
            const results = await connect('queues').where('operator','0').orderBy('number')
            let difference = parseInt(args.number) - parseInt(results[0].number)
            return difference.toString()
        }
    },
    Status:{
        success:(parentValue) => {
            return parentValue.rowCount
        }
    },
    Number:{
        number:(parentValue) => {
            return parentValue
        }
    },
    Mutation:{
        addQueue: async (parentValue,args) => {
            const text = `${args.ip}`
            let hash = await encrypt(text)
            const results = await connect('queues').insert({
                operator:0,
                number:args.number,
                time:args.time,
                hash,
            }) 

            const resultsNewQueue = await connect('queues').where('operator','0').orderBy('number').limit(5)

            pubsub.publish('NEW_QUEUES',resultsNewQueue)
            pubsub.publish('NEW_QUEUE', {  
                number:args.number,
            })

            return results
        },
        addOperator:async (parentValue, args) => {
            let resultQueue = await connect('queues').where('operator','0').orderBy('number')

            if(resultQueue.length !== 0){
                const result = await connect('queues').where('number',resultQueue[0].number).update({
                    operator:args.number
                })
                const resultsNewQueue = await connect('queues').where('operator','0').orderBy('number').limit(5)

                if(result === 1){
                    resultQueue[0].operator = args.number
                    pubsub.publish('NEW_DIFFERENCE', {  
                        number:resultQueue[0].number,
                    })
                    pubsub.publish('NEW_QUEUES',resultsNewQueue)
                    return resultQueue[0]
                }
            }else{
                return []
            }

        }
    }
}

export default resolvers