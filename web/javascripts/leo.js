document.addEventListener('DOMContentLoaded', () => {
    let isValidCookie = document.cookie.split(',').includes('userLogged=true') ? true : false
    if(!isValidCookie) {
        window.location.href = "/"
    }
    
    // HEADER //
    const getDatas = document.getElementById('header_status');
    getDatas.addEventListener('click', Datas)
    LogOut();

    // BODY //
    Users();
    setTimeout(Teams, 50)

    // FOOTER //
    setTimeout(Footer,100)
})

function LogOut() {
    const getButton = document.getElementById('log_out');
    getButton.addEventListener('click',() => {
        document.cookie = "userLogged=";
        window.location.href = "/"
    })
}

function Datas(event) {
    event.target.removeEventListener('click', Datas)
        const modal = document.createElement('div');
        modal.classList.add('modal');
        document.body.appendChild(modal);

            const modal_header = document.createElement('div');
            modal_header.classList.add('modal-header');
            modal.appendChild(modal_header);

                const modal_title = document.createElement('h1');
                modal_title.innerText = "Modifier des grades, véhicules, statuts ou équipes";
                modal_header.appendChild(modal_title);

                const modal_close = document.createElement('span');
                modal_close.classList.add('material-symbols-outlined');
                modal_close.innerText="close";
                modal_header.appendChild(modal_close);

                modal_close.addEventListener('click', () => {
                    const getDatas = document.getElementById('header_status');
                    getDatas.addEventListener('click', Datas)
                    const modal = document.querySelector('.modal');
                    modal.remove()
                })

            const modal_body = document.createElement('div');
            modal_body.classList.add('modal-body');
            modal.appendChild(modal_body);

                fetch('/data/data.json')
                .then(response => response.json())
                .then(data => {
                    const grades = data.grades;
                    const vehicules = data.vehicules;
                    const status = data.status;
                    const teams = data.teams

                    const grades_div = document.createElement('div');
                    grades_div.setAttribute('id','modal_grades');
                    modal_body.appendChild(grades_div);

                        const grades_title = document.createElement('div');
                        grades_title.innerHTML = "<h4>GRADES</h4>";
                        grades_div.appendChild(grades_title)

                        const grades_datas = document.createElement('div');
                        grades_div.appendChild(grades_datas);

                            grades.forEach(grade => {
                                const grade_data = document.createElement('div');
                                grade_data.classList.add('modal-grades');
                                grades_datas.appendChild(grade_data);

                                    const grade_d = document.createElement('p');
                                    grade_d.innerText = grade;
                                    grade_data.appendChild(grade_d);

                                    const grade_remove = document.createElement('span');
                                    grade_remove.classList.add('material-symbols-outlined');
                                    grade_remove.innerText = "close";
                                    grade_data.appendChild(grade_remove);

                                    grade_d.addEventListener('click', modalDatas)
                                    grade_remove.addEventListener('click', (event) => {
                                        const target = event.target;
                                        const parent = target.parentElement;
                                        parent.remove();
                                    })
                            })

                            const add_grades = document.createElement('button');
                            add_grades.setAttribute('id','add_grades');
                            add_grades.type="button";
                            add_grades.innerText="Ajouter un grade";
                            grades_datas.appendChild(add_grades)
                            add_grades.addEventListener('click', (event) => {
                                const target = event.target;
                                const parent = target.parentElement;

                                const grade_input = document.createElement('input');
                                grade_input.type="text";
                                grade_input.placeholder="Pupute du patron";
                                parent.insertBefore(grade_input,target);

                                grade_input.addEventListener('blur', (event) => {
                                    const target = event.target;
                                    const parent = target.parentElement;

                                    if(target.value.length > 0) {
                                        const new_grade_div = document.createElement('div');
                                        new_grade_div.classList.add('modal-grades');
                                        parent.insertBefore(new_grade_div,target);

                                            const new_grade = document.createElement('p');
                                            new_grade.setAttribute('id','add_grade')
                                            new_grade.innerText = target.value;
                                            new_grade_div.appendChild(new_grade);
                                            new_grade.addEventListener('click', modalDatas)

                                            const grade_remove = document.createElement('span');
                                            grade_remove.classList.add('material-symbols-outlined');
                                            grade_remove.innerText="close";
                                            new_grade_div.appendChild(grade_remove);

                                            grade_remove.addEventListener('click', (event) => {
                                                event.target.parentElement.remove()
                                            })

                                            target.remove();
                                    } else {
                                        target.remove()
                                    }
                                })
                            })

                    const vehicules_div = document.createElement('div');
                    vehicules_div.setAttribute('id',"modal_vehicules");
                    modal_body.appendChild(vehicules_div);

                        const vehicule_title = document.createElement('div');
                        vehicule_title.innerHTML = "<h4>VEHICULES</h4>";
                        vehicules_div.appendChild(vehicule_title);

                        const vehicules_datas = document.createElement('div');
                        vehicules_div.appendChild(vehicules_datas);

                            vehicules.forEach(vehicule => {
                                const vehicule_div = document.createElement('div');
                                vehicule_div.classList.add('modal-vehicules')
                                vehicules_datas.appendChild(vehicule_div);

                                    const vehicule_data = document.createElement('p');
                                    vehicule_data.innerText= vehicule;
                                    vehicule_div.appendChild(vehicule_data);
                                    vehicule_data.addEventListener('click', modalDatas);

                                    const vehicule_remove = document.createElement('span');
                                    vehicule_remove.classList.add('material-symbols-outlined');
                                    vehicule_remove.innerText="close";
                                    vehicule_div.appendChild(vehicule_remove);
                                    vehicule_remove.addEventListener('click', (event) => {
                                        event.target.parentElement.remove()
                                    })
                            });

                            const add_vehicules = document.createElement('button');
                            add_vehicules.setAttribute('id','add_vehicules');
                            add_vehicules.type="button";
                            add_vehicules.innerText = "Ajouter un véhicule";
                            vehicules_datas.appendChild(add_vehicules);
                            add_vehicules.addEventListener('click', (event) => {
                                const new_vehicule = document.createElement('input');
                                new_vehicule.type="text"
                                new_vehicule.setAttribute('id','add_vehicule');
                                new_vehicule.placeholder="La 4L";

                                event.target.parentElement.insertBefore(new_vehicule,event.target);

                                new_vehicule.addEventListener('blur', (event) => {
                                    const new_vehicule_div = document.createElement('div');
                                    new_vehicule_div.classList.add('modal-vehicules');

                                        const new_vehicule_data = document.createElement('p');
                                        new_vehicule_data.setAttribute('id','add_vehicule');
                                        new_vehicule_data.innerText = event.target.value;
                                        new_vehicule_div.appendChild(new_vehicule_data)

                                        const vehicule_remove = document.createElement('span');
                                        vehicule_remove.classList.add('material-symbols-outlined');
                                        vehicule_remove.innerText="close";
                                        new_vehicule_div.appendChild(vehicule_remove);

                                        if(event.target.value.length > 0) {
                                            event.target.parentElement.insertBefore(new_vehicule_div,event.target);
                                            new_vehicule_data.addEventListener('click', modalDatas);
                                            vehicule_remove.addEventListener('click', (event) => {
                                                event.target.parentElement.remove()
                                            })
                                            event.target.remove()
                                        } else {
                                            event.target.remove()
                                        }
                                })
                            })

                    const status_div = document.createElement('div');
                    status_div.setAttribute('id','modal_status');
                    modal_body.appendChild(status_div);

                        const status_title = document.createElement('div');
                        status_title.innerHTML = "<h4>STATUTS</h4>";
                        status_div.appendChild(status_title);

                        const status_datas = document.createElement('div');
                        status_div.appendChild(status_datas);

                            status.forEach(statut => {
                                const statut_div = document.createElement('div');
                                statut_div.classList.add('modal-status')
                                status_datas.appendChild(statut_div);

                                    const status_data = document.createElement('p');
                                    status_data.innerText = statut;
                                    statut_div.appendChild(status_data);
                                    status_data.addEventListener('click', modalDatas)

                                    const remove_statut = document.createElement('span');
                                    remove_statut.classList.add('material-symbols-outlined');
                                    remove_statut.innerText = "close";
                                    statut_div.appendChild(remove_statut)
                                    remove_statut.addEventListener('click', (event) => {
                                        event.target.parentElement.remove()
                                    })
                            });

                            const add_status = document.createElement('button');
                            add_status.setAttribute('id','add_status');
                            add_status.type="button";
                            add_status.innerText="Ajouter un statut";
                            status_datas.appendChild(add_status);
                            add_status.addEventListener('click', (event) => {
                                const new_status = document.createElement('input');
                                new_status.setAttribute('id','add_status');
                                new_status.type="text";
                                new_status.placeholder="Pause Bédo";

                                event.target.parentElement.insertBefore(new_status,event.target);
                                new_status.addEventListener('blur', (event) => {
                                    const new_status_div = document.createElement('div');
                                    new_status_div.classList.add('modal-status')

                                        const new_statut_data = document.createElement('p');
                                        new_statut_data.setAttribute('id','add_status');
                                        new_statut_data.innerText = event.target.value;
                                        new_status_div.appendChild(new_statut_data)

                                        const remove_statut = document.createElement('span');
                                        remove_statut.classList.add('material-symbols-outlined');
                                        remove_statut.innerText = "close";
                                        new_status_div.appendChild(remove_statut)
                                        remove_statut.addEventListener('click', (event) => {
                                            event.target.parentElement.remove()
                                        })

                                        if(event.target.value.length > 0) {
                                            event.target.parentElement.insertBefore(new_status_div,event.target);
                                            new_statut_data.addEventListener('click', modalDatas);
                                            event.target.remove()
                                        } else {
                                            event.target.remove()
                                        }
                                })
                            })

                    const teams_div = document.createElement('div');
                    teams_div.setAttribute('id','modal_teams');
                    modal_body.appendChild(teams_div);

                        const teams_title = document.createElement('div');
                        teams_title.innerHTML = "<h4>ÉQUIPES</h4>";
                        teams_div.appendChild(teams_title);

                        const teams_datas = document.createElement('div');
                        teams_div.appendChild(teams_datas);

                            teams.forEach(team => {
                                const team_div = document.createElement('div');
                                team_div.classList.add('modal-teams')
                                teams_datas.appendChild(team_div);

                                    const team_data = document.createElement('p');
                                    team_data.innerText = team;
                                    team_div.appendChild(team_data);
                                    team_data.addEventListener('click', modalDatas)

                                    const remove_team = document.createElement('span');
                                    remove_team.classList.add('material-symbols-outlined');
                                    remove_team.innerText="close";
                                    team_div.appendChild(remove_team);
                                    remove_team.addEventListener('click', (event) => {
                                        event.target.parentElement.remove()
                                    })
                            });

                            const add_teams = document.createElement('button');
                            add_teams.setAttribute('id','add_teams');
                            add_teams.type="button";
                            add_teams.innerText= "Ajouter une équipe";
                            teams_datas.appendChild(add_teams);
                            add_teams.addEventListener('click', (event) => {
                                const new_team = document.createElement('input');
                                new_team.setAttribute('id','add_team');
                                new_team.type='text';
                                new_team.placeholder="Morgue";
                                event.target.parentElement.insertBefore(new_team,event.target);

                                new_team.addEventListener('blur', (event) => {
                                    const new_team_div = document.createElement('div');
                                    new_team_div.classList.add('modal-teams')

                                        const new_team_data = document.createElement('p');
                                        new_team_data.setAttribute('id','add_team');
                                        new_team_data.innerText = event.target.value;
                                        new_team_div.appendChild(new_team_data);

                                        const remove_team = document.createElement('span');
                                        remove_team.classList.add('material-symbols-outlined')
                                        remove_team.innerText ="close";
                                        new_team_div.appendChild(remove_team);

                                        if(event.target.value.length > 0) {
                                            event.target.parentElement.insertBefore(new_team_div,event.target);
                                            new_team_data.addEventListener('click', modalDatas);
                                            remove_team.addEventListener('click', (event) => {
                                                event.target.parentElement.remove();
                                            })
                                            event.target.remove()
                                        } else {
                                            event.target.remove()
                                        }
                                })
                            })
                })

            const modal_footer = document.createElement('div');
            modal_footer.classList.add('modal-footer');
            modal.appendChild(modal_footer);

                const confirm_button = document.createElement('button');
                confirm_button.type="button";
                confirm_button.innerText = "Confirmer"
                modal_footer.appendChild(confirm_button);
                confirm_button.addEventListener('click', sendModalDatas);

                const cancel_button = document.createElement('button');
                cancel_button.type="button";
                cancel_button.innerText = "Annuler";
                modal_footer.appendChild(cancel_button);
                cancel_button.addEventListener('click', (event) => {
                    let modal = event.target.parentElement.parentElement;
                    const getDatas = document.getElementById('header_status');

                    getDatas.addEventListener('click', Datas)
                    modal.remove()
                })
}

