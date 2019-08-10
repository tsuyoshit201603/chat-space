$(function(){
  function buildHTML(message){
    // 条件分岐が壊れてる
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message__box').last().data('id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: '/groups/last_message_id/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };

})