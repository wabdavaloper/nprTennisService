

$(document).ready(function() {
  $('#inp1').submit(function(event) {
    event.preventDefault(); // отменяем стандартное поведение формы
    
    // скрываем форму
    $('#inp1').hide('slow', function() {
      // показываем сообщение об успешной отправке
      $('.success-message').show('slow');
    });
  });
});

$(document).ready(function() {
  $('#inp1').submit(function(event) {
    event.preventDefault(); // отменяем стандартное поведение формы
    
    // скрываем форму
    $('#inp1').hide('slow', function() {
      // показываем сообщение об успешной отправке
      $('.success-message').show('slow');
      
      // отправляем данные формы на сервер
      $.ajax({
        url: '/api/matches',
        type: 'post',
        data: $('#inp1').serialize(),
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  });
});