function Users() {
    const table = document.createElement('table');
    table.setAttribute('id','users_table');
    document.body.appendChild(table);

        const table_head = document.createElement('thead');
        table.appendChild(table_head);

            const headers = document.createElement('tr');
            headers.setAttribute('id','users_table_headers');
            table_head.appendChild(headers);

                const user_head = document.createElement('th');
                user_head.innerText = "Utilisateurs";
                headers.appendChild(user_head);

                const grade_head = document.createElement('th');
                grade_head.innerText = "Grade";
                headers.appendChild(grade_head);

                const status_head = document.createElement('th');
                status_head.innerText = "Service";
                headers.appendChild(status_head);

                    const clear_status = document.createElement('button')
                    clear_status.type="button"
                    clear_status.innerText="Enlever les services"
                    clear_status.setAttribute('id','clear_status');
                    status_head.appendChild(clear_status);
                    clear_status.addEventListener('click', (event) => {
                        const users_data = document.querySelector('#users_table tbody');
                        let users_to_update = []
                        users_data.childNodes.forEach(child => {
                            if(child.id !== "add_user" && child.childNodes[2].childNodes[0].checked) {
                                users_to_update.push({
                                    username: child.childNodes[0].innerText,
                                    grade:child.childNodes[1].innerText,
                                    team:child.childNodes[3].innerText
                                })
                            }
                        })
                        sendClearStatus(users_to_update)

                    })

                const team_head = document.createElement('th');
                team_head.innerText = "Assignation";
                headers.appendChild(team_head);

                    const clear_teams = document.createElement('button');
                    clear_teams.type="button";
                    clear_teams.innerText="Supprimer toutes les équipes";
                    clear_teams.setAttribute('id','clear_teams');
                    team_head.appendChild(clear_teams)
                    clear_teams.addEventListener('click', (event) => {
                        const users_data = document.querySelector('#users_table tbody');
                        let users_to_update = [];
                        users_data.childNodes.forEach(child =>{
                            if(child.id !== "add_user" && child.childNodes[3].innerText !=="Aucune assignation") {
                                users_to_update.push({
                                    username: child.childNodes[0].innerText,
                                    grade: child.childNodes[1].innerText,
                                    team : child.childNodes[3].innerText
                                })
                            }
                        })
                        sendClearTeam(users_to_update)
                    })

        const table_body = document.createElement('tbody');
        table.appendChild(table_body);

            fetch('/data/users.json')
            .then(response => response.json())
            .then(users => {
                users.forEach(user => {
                    const {username,grade,status,team} = {
                        username : user.username,
                        grade: user.grade,
                        status: user.status,
                        team: user.team
                    };

                    const tr = document.createElement('tr');
                    tr.setAttribute('id',username.replace(/ /g,"_").toLowerCase());
                    table_body.appendChild(tr);

                        const user_td = document.createElement('td');
                        user_td.innerText = username;
                        tr.appendChild(user_td);
                        user_td.addEventListener('click', udpateUser);

                        const grade_td = document.createElement('td');
                        grade_td.innerText = grade;
                        tr.appendChild(grade_td);
                        grade_td.addEventListener('click', udpateUser);

                        const status_td = document.createElement('td');
                        tr.appendChild(status_td);
                        status_td.addEventListener('click', udpateUser)

                            const status_check = document.createElement('input');
                            status_check.type="checkbox";
                            if(status) {
                                status_check.checked = true
                            }
                            status_td.appendChild(status_check);

                        const team_td = document.createElement('td');
                        team_td.innerText = team;
                        if(!isNaN(team) && team !== -1) {team_td.innerText = `Équipe ${Number(team) + 1}`};
                        if(!isNaN(team) && team === -1) {team_td.innerText = "Aucune assignation"};
                        tr.appendChild(team_td);
                        if(status_check.checked) {
                            team_td.addEventListener('click', udpateUser);
                        }

                    for(let i = 0; i < tr.childNodes.length; i++) {
                        tr.childNodes[i].classList.add('clickable');
                        if(!tr.childNodes[2].childNodes[0].checked) {
                            tr.childNodes[3].classList = [];
                            tr.childNodes[3].classList.add('unclickable')
                        }
                    }
                    if(status) {tr.classList.add('activ')} else {tr.classList.add('inactiv')}
                    if(isNaN(team) && team === "Direction") {
                        tr.classList=[];
                        tr.classList.add('direction')
                    } else if(isNaN(team) && team === "Accueil") {
                        tr.classList = [];
                        tr.classList.add('reception')
                    }
                })

            const add_user = document.createElement('tr');
            add_user.setAttribute('id','add_user')
            add_user.classList.add('add-user')
            add_user.innerHTML = "<button type='button'>Ajouter un utlisateur</button>"
            table_body.appendChild(add_user);
            add_user.addEventListener('click',addUser)
            })

}

