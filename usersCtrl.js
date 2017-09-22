const users = require('./userData.json');

module.exports = {

    getUsers: (req, res, next)=>{
        if (req.query.age){
            const people = users.filter(users => users.age < req.query.age);
            return res.json(people);
        }
        else if (req.query.lastname){
            return res.json(users.filter(cur => cur.last_name === req.query.lastname));
        }
        else if (req.query.email){
            return res.json(users.filter(cur => cur.email === req.query.email));
        } else if (req.query.favorites){
            const people = users.filter(cur => cur.favorites.includes(req.query.favorites));
            return res.json(people);
        }
        res.json(users);
    },
    getUsersId: (req, res, next)=>{
        if (req.params.usersid){
            const person = users.filter(cur => {
                if (cur.id == req.params.usersid){
                    return cur;
                } 
            });
            if (person.length === 0){
                return res.status(404).json(null);
            }
            return res.json(person[0]);            
    }

    },
    getAdmins: (req, res, next)=>{
        res.json(users.filter(cur=>cur.type === 'admin'));
    },
    getNonAdmins: (req, res, next)=>{
        res.json(users.filter(cur=>cur.type === 'user'||cur.type === 'moderator'));
    },
    getUserByType: (req, res, next)=>{
        if (req.params.userType){
            res.json(users.filter(cur=>cur.type === req.params.userType));
        }
    },
    changeUser: (req, res, next)=>{
        const user = users.filter((cur)=>cur.id == req.params.usid)[0];
        users[(parseInt(req.params.usid))-1] = req.body;
        return res.json(users);
    },
    addUser: (req, res, next)=>{
        const num = users.slice(-1)[0].id;
        console.log(num);
        req.body.id = num + 1;
        users.push(req.body);
        res.json(users);
    },
    deleteUser: (req, res, next)=>{
        const user = users.filter(cur=>cur.id == req.params.userId)[0];
        users.splice(users.indexOf(user), 1);
        res.json(users);

    }
}