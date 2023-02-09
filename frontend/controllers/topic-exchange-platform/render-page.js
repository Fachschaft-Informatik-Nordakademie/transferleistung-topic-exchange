const {Strapi} = require("../../services");

module.exports = async (req, res, next) => {
    const page = req.query.page || 1;
    const search = req.query.search;
    const moduleId = req.query.moduleId;
    const jwt = req.session.auth.jwt;

    const populateOptions = [
        'difficulty',
        'module',
        'module.color'
    ]

    const sortOptions = 'publishedAt:desc'

    const paginationOptions = {
        page: page,
        pageSize: 15,
    }

    const filterOptions = {
        student: {
            id: {
                $null: true
            }
        },
        title: {
            $contains :search
        },
        module: {
            id: {
                $eq: moduleId
            }
        }
    }

    const queryObject = {}
    queryObject['pagination'] = paginationOptions;
    queryObject['populate'] = populateOptions;
    queryObject['sort'] = sortOptions;
    queryObject['filters'] = filterOptions;

    const strapi = new Strapi(jwt);
    const topics = await strapi.getTopics(queryObject);
    const modules = await strapi.getModules({
        sort: 'name:asc'
    });

    res.render('topics/list-with-sidebar', {topics, search, moduleId, modules});
}
