export function getJSON(url, apiKey) {
    return fetch(url, {
      method: 'GET',
      headers:{
        'api-key':apiKey
      }
    })
    .then( response => {
      if(response.ok) {
          return response;
      }
      throw Error(response.statusText);
      })
    .then( response => response.json() )
    .then( function(data) {
      return data;
    } )
    .catch( error => console.log('There was an error:', error))
  }

export function getIndex(Array, value){
    const target = Array.filter(function(item){
        return item.id == value;
    })
    const myIndex = Array.indexOf(target[0]);
    return myIndex;
}