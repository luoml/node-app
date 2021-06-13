if (process.env.NODE_ENV == "PRODUCTION") {
    module.exports = {mongoURL: "mongodb+srv://nodeapp:nodeapp2021@cluster0.jdqvn.mongodb.net/nodeapp?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURL: "mongodb://localhost/node-app"}
}