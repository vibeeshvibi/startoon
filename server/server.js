const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

const {User} = require('./model/User')

mongoose.connect('mongodb+srv://vibeeshn21aid:OJYLfNk2VUewtJ4Y@data.m0mi4.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connected'));


app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const newUser = new User({ name, email, password, gender });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        user.loginCount += 1;
        user.lastLoginDate = new Date();
        await user.save();

        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                gender: user.gender,
                loginCount: user.loginCount,
                lastLoginDate: user.lastLoginDate,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/api/admin', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.get('/api/login-stats', async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
                $match: { lastLoginDate: { $ne: null } } // Filter users who have logged in
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$lastLoginDate" },
                        month: { $month: "$lastLoginDate" }
                    },
                    count: { $sum: "$loginCount" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
