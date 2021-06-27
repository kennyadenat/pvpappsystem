const slugify = require('slugify');
const models = require('../models');
const {
  check,
  param,
  validationResult
} = require('express-validator');

const {
  pvp_topic,
  pvp_subtopic,
  site_page,
  category
} = models;


const TopicValidation = {
  siteVal: [
    check('name')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('name cannot be empty')
    .isLength({
      min: 2,
      max: 244
    })
    .withMessage('name must be between 2 to 244 charaters long')
    .custom(async (name) => {
      const isExist = await site_page.findOne({
        where: {
          name: name
        },
        attributes: [
          'id',
          'name',
        ]
      });
      if (isExist) {
        throw new Error(`This name already exists.`);
      }
      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    }
  ],
  topicVal: [
    check('title')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('title cannot be empty')
    .isLength({
      min: 2,
      max: 244
    })
    .withMessage('title must be between 2 to 244 charaters long')
    .custom(async (title) => {
      const slugs = slugify(title, {
        lower: true
      });
      const isExist = await pvp_topic.findOne({
        where: {
          slug: slugs
        },
        attributes: [
          'id',
          'title',
        ]
      });
      if (isExist) {
        throw new Error(`This topic title already exists.`);
      }
      return true;
    }),
    check('overview')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('overview cannot be empty')
    .isLength({
      min: 2,
      max: 365
    })
    .withMessage('overview must be between 2 to 365 charaters long'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    }
  ],
  subtopicVal: [
    check('title')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('title cannot be empty')
    .isLength({
      min: 2,
      max: 244
    })
    .withMessage('title must be between 2 to 244 charaters long')
    .custom(async (title) => {
      const slugs = slugify(title, {
        lower: true
      });
      const isExist = await pvp_subtopic.findOne({
        where: {
          slug: slugs
        },
        attributes: [
          'id',
          'title',
        ]
      });
      console.log(isExist);
      if (isExist) {
        throw new Error(`This sub topic title already exists.`);
      }
      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    }
  ],
  catVal: [
    check('title')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('title cannot be empty')
    .isLength({
      min: 2,
      max: 244
    })
    .withMessage('title must be between 2 to 244 charaters long')
    .custom(async (title, body) => {
      console.log(body.req.body);
      const isExist = await category.findOne({
        where: {
          title: title,
          site_name_id: body.req.body.site_name_id
        },
        attributes: [
          'id',
          'title',
        ]
      });
      if (isExist) {
        throw new Error(`This category title already exists.`);
      }
      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    }
  ],
}

module.exports = TopicValidation