// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


    // Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
    $('#cardSearch').on('submit', function(e){
        var searchCard = $('#cardSearchVal').val();
        console.log("Search Value: " +  searchCard );

        fetchCard(searchCard);
        e.preventDefault();

    })    
})
function fetchCard(searchCard){
            $.ajax({
                url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/'+searchCard+'?collectible=1',
                method: 'GET',
                dataType: 'json',
                headers: {
                    'X-Mashape-Key':'an6F2sSF7gmshFcTGUSE5gvEXjEpp1fkOP4jsnYYbGahiTIcSb',
                    'Accept':'application/json'
                }
            }).done(function(data){
                var myData = JSON.stringify(data);
                var cards="";
                
                console.log(myData);
                
                for(var i=0; i<data.length; i++){        
           cards +=` 
                    <a href="card.html">
                        <div class="item-media" onclick="selectCard('${data[i].cardId}')" ><img src="${data[i].img}" width="100%">
                        </div>
                    </a>    
                   `}
            $('#c1').html(cards);                 
              });        
    } 

function selectCard(id){
    sessionStorage.setItem("CardId", id);
    
}

function getCardById(Id){
    var card;
     $.ajax({
                url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/'+Id,
                method: 'GET',
                dataType: 'json',
                headers: {
                    'X-Mashape-Key':'an6F2sSF7gmshFcTGUSE5gvEXjEpp1fkOP4jsnYYbGahiTIcSb',
                    'Accept':'application/json'
                }
            }).done(function(data){
         console.log(data);
         card = `
                <div class="card demo-card-header-pic">
                <div class="item-media"><img src="${data[0].img}" width="75%" height="75%"></div>
                    <div class="card-content-inner">
                      <h4>"${data[0].flavor}"</h4>
                      <p><bold>Card Set</bold>: ${data[0].cardSet}</p>
                    </div>
                  </div>
                </div>                
            </div>`;
         $('#card').html(card);
     });  
}

function getBacks(){
    
        var cardbacks ="";
        
        $.ajax({
                url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cardbacks',
                method: 'GET',
                dataType: 'json',
                headers: {
                    'X-Mashape-Key':'an6F2sSF7gmshFcTGUSE5gvEXjEpp1fkOP4jsnYYbGahiTIcSb',
                    'Accept':'application/json'
                }
            }).done(function(data){
                var cardbacks="";
                console.log(data);
            for(var i=0; i<data.length; i++){
                var checkImg = ImageExist(data[i].img);
                if(checkImg){
                    cardbacks +=`<div class="item-media"><img src="${data[i].img}" width="100%"></div>`;
                }else{
                    continue;
                }
                
            }
            $('#cardbacks').html(cardbacks);                 
              });         
    }

function ImageExist(url){
   var img = new Image();
   img.src = url;
    console.log(img.src);
    return  img.height != 0;
    }





// Now we need to run the code that will be executed only for Card page.
// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('card', function (page) {
    var cardId = sessionStorage.getItem("CardId");
    getCardById(cardId);
    console.log("Page Loaded");
        
});
