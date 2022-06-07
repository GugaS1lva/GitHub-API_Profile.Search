import {baseUrl, activityQuantity} from '../variables.js'

async function getActivity(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${activityQuantity}`)
    return await response.json()
}

export {getActivity}