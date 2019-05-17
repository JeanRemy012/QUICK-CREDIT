import getUsers from '../models/user';

const authenticateUser = (req, res) => {
    const {
        email,
        password
    } = req.body;
    const users = [...getUsers()];
    const user = users.find((eachUser) => eachUser.email === email && eachUser.password === password);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({
            error: 'Invalid username or password'
        });
    }
}

export default authenticateUser;