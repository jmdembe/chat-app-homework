(function() {
    'use strict';
    window.chat  = window.chat || {}


    window.chat.listenForMessages(function messageHandler(event) {
        var chatMessage = $('input.message').val();


     });//end of listenForMessages

     $('.login')
         .on('submit', function getLogin(event) {
           var userName = $('.username').val();
           event.preventDefault();
             $.ajax({
                 url: '/login',
                 method: 'POST',
                 data: JSON.stringify({ username: userName}),
                 headers: {
                     'Content-Type': 'application/json',
                 }//end of headers
               })//end of ajax call for login
             .done (function handleChatMessageSuccess(data){
                 console.log("I MADE IT!");
                 console.log(data);
             })//end of done callback
             .fail (function handleChatMessageError(xhr){
                 console.log(xhr);
             })//end of fail callback
         })//ends event handler



}());
