import {baseUrl, activityQuantity} from '../variables.js'

async function activity(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${activityQuantity}`)
    return await response.json()
}

export {activity}