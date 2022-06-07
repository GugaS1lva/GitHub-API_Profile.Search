import {baseUrl, repositoriesQuantity} from '../variables.js'

async function repositories(userName){
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export {repositories}