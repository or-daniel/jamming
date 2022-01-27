
export let accessToken = localStorage.getItem('access_token');


const Spotify = {
    
    checkIfLogged(){
        if (accessToken) return accessToken;
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // if redirected with params in URL
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            localStorage.setItem('access_token',accessToken);
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(()=>localStorage.setItem('access_token',accessToken), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/jamming/');
            return accessToken; 
        } else {
            return false;
        }
    },
    
    getAccessToken(){
        const clientId = '746dbece2eac47189824e42d126572fe';
        const redirectUri = window.location.href;
        
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    },

    search(term) {
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
        return fetch(searchUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => response.json())
          .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }
            })
          });
      },

    savePlaylist(name, trackUris){
        if (!name || !trackUris.length){
            return;
        }

        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers : headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
};



export default Spotify;

