import {getUser} from '../scripts/services/user.js'
import {getRepositories} from '../scripts/services/repositories.js'
import {getActivity} from '../scripts/services/activity.js'

import {user} from '../scripts/objects/user.js'
import {screen} from '../scripts/objects/screen.js'


// Fluxo para fazer a requisição do usuário que deseja buscar (requisição personalizada com o nome do usuário que deseja buscar)
// Aqui deve ser informado o nome do usuário que deseja
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserData(userName)
})

// Fluxo para pressionar Enter e buscar o usuário
document.getElementById('input-search').addEventListener('keyup', (event) => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        getUserData(userName)
    }
})

// Buscando as informações do usuário e pondo na tela (html)
async function getUserData(userName){

    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    const activitiesResponse = await getActivity(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setActivities(activitiesResponse)

    console.log(user)

    screen.renderUser(user)
}

/* PRESTES A SER REMOVIDO.... ==============================================================*/
// function getUserRepositories(userName){
//     getRepositories(userName).then(reposData => {
//         // console.log(reposData)
//         let repositoriesItems = ''
//         reposData.forEach(repo => {
//             repositoriesItems += `
//             <li>
//                 <a href="${repo.html_url}" target="_blank">${repo.name}<br>
//                     <span>
//                         <p>🍴${repo.forks}</p>
//                         <p>⭐${repo.stargazers_count}</p>
//                         <p>👀${repo.watchers}</p>
//                         <p>🧑🏻‍💻${repo.language ?? 'Sem Linguagem :('}</p>
//                     </span>
//                 </a>
//             </li>`
//         });

//         document.querySelector('.profile-data').innerHTML += `
//         <div class="repositories section">
//             <hr>
//             <h2>Repositórios</h2>
//             <ul>${repositoriesItems}</ul>
//             <hr>
//         </div>`
//     })
// }

// function getUserActivity(userName){
//     getActivity(userName).then(userActivity => {
//         // console.log(userActivity) -> Mostra Tudo!
//         // userActivity[4].repo.name
//         // userActivity[4].payload.commits[0].message
        
//         /**/
//         document.querySelector('.profile-data').innerHTML += `
//         <div class="activityInfo">
//             <h2 id="activityTittle">Atividades</h2>
//         </div>`

//         userActivity.forEach( repoName => {
//             const repoNOME = repoName.repo.name
            
//             if(repoName.payload){
//                 if(repoName.payload.commits){
//                     repoName.payload.commits.forEach( msg => {
//                         const commitMSG = msg.message
                        
//                         document.querySelector('.profile-data').innerHTML += `
//                         <span class="activityListClass">
//                             <ul>
//                                 <li>
//                                     <p><strong>${repoNOME}</strong>: ${commitMSG}</p>
//                                 </li>
//                             </ul>
//                         </span>`
//                     })
//                 }
//             }
//         })
//     })
// }