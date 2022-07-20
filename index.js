console.log("Notify!");

// Variables
var defaultSongIndex = 1;
var currentSong = new Audio("songs/"+defaultSongIndex+".mp3");
let masterPrevious = document.querySelectorAll(".mastercontrol")[0];
let masterPlay = document.querySelectorAll(".mastercontrol")[1];
let masterNext = document.querySelectorAll(".mastercontrol")[2];
let progressBar = document.querySelector("#progressbar");

let songs= [
  {
    songName:"Raabta",
    songPath:"songs/1.mp3",
    songCoverPath:"covers/1.jpg",
  },
  {
    songName:"Ashes on Fire",
    songPath:"songs/2.mp3",
    songCoverPath:"covers/2.jpg",
  },
  {
    songName:"Breathless",
    songPath:"songs/3.mp3",
    songCoverPath:"covers/3.jpg",
  },
  {
    songName:"Na Na Na Na",
    songPath:"songs/4.mp3",
    songCoverPath:"covers/4.jpg",
  },
  {
    songName:"Waat bhagtoy rikshawala",
    songPath:"songs/5.mp3",
    songCoverPath:"covers/5.jpg",
  },
  {
    songName:"Bhaak DK Bose",
    songPath:"songs/6.mp3",
    songCoverPath:"covers/6.jpg",
  },
  {
    songName:"Banja Rani",
    songPath:"songs/7.mp3",
    songCoverPath:"covers/7.jpg",
  },
  {
    songName:"Halka halka",
    songPath:"songs/8.mp3",
    songCoverPath:"covers/8.jpg",
  },
  {
    songName:"Bheegi bheegi si hai",
    songPath:"songs/9.mp3",
    songCoverPath:"covers/9.jpg",
  },
  {
    songName:"Phasuri",
    songPath:"songs/10.mp3",
    songCoverPath:"covers/10.jpg",
  }
]

//FUNCTIONS
function iconChangeAllPlayPause(k){
  for(var i=0; i<document.querySelectorAll(".songPlaylistIcons").length; i++){
    if(i+1!=k){
      document.querySelectorAll(".songPlaylistIcons")[i].classList.remove("fa-pause");
      document.querySelectorAll(".songPlaylistIcons")[i].classList.add("fa-play");
    }

  }
}

function iconChangeAllPausePlay(k){
  for(var i=0; i<document.querySelectorAll(".songPlaylistIcons").length; i++){

      document.querySelectorAll(".songPlaylistIcons")[i].classList.remove("fa-play");
      document.querySelectorAll(".songPlaylistIcons")[i].classList.add("fa-pause");


  }
}


//Events

//Play song and Pause Song From MasterKey
function playSong(defaultSongIndex){
  currentSong.src = songs[defaultSongIndex-1].songPath;
  masterPlay.addEventListener("click", function(){
    if(currentSong.paused || currentSong.currentTime==0){
      //Chaning the playlist
      //iconChangeAllPlayPause(index);
      document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.remove("fa-play");
      document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.add("fa-pause");
      currentSong.play();
      currentSong.loop = true;
      this.innerHTML ='<i class="fa fa-regular fa-pause icons">';
      document.querySelector(".gif").classList.add("gifplaying");
    }
    else{
      currentSong.pause();
      document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.remove("fa-pause");
      document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.add("fa-play");
      this.innerHTML ='<i class="fa fa-regular fa-play icons">';
      document.querySelector(".gif").classList.remove("gifplaying");
    }
    console.log(currentSong.currentTime);
  })






//Timeupdate even for audiio object for progressbar
currentSong.addEventListener("timeupdate", function(){
  let progress  = (currentSong.currentTime/currentSong.duration)*100;
  document.querySelector("#progressbar").value = progress;

})

document.querySelector("#progressbar").addEventListener("input", function(){
  //console.log(document.querySelector("#progressbar").value);
  let progressChange = (document.querySelector("#progressbar").value*currentSong.duration)/100;
  currentSong.currentTime = progressChange;
})
}


//playSong(1);
playSong(defaultSongIndex);


//Accesing the playlist
for(var i=0; i<document.querySelectorAll(".songitem").length; i++){
  document.querySelectorAll(".songitem")[i].addEventListener("click", function(){
    console.log(this.querySelector("i"));

    //Setting the play pause button of playlist
    this.querySelector("i").classList.remove("fa-play");
    this.querySelector("i").classList.add("fa-pause");
    iconChangeAllPlayPause(this.classList[1]);

    //Playing the song
    currentSong.pause();
    defaultSongIndex = this.classList[1];

    console.log(defaultSongIndex);
    currentSong.src = songs[defaultSongIndex-1].songPath;
    console.log(currentSong);
    currentSong.currentTime=0;
    currentSong.play();

    //setting masterkey
    masterPlay.innerHTML ='<i class="fa fa-regular fa-pause icons">';

    //Chaning the masteImage
    document.querySelector("#bottom").querySelector('img').setAttribute("src", songs[defaultSongIndex-1].songCoverPath);
  })
}


//Setting next MasterKey
masterNext.addEventListener("click", function(){
  defaultSongIndex++;

  if(defaultSongIndex>10){
    defaultSongIndex=1;
  }
  //Chaning the playlist
  iconChangeAllPlayPause(defaultSongIndex);
  document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.remove("fa-play");
  document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.add("fa-pause");

  //Playing the song
  currentSong.pause();
  currentSong.src = songs[defaultSongIndex-1].songPath;
  currentSong.currentTime=0;
  currentSong.play();

  //Chaningthe masterplay
  masterPlay.innerHTML ='<i class="fa fa-regular fa-pause icons">';
  document.querySelector("#bottom").querySelector('img').setAttribute("src", songs[defaultSongIndex-1].songCoverPath);
  document.querySelector("#bottom").querySelector('span').innerHTML = songs[defaultSongIndex-1].songName;


  console.log(  document.querySelector("#bottom").querySelector('img'));

})


masterPrevious.addEventListener("click", function(){
  defaultSongIndex--;
  if(defaultSongIndex<1){
    defaultSongIndex=10;
  }
  iconChangeAllPlayPause(defaultSongIndex);
  document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.remove("fa-play");
  document.querySelectorAll(".songitem")[defaultSongIndex-1].querySelector("i").classList.add("fa-pause");
  currentSong.pause();
  currentSong.src = songs[defaultSongIndex-1].songPath;
  currentSong.currentTime=0;
  currentSong.play();
  masterPlay.innerHTML ='<i class="fa fa-regular fa-pause icons">';
  document.querySelector("#bottom").querySelector('img').setAttribute("src", songs[defaultSongIndex-1].songCoverPath);
  document.querySelector("#bottom").querySelector('span').innerHTML = songs[defaultSongIndex-1].songName;

})
