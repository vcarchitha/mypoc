

var GEU = GEU || {};

GEU.enquiryForm = {

    init: function() {
        GEU.enquiryForm.validations();
    },

    validations: function() {

        jQuery.validator.addMethod('selectcheck', function(value) {
            return (value != '-1');
        }, "This field is required.");

        jQuery.validator.addMethod('customEmailCheck', function(value) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }, "Please enter a valid email address.");

        $("#enquiryForm").validate({
            rules: {
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
                email: {
                    required: true,
                    email: false,
                    customEmailCheck: true
                },
                mobile: {
                    required: true,
                    number: true,
                    maxlength: 15,
                },
                areaInterest: {
                    selectcheck: true
                },
                query: {
                    required: true,
                    maxlength: 1000
                },
            },
            messages: {
                mobile: {
                    number: "Please enter a valid mobile number",
                    maxlength: "Please enter a valid mobile number"
                },
                query: {
                    maxlength: "Query should not be more than 1000 characters"
                }
            },

            SubmitHandler: function(form) {
                form.submit();
            }
        });

        $("#enquiryForm #country").change(function() {
            if ($(this).val() == "India") {
                $("#enquiryForm .state-row, #enquiryForm .city-row").show();
            } else {
                $("#enquiryForm .state-row, #enquiryForm .city-row").hide();
            }
        });
        $('.close').click(function() {
            $('#enquiryForm').trigger("reset");
            $('#enquiryForm').show();
            $('.enquiry-successmsg-wrapper').hide();
            $('#enquiryForm').find('label.error').hide();
            $("#enquiryForm .state-row, #enquiryForm .city-row").show();
        });
        $("#enquiryModel").on("hidden.bs.modal", function() {
            $('#enquiryForm').trigger("reset");
            $('#enquiryForm').show();
            $('.enquiry-successmsg-wrapper').hide();
            $('#enquiryForm').find('label.error').hide();
            $("#enquiryForm .state-row, #enquiryForm .city-row").show();
        });
    }
}


$(document).ready(function() {


    GEU.enquiryForm.init();
    //loading youtube video player
 


});