function udpateUser(event) {
    const target = event.target;
    const parent = target.parentElement;
    parent.childNodes.forEach(child => {
        child.removeEventListener('click',udpateUser)
        child.classList.remove('clickable')
    })
    target.classList.remove('clickable')

    let i = Array.from(parent.childNodes).indexOf(target);
    if(target.type === "checkbox") { i = 2}
    switch(i) {
        case 0:
            let last_username = target.innerText;
            const input_username = document.createElement('input');
            input_username.type = "text";
            input_username.value = target.innerText;
            target.innerHTML  = "";
            target.appendChild(input_username);

            input_username.addEventListener('keypress', (event) => {
                    if(event.key === "Enter") {
                        const parent = target.parentElement;
                        let retrieve_grade = parent.childNodes[1].innerText;
                        
                        const getHead = document.getElementById('users_table_headers');
                        getHead.childNodes[getHead.childNodes.length-1].remove();
                        parent.childNodes[parent.childNodes.length-1].remove();
                        parent.childNodes[parent.childNodes.length-1].remove();

                        sendUserData(last_username,retrieve_grade,input_username.value,null,null,null,"update_username")
                }
            });

            const table = document.getElementById('users_table');
            const delete_head = document.createElement('th');
            delete_head.innerText = "Supprimer ?"
            table.childNodes[0].childNodes[0].appendChild(delete_head);

                const confirm = document.createElement('button');
                confirm.classList.add('unclickable')
                confirm.type="button";
                confirm.innerText="Supprimer";
                confirm.disabled=true;
                target.parentElement.appendChild(confirm);

                const cancel = document.createElement('span');
                cancel.classList.add('material-symbols-outlined');
                cancel.classList.add('clickable')
                cancel.innerText = "close";
                target.parentElement.appendChild(cancel)

            setTimeout(() => {
                confirm.classList = [];
                confirm.classList.add('clickable')
                confirm.disabled=false;
            },3 * 1000);

            confirm.addEventListener('click', (event) => {
                const target = event.target;
                const parent = target.parentElement;

                let username = parent.childNodes[0].childNodes[0].value;
                let grade = parent.childNodes[1].innerText;
                
                sendDeleteUser(username,grade)
            })

            cancel.addEventListener('click', (event) => {
                const user_table = document.getElementById('users_table');
                const teams = document.getElementById('teams');
                const footer = document.querySelector('footer')

                user_table.remove();
                teams.remove();
                footer.remove()

                Users();
                Teams()
                Footer()
            })

            break;
        case 1:
            const last_grade = target.innerText;
            target.innerText = "";

            const grade_select = document.createElement('select');

                const blank_option = document.createElement('option');
                blank_option.value = "N/C";
                grade_select.appendChild(blank_option);

                fetch('/data/data.json')
                .then(response => response.json())
                .then(data => {
                    data.grades.forEach(grade => {
                        const option = document.createElement('option');
                        option.value = grade;
                        option.innerText = grade;
                        if(last_grade === grade) {option.selected = true};
                        grade_select.appendChild(option);
                    })
                })

                target.appendChild(grade_select);
                grade_select.addEventListener('change', (event) => {
                    let last_username = target.parentElement.childNodes[0].innerText
                    let grade = event.target.value

                    target.innerText = grade;
                    sendUserData(last_username,last_grade,null,grade,null,null,"update_grade")
                })

                grade_select.addEventListener('blur', (event) => {
                    let grade = event.target.value;
                    target.innerText = grade;
                })
            break;        
        case 2:
            let last_username2;
            let last_grade2;
            let status;
            let retrieve_team;
            let datas;
            let team;

            if(parent.childNodes[3] !== undefined) {
                retrieve_team = parent.childNodes[3].innerText;
                datas = retrieve_team.split(" ");
                if(!isNaN(Number(datas[1]))) {
                    team = Number(datas[1]) - 1
                }
            }
            

            if(event.target.type === "checkbox") {
                last_username2 = parent.parentElement.childNodes[0].innerText;
                last_grade2 = parent.parentElement.childNodes[1].innerText;
                status = event.target.checked;
                retrieve_team = parent.parentElement.childNodes[3].innerText;
                

                if(status) {
                    event.target.checked = true;
                    parent.parentElement.classList.remove('inactiv');
                    parent.parentElement.classList.add('activ');

                    parent.parentElement.childNodes[3].classList.remove('unclickable');
                    parent.parentElement.childNodes[3].classList.add('clickable');
                } else {
                    event.target.checked = false;
                    parent.parentElement.classList.add('inactiv');
                    parent.parentElement.classList.remove('activ')

                    parent.parentElement.childNodes[3].classList.add('unclickable');
                    parent.parentElement.childNodes[3].classList.remove('clickable');
                }
            } else {
                last_username2 = parent.childNodes[0].innerText;
                last_grade2 = parent.childNodes[1].innerText;
                status = !event.target.childNodes[0].checked
                
                if(status) {
                    event.target.childNodes[0].checked = true;
                    parent.classList.remove('inactiv');
                    parent.classList.add('activ')

                    parent.childNodes[3].classList.remove('unclickable');
                    parent.childNodes[3].classList.add('clickable');
                } else {
                    event.target.childNodes[0].checked = false;
                    parent.classList.add('inactiv');
                    parent.classList.remove('activ')

                    parent.childNodes[3].classList.add('unclickable');
                    parent.childNodes[3].classList.remove('clickable');
                }
            }

            setTimeout(() => {
                sendUserData(last_username2,last_grade2,null,null,status,team,"update_status")
            },50)
            break;
        case 3:
            target.removeEventListener('click', udpateUser);
            target.classList.remove('clickable')
            let last_team = target.innerText;
            let retrieve_number = Number(last_team.split(' ')[1] - 1)
            target.innerHTML=""


            fetch('/data/users.json')
            .then(response => response.json())
            .then(data => {
                let team_options= []

                data.forEach(user => {
                    if(!isNaN(user.team) && user.team !== -1 && !team_options.includes(Number(user.team))) {
                        team_options.push(Number(user.team))
                    }
                })

                team_options.sort(function(a,b) {return a -b})
                const team_select = document.createElement('select');
                target.appendChild(team_select);

                    const blank_team = document.createElement('option');
                    blank_team.value=-1;
                    team_select.appendChild(blank_team);
                    if(Number(last_team) === -1) {blank_team.selected = true}

                    fetch('/data/data.json') 
                    .then(response => response.json())
                    .then(datas => {
                        datas.teams.forEach(team => {
                            const option = document.createElement('option');
                            option.value = team;
                            option.innerText = team;
                            team_select.appendChild(option)
                            if(last_team === team) {option.selected=true}
                        })
                    })

                    team_options.forEach(team_option => {
                        const option = document.createElement('option');
                        option.value = team_option;
                        option.innerText = `Équipe ${Number(team_option) + 1}`;
                        team_select.appendChild(option)
                        if(retrieve_number === Number(team_option)) {option.selected = true}
                    });

                    const add_team_option = document.createElement('option');
                    add_team_option.value = team_options.length;
                    add_team_option.innerText = "Ajouter une équipe";
                    team_select.appendChild(add_team_option);

                    team_select.addEventListener('change', (event) => {
                        let id = event.target.parentElement.parentElement.id
                        let retrive_user = data.find(user => user.username.replace(/ /g,"_").toLowerCase() === id);
                        const getTeams = document.getElementById('teams');
                        getTeams.childNodes.forEach(child => {
                            if(child.id !=='reception_team') {
                                if(child.childNodes[2].childNodes.length === 1  && child.childNodes[2].childNodes[0].id === id) {
                                    let team_id = child.id;
                                    
                                    DeleteTeam(team_id);
                                }
                            }
                        })
                        sendUserData(retrive_user.username,retrive_user.grade,null,null,null,event.target.value,"update_team")
                    })
            })
            break;
    }
}

