import getUsers, {
    saveUser
} from '../models/user';
const signup = (req, res) => {

    const {
        email,
        password,
        username
    } = req.body;
    const users = getUsers();
    const checkExists = users.find(user => user.email === email || user.password === password);
    if (checkExists) {
        res.status(400).json({
            error: 'the user with this email or username is already registered'
        });
    } else {
        const savedUser = saveUser({
            email,
            password,
            username
        });
        if (savedUser) {
            res.status(201).json(savedUser);
        } else {
            res.status(500).json({
                error: 'Sorry there was an internal server error'
            })
        }
    }

}

export default signup;