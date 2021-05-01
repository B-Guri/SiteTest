// var audio = document.getElementById("audio");
var play_button = document.getElementById("play_button");
var back_button = document.getElementById("back_button");
var next_button = document.getElementById("next_button");
var disk = document.getElementById("disk");

var autor_id = document.getElementById("autor_id");
var name_id = document.getElementById("name_id");
var disk_foto_id = document.getElementById("disk_foto_id");

var volume_ch = document.getElementById("volume_ch");
var now_status = document.getElementById("now_status");

// var music_block = '<div class="music_block_foto"></div><div class="music_block_content"><div class="music_block_autor"><p>Autor of song</p></div><div class="music_block_song_name"><p>Name of Song</p></div></div><div class="music_block_play_button"></div>'
// var best_compositions_content =  document.getElementById("best_compositions_content");

function Music(id, autor, song_name, audio, im85, im200, im240){
    this.id = id;
    this.autor = autor;
    this.song_name = song_name;
    this.audio = audio;
    this.im85 = im85;
    this.im200 = im200;
    this.im240 = im240;
};


var play_now = false;
var currentSong = 0;

var search = [];
var music_list = [];
var all_music = [];
var playlist = [];
var best_c = [];
var recomended = [];

var currentPlaylist = "b";

music_list.push(new Music(0, "Robert Parker", "`85again", "music/85again/85again_audio.mp3", "music/85again/85again85.png", "music/85again/85again200.png", "music/85again/85again240.png"));
music_list.push(new Music(1, "Robert Parker", "End of The Night", "music/endofthenight/endofthenight.mp3", "music/endofthenight/endofthenight85.png", "music/endofthenight/endofthenight200.png", "music/endofthenight/endofthenight240.png"));
music_list.push(new Music(2, "Timecop1983", "On The Run", "music/ontherun/ontherun.mp3", "music/ontherun/ontherun85.png", "music/ontherun/ontherun200.png", "music/ontherun/ontherun240.png"));
music_list.push(new Music(3, "J+1", "Alleyways", "music/alleywals/alleywalls.mp3", "music/alleywals/alleywalls85.png", "music/alleywals/alleywalls200.png", "music/alleywals/alleywalls240.png"));
music_list.push(new Music(4, "J+1", "Eclipse", "music/eclipse/eclipse.mp3", "music/eclipse/eclipse85.png", "music/eclipse/eclipse200.png", "music/eclipse/eclipse240.png"));
music_list.push(new Music(5, "Timecop1983", "Back to You", "music/backtoyou/backtoyou.mp3", "music/backtoyou/backtoyou85.png", "music/backtoyou/backtoyou200.png", "music/backtoyou/backtoyou240.png"));

all_music = music_list.slice();
best_c = music_list.slice(0, 5);
recomended = music_list.slice(0, 6);
search = music_list.slice();

function play_or_pause(){
    if(play_now)
    {
        
        play_button.style = "background: url(img/Sprites/play.png);";
        disk.style = "animation-play-state: paused;";       
        podsvetka();
        wavesurfer.pause();
        play_now = false;

        
    }
    else{
        
        play_button.style = "background: url(img/Sprites/pause_button.png);";
        disk.style = "animation-play-state: running;";
        podsvetka();
        wavesurfer.play(); 
        play_now = true;   
    }
}

function podsvetka(){
    try{
        var fr = document.getElementById("frame_d");
        var ifr = fr.contentWindow.document;
        if(fr.getAttribute("src") == "main.html"  && currentPlaylist == "b"){
            for(i = 0; i < best_c.length; i++){
                var playing = ifr.getElementsByClassName("s"+best_c[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                }
            }
            var playing = ifr.getElementsByClassName("s"+currentSong)[0];
            playing.classList.toggle("playing");
        }
        else if(fr.getAttribute("src") == "playlist.html"  && currentPlaylist == "p"){
            if(playlist.length > 0){
                for(i = 0; i < playlist.length; i++){
                    var playing = ifr.getElementsByClassName("s"+playlist[i].id)[0];
                    if(playing.classList.contains("playing")){
                        playing.classList.remove("playing");
                    }
                }
                var playing = ifr.getElementsByClassName("s"+currentSong)[0];
                playing.classList.toggle("playing");
            }
        }
        else if(fr.getAttribute("src") == "search.html"  && currentPlaylist == "a"){
            for(i = 0; i < search.length; i++){
                var playing = ifr.getElementsByClassName("s"+search[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                }
            }
            var playing = ifr.getElementsByClassName("s"+currentSong)[0];
            playing.classList.toggle("playing");
        }

        if(!play_now){
            for(i = 0; i < best_c.length; i++){
                var playing = ifr.getElementsByClassName("s"+best_c[i].id)[0];
                if(playing.classList.contains("playing")){
                    playing.classList.remove("playing");
                }
            }
        }
    }
    catch{
        
    }
}





function swap_music(id, ppl){

    currentPlaylist = ppl;
//
    if(ppl == "b"){
        music_list  = best_c;
        now_status.innerHTML = "Best compositions";
    }
    else if(ppl == "a"){
        music_list = search;
        now_status.innerHTML = "Search";
    }
    else if(ppl == "r"){
        music_list = recomended;
        now_status.innerHTML = "Recomended";
    }
    else if(ppl == "p"){
        music_list = playlist;
        now_status.innerHTML = "Your playlist";
    }
    var rr = true;
    currentSong = id;
    // podsvetka();
    autor_id.innerHTML = all_music[id].autor;
    name_id.innerHTML = all_music[id].song_name;
    disk_foto_id.style = "background: url(" + all_music[id].im240 + ")";
    wavesurfer.load(all_music[id].audio);
    wavesurfer.on("ready", function(){
        if(play_now && rr){
        wavesurfer.play();
        if(music_list.length > 0) podsvetka();
        };
        rr = false;
    });
    check();
    
    //audio.setAttribute("src", music_list[id].audio);
    //audio.pause();
    // wavesurfer.pause();
    // wavesurfer.currentTime = 0;
    // //audio.currentTime = 0;
    // wavesurfer.load(music_list[id].audio);

    // if(play_now){
    //     //audio.play();
    //     console.log(wavesurfer.currentTime);
    //     wavesurfer.playPause();
    // }
};


function next_song(){
    wavesurfer.on("ready", function(){
        if(music_list.length > 1){
        var tt;
        for(i = 0; i < music_list.length; i++){
            if(currentSong == music_list[i].id){
                tt = i + 1;
        }
        }
        if(tt >= music_list.length){
            tt = 0;
        };
        
        try{
            swap_music(music_list[tt].id, currentPlaylist);
        }
        catch
        {
            swap_music(0, currentPlaylist);
        };
        }
        else{
            swap_music(all_music[currentSong].id, currentPlaylist);
        }
    });
    

};



function back_song(){
    if(music_list.length > 1){
        var tt;
        for(i = 0; i < music_list.length; i++){
            if(currentSong == music_list[i].id){
                tt = i - 1;
                
        }
        }
        if(tt < 0){
            tt = music_list.length - 1;
        };
        try{
            swap_music(music_list[tt].id, currentPlaylist);
        }
        catch
        {
            swap_music(music_list[0].id, currentPlaylist);
        };
        }
    else{
        swap_music(all_music[currentSong].id, currentPlaylist);
    }
};



//best compositions start


//'<div class="music_block"><div class="music_block_foto"></div><div class="music_block_content"><div class="music_block_autor"><p>Autor of song</p></div><div class="music_block_song_name"><p>Name of Song</p></div></div><div class="music_block_play_button"></div></div>'

//best compositions end

var wavesurfer = WaveSurfer.create({
    // Use the id or class-name of the element you created, as a selector
    container: '#waveform',
    // The color can be either a simple CSS color or a Canvas gradient
    waveColor: '#00D1FF',
    progressColor: '#FF00C7',
    cursorColor: '#FFF',
    cursorWidth: 0,
    // This parameter makes the waveform look like SoundCloud's player
    barWidth: 3,
    // linear-gradient(180deg, #8061FF 0%, #00FFC2 100%)
    // #00D1F
   });

wavesurfer.load(music_list[0].audio);
wavesurfer.setHeight ("80");
wavesurfer.on("finish", function(){
    next_song();
});


volume_ch.addEventListener("change", function(){
    wavesurfer.setVolume(volume_ch.value/100);
});


//playlist
var add_but = document.getElementById("pl");

add_but.addEventListener("click",  function(){
    var frame_a = document.getElementById("frame_d");
    var curindex;
    for(p = 0; p < music_list.length; p++){
        if(currentSong == music_list[p].id){
            curindex = p;
        }
    }

    if(add_but.className == "plus_button"){
        if(playlist.length > 0){
            console.log(playlist);

            var est = false;
            for(i = 0; i < playlist.length; i++){
                if(currentSong == playlist[i].id){
                    est = true;
                }
            }
            if(!est)
            {
                playlist.push(music_list.slice(curindex, curindex + 1)[0]);
            }

        }
        else
        {
            playlist.push(music_list.slice(curindex, curindex + 1)[0]);
        }
    }
    else
    {
        for(i = 0; i < playlist.length; i++){
            if(all_music[currentSong] == playlist[i]){
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
                        }
                    }
                    playlist.splice(index, 1);
                    var gg = frame_a.getAttribute("src");
                    if(gg == "playlist.html"){
                        frame_a.setAttribute("src", "playlist.html");
                        frame_a.className = "playlist"; 
                        console.log(music_list);
                    }
                }
            }
        }
    }
    check();

});


wavesurfer.on("interaction", function(){
    if(play_now && wavesurfer.isPlaying()){
      play_or_pause();
    }
});