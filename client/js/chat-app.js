(function() {
    'use strict';
    window.chat  = window.chat || {};

    var token;

    window.chat.listenForMessages(function messageHandler(data) {
        $('.messages')
          .append('<p><span>' + data.username+ "</span>: " + data.message + '</p>')

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
                 }//end of headers for getLogin
               })//end of ajax call for login
             .done (function handleUsernameSuccess(data){
                  $('.login')
                      .hide()
                  $('.send-message')
                      .show()
                 console.log("I MADE IT!");
                 console.log(data);
                 token = data.token;
             })//end of done callback
             .fail (function handleUsernameError(xhr){
                 console.log(xhr);
             })//end of fail callback
         })//ends event handler

       $('.send-message')
          .hide()
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
                          'Content-Type': 'application/json'
                      }//ends headers for getMessage
                    })
                    .done (function handleMessageSuccess (data) {
                        $('.send-message')
                            .trigger('reset');
                    })//ends callback function for getMessage success
                    .fail (function handleMessageError (xhr) {
                        console.log('Error', xhr);
                    })//ends callback for getMessage fail
          })//ends getMessage event handler

}());
