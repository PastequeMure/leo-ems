const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));

app.use('/scripts', express.static(path.resolve(__dirname, '../web/javascripts')));
app.use("/data", express.static(path.resolve(__dirname, "../web/data")));
app.use("/css", express.static(path.resolve(__dirname, "../web/css")));
app.use('/assets', express.static(path.resolve(__dirname, "../web/assets")));

app.post('/login', (req,res) => {
    const {username,password} = req.body;
    const retrieve_logsData = JSON.parse(fs.readFileSync('./web/data/users_loggin.json'));
    let isValidUser = retrieve_logsData.find(user => user.username === username && user.password === password) ? true : false;
    
    if(isValidUser) {
        res.status(200).send('user_found')
    } else {
        res.status(404).send('user_not_found')
    }
})

app.post('/update_user', (req,res) => {
    const {last_username,last_grade,username,grade,status,team,request_type} = req.body;
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));
    let i = usersData.findIndex(user => user.username === last_username && user.grade === last_grade);
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));

    switch (request_type) {
        case "update_username":
                try {
                    usersData[i].username = username;
                    fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
                    res.status(200).send('username_updated')
                } catch(error) {
                    res.status(400).send('username_not_updated')
                    console.error(error)
                }
            break;
        case "update_grade":
            try {
                usersData[i].grade = grade
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
                res.status(200).send('grade_updated')
            } catch(error) {
                res.status(400).send('grade_not_updated')
                console.error(error)
            }
            break;
        case "update_status":
            let isEmptyTeam = usersData.filter(user => user.team === team && user.username !== last_username && user.grade !== last_grade)
            if(!isNaN(team) && Number(team) > -1 && isEmptyTeam.length === 0) {
                
                let findTeam = teamsData.findIndex(team_to_find => team_to_find.id === Number(team));
                let teams_to_down = []
                for (let i = findTeam; i < teamsData.length; i++) {
                    teamsData[i].id -=1;
                    teams_to_down.push(i)
                }
                teamsData.splice(findTeam,1);
                usersData.forEach(user => {
                    if(teams_to_down.includes(user.team)) {
                        user.team = Number(user.team) -1;
                    }
                })
                try {
                    fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
                    fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2))
                } catch (error) {
                    console.error(error)
                }
            }
            try {
                if(status !== undefined) {usersData[i].status = status}
                if(status !== undefined && !status) {usersData[i].team = -1}
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
                res.status(200).send('status_updated')
            } catch(error) {
                res.status(400).send('status_not_updated')
                console.error(error, last_username,last_grade,status)
            }
            break;
        case "update_team":
            try {
                usersData[i].team = team
                if(!isNaN(team)) {usersData[i].team = Number(team)}
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));

                if(!isNaN(team) && Number(team) > -1 && teamsData[team] === undefined) {
                    teamsData.push({
                        vehicule:"N/C",
                        status:"N/C",
                        id:Number(team)
                    })
                    fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
                }
                res.status(200).send('grade_updated')
            } catch(error) {
                res.status(400).send('grade_not_updated')
                console.error(error)
            }
            break;
    }
    //checkTeams()
});

app.post('/update_team', (req,res) => {
    const {id,username,grade,team,vehicule,status,request_type} = req.body;
    console.log(username)
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));
    const datas = JSON.parse(fs.readFileSync('./web/data/data.json'));
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));
    switch (request_type) {
        case "update_team_user":
            try {
                let i = usersData.findIndex(user => user.username === username && user.grade === grade);
                usersData[i].team = team;
                if(!isNaN(team)) {usersData[i].team = Number(team)}
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
                res.status(200).send('team_user_updated');
            } catch (error) {
                console.error(error)
            }
            break;
        case "update_vehicule":
            try {
                teamsData[id].vehicule = vehicule;
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
                res.status(200).send('update_vehicule');
            } catch(error) {
                console.error(error)
            }
            break;
        case "add_vehicule":
            datas.vehicules.push(vehicule);
            teamsData[id].vehicule = vehicule;
            try {
                fs.writeFileSync('./web/data/data.json', JSON.stringify(datas,null,2));
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
                res.status(200).send("vehicule_added");
            } catch (error) {
                res.status(400).send('vehicule_not_added');
                console.error(error)
            }
            break;
        case "update_team_status":
            teamsData[id].status = status;
            try {
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
                res.status(200).send('status_updated');
            } catch (error) {
                res.status(400).send('status_not_updated');
                console.error(error)
            }
            break;
        case "add_team_status":
            teamsData[id].status = status;
            datas.status.push(status);

            try {
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
                fs.writeFileSync('./web/data/data.json', JSON.stringify(datas,null,2));
                res.status(200).send('status_updated');
            } catch(error) {
                res.status(400).send("status_not_updated");
                console.error(error)
            }
            break;
    }
    //checkTeams()
})

