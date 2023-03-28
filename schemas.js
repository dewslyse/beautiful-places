import Joi from 'joi';

const placeSchema = Joi.object({
  place: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required().min(0)
  }).required()
});

export default placeSchema;