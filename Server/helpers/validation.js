import joi from 'joi';

const Validator = {
    userSchema: joi.object().keys({
        firstname: joi.string().regex(/^[a-zA-Z]/).min(2).required(),
        lastname: joi.string().regex(/^[a-zA-Z]/).min(2).required(),
        othername: joi.string().regex(/^[a-zA-Z]/),
        email: joi.string().email().required(),
        username: joi.string().regex(/^[a-zA-Z0-9_-]/).min(5).required(),
        phoneNumber: joi.string().regex(/\d{10}/),
        password: joi.string().min(8).required(),
        cpassword: joi.string().min(8).required(),
    }),
    questionSchema: joi.object().keys({
        title: joi.string().required(),
        body: joi.string().required(),


    }),
    loginSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    validationOption: {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    },
    rsvpSchema: joi.object().keys({
        answer: joi.string().required(),
    }),

};
export default Validator;