$(function() {

  $("form[name='registration-form']").validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      },
      repassword: {
        required: true,
        equalTo: '#password'
      },
      phone : {
        required: true,
        minlength: 10,
        maxlength: 10
      }
    },
    messages: {
      name: "Please enter your firstname",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long"
      },
      repassword: {
        required: "Please re-enter password",
        equalTo: "Passwords do not match"
      },
      email: {
        required: "Please enter a valid email address",
        email: "Please enter a valid email address"
      },
      phone: {
        required: "Please supply an active phone number",
        minlength: "Please supply a valid phone number",
        maxlength: "Please supply a valid phone number"
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});
