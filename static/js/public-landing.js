
$(document).ready(function () {
    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("form").submit(function (event) {

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        var submit = $form.find("button");

        // Serialize the data in the form
        var serializedData = $form.serialize();
        serializedData['g-recaptcha-response'] = getReCaptchaV3Response('contact_us_ajax_id');

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "/api/contact-us",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {
            alert(response);
            refreshReCaptchaV3('contact_us_ajax_id', 'contact_us_action');
            $inputs.prop("disabled", false);
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            refreshReCaptchaV3('contact_us_ajax_id', 'contact_us_action');
            let errors = jqXHR.responseJSON.errors;
            alert(errors[Object.keys(errors)[0]][0]);
            $inputs.prop("disabled", false);
        });
    });
});