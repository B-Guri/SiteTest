var poisk = "";

function get_search(){
    var frame_s = document.getElementById("frame_d");
    var iframe_s = frame_s.contentWindow.document;
    var ser = iframe_s.getElementById("ser");
    ser.addEventListener("change", function(){
        poisk = ser.value;
        console.log(poisk);
        if(poisk.length < 1){
            search = all_music.slice()
        }
        else{
           search_f(); 
        }
        
    });
};
function search_f(){
    var has_autor = false;
    var autor_id = [];
    var has_songname = false;
    var songname_id = [];
    for(i = 0; i < all_music.length; i++){
        if(all_music[i].autor.toLowerCase().includes(poisk.toLowerCase())){
            has_autor = true;
            autor_id.push(all_music[i].id);
        }
    }
    if(!has_autor){
        for(i = 0; i < all_music.length; i++){
            if(all_music[i].song_name.toLowerCase().includes(poisk.toLowerCase())){
                has_songname = true;
                songname_id.push(all_music[i].id);
            }
        }
        if(has_songname){
            search = [];
            for(j = 0 ; j < songname_id.length; j++){
                for(k = 0; k < all_music.length; k++){
                    if(songname_id[j] == all_music[k].id){
                        search.push(all_music[k]);
                    }
                }
            }
            console.log(search);
        }
    }
    else{
        search = [];
        for(j = 0 ; j < autor_id.length; j++){
            for(k = 0; k < all_music.length; k++){
                if(autor_id[j] == all_music[k].id){
                    search.push(all_music[k]);
                }
            }
        }
    }
};