function sendUserData(last_username,last_grade,username,grade,status,team,request_type) {
    fetch('/update_user', {
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({last_username,last_grade,username,grade,status,team,request_type})
    })
    .then(response => {
        if(response.ok) {
            const users_table = document.getElementById('users_table');
            const home_div = document.getElementById('home_div')
            const teams = document.getElementById('teams');
            const footer = document.querySelector('footer');

            if(users_table !== null) {
                users_table.remove()
                Users();
            }
            if(home_div !== null) {
                home_div.remove()
            }
            if(teams !== null) {
                teams.remove()
                setTimeout(Teams(), 50)
            }
            if(footer !== null) {
                footer.remove()
                setTimeout(Footer(),100)
            }

        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function Teams() {
    const teams_div = document.createElement('div');
    teams_div.setAttribute('id','teams');
    document.body.appendChild(teams_div);
        let teams_data = []
        fetch('/data/teams.json')
        .then(response => response.json())
        .then(teams => {
            teams.forEach(team => {
                teams_data.push({
                    users:[],
                    vehicule:team.vehicule,
                    status:team.status,
                    id:team.id
                });
            })
           
            fetch('/data/users.json')
            .then(response => response.json())
            .then(users => {
                users.forEach(user => {
                    let index = teams_data.findIndex(team => team.id === user.team);
                    if(index > -1) {
                        teams_data[index].users.push({username:user.username,grade:user.grade})
                    }
                })
                const home_div = document.createElement('div');
                home_div.setAttribute('id',"home_div")

                let isInAccueil = users.find(user => user.team === "Accueil") ? true : false;
                if(isInAccueil) {
                    let reception_users = [];
                    users.forEach(user => {
                        if(user.team === "Accueil") {
                            reception_users.push({
                                username: user.username,
                                grade: user.grade
                            })
                        }
                    })
                    
                    const reception_div = document.createElement('div');
                    reception_div.classList.add('team-reception');
                    home_div.appendChild(reception_div)

                        const reception_title = document.createElement('h1');
                        reception_title.innerText = "Accueil";
                        reception_div.appendChild(reception_title)

                        const reception_users_div = document.createElement('div');
                        reception_users_div.classList.add('reception-users');
                        reception_div.appendChild(reception_users_div);

                            if(reception_users.length > 0) {
                                reception_users.forEach(user => {
                                    const user_data = document.createElement('div');
                                    reception_users_div.appendChild(user_data);

                                        const user_value = document.createElement('label')
                                        user_value.setAttribute('for',`reception_${user.username}`)
                                        user_value.innerText = user.grade + ' - ' + user.username;
                                        user_data.appendChild(user_value);

                                        const user_statut = document.createElement('input');
                                        user_statut.setAttribute('id',`reception_${user.username}`)
                                        user_statut.type = "checkbox";
                                        user_value.appendChild(user_statut)
                                        user_statut.addEventListener('click', (event) => {
                                            if(event.target.checked) {
                                                event.target.parentElement.classList = [];
                                                event.target.parentElement.classList.add('reception-unavailable')

                                                const small = document.createElement('small');
                                                small.setAttribute('id','reception_user_statut')
                                                small.innerText = "Indisponible";
                                                event.target.parentElement.insertBefore(small,event.target)
                                            } else {
                                                event.target.parentElement.classList = [];
                                                const getSmall = document.getElementById('reception_user_statut')
                                                if(getSmall !== undefined) {
                                                    getSmall.remove()
                                                }
                                            }
                                        })
                                })
                            }
                }
                let isInDirection = users.find(user => user.team === "Direction")? true : false;
                if(isInDirection) {
                    let direction_users = [];
                    users.forEach(user => {
                        if(user.team === "Direction") {
                            direction_users.push({
                                username:user.username,
                                grade:user.grade
                            })
                        }
                    });

                    const direction_div = document.createElement('div');
                    direction_div.classList.add('team-direction');
                    home_div.appendChild(direction_div);

                        const direction_title = document.createElement('h1');
                        direction_title.innerText = "Direction",
                        direction_div.appendChild(direction_title);

                        const direction_users_div = document.createElement('div');
                        direction_users_div.classList.add('direction-users');
                        direction_div.appendChild(direction_users_div);

                        if(direction_users.length > 0) {
                            direction_users.forEach(user => {
                                const user_data = document.createElement('div');
                                direction_users_div.appendChild(user_data);

                                    const user_value = document.createElement('label');
                                    user_value.setAttribute('for',`direction_${user.username}`)
                                    user_value.innerText = user.grade + ' - ' + user.username;
                                    user_data.appendChild(user_value);

                                    const user_statut = document.createElement('input');
                                    user_statut.setAttribute('id',`direction_${user.username}`)
                                    user_statut.type = "checkbox";
                                    user_value.appendChild(user_statut) 
                                    user_statut.addEventListener('click', (event) => {
                                        if(event.target.checked) {
                                            event.target.parentElement.classList = [];
                                            event.target.parentElement.classList.add('reception-unavailable')

                                            const small = document.createElement('small');
                                            small.setAttribute('id','reception_user_statut')
                                            small.innerText = "Indisponible";
                                            event.target.parentElement.insertBefore(small,event.target)
                                        } else {
                                            event.target.parentElement.classList = [];
                                            const getSmall = document.getElementById('reception_user_statut')
                                            if(getSmall !== undefined) {
                                                getSmall.remove()
                                            }
                                        }
                                    })
                            })
                        }
                }
                document.body.insertBefore(home_div,teams_div)

                teams_data.forEach(team => {
                    const team_div = document.createElement('div')
                    team_div.setAttribute('id',team.id);
                    teams_div.appendChild(team_div);

                        const team_title = document.createElement('h1');
                        team_title.innerText = `Équipe ${Number(team.id) + 1}`;
                        team_div.appendChild(team_title);

                        const close_team = document.createElement('span');
                        close_team.classList.add('material-symbols-outlined');
                        close_team.setAttribute('id','close_team')
                        close_team.innerText = "close";
                        team_div.appendChild(close_team)
                        close_team.addEventListener('click', (event) => {
                            let id = event.target.parentElement.id;
                            DeleteTeam(id)
                        })

                        const team_users = document.createElement('div');
                        team_users.setAttribute('id','team_users');
                        team_div.appendChild(team_users);

                            team.users.forEach(user => {
                                const user_data = document.createElement('p');
                                user_data.setAttribute('id',user.username.replace(/ /g,'_').toLowerCase())
                                user_data.innerText = `${user.grade} - ${user.username}`;
                                team_users.appendChild(user_data)
                                user_data.addEventListener('click', TeamsEvents)
                            });

                        const vehicule_data = document.createElement('p');
                        vehicule_data.setAttribute('id',"team_vehicule")
                        if(team.vehicule === "N/C") {
                            vehicule_data.innerText = "Véhicule";
                        } else {
                            vehicule_data.innerText = team.vehicule;
                        }
                        team_div.appendChild(vehicule_data);
                        vehicule_data.addEventListener('click', TeamsEvents)

                        const status_data = document.createElement('p');
                        status_data.setAttribute('id','team_status')
                        if(team.status === "N/C") {
                            status_data.innerText = "Disponibilité";
                        } else {
                            status_data.innerText = team.status;
                        }
                        team_div.appendChild(status_data);
                        status_data.addEventListener('click', TeamsEvents)
                        
                        if(team.status === "N/C") {
                            team_div.classList = []
                            team_div.classList.add('undefined-status')
                        }

                        if(team.status === "Libre") {
                            team_div.classList = [];
                            team_div.classList.add('available')
                        }

                        if(team.status === "Occupé") {
                            team_div.classList = []
                            team_div.classList.add('unavailable')
                        }
                })
            })
        })
}

function DeleteTeam(id) {
    const target = event.target;
    const parent = target.parentElement

    fetch('/delete_team', {
        method:'post',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({id})
    })
    .then(response => {
        if(response.ok) {
            const users = document.getElementById('users_table');
            const home_div = document.getElementById('home_div');
            const teams = document.getElementById('teams');
            const footer = document.querySelector('footer');

            users.remove();
            home_div.remove()
            teams.remove();
            footer.remove()

            Users();
            setTimeout(Teams, 50)
            setTimeout(Footer,100)
        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function TeamsEvents(event) {
    const target = event.target;
    target.removeEventListener('click',TeamsEvents)
    const parent = target.parentElement
    
    fetch('/data/users.json')
    .then(response => response.json())
    .then(users => {
        fetch('/data/data.json')
        .then(response => response.json())
        .then(datas => {

            const select = document.createElement('select');

                const blank_option = document.createElement('option')
                if(parent.id === "team_users") {
                    blank_option.value = -1
                } else {
                    blank_option.value="N/C";
                }
                select.appendChild(blank_option)

            if(parent.id === "team_users") {
                let teams_available = []
                users.forEach(user => {
                    if(!isNaN(user.team) && Number(user.team) > -1 && !teams_available.includes(user.team)) {
                        teams_available.push(user.team);
                    }
                })
                
                teams_available.forEach(team => {
                    const option = document.createElement('option');
                    option.value = team;
                    option.innerText = `Équipe ${Number(team) + 1}`;
                    if(parent.parentElement.id === option.value) {option.selected = true}
                    select.appendChild(option);
                })

                let last_datas = target.innerText;
                target.innerText = '';
                target.appendChild(select)
                select.addEventListener('change', (event) => {
                    const target = event.target;
                    const parent = target.parentElement;
                    let id = parent.parentElement.parentElement.id
                    let split_datas = last_datas.split('-');

                    let user = 
                        {
                            username: target.parentElement.id,
                            grade:split_datas[0].trim(),
                            actual_team: parent.parentElement.parentElement.id,
                            new_team: target.value,
                            delete_team: null,
                        }
                    if(parent.parentElement.childNodes.length === 1) {user.delete_team = true}
                    sendTeamDatas(id,user,null,null,"update_user");
                });

                

                const cancel_button = document.createElement('span');
                cancel_button.classList.add('material-symbols-outlined');
                cancel_button.setAttribute('id','cancel_team_change')
                cancel_button.innerText = "close";
                target.appendChild(cancel_button);
                cancel_button.addEventListener('click', () => {
                    const users_table = document.getElementById('users_table');
                    const home_div = document.getElementById('home_div');
                    const teams = document.getElementById('teams');
                    const footer = document.querySelector('footer');
                    
                    users_table.remove()
                    home_div.remove()
                    teams.remove()
                    footer.remove()

                    Users()
                    Teams()
                    Footer()
                })
            }
        
            if(target.id === "team_vehicule") {
                target.innerHTML = ''
                datas.vehicules.forEach(vehicule => {
                    const option = document.createElement('option')
                    option.value = vehicule;
                    option.innerText = vehicule;
                    select.appendChild(option)
                })
                target.appendChild(select);
                select.addEventListener('change', (event) => {
                    const target = event.target;
                    const parent = target.parentElement;

                    let id = parent.parentElement.id;
                    let vehicule = target.value;

                    sendTeamDatas(id,null,vehicule,null,"update_vehicule")
                })
            }
        
            if(target.id === "team_status") {
                datas.status.forEach(statut => {
                    const option = document.createElement('option');
                    option.value = statut;
                    option.innerText = statut
                    select.appendChild(option);
                })
                target.innerHTML = ''
                target.appendChild(select)
                select.addEventListener('change', (event) => {
                    const target = event.target;
                    const parent = target.parentElement;

                    let id = parent.parentElement.id;
                    let status = target.value;
                    sendTeamDatas(id,null,null,status,"update_status")
                })
            }
        })
    })
}

function sendTeamDatas(id,user,vehicule,status,request_type,event) {
    fetch('/update_teams', {
        method:'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id,user,vehicule,status,request_type})
    })
    .then(response => {
        if(response.ok) {
            const users_table = document.getElementById('users_table');
            const teams = document.getElementById('teams');
            
            switch (request_type) {
                case 'update_user':
                    users_table.childNodes[1].childNodes.forEach(child => {
                        if(child.id === user.username) {
                            if(!isNaN(user.new_team) && Number(user.new_team) > -1) {
                                child.childNodes[3].innerText = `Équipe ${Number(user.new_team) + 1}`
                            } else if(!isNaN(user.new_team) && user.new_team === "-1"){
                                child.childNodes[3].innerText = "Aucune assignation"
                            } else {
                                child.childNodes[3].innerText = user.new_team
                            }
                        }
                    })

                    teams.childNodes[id].childNodes[2].childNodes.forEach(child => {
                        if(child.id === user.username && user.new_team !== id) {
                            child.remove();
                        }
                    })
                    break;
                case 'update_vehicule':
                    teams.childNodes[id].childNodes[3].innerText = vehicule;
                    teams.childNodes[id].childNodes[3].addEventListener('click', TeamsEvents)
                    break;
                case 'update_status':
                    teams.childNodes[id].childNodes[4].innerText = status;
                    teams.childNodes[id].childNodes[4].addEventListener('click', TeamsEvents);

                    if(status === "Libre") {
                        teams.childNodes[id].classList = [];
                        teams.childNodes[id].classList.add('available')
                    } else if(status === "Occupé") {
                        teams.childNodes[id].classList = [];
                        teams.childNodes[id].classList.add('unavailable');
                    } else {
                        teams.childNodes[id].classList = [];
                        teams.childNodes[id].classList.add('undefined-status')
                    }
                    break;
            }
            if(user !== null && user.delete_team) {
                const user_table = document.getElementById('users_table');
                const home_div = document.getElementById('home_div');
                const teams = document.getElementById('teams');
                const footer = document.querySelector('footer');

                user_table.remove()
                home_div.remove()
                teams.remove();
                footer.remove();

                Users();
                setTimeout(Teams, 50)
                setTimeout(Footer,100)
            } else {
                const user_table = document.getElementById('users_table');
                const teams = document.getElementById('teams');
                const footer = document.querySelector('footer');

                user_table.remove()
                teams.remove();
                footer.remove();

                Users();
                setTimeout(Teams, 50)
                setTimeout(Footer,100)
            }
            
        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function addUser(event) {
    const target = event.target;
    target.disabled = true;


    const table = document.getElementById('users_table');
    const table_body = table.childNodes[1];

    const new_user = document.createElement('tr');
    table_body.replaceChild(new_user,target.parentElement);

        const new_username = document.createElement('td');
        new_user.appendChild(new_username);

            const new_username_data = document.createElement('input');
            new_username_data.type = "text";
            new_username_data.required = true
            new_username_data.placeholder="Jean-Marc DuGoulag";
            new_username.appendChild(new_username_data);

        const new_grade = document.createElement('td');
        new_user.appendChild(new_grade);

            const new_grade_select = document.createElement('select');

                const blank_option = document.createElement('option');
                blank_option.value=-1;
                new_grade_select.appendChild(blank_option);

                fetch('/data/data.json')
                .then(response => response.json())
                .then(datas => {
                    datas.grades.forEach(grade => {
                        const option = document.createElement('option');
                        option.value = grade;
                        option.innerText = grade;
                        new_grade_select.appendChild(option);
                    });

                    const add_grade_option = document.createElement('option');
                    add_grade_option.value ="add_grade";
                    add_grade_option.innerText = "Ajouter un grade";
                    new_grade_select.appendChild(add_grade_option);

                    new_grade.appendChild(new_grade_select)

                   new_grade_select.addEventListener('click', (event) => {
                        const target = event.target;
                        const parent = target.parentElement;

                        if(target.value === "add_grade") {
                            const new_grade_input = document.createElement('input');
                            new_grade_input.setAttribute('id','add_grade')
                            new_grade_input.type="text";
                            new_grade_input.placeholder = "Biatch du directeur";
                            parent.insertBefore(new_grade_input,target);
                            target.remove()
                        }
                   })
                });
                
        
        const new_status = document.createElement('td');
        new_user.appendChild(new_status);

            const new_status_check = document.createElement('input');
            new_status_check.type="checkbox";
            new_status.appendChild(new_status_check);

        const new_team = document.createElement('td');
        new_user.appendChild(new_team);

            const new_team_select = document.createElement('select');

                const blank_team_option = document.createElement('option');
                blank_team_option.value=-1
                new_team_select.appendChild(blank_team_option);

                const direction_option = document.createElement('option');
                direction_option.value = "Direction";
                direction_option.innerText = "Direction";
                new_team_select.appendChild(direction_option);

                const reception_option = document.createElement('option');
                reception_option.value="Accueil";
                reception_option.innerText = "Accueil";
                new_team_select.appendChild(reception_option);

                fetch('/data/users.json')
                .then(response => response.json())
                .then(users => {
                    let team_list = [];
                    users.forEach(user => {
                        if(!isNaN(user.team) && user.team > -1 && !team_list.includes(user.team)) {team_list.push(user.team)};
                    })
                    team_list.sort(function(a,b) {return a - b});
                    team_list.forEach(team => {
                        const option = document.createElement('option');
                        option.value = team;
                        option.innerText = `Équipe ${Number(team) + 1}`;
                        new_team_select.appendChild(option);
                    })

                    const add_team_option = document.createElement('option');
                    add_team_option.value="add_team";
                    add_team_option.innerText = "Ajouter une équipe";
                    new_team_select.appendChild(add_team_option);

                    new_team.appendChild(new_team_select);

                    new_team_select.addEventListener('click', (event) => {
                        const target = event.target;
                        const parent = target.parentElement;

                        if(target.value === "add_team") {
                            const new_team_input = document.createElement('input');
                            new_team_input.setAttribute('id','add_team');
                            new_team_input.type = "text";
                            new_team_input.placeholder = 'Salle de "repos" 😏';

                            parent.insertBefore(new_team_input,target);
                            target.remove()
                        }
                    })
                });

            const confirm = document.createElement('span');
            confirm.classList.add('material-symbols-outlined');
            confirm.innerText="done";
            new_user.appendChild(confirm);
            confirm.addEventListener('click', (event) => {
                const target = event.target;
                const parent = target.parentElement;

                let isSet_username = parent.childNodes[0].childNodes[0].value.length > 0 ? true : false;
                let isSet_grade = parent.childNodes[1].childNodes[0].value.length > 0 ? true : false;
                let isSet_team = parent.childNodes[3].childNodes[0].value.length > 0 ? true : false;


                
                if(isSet_username && isSet_grade) {
                    let username = parent.childNodes[0].childNodes[0].value;
                    let grade = parent.childNodes[1].childNodes[0].value;
                    let status = parent.childNodes[2].childNodes[0].checked;
                    fetch('/data/teams.json')
                    .then(response => response.json())
                    .then(teams => {
                        let team;
                        if(isSet_team) {
                            team = parent.childNodes[3].childNodes[0].value;
                        } else {
                            team = teams.length
                        }
                        sendAddUserData(username,grade,status,team);
                    })
                } else {
                    const error_span = document.createElement('span');
                    error_span.classList.add('error-span');
                    error_span.setAttribute('id',"error_span");

                    switch (false) {
                        case isSet_username:
                            error_span.innerText = "Le nom d'utilisateur doit être remplis"
                            parent.childNodes[0].appendChild(error_span);
                            break;
                        case isSet_grade:
                            error_span.innerText = "Le grade ne peux pas être vide";
                            parent.childNodes[1].appendChild(error_span);
                            break;
                    }
                }
            })

            const cancel = document.createElement('span');
            cancel.classList.add('material-symbols-outlined');
            cancel.innerText = "close";
            new_user.appendChild(cancel);
            cancel.addEventListener('click', (event) => {
                const target = event.target;
                const parent = target.parentElement;

                const add_tr = document.createElement('tr');
                add_tr.classList.add('add-user')
                table_body.appendChild(add_tr);
                
                    const add_button = document.createElement('button');
                    add_button.setAttribute('id','add_user')
                    add_button.type="button"
                    add_button.innerText="Ajouter un utilisateur";
                    add_tr.appendChild(add_button);

                    add_button.addEventListener('click',addUser)
                    parent.remove()
            })
}

function sendAddUserData(username,grade,status,team) {
    fetch('/add_user', {
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username,grade,status,team})
    })
    .then(response => {
        if(response.ok) {
            const users_table = document.getElementById('users_table');
            const retrieve_add_button = users_table.querySelector('tfoot tr button');
            const retrieve_add_user_tr = users_table.childNodes[1].childNodes[users_table.childNodes[1].childNodes.length -1];
            
            const teams = document.getElementById('teams');
            const footer = document.querySelector('footer')

            users_table.remove()
            teams.remove();
            footer.remove()
            
            Users();
            Teams()
            Footer()

            retrieve_add_user_tr.remove();

        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function sendDeleteUser(username,grade) {
    fetch('/delete_user', {
        method:'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username,grade})
    })
    .then(response => {
        if(response.ok) {
            const users_table = document.getElementById('users_table');
            const teams = document.getElementById('teams');
            const footer = document.querySelector('footer')

            users_table.remove();
            teams.remove();
            footer.remove();
            
            Users();
            Teams();
            Footer();

        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function modalDatas(event) {
    const target = event.target;
    const parent = target.parentElement;

    const data_input = document.createElement('input');
    data_input.setAttribute('id',target.innerText);
    data_input.value = target.innerText;

    parent.insertBefore(data_input,target);
    target.remove()

    data_input.addEventListener('blur', (event) => {
        let target = event.target;
        let parent = target.parentElement;

        const new_data = document.createElement('p');
        new_data.setAttribute('id',target.id)
        new_data.innerText = target.value;
        parent.insertBefore(new_data,target);
        target.remove();
        new_data.addEventListener('click', modalDatas);
    })

}

function sendModalDatas(event) {
    const target = event.target;
    const modal = target.parentElement.parentElement
    const grades_datas = document.getElementById('modal_grades');
    const vehicules_datas = document.getElementById('modal_vehicules');
    const status_datas = document.getElementById('modal_status');
    const teams_datas = document.getElementById('modal_teams');
    
    let grades_array = [];
    let vehicules_array = [];
    let status_array = [];
    let teams_array = [];

    // GRADES //
    grades_datas.childNodes[1].childNodes.forEach(child => {
        if(child.childNodes[0].innerText !== undefined) {
            grades_array.push(child.childNodes[0].innerText)
        }
    })
    

    // VEHICULES //
    vehicules_datas.childNodes[1].childNodes.forEach(child => {
        if(child.childNodes[0].innerText !== undefined) {
            vehicules_array.push(child.childNodes[0].innerText)
        }
    })

    // STATUS //
    status_datas.childNodes[1].childNodes.forEach(child => {
        if(child.childNodes[0].innerText !== undefined) {
            status_array.push(child.childNodes[0].innerText)
        }
    })

    // TEAM //
    teams_datas.childNodes[1].childNodes.forEach(child => {
        if(child.childNodes[0].innerText !== undefined) {
            teams_array.push(child.childNodes[0].innerText)
        }
    })

    fetch('/update_datas', {
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({grades : grades_array, vehicules: vehicules_array, status: status_array, teams: teams_array})
    })
    .then(response => {
        if(response.ok) {
            modal.remove();
            const get_data_button = document.getElementById('header_status');
            get_data_button.addEventListener('click', Datas)
        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function Footer() {
    const footer = document.createElement('footer');
    document.body.appendChild(footer);

        const contact_us = document.createElement('span');
        contact_us.href="#contact_us";
        contact_us.innerText="Contact"
        footer.appendChild(contact_us);

        contact_us.addEventListener('click', ContactFooter)
}

function ContactFooter(event) {
    event.target.parentElement.classList.add('contact-us');
    event.target.parentElement.innerHTML="";
    const footer  = document.querySelector('.contact-us')

        const contact_div = document.createElement('div');
        footer.appendChild(contact_div);

            const close_footer = document.createElement('span');
            close_footer.classList.add('material-symbols-outlined');
            close_footer.innerText = "keyboard_arrow_down";
            contact_div.appendChild(close_footer)
            close_footer.addEventListener('click', (event) => {
                const footer = document.querySelector('footer');

                footer.innerHTML = ""
                footer.classList = []

                const contact_us = document.createElement('span');
                contact_us.href="#contact_us";
                contact_us.innerText="Contact"
                footer.appendChild(contact_us);
        
                contact_us.addEventListener('click', ContactFooter)
            })


            const paragraph = document.createElement('div');
            contact_div.appendChild(paragraph);

                const firstP = document.createElement('h4');
                firstP.innerText = "Pour me contacter : ";
                paragraph.appendChild(firstP);

                const secondP = document.createElement('p');
                secondP.innerText = "- Discord : "
                paragraph.appendChild(secondP);

                    const discord_link = document.createElement('a');
                    discord_link.href = "https://discord.gg/uaqwRevDYJ";
                    discord_link.target="_blank";
                    discord_link.innerText = "Pastèque Mûre";
                    secondP.appendChild(discord_link);

                const thirdP = document.createElement('p');
                thirdP.innerText = "- OdysKyZ : Harcelez le 😏";
                paragraph.appendChild(thirdP);
}

function sendClearStatus(users) {
    fetch('/clear_all_status', {
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({users})
    })
    .then(response => {
        if(response.ok) {
            const users_table = document.getElementById('users_table');
            const home_div = document.getElementById('home_div');
            const teams = document.getElementById('teams');
            const footer = document.querySelector('footer');

            users_table.remove()
            home_div.remove()
            teams.remove();
            footer.remove()
            
            Users();
            Teams()
            Footer()

        } else {

        }
    })
    .catch(error => {
        console.error(error)
    })
}

function sendClearTeam(users) {
    fetch('/clear_teams', {
        method:'post',
        headers:{
            'content-type':"application/json"
        },
        body: JSON.stringify({users})
    })
    .then(response => {
        if(response.ok) {
            const users_table = document.getElementById('users_table');
            const home_div = document.getElementById('home_div');
            const teams = document.getElementById('teams');
            const footer = document.querySelector('footer');

            users_table.remove();
            home_div.remove();
            teams.remove();
            footer.remove()

            Users()
            Teams()
            Footer()
        } else {
            
        }
    })
    .catch(error => {
        console.error(error)
    })
}