(function() {
    'use strict';
    window.chat  = window.chat || {};

    var token;

     $('.login')
         .on('submit', function getLogin(event) {
           console.log('Im in the submit');
           var userName = $('.username').val();
           event.preventDefault();
             $.ajax({
                 url: '/login',
                 method: 'POST',
                 data: JSON.stringify({ username: userName}),
                 headers: {
                     'Content-Type': 'application/json',
                 }//end of headers for getLogin
               })//end of ajax call for login
             .done (function handleUsernameSuccess(data){
                 console.log("I MADE IT!");
                 console.log(data);
                 token = data.token;
             })//end of done callback
             .fail (function handleUsernameError(xhr){
                 console.log(xhr);
             })//end of fail callback
         })//ends event handler


       $('.send-message')
          .on('submit', function getMessage(event) {
              event.preventDefault();
              var chatMessage = $('.message').val();
              event.preventDefault();
                  $.ajax({
                      url: '/chat',
                      method: 'POST',
                      data: JSON.stringify({ message: chatMessage}),
                      headers:{
                          'Authorization': token,
                      }//ends headers for getMessage
                    })
                    .done (function handleMessageSuccess (data) {
                        console.log('Message success');
                    })//ends callback function for getMessage success
                    .fail (function handleMessageError (xhr) {
                        console.log('Error', xhr);
                    })//ends callback for getMessage fail


          })//ends getMessage event handler





      window.chat.listenForMessages(function messageHandler(event) {
          var chatMessage = $('input.message').val();


          });//end of listenForMessages

}());
