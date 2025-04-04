import UsersLog from '../models/user.logdata.js';
import Users from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const user = req.body;
    console.log(user)
    if (!user.email || !user.password || !user.name) {
        return res.status(400).json({ success: false, message: "Please fill all fields" })
    };

    const newUser = new Users(user);

    try {
        await newUser.save()
        res.status(201).json({ success: true, message: "User created successfully" })
        console.log(res)
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error creating user" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User does not exist' });

        const isMatch = () => {
            if (user.password === password) {
                return true
            } else {
                return false
            }
        }
        if (!isMatch()) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, 'secretkey', { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
        //const UserLog = new UsersLog({ name: user.name, email: user.email, role: user.role, isLoggedIn: true });
        //await UserLog.save()
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(res)
    }
}
