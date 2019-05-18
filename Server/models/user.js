import users from '../data/user.json';
import fs from 'fs';
import path from 'path';

const getUsers = () => {
    return users;
}

export const saveUser = (user) => {
    const savePath = path.resolve(__dirname, '../data/user.json');
    console.log(savePath);
    const newUsers = [...users, user];
    fs.writeFileSync(savePath, JSON.stringify(newUsers), {
        encoding: ''
    });
    return user;
}
export default getUsers