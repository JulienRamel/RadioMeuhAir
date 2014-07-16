music = null;

// Change it
api_url = "http://radiomeuh.woodgate.fr";

play = function(){

    request = new air.URLRequest("http://predefoire.radiomeuh.com:8000/big.mp3");
    soundFactory = new air.Sound();

    soundFactory.load(request);
    
    // Current volume
    var volume = $("#volume").slider("value");

    var transformation = new air.SoundTransform(volume / 100);
    
    // We play the music at startup
    music = soundFactory.play(0, 0, transformation);
    
};

pause = function(){
    
    music.stop();
    
};

update = function(animation){
    
    $.ajax({
        type: "GET",
        url: api_url,
        data: {"method": "get_actual"},
        dataType: "JSON",
        success: function(content){

            // Titre actuel
            if(content.actual.titre.length > 0 && (content.actual.titre != $("#title").text() || content.actual.artiste != $("#author").text())){

                if(animation){
                    
                    $("#title, #author, #album, #picture").fadeOut(500, function(){
                        
                        $("#title").text(content.actual.titre);
                        $("#author").text(content.actual.artiste);
                        $("#album").text(content.actual.album);
                        $("#picture").attr("src",content.actual.pochette);                            
                        
                        setTimeout(function(){
                            
                            $("#title, #author, #album, #picture").fadeIn(500);
                            
                        }, 300);
                        
                    });
                    
                }else{
                    
                    $("#title").text(content.actual.titre);
                    $("#author").text(content.actual.artiste);
                    $("#album").text(content.actual.album);
                    $("#picture").attr("src",content.actual.pochette);
                    
                }
            
            }
            
            // Prévious
            if(content.previous.titre.length > 0 && (content.previous.titre != $("#previous_title").text() || content.previous.artiste != $("#previous_author").text())){

                if(animation){
                    
                    $("#previous_title, #previous_author, #previous_album, #previous_picture, #previous_tiret").fadeOut(500, function(){
                        
                        $("#previous_title").text(content.previous.titre);
                        $("#previous_author").text(content.previous.artiste);
                        $("#previous_album").text(content.previous.album);
                        $("#previous_picture").attr("src",content.previous.pochette);
                        
                        setTimeout(function(){
                            
                            $("#previous_title, #previous_author, #previous_album, #previous_picture").fadeIn(500);
                            
                            if(content.previous.artiste.length > 0 && content.previous.album.length > 0){ $("#previous_tiret").fadeIn(500); }
                            
                        },300);
                        
                    });
                    
                }else{
                    
                    $("#previous_title").text(content.previous.titre);
                    $("#previous_author").text(content.previous.artiste);
                    $("#previous_album").text(content.previous.album);
                    $("#previous_picture").attr("src",content.previous.pochette);
                
                    if(content.previous.artiste.length > 0 && content.previous.album.length > 0){ $("#previous_tiret").show(); }else{ $("#previous_tiret").hide(); }
                    
                }
            
            }                
            
            // Next
            if(content.next.titre.length > 0 && (content.next.titre != $("#next_title").text() || content.next.artiste != $("#next_author").text())){

                if(animation){
                    
                    $("#next_title,#next_author,#next_album,#next_picture,#next_tiret").fadeOut(500, function(){
                        
                        $("#next_title").text(content.next.titre);
                        $("#next_author").text(content.next.artiste);
                        $("#next_album").text(content.next.album);
                        $("#next_picture").attr("src",content.next.pochette);
                        
                        setTimeout(function(){
                            
                            $("#next_title, #next_author, #next_album, #next_picture").fadeIn(500);
                            
                            if(content.next.artiste.length > 0 && content.next.album.length > 0){ $("#next_tiret").fadeIn(500); }
                            
                        },300);
                        
                    });
                    
                }else{
                    
                    $("#next_title").text(content.next.titre);
                    $("#next_author").text(content.next.artiste);
                    $("#next_album").text(content.next.album);
                    $("#next_picture").attr("src",content.next.pochette);
                    
                    if(content.next.artiste.length > 0 && content.next.album.length > 0){ $("#next_tiret").show() }else{ $("#next_tiret").hide() }
                    
                }

            }                
            
        }
    });
    
};

// Setting the volume
setVolume = function(volume){
    
    var volume = volume / 100;
    
    var transformation = new air.SoundTransform(volume);
    
    music.soundTransform = transformation;
    
};

// Opening a link
openURL = function(url){

    var urlReq = new air.URLRequest(url); 
    air.navigateToURL(urlReq);
    
};

// Initialization
$(document).ready(function(){
    
    // Clicking on Play/Pause
    $("#button").on("click", function(){

        if($(this).hasClass("play")){

            // On met en play
            play();
            
            $(this).removeClass("play");
            $(this).addClass("pause");

        }else{

            // On met en pause
            pause();
            
            $(this).removeClass("pause");
            $(this).addClass("play");                

        }
        
    });
    
    // Volume
    $("#volume").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 100,
        slide: function(event,ui){

            setVolume(ui.value);

        }
    });
    
    // Informations
    $.ajax({
        type: "GET",
        url: api_url,
        data: {"method": "get_infos"},
        dataType: "JSON",
        success: function(content){
            
            $("#infos1").html(content.infos1);
            $("#infos2").html(content.infos2);
            
            $("#infos1 a, #infos2 a").click(function(){
                
                openURL($(this).attr("data-url"));
                
            });
                
        }
    });    
    
    // Showing the informations
    $("#infos").click(function(){
        
        $("#container").hide();
        $("#container2").show();
        
    });

    // Closing the informations
    $("#infos_close").click(function(){
        
        $("#container2").hide();
        $("#container").show();
        
    });
    
    // Play/Pause by keypress
    $(window).keyup(function(e){
        if(e.keyCode == 32){
            $("#button").trigger("click");
        }
    });
    
    // Updating the informations
    update(false);
    
    setInterval(function(){ update(true); },5000);
    
});