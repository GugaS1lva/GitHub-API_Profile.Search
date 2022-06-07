const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário.">
            <div class="data">
                <h1>${user.name ?? 'Não possui nome cadastrado 😭'}</h1>
                <p>${user.bio ?? 'Não possui bio cadastrada 😭'}</p>
                <hr>
                <div class="social">
                    <div class="follow followers">
                        <h4><i class="fa-solid fa-user-group"></i> Followers</h4>
                        <p>${user.followers}</p>
                    </div>
                    <div class="follow following">
                        <h4><i class="fa-solid fa-user-group"></i> Following</h4>
                        <p>${user.following}</p>
                    </div>
                </div>
            </div>
        </div>`

        let repositoriesItems = ''
        user.repositories.forEach(repo => repositoriesItems += `
        <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}<br>
                <span>
                    <p>🍴${repo.forks}</p>
                    <p>⭐${repo.stargazers_count}</p>
                    <p>👀${repo.watchers}</p>
                    <p>🧑🏻‍💻${repo.language ?? 'Sem Linguagem :('}</p>
                </span>
            </a>
        </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <hr>
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
                <hr>
            </div>`
        }

        document.querySelector('.profile-data').innerHTML += `
        <div class="activityInfo">
            <h2 id="activityTittle">Atividades</h2>
        </div>`

        user.activities.forEach( repoName => {
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
    },

    renderNotFound(){
        this.userProfile.innerHTML = '<h3>[ERRO] Usuário não encontrado <i class="fa-solid fa-bug"></i></h3>'
    }
}

export {screen}