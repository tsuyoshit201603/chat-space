$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
    var html = `<div class="body__right__content">
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
      $('.body__right__footer__form__input').val('')
      $('.body__right__footer__send').prop( 'disabled', false )
      $('html').animate({scrollTop: contents_height});
    })
    .fail(function(){
      alert('エラー');
      $('.body__right__footer__send').prop( 'disabled', false )
    })
  })
})