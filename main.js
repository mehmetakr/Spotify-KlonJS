/* Elementlere ulasıp proje olarak kullanma ,yakalama */

const prevbutton = document.getElementById("back");
const nextbutton = document.getElementById("next");
const repeatbutton = document.getElementById("repeat");
const shufflebutton = document.getElementById("shuffle");
const pausebutton = document.getElementById("pause");
const playbutton = document.getElementById("play");

const audio = document.getElementById("audio");
const songImage = document.getElementById("songImage");
const songname = document.getElementById("songname");
const songartist = document.getElementById("songartist");

const playlistButton = document.getElementById("playlist");

const maxduration = document.getElementById("maxduration");
const currentTimeRef = document.getElementById("currentTime");

const progresbar = document.getElementById("progresbar");
const playListContainer = document.getElementById('playlistcontainer')
const closeButton = document.getElementById("closebutton");
const playlistSongs = document.getElementById("playlistsong");

const currentProgres = document.getElementById("currentprogres");

//sıra
let index;

//dongu
let loop = true;

//json sarkı liste yapısı

const songlist = [
  {
    name: "Sensiz Ben",
    link: "assets/sensizben.mp3",
    artist: "Pera",
    image: "assets/ben.jpg",
  },
  {
    name: "Where is My Mind",
    link: "assets/wherismy.mp3",
    artist: "Pixies",
    image: "assets/biz.jpg",
  },
  {
    name: "Anlat Ona",
    link: "assets/yedinciEv.mp3",
    artist: "Yedinci Ev",
    image: "assets/anlatona.jpeg",
  },
  {
    name: "Lose Yourself",
    link: "assets/Loseyourself.mp3",
    artist: "Eminem",
    image: "assets/eminem.jpg",
  },
  {
    name: "Human",
    link: "assets/humanRagnbomen.mp3",
    artist: "Rag'n'Bone Man",
    image: "assets/human.jpeg",
  },

  {
    name: "Cevapsiz sorular",
    link: "assets/cevapsizsorular.mp3",
    artist: "MANGA",
    image: "assets/cevapsizsorular.jpg",
  },

  {
    name: "Happy",
    link: "assets/pharrelwilliams.mp3",
    artist: "Pharrel Williams",
    image: "assets/pharrel.jpeg",
  },

  {
    name: "See You Again",
    link: "assets/seeyouagain.mp3",
    artist: "Wiz Khalifa feat Charlie Puth",
    image: "assets/paul.jpg",
  },

  {
    name: "Bir Derdim Var",
    link: "assets/birderdimvar.mp3",
    artist: "Mor ve Ötesi",
    image: "assets/birderdimvar.jpg",
  },
];

//ŞARKI ATAMA

// time formater
const timeformatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songlist[arrayIndex];

  console.log(name);
  console.log(link);
  console.log(artist);
  console.log(image);
  // audio atanacak

  audio.src = link;
  songname.innerHTML = name;
  songartist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    // en fazla vakti ver max duration
    maxduration.innerText = timeformatter(audio.duration);
  };

  // container eğer görünüyorsa yok et
playListContainer.classList.add("hide")
 

  playAudio();
};

const playAudio = () => {
  audio.play();

  pausebutton.classList.remove("hide");
  playbutton.classList.add("hide"); // Hata düzeltildi, classList.add kullanıldı
};

// play button

const pauseAudio = () => {
  audio.pause();

  pausebutton.classList.add("hide");
  playbutton.classList.remove("hide"); // Hata düzeltildi, classList.add kullanıldı
};

const nextsong = () => {
  if (!loop) {
    if (index == songlist.length - 1) {
      index = 0;
    } else {
      index += 1;
    }

    setSong(index);
    playAudio();
  } else {
    let randIndex = Math.floor(Math.random() * songlist.length);
    console.log(randIndex);
    setSong(randIndex);
    playAudio();
  }
};

const prevsong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    index = songlist.length - 1;
  }
  setSong(index);
  playAudio();
};

audio.onended = () => {
  nextsong();
};

progresbar.addEventListener("click", (event) => {
  let conordstart = progresbar.getBoundingClientRect().left;

  let coordEnd = event.clientX;
  let progress = (coordEnd - conordstart) / progresbar.offsetWidth;

  currentProgres.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  console.log(conordstart);
  console.log(coordEnd);
  console.log(progress);
  console.log(audio.currentTime);

  audio.play();
  pausebutton.classList.remove("hide");
  playbutton.classList.add("hide");
});

// kariştir tıklanıldıgında
shufflebutton.addEventListener("click", () => {
  if (shufflebutton.classList.contains("active")) {
    shufflebutton.classList.remove("active");
    loop = true;

    console.log("kariştirma kapali");
  } else {
    shufflebutton.classList.add("active")
    loop = false
    console.log("kariştirma açik")
  }
});
 
//TEKRAR ET TIKLANILDIGINDA 


 repeatbutton.addEventListener("click", () =>{

  if (repeatbutton.classList.contains("active")) {
    repeatbutton.classList.remove("active");
    loop = false;

    console.log("tekrar kapali");
  } else {
    repeatbutton.classList.add("active")
    loop = true
    console.log("tekrar açik")
  }


 })

 const initializeplaylist = () =>{

for( const i in songlist){

playlistSongs.innerHTML +=`<li class= "playlistsong" 
onclick ="setSong(${i})">
<div class ="playlist-image-container">
<img src="${songlist[i].image}"/>
</div>
<div class= "playlist-song-details">
<span id ="playlist-song-name">
${songlist[i].name}
</span>
<span id ="playlist-song-artist-album">
${songlist[i].artist}
</span>
</div>
</li>`

}

 }

 playlistButton.addEventListener("click", () =>{


  playListContainer.classList.remove("hide")
 })

 closeButton.addEventListener("click", ()=>{

playListContainer.classList.add("hide")

 })

 playbutton.addEventListener("click", playAudio);
 // durdur butonu
 pausebutton.addEventListener("click", pauseAudio);
 // sonrakine git
 nextbutton.addEventListener("click", nextsong);
 //  öncekine git
 prevbutton.addEventListener("click", prevsong);
 

setInterval(() => {
  currentTimeRef.innerHTML = timeformatter(audio.currentTime);
  currentProgres.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

// zaman güncellemesi yakala

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeformatter(audio.currentTime);
});

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializeplaylist()
  // oynatma listesını ayarla
};
