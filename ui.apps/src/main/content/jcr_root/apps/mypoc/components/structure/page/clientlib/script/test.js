$(document).ready(function() {
    $('.page__main').hide();

$('#submit1').click(function() {

$('.error').html('');

    var resp= $('#g-recaptcha-response').val() ; 

    $.ajax({
         type: 'POST',    
         url:'/bin/servlet/verifyRecaptcha',
         data:'g-recaptcha-response='+ resp,
         success: function(msg){
        alert("msg"+msg);
        if(msg=="success"){
        $('.g-recaptcha').hide();
        $('#submit1').hide();
        $('.page__main').show();

    }else{
           $('.error').html(' please verify again');
           }

         }
     });
  });

});