/* Implements most fetch requests from page to server's schema bancoti2
 * Authentication and user registration are not included, as they required
 * addition protection steps and are hard coded.
 */

/* General function for get request
 * This was done as all of them returned a json
 * @param: path, expected fetch path
 * @param: id, expected filter id. Can be ignored
 * @return: json, results from server, null in case of error
 */
export function restfulJsonGet (path, id) {
    if (id != null) path = path + '/' + id;
    fetch (path, {
        method: 'GET'
    })
    .then (response => {
        //used when id is not found
        if (response == 400)  console.warn('Failure receive from server -> couldnt find id ' + id);
        else if (!response.ok) console.error('API failed with status ' + response.status);
        else return response.json();
    })
    .then (json => {
        console.log('json obtained from ' + path);
        console.log(json);

        return json;
    })
    .catch (error => {
        console.error(error);

        return null;
    })
}

/* General function for posting json to database
 * This was done as almost all insertion functions sent jsons 
 * @param: path, required path
 * @param: reqJson, required json to send the infromation
 * @return: boolean, true on success
 */
export function restfulJsonPost (path, reqJson) {
    fetch (path, {
        method: 'POST',
        body: JSON.stringify(reqJson),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then (response => {
        //used when json values where not found
        if (response == 400)  console.warn('Failure receive from server -> data invalid or not found for \n' + reqJson);
        else if (!response.ok) console.error('API failed with status ' + response.status);
        else return true;

        return false;
    })
}

// Paths that are used implemented on this method
export const getPaths = {
    forumExplore: '/forum/explore', //no id (for now) 
    postDetails: '/forum/post/load', //requires id  
    exercicios: '/exercicios', //requires id

    perfil: '/perfil', //requires id
    sobremim: '/perfil/sobremim', //requires id 
    plano: '/perfil/planos' //requires id
}

export const postPaths = {
    forumComment: '/forum/post/comment'
}

