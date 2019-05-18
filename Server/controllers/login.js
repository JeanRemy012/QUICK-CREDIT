import users from '../data/user.json';

const authenticateUser = (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = users.find((eachUser) => eachUser.email === email && eachUser.password === password);
    if (user) {
        delete user.password;
        res.status(200).json({
            user
        });
    } else {
        res.status(400).json({
            error: 'Invalid username or password'
        });
    }
}

export default authenticateUser;