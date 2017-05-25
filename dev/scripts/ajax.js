// $('#registration-form').on('submit', function(e) {
//   e.preventDefault();
//
//   // console.log(this);
//   var data = $(this).serializeArray();
//   console.log(data);
//   $.post('/users/register', data, function(data, res) {
//     console.log(res);
//     if( res === 'success' ) {
//       //change to the update form
//       $('#registration-form').removeClass('register--form-visible');
//       $('#details-form').removeClass('register--form-visible');
//     } else {
//       //send back error message
//       alert('something has gone wrong, please try again');
//     }
//   })
// })
