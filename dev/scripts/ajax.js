$('#registration-form').on('submit', function(e) {
  e.preventDefault();

  // console.log(this);
  var data = $(this).serializeArray();
  console.log(data);
  $.post('/users/register', data, function(data, res) {
    if( res === 'success' ) {
      //change to the update form
    } else {
      //send back error message
    }
  })
})
