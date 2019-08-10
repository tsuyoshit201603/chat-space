$(function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    $("#user-search-result").append(html);
  }

  function addUser(this_user) {
    var html = `<div class='chat-group-user '>
                  <input name='group[user_ids][]' class ='chat-group-user-id' type='hidden' value=${this_user.userId}>
                  <p class='chat-group-user__name'>${this_user.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $(".chat-group-form__field--right--add").append(html);
  }

  
  $(".chat-group-form__field--right").on("click", ".chat-group-user", function() {
    $(this).remove();
  })       

  $("#user-search-field").on("keyup", function() {
    var users = [];
    $(".chat-group-user-id").each(function(i,user) {
      users.push($(user).val());
    });
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input,
              selected_users: users
            },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){ 
            appendUser(user);
            $("#user-search-result").off("click");
            $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
              var this_user = $(this).data();
              console.log(this_user);
              addUser(this_user);
              $(this).parent().remove();
            })
        });
      }
      else {
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });  
});