// play()
// pause()
// next_song()
// back_song()
// swap_music()
var play_now = false;

// html
var play_button = document.getElementById("play_button");
var back_button = document.getElementById("back_button");
var next_button = document.getElementById("next_button");
var disk = document.getElementById("disk");

var autor_id = document.getElementById("autor_id");
var name_id = document.getElementById("name_id");
var disk_foto_id = document.getElementById("disk_foto_id");

var volume_ch = document.getElementById("volume_ch");
var now_status = document.getElementById("now_status");
// html
var currentSongId = 0;
var currentPlaylist = "b";
var ready = false;

var search = [];
var music_list = [];
var all_music = [];
var playlist = [];
var best_c = [];
var recomended = [];


function Music(id, autor, song_name, audio, im85, im200, im240){
    this.id = id;
    this.autor = autor;
    this.song_name = song_name;
    this.audio = audio;
    this.im85 = im85;
    this.im200 = im200;
    this.im240 = im240;
};

music_list.push(new Music(0, "Robert Parker", "`85again", "music/85again/85again_audio.mp3", "music/85again/85again85.png", "music/85again/85again200.png", "music/85again/85again240.png"));
music_list.push(new Music(1, "Robert Parker", "End of The Night", "music/endofthenight/endofthenight.mp3", "music/endofthenight/endofthenight85.png", "music/endofthenight/endofthenight200.png", "music/endofthenight/endofthenight240.png"));
music_list.push(new Music(2, "Timecop1983", "On The Run", "music/ontherun/ontherun.mp3", "music/ontherun/ontherun85.png", "music/ontherun/ontherun200.png", "music/ontherun/ontherun240.png"));
music_list.push(new Music(3, "J+1", "Alleyways", "music/alleywals/alleywalls.mp3", "music/alleywals/alleywalls85.png", "music/alleywals/alleywalls200.png", "music/alleywals/alleywalls240.png"));
music_list.push(new Music(4, "J+1", "Eclipse", "music/eclipse/eclipse.mp3", "music/eclipse/eclipse85.png", "music/eclipse/eclipse200.png", "music/eclipse/eclipse240.png"));
music_list.push(new Music(5, "Timecop1983", "Back to You", "music/backtoyou/backtoyou.mp3", "music/backtoyou/backtoyou85.png", "music/backtoyou/backtoyou200.png", "music/backtoyou/backtoyou240.png"));
music_list.push(new Music(6, "MOON", "Dust", "music/moon/moon.mp3", "music/moon/moon80.png", "music/moon/moon200.png", "music/moon/moon240.png"));
music_list.push(new Music(7, "憂鬱", "Sun", "music/sun/sun.m4a", "music/sun/sun80.png", "music/sun/sun200.png", "music/sun/sun240.png"));

all_music = music_list.slice();
best_c = music_list.slice(0, 5);
recomended = music_list.slice(0, 8);
search = music_list.slice();

// wavesurfer
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#00D1FF',
    progressColor: '#FF00C7',
    cursorColor: '#FFF',
    cursorWidth: 0,
    barWidth: 3,
   });

wavesurfer.load(music_list[0].audio);
wavesurfer.setHeight ("80");
wavesurfer.on("finish", function(){
    next_song();
    wavesurfer.on("ready", function(){
        play();
    });
});

//wavesurfer

//audio_controll
function play_or_pause(){
    if(wavesurfer.isPlaying()){
        pause();
    }
    else{
        play();
    };
};

wavesurfer.on("pause", function(){
    if(play_now){
        play();
    }
    else{
        play_button.style = "background: url(img/Sprites/play.png);";
        disk.style = "animation-play-state: paused;";
        podsvetka();
    };
});

wavesurfer.on("play", function(){
    play_button.style = "background: url(img/Sprites/pause_button.png);";
    disk.style = "animation-play-state: running;";
    podsvetka();
});


function play(){
    
    wavesurfer.play(); 
    play_now = true;
};


function pause(){
    play_now = false;
    wavesurfer.pause();
    
};

function swap_music(id, playlist_id){
    ready = false;
    currentPlaylist = playlist_id;
    currentSongId = id;
    if(currentPlaylist == "b"){
        music_list  = best_c;
        now_status.innerHTML = "Best compositions";
    }
    else if(currentPlaylist == "a"){
        music_list = search;
        now_status.innerHTML = "Search";
    }
    else if(currentPlaylist == "r"){
        music_list = recomended;
        now_status.innerHTML = "Recomended";
    }
    else if(currentPlaylist == "p"){
        music_list = playlist;
        now_status.innerHTML = "Your playlist";
    }
    wavesurfer.load(all_music[id].audio);
        wavesurfer.on("ready", function(){
            if(play_now){
                play();
                
            }else{
                pause();
            };
        });
    autor_id.innerHTML = all_music[id].autor;
    name_id.innerHTML = all_music[id].song_name;
    disk_foto_id.style = "background: url(" + all_music[id].im240 + ")";


    // if(play_now){
    //     wavesurfer.on("ready", function(){
    //         play();
    //     });
    // }else{
    //     wavesurfer.on("ready", function(){
    //         pause();
    //     });
    // };
    if(music_list.length > 0) podsvetka();
    check();
};

function next_song(){
    var nextIndex = 0;
    if(music_list.length > 1){
        for(i = 0; i < music_list.length; i++){
            if(currentSongId == music_list[i].id){
                nextIndex = i + 1;
            };
        };
        if(nextIndex >= music_list.length){
            swap_music(music_list[0].id, currentPlaylist);
        }else{
            swap_music(music_list[nextIndex].id, currentPlaylist);
        };
    }
    else
    {
        swap_music(currentSongId, currentPlaylist);
    };
};

function back_song(){
    var backIndex = 0;
    if(music_list.length > 1){
        for(i = 0; i < music_list.length; i++){
            if(currentSongId == music_list[i].id){
                backIndex = i - 1;
            };
        };
        if(backIndex < 0){
            swap_music(music_list[music_list.length - 1].id, currentPlaylist);
        }else{
            swap_music(music_list[backIndex].id, currentPlaylist);
        };
    }
    else
    {
        swap_music(currentSongId, currentPlaylist);
    };
};

volume_ch.addEventListener("input", function(){
    wavesurfer.setVolume(volume_ch.value/100);
});
//audio_controll

// addplaylist
var add_but = document.getElementById("pl");

add_but.addEventListener("click",  function(){
    var frame_a = document.getElementById("frame_d");
    var curindex;
    for(p = 0; p < music_list.length; p++){
        if(currentSongId == music_list[p].id){
            curindex = p;
        };
    };

    if(add_but.className == "plus_button"){
        if(playlist.length > 0){
            // var est = false;
            // for(i = 0; i < playlist.length; i++){
            //     if(currentSong == playlist[i].id){
            //         est = true;
            //     }
            // }
            // if(!est)
            // {
                playlist.push(music_list.slice(curindex, curindex + 1)[0]);
            //}

        }
        else
        {
            playlist.push(music_list.slice(curindex, curindex + 1)[0]);
        };
    }
    else
    {
        for(i = 0; i < playlist.length; i++){
            if(all_music[currentSongId] == playlist[i]){
                var index = playlist.indexOf(playlist[i]);
                if(index > -1){
                    // next_song();
                    if(currentPlaylist == "p"){
                        if(playlist.length == 1){
                            currentPlaylist = "b";
                            next_song();
                        }
                        else{
                            next_song();
                        };
                    };
                    playlist.splice(index, 1);
                    var gg = frame_a.getAttribute("src");
                    if(gg == "playlist.html"){
                        frame_a.setAttribute("src", "playlist.html");
                        frame_a.className = "playlist"; 
                        console.log(music_list);
                    };
                };
            };
        };
    };
    check();

});
// addplaylist

//podsvetka
function podsvetka(){
    var fr = document.getElementById("frame_d");
    var ifr = fr.contentWindow.document;

    if(fr.getAttribute("src") == "main.html"  && currentPlaylist == "b"){
        for(i = 0; i < best_c.length; i++){
            var playing = ifr.getElementsByClassName("s"+best_c[i].id)[0];
            if(playing.classList.contains("playing")){
                playing.classList.remove("playing");
            };
        };
        var playing = ifr.getElementsByClassName("s"+currentSongId)[0];
        playing.classList.toggle("playing");

        if(!wavesurfer.isPlaying()){
            for(i = 0; i < best_c.length; i++){
                var playing = ifr.getElementsByClassName("s"+best_c[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                };
            };
        };
    };

    if(fr.getAttribute("src") == "main.html"  && currentPlaylist == "r"){
        for(i = 0; i < best_c.length; i++){
            var playing = ifr.getElementsByClassName("s"+best_c[i].id)[0];
            if(playing.classList.contains("playing")){
                playing.classList.remove("playing");
            };
        };
    };

    if(fr.getAttribute("src") == "playlist.html"  && currentPlaylist == "p"){
        if(playlist.length > 0){
            for(i = 0; i < playlist.length; i++){
                var playing = ifr.getElementsByClassName("s"+playlist[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                };
            };
            var playing = ifr.getElementsByClassName("s"+currentSongId)[0];
            playing.classList.toggle("playing");
        };

        if(!wavesurfer.isPlaying()){
            for(i = 0; i < playlist.length; i++){
                var playing = ifr.getElementsByClassName("s"+playlist[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                };
            };
        };
    };


    if(fr.getAttribute("src") == "search.html"  && currentPlaylist == "a"){
        var est = false;
        for(t = 0; t < search.length; t++){
            if(currentSongId == search[t].id){
                est = true;
            };
        };

        if(est){
        for(i = 0; i < search.length; i++){
            var playing = ifr.getElementsByClassName("s"+search[i].id)[0];
            if(playing.classList.contains("playing")){
                playing.classList.remove("playing");
            };
        };
        var playing = ifr.getElementsByClassName("s"+currentSongId)[0];
        playing.classList.toggle("playing");

        if(!wavesurfer.isPlaying()){
            for(i = 0; i < search.length; i++){
                var playing = ifr.getElementsByClassName("s"+search[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                };
            };
        };
        };
    };    
};

// function skipi(){
//     console.log(play_now +":"+ wavesurfer.isPlaying());
//     if(play_now && wavesurfer.isPlaying()){
//         console.log("play");
        
//     };
// };