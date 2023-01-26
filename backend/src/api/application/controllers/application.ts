/**
 * application controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::application.application', ({strapi}): {} => ({
  async create(ctx){
    const { topic } = ctx.request.body.data;

    // Check if topic is given
    if(!topic){
      return ctx.badRequest("Please type in a topic id.")
    }

    // check if application is already created for this topic
    const applicationForTopic = await strapi.service('api::application.application').find({
      filters: {
        $and: [
          { student: ctx.state.user.id }, // does application belong to the use
          { topic } // and does it belong to the given topic
        ]
      }
    })

    // @ts-ignore
    if(applicationForTopic.pagination.total){
      return ctx.badRequest("You already applied to this topic.");
    }

    // fetch topic
    const topicEntity = await strapi.service('api::topic.topic').findOne(topic, {populate: 'student'});

    // check if topic exists
    if(!topicEntity){
      return ctx.badRequest("Topic does not exist.")
    }

    // check if topic is already assigned to a user
    if(topicEntity.student){
      return ctx.badRequest("Topic is already assigned to a student.")
    }

    // Append id of the user to the application. Only authenticated user can access this controller
    ctx.request.body.data.student = ctx.state.user.id;

    return await super.create(ctx);
  },

  async find(ctx){
    const { user } = ctx.state;

    // if user is a student then only return his applications
    if(user.role.name === "student"){
      if(!ctx.query.filters){
        ctx.query.filters = {}
      }

      ctx.query.filters.student = {
        id: {
          $eq: user.id
        }
      }
    }

    return await super.find(ctx);
  },

  async findOne(ctx){
    const { user } = ctx.state;
    ctx.query.populate = 'student';

    const { data, meta } = await super.findOne(ctx);

    // check if user is a student and if he owns the application
    if(user.role.name === "student" && data.attributes?.student.data?.id !== user.id){
      return ctx.notFound("Application was not found");
    }

    delete data.attributes?.student

    return { data, meta }
  }
}));
