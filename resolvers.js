export default {

    Query: {
        get: (parent, {key}, {redis}) => {
            try {
                return redis.get(key)
            } catch (error) {
                return null
            }
        }
    },

    Mutation: {
        set: async (parent, {key, value}, {redis}) => {
            try {
                await redis.set(key, value)
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        delete: async (parent, {key}, {redis}) => {
            try {
                await redis.del(key)
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }

}