module.exports =  function(sequelize, Sequelize) {
  const Todo = sequelize.define(
    "todo",
    {
      assign_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "It must have an assigned"
          }
        }
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "It must have a title"
          }
        }
      },
			content: {
				type: Sequelize.TEXT,
         validate: {
          notEmpty: {
            msg: "It must have content"
          }
        }
			},
      deadline_start: {
        type: Sequelize.DATE
      },
      deadline_end: {
        type: Sequelize.DATE
      },
      is_completed: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      underscored: true
    }
  );

  Todo.associate = (models) => {
    Todo.belongsTo(models.User);
    Todo.belongsTo(models.Project);
    Todo.belongsTo(models.User, {as: 'assigned', foreignKey : 'assign_id'});
    Todo.hasMany(models.Step);
    Todo.hasMany(models.Attachment);
  }

  return Todo;
}
