        const music = document.querySelector(".audio");
        const img = document.querySelector(".img");
        const play = document.getElementById("play");
        const artist = document.getElementById("artist-name");
        const title = document.getElementById("music-name");
        const prev = document.getElementById("prev");
        const next = document.getElementById("next");
        const progressArea = document.querySelector(".progress-area");
        const main = document.getElementById("music-box");
        const songs = [{
                name: 'Music1',
                title: 'Far from the city',
                artist: 'Artist 1',
            },
            {
                name: 'Music2',
                title: 'little adventure',
                artist: 'Artist 2',
            },
            {
                name: 'Music3',
                title: 'Faded',
                artist: 'Artist 3',
            },
            {
                name: 'Music4',
                title: 'Hard 2',
                artist: 'Artist 4',
            },
            {
                name: 'Music5',
                title: 'country pop',
                artist: 'Artist 5',
            },
            {
                name: 'Music6',
                title: 'saloon',
                artist: 'Artist 6',
            },
            {
                name: 'Music7',
                title: 'Western',
                artist: 'Artist 7',
            },
            {
                name: 'Music8',
                title: 'Running fiddres',
                artist: 'Artist 8',
            }];

        let isPlaying = false;
        let pointer = 0;
        title.textContent = songs[pointer].title;
        artist.textContent = songs[pointer].artist;
        
        //getting list of songs
        for (let i = 0; i < songs.length; i++) {
            let liTag = ` <div class="music-info" data-index="${i}" >
            <div class="music-img">
            <img src="images/${songs[i].name}.jpg"/>
            </div>
            <audio class="${songs[i].name}" src="musics/${songs[i].name}.mp3"></audio>
            <div class="musics">
            <h6>${songs[i].title}</h6>
            <p >${songs[i].artist}</p>
            </div>
            <span id="${songs[i].name}" class="time"></span>
            </div>`;
            main.insertAdjacentHTML("beforeend", liTag);

            //duration of each song
            let liduration = main.querySelector(`#${songs[i].name}`);
            let liaudio = main.querySelector(`.${songs[i].name}`);
            liaudio.addEventListener("loadeddata", ()=>{
                let duration = liaudio.duration;
                let totalMin = Math.floor(duration / 60);
                let totalSec = Math.floor(duration % 60);
                if(totalSec < 10){ 
                totalSec = `0${totalSec}`;
                };
                liduration.innerText = `${totalMin}:${totalSec}`; 
                });
        }

        //set onclick function on list of music
        function playingSong() {
            const allLiTag = main.getElementsByClassName("music-info");
            for (let j = 0; j < allLiTag.length; j++) {
                let audioduration = allLiTag[j].querySelector(".time");
                if(allLiTag[j].classList.contains("playing")){
                allLiTag[j].classList.remove("playing");                 
                }
                if (allLiTag[j].getAttribute("data-index") == pointer) {
                    allLiTag[j].classList.add("playing");                
                }
                allLiTag[j].setAttribute("onclick", "clicked(this)");
            }
        }

        //play music function
        const playMusic = () => {
            isPlaying = true;
            music.play();
            play.classList.replace("fa-play", "fa-pause");
            img.classList.add("anime");
        };

        //pause music function
        const pauseMusic = () => {
            isPlaying = false;
            music.pause();
            play.classList.replace("fa-pause", "fa-play");
            img.classList.remove("anime");
        };
        //play event listener
        play.addEventListener("click", () => {
            isPlaying ? pauseMusic(): playMusic();
            playingSong();
        });

        //list click event
        function clicked(element) {
            pointer = element.getAttribute("data-index");
            loadSong(songs[pointer]);
            playMusic(); 
            playingSong();
        }

        //load songs
        const loadSong = (songs) => {
            title.textContent = songs.title;
            artist.textContent = songs.artist;
            music.src = "musics/" + songs.name + ".mp3";
            img.src = "images/" + songs.name + ".jpg";
        };
        
        //next song function
        const nextSong = () => {
            pointer++;
            pointer = pointer % songs.length;
            loadSong(songs[pointer]);
            playingSong();
            playMusic();
            
        };

        //prev song function
        const prevSong = () => {
            pointer = (pointer - 1 + songs.length) % songs.length;
            loadSong(songs[pointer]);
            playMusic();
            playingSong();
        };

        //progress bar move
        music.addEventListener("timeupdate",(event) => {
            const currentTime = event.target.currentTime;
            const duration = event.target.duration;
            let progresstime = (currentTime / duration) * 100;
            document.querySelector(".progress-bar").style.width = progresstime + "%";
        });

        //update progress bar as per click
        progressArea.addEventListener("click", (event) => {
            const {duration} = music;
            let moveProgress = (event.offsetX / event.srcElement.clientWidth) * duration;
            music.currentTime = moveProgress;        
            playMusic(); 
            playingSong();    
        });

        //add event listener for next and prev
        next.addEventListener("click", nextSong);
        prev.addEventListener("click", prevSong);
   