const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const Todo = require('./todoType');

const Project = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    todos: {
      type: new GraphQLList(Todo),
        args: {
          where: { type: GraphQLJSON },
          order: { type: GraphQLJSON },
          limit: { type: GraphQLInt }
        },
      resolve(project, args) {
        // console.log(`$---------projects query todos-----------`);
        return project.getTodos(args);
      }
    }
  })
});

module.exports = Project;
