$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
    var html = `<div class="message__box" data-id=${message.id}>
                  <div class="body__right__content">
                      <div class="body__right__content__user">
                        ${message.user_name}
                      </div>
                      <div class="body__right__content__date">
                        ${message.date}
                      </div>
                  </div>
                  <div class="body__right__message">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }

  var buildMessageHTML = function(message) {
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
    var html = `<div class="message__box" data-id=${message.id}>
                  <div class="body__right__content">
                      <div class="body__right__content__user">
                        ${message.user_name}
                      </div>
                      <div class="body__right__content__date">
                        ${message.date}
                      </div>
                  </div>
                  <div class="body__right__message">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                      ${image}
                  </div>
                </div>`
    return html;
    }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var contents_height = $('.body__right__contents').height();
      $('.body__right__contents').append(html)
      $('#new_message')[0].reset();
      $('.body__right__footer__send').prop( 'disabled', false )
      $('html').animate({scrollTop: contents_height});
    })
    .fail(function(){
      alert('エラー');
      $('.body__right__footer__send').prop( 'disabled', false )
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message__box').last().data('id');
    last_group_id = $('.header__right__group').data('id');
    $.ajax({
      url: `/groups/${last_group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        var insertHTML = buildHTML(message)
        $('.body__right__contents').append(insertHTML)
        var contents_height = $('.body__right__contents').height();
        $('html').animate({scrollTop: contents_height});
      })
      
    })
    .fail(function() {
      console.log('error');
    });
  };
  $('.header__right__group').length ? setInterval(reloadMessages, 5000) : "";
});