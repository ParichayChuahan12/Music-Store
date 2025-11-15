 
 window.addEventListener('load', bindEvents);

 function bindEvents(){
     loadAllSongs('Sonu Nigam');
    document.querySelector('#searchBt').addEventListener('click', searchSong);
 }

 function searchSong(){
    const singerName = document.querySelector('#searchTxt').value;
    loadAllSongs(singerName);
 }

function createCard(songObject){
    const songDiv = document.querySelector('.songs');

    const cardDiv = document.createElement('div');

    const image = document.createElement('img');
    image.src = songObject.artworkUrl100;
    cardDiv.appendChild(image);

    const titleDiv = document.createElement('div');
    titleDiv.innerText = songObject.collectionName;
    cardDiv.appendChild(titleDiv);

    const artistDiv = document.createElement('div');
    artistDiv.innerText = songObject.artistName;
    cardDiv.appendChild(artistDiv);

    const audioTag = document.createElement('audio');
    audioTag.src = songObject.previewUrl;
    audioTag.controls = true;

    // Pause all other audios when this one starts
    audioTag.addEventListener('play', () => {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            if(audio !== audioTag){
                audio.pause();
            }
        });
    });

    cardDiv.appendChild(audioTag);
    songDiv.appendChild(cardDiv);
}

 
 async function loadAllSongs(singerName ){
            const URL = `https://itunes.apple.com/search?term=${singerName}&limit=50`;
            try{
            const response = await fetch(URL);
            const allSongs = await response.json();
            console.log('All Songs are ', allSongs.results);
            const songs =  allSongs.results;
            document.querySelector('.songs').innerHTML = '';
            for(let song of songs){
                createCard(song);
            }

            }
            catch(err){
                console.log('Fail to Load Songs ', err);
            }
            
        }
       
