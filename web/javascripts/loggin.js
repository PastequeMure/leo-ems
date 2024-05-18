document.addEventListener('DOMContentLoaded', () => {
    let isValidCookie = document.cookie.split(',').includes('userLogged=true');
    if(isValidCookie) {
        window.location.href = "/leo"
    }

    let retrieve_form = document.getElementById('login');
    retrieve_form.addEventListener('submit', retrieve_logs_data)
})

Footer()

function retrieve_logs_data(event) {
    event.preventDefault();
    const target = event.target

    let user = 
        {
            username: document.getElementById('username').value,
            password: document.getElementById("password").value,
            remember_me: document.getElementById('remember_me').checked
        }
    send_logs_data(user);
}

function send_logs_data(user) {
    fetch('/login', {
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username: user.username,password: user.password, remember_me:user.remember_me})
    })
    .then(response => {
        if(response.ok) {
            setCookie(user.username,user.remember_me);

            window.location.href = "/leo"
        } else {
            
        }
    })
    .catch(error => {
        console.error(error)
    })
}

function setCookie(username,remember_me) {
    if(remember_me) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);

        document.cookie = `userLogged=true,username=${username},expires=${expires}`
    } else {
        document.cookie = `userLogged=true,username=${username}`
    }
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
                thirdP.innerText = "- OdysKyZz : Harcelez le 😏";
                paragraph.appendChild(thirdP);
}