app.post('/add_user', (req,res) => {
    const {username,grade,status,team} = req.body;
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));
    const datas = JSON.parse(fs.readFileSync('./web/data/data.json'));
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));

    let new_user = 
        {
            username:username,
            grade:grade,
            status:status,
            team:team
        }

    if(grade === "-1") {
        new_user.grade = "N/C"
    }

    if(!isNaN(team) && team > -1) {
        new_user.team = Number(team)
    } else if(!isNaN(team) && team < 0) {
        new_user.team = Number(team)
    }

    if(!datas.grades.includes(grade)) {
        datas.grades.push(grade)
    }

    let isAlreadyUser = usersData.find(user => user.username === username && user.grade === grade) ? true : false;
    if(!isAlreadyUser) {

        if(isNaN(team) && !datas.teams.includes(team)) {
            datas.teams.push(team);
        } else if(!isNaN(team) && team > -1){
            let new_team = {
                vehicule:"N/C",
                status:"N/C"
            }
            teamsData.push(new_team);
        }

        try {
            usersData.push(new_user);
            fs.writeFileSync('./web/data/data.json', JSON.stringify(datas,null,2));
            fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
            fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
            res.status(200).send("user_added");
        }
        catch(error) {
            res.status(400).send('user_not_added')
            console.error(error)
        }
    } else {
        res.status(409).send('user_already_in_base')
    };

})

app.post('/delete_user', (req,res) => {
    const {username,grade} = req.body;
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));

    let index = usersData.findIndex(user => user.username === username && user.grade === grade);
    usersData.splice(index,1);
    
    try {
        fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
        res.status(200).send('user_deleted');
    } catch(error) {
        res.status(400).send('user_not_deleted');
        console.error(error)
    }
})

app.post('/update_datas', (req,res) => {
    const {grades,vehicules,status,teams} = req.body;
    const Datas = JSON.parse(fs.readFileSync('./web/data/data.json'));

    Datas.grades = grades;
    Datas.vehicules = vehicules;
    Datas.status = status;
    Datas.teams = teams;

    try {
        fs.writeFileSync('./web/data/data.json', JSON.stringify(Datas,null,2));
        res.status(200).send('datas_updated');
    } catch (error) {
        res.status(400).send('datas_not_updated');
        console.error(error)
    }
})

app.post('/update_teams', (req,res) => {
    const {id,user,vehicule,status,request_type} = req.body;
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));
    
    let findTeam = teamsData.findIndex(team => team.id === Number(id));
    switch (request_type) {
        case 'update_user':
            let findUser = usersData.findIndex(target_user => target_user.username.replace(/ /g,'_').toLowerCase() === user.username && target_user.grade === user.grade);
            if(!isNaN(Number(user.actual_team))) {
                usersData[findUser].team = Number(user.new_team)
            } else {
                usersData[findUser].team = user.new_team
            }
            try {
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2))
                res.status(200).send('team_user_updated');
            } catch(error) {
                res.status(400).send('team_user_not_updated');
                console.error(error)
            }
            break;
        case 'update_vehicule':
            teamsData[findTeam].vehicule = vehicule;
            try {
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
                res.status(200).send('team_vehicule_updated');
            } catch(error) {
                res.status(400).send('team_vehicule_not_updated');
                console.error(error)
            }
            break;
        case 'update_status':
            teamsData[findTeam].status = status;
            try {
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
                res.status(200).send('team_status_updated')
            } catch (error) {
                res.status(400).send('team_user_not_updated')
                console.error(error)
            }
            break;
    }

    if(user !== null && user.delete_team) {
        let teams_to_down = []
        for (let i = findTeam; i < teamsData.length; i++) {
            teamsData[i].id -=1;
            teams_to_down.push(i)
        }
        teamsData.splice(findTeam,1);
        usersData.forEach(user => {
            if(teams_to_down.includes(user.team)) {
                user.team = Number(user.team) -1;
            }
        })
        try {
            fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
            fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2))
        } catch (error) {
            console.error(error)
        }
    }
})

