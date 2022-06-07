// Fluxo para fazer a requisição quando o botão for pressionado (requisição já personalizada com o nome do usuário que deseja buscar)
// Aqui deve ser informado o nome do usuário que deseja buscar
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

// Fluxo para pressionar Enter e buscar o usuário
document.getElementById('input-search').addEventListener('keyup', (event) => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        getUserProfile(userName)
    }
})

// Requisição persinalizada com o nome do usuário que deseja buscar
async function user(userName){
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

async function repos(userName){
    const response = await fetch(`https://api.github.com/users/${userName}/repos?per_page=10`)
    return await response.json()
}

async function activity(userName){
    const response = await fetch(`https://api.github.com/users/${userName}/events?per_page=15`)
    return await response.json()
}

// Buscando as informações do usuário e pondo na tela (html)
function getUserProfile(userName){
    
    user(userName).then(userData => {
        // console.log(userData)
        let userInfo = `
        <div class="info">
            <img src="${userData.avatar_url}" alt="Foto do perfil do usuário.">
            <div class="data">
                <h1>${userData.name ?? 'Não possui nome cadastrado 😭'}</h1>
                <p>${userData.bio ?? 'Não possui bio cadastrada 😭'}</p>
                <hr>
                <div class="social">
                    <div class="follow followers">
                        <h4><i class="fa-solid fa-user-group"></i> Followers</h4>
                        <p>${userData.followers}</p>
                    </div>
                    <div class="follow following">
                        <h4><i class="fa-solid fa-user-group"></i> Following</h4>
                        <p>${userData.following}</p>
                    </div>
                </div>
            </div>
        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)

        getActivity(userName)
    })
}

function getUserRepositories(userName){
    repos(userName).then(reposData => {
        // console.log(reposData)
        let repositoriesItems = ''
        reposData.forEach(repo => {
            repositoriesItems += `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}<br>
                    <span>
                        <p>🍴${repo.forks}</p>
                        <p>⭐${repo.stargazers_count}</p>
                        <p>👀${repo.watchers}</p>
                        <p>🧑🏻‍💻${repo.language ?? 'Sem Linguagem :('}</p>
                    </span>
                </a>
            </li>`
        });

        document.querySelector('.profile-data').innerHTML += `
        <div class="repositories section">
            <hr>
            <h2>Repositórios</h2>
            <ul>${repositoriesItems}</ul>
            <hr>
        </div>`
    })
}

function getActivity(userName){
    activity(userName).then(userActivity => {
        // console.log(userActivity) -> Mostra Tudo!
        // userActivity[4].repo.name
        // userActivity[4].payload.commits[0].message

        document.querySelector('.profile-data').innerHTML += `
        <div class="activityInfo">
            <h2 id="activityTittle">Atividades</h2>
        </div>`

        userActivity.forEach( repoName => {
            const repoNOME = repoName.repo.name
            
            if(repoName.payload){
                if(repoName.payload.commits){
                    repoName.payload.commits.forEach( msg => {
                        const commitMSG = msg.message
                        
                        document.querySelector('.profile-data').innerHTML += `
                        <span class="activityListClass">
                            <ul>
                                <li>
                                    <p><strong>${repoNOME}</strong>: ${commitMSG}</p>
                                </li>
                            </ul>
                        </span>`
                    })
                }
            }
        })
    })
}