

$(document).ready(function() {
  $('#match-form').submit(function(event) {
    event.preventDefault(); // отменяем стандартное поведение формы
    
    // скрываем форму
    $('#match-form').hide('slow', function() {
      // показываем сообщение об успешной отправке
      $('.success-message').show('slow');
    });
  });
});

$(document).ready(function() {
  $('#match-form').submit(function(event) {
    event.preventDefault(); // отменяем стандартное поведение формы
    
    // скрываем форму
    $('#match-form').hide('slow', function() {
      // показываем сообщение об успешной отправке
      $('.success-message').show('slow');
      
      // отправляем данные формы на сервер
      $.ajax({
        url: 'save_match.php',
        type: 'post',
        data: $('#match-form').serialize(),
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



