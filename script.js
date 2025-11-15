 
 window.addEventListener('load', bindEvents);

 function bindEvents(){
     loadAllSongs('Sonu Nigam');
    document.querySelector('#searchBt').addEventListener('click', searchSong);
 }

 function searchSong(){
    const singerName = document.querySelector('#searchTxt').value;
    loadAllSongs(singerName);
 }
 /*
  <div class="cards">
                    <img class="art" src="SOME URL" alt="FAIL TO SHOW IMAGE">
                    <div class="title"></div>
                    <div class="artist"></div>
                    <audio src="" controls></audio>
                </div>
 */
// Here i Create a Dynamic Card
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
            // const promise = fetch(URL); // async 
            // promise.then(function(response){
            //     const pr = response.json();
            //     pr.then(function(data){
            //         console.log('Data of Songs is ', data);
            //     }).catch(function(err){
            //         console.log('Invalid JSON ', err);
            //     })
            //     //console.log('Itunes api call Success');
            // }).catch(function(err){
            //     console.log('Itunes APi call Fails Error is ', err);
            // })
        }
       