app.post('/delete_team', (req,res) => {
    const {id} = req.body;
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'))

    let findTeam = teamsData.findIndex(team => team.id === Number(id));
    let teams_to_down = []
    for (let i = findTeam; i < teamsData.length; i++) {
        teamsData[i].id -=1;
        teams_to_down.push(i)
    }
    teamsData.splice(findTeam,1);
    usersData.forEach(user => {
        if(teams_to_down.includes(user.team)) {
            user.team = Number(user.team) -1;
        }
    })
    try {
        fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
        fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2))
    } catch (error) {
        console.error(error)
    }

    try {
        fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2));
        fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
        res.status(200).send('team_deleted')
    } catch(error) {
        res.status(400).send("team_not_deleted")
        console.error(error)
    }

})

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, "../web/pages/login.html");
    res.sendFile(filePath);
});

app.get('/leo', (req, res) => {
    const filePath = path.resolve(__dirname, '../web/pages/leo.html');
    res.sendFile(filePath);
});

app.post('/clear_all_status', (req,res) => {
    const {users} = req.body;
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));

    users.forEach(user => {
        let findUser = usersData.find(user_to_find => user_to_find.username === user.username && user_to_find.grade === user.grade);
        let isEmptyTeam = usersData.filter(user => user.team === findUser.team && user.username !== findUser.username && user.grade !== findUser.grade)
        if(!isNaN(findUser.team) && Number(findUser.team) > -1 && isEmptyTeam.length === 0) {
            
            let findTeam = teamsData.findIndex(team_to_find => team_to_find.id === Number(findUser.team));
            let teams_to_down = []
            for (let i = findTeam; i < teamsData.length; i++) {
                teamsData[i].id -=1;
                teams_to_down.push(i)
            }
            teamsData.splice(findTeam,1);
            usersData.forEach(user => {
                if(teams_to_down.includes(user.team)) {
                    user.team = Number(user.team) -1;
                }
            })
            try {
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2))
            } catch (error) {
                console.error(error)
            }
        }

        findUser.status = false;
        findUser.team = -1
    })
    try {
        fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
        res.status(200).send('status_clear');
    } catch (error) {
        res.status(400).send('status_not_clear');
        console.error(error)
    }
})

app.post('/clear_teams', (req,res) => {
    const {users} = req.body;
    const usersData = JSON.parse(fs.readFileSync('./web/data/users.json'));
    const teamsData = JSON.parse(fs.readFileSync('./web/data/teams.json'));

    users.forEach(user => {
        let findUser = usersData.find(user_to_find => user_to_find.username === user.username && user_to_find.grade === user.grade);
        let isEmptyTeam = usersData.filter(user => user.team === findUser.team && user.username !== findUser.username && user.grade !== findUser.grade)
        if(!isNaN(findUser.team) && Number(findUser.team) > -1 && isEmptyTeam.length === 0) {
            
            let findTeam = teamsData.findIndex(team_to_find => team_to_find.id === Number(findUser.team));
            let teams_to_down = []
            for (let i = findTeam; i < teamsData.length; i++) {
                teamsData[i].id -=1;
                teams_to_down.push(i)
            }
            teamsData.splice(findTeam,1);
            usersData.forEach(user => {
                if(teams_to_down.includes(user.team)) {
                    user.team = Number(user.team) -1;
                }
            })
            try {
                fs.writeFileSync('./web/data/teams.json', JSON.stringify(teamsData,null,2))
                fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2))
            } catch (error) {
                console.error(error)
            }
        }
        findUser.team = -1
    })
    try {
        fs.writeFileSync('./web/data/users.json', JSON.stringify(usersData,null,2));
        res.status(200).send('teams_clear');
    } catch (error) {
        res.status(400).send('teams_not_clear');
        console.error(error)
    }
})

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`ok`);
});