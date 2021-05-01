var frame_d = document.getElementById("frame_d");

// btn
var logo_btn = document.getElementById("logo_btn");
var top_btn = document.getElementById("top_btn");
var style_btn = document.getElementById("style_btn");
var playlist_btn = document.getElementById("playlist_btn");
var home = document.getElementById("home_btn");


function home_b(){
    frame_d.setAttribute("src", "main.html");
    frame_d.className = "main";
    close_buger();
};

function playlist_b(){
    frame_d.setAttribute("src", "playlist.html");
    frame_d.className = "playlist";
    close_buger();
};

function top_b(){
    frame_d.setAttribute("src", "search.html");
    frame_d.className = "search";
    search = all_music.slice();
    close_buger();
};

function style_b(){
    frame_d.setAttribute("src", "history.html");
    frame_d.className = "style";
    close_buger();
};



home.addEventListener("click", function(){
    frame_d.setAttribute("src", "main.html");
    frame_d.className = "main";
});

logo_btn.addEventListener("click", function(){
    frame_d.setAttribute("src", "main.html");
    frame_d.className = "main";
});

top_btn.addEventListener("click", function(){
    frame_d.setAttribute("src", "search.html");
    frame_d.className = "search";
    search = all_music.slice();
});

style_btn.addEventListener("click", function(){
    frame_d.setAttribute("src", "history.html");
    frame_d.className = "style";
});

playlist_btn.addEventListener("click", function(){
    frame_d.setAttribute("src", "playlist.html");
    frame_d.className = "playlist";
});

window.onload = function(){
        frame_d.setAttribute("src", "main.html");
        music_list = best_c;
};
frame_d.onload = function(){
    if(frame_d.className != "style"){
        create_menu();
        if(wavesurfer.isPlaying()){
            podsvetka();
        }
    }
};




function create_menu(){
    var iframe = document.getElementById("frame_d");
    var attr = iframe.getAttribute("src");
    var iframeDoc = iframe.contentWindow.document;
    if(attr == "main.html"){
        if (iframeDoc.readyState == 'complete') {
            var best_content = iframeDoc.getElementById("best_compositions_content");
            var recomended_content = iframeDoc.getElementById("recomended_music_block");
                for(i = 0; i < best_c.length; i++){
                    var block = document.createElement("div");
                    block.innerHTML ='<div class="s'+ best_c[i].id+' music_block" onclick = "parent.swap_music('+ best_c[i].id+', \'b\')"><div class="music_block_foto"><img src="'+best_c[i].im85+'" alt=""></div><div class="music_block_content"><div class="music_block_autor"><p>'+ best_c[i].autor+'</p></div><div class="music_block_song_name"><p>'+ best_c[i].song_name+'</p></div></div><div class="music_block_play_button"></div></div>';
                    best_content.append(block);
                }

                 for(j = 0; j < recomended.length; j++){
                     var block_sec = document.createElement("div");
                     block_sec.innerHTML = '<div class="recomended_music_foto" onclick = "parent.swap_music('+ recomended[j].id+', \'r\')"> <img class = "foto_img" src="'+ recomended[j].im200+'" alt=""></img> <div class="recomended_music_foto_autor"><p>'+recomended[j].autor+'</p></div><div class="recomended_music_foto_songname"><p>' + recomended[j].song_name + '</p></div></div>';
                     recomended_content.append(block_sec);
                 }         
        }
    }else if(attr == "playlist.html"){
        if (iframeDoc.readyState == 'complete') {
            var best_content = iframeDoc.getElementById("best_compositions_content");
           
                for(i = 0; i < playlist.length; i++){
                    var block = document.createElement("div");
                    block.innerHTML ='<div class="s'+ playlist[i].id+' music_block" onclick = "parent.swap_music('+ playlist[i].id+', \'p\')"><div class="music_block_foto"><img src="'+playlist[i].im85+'" alt=""></div><div class="music_block_content"><div class="music_block_autor"><p>'+ playlist[i].autor+'</p></div><div class="music_block_song_name"><p>'+ playlist[i].song_name+'</p></div></div><div class="music_block_play_button"></div></div>';
                    best_content.append(block);
                }
        }
    }else if(attr == "search.html"){
        if (iframeDoc.readyState == 'complete') {
            var best_content = iframeDoc.getElementById("best_compositions_content");
                for(i = 0; i < search.length; i++){
                    var block = document.createElement("div");
                    block.innerHTML ='<div class="s'+ search[i].id+' music_block" onclick = "parent.swap_music('+ search[i].id+', \'a\')"><div class="music_block_foto"><img src="'+search[i].im85+'" alt=""></div><div class="music_block_content"><div class="music_block_autor"><p>'+ search[i].autor+'</p></div><div class="music_block_song_name"><p>'+ search[i].song_name+'</p></div></div><div class="music_block_play_button"></div></div>';
                    best_content.append(block);
                }
        }
    }

}

var plus_btn = document.getElementById("pl");
function check(){
    var est = false;
    for(i = 0 ; i < playlist.length; i++){
        if(all_music[currentSongId] == playlist[i]){
            est = true;
        }
    };
    if(est){
        plus_btn.className = "min_button";
    }
    else{
        plus_btn.className = "plus_button";
    }
}

var nav_menu = document.getElementById("nav_menu");
var bur_pl = document.getElementById("bur_pl");
function open_buger(){
    nav_menu.style = "display: inherit;";
};

function close_buger(){
    nav_menu.style = "display: none;";
};


// function podsvetka(){
//     // var ff = document.getElementsByClassName
//     var fr = document.getElementById("frame_d");
//     var ifr = fr.contentWindow.document;
//     var playing = ifr.getElementsByClassName("s0");
//     playing.className = "playing";
    
// }

//'<div class="recomended_music_foto"> <img src="'+ music_list[j].im200+'" alt=""></img> <div class="recomended_music_foto_autor"><p>'+music_list[j].autor+'</p></div><div class="recomended_music_foto_songname"><p>' + music_list[j].song_name + '</p></div></div>'
