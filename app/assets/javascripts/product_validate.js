$(document).ready(function(){
    jQuery.validator.messages.required = "";
        $('#batch-form-new').validate({
          rules: {
            "product[name]": {
                required: true
            },
            "product[description]": {
                required: true
            },
            "product[price]": {
                required: true
            },
            "product[status]": {
                required: true
            },
            "product[category_ids]": {
                required: true
            },
            "product[recurring_type]": {
              required: function(element) {
                if ($('product[is_recurring]:checked').length) {
                    return false;
                } 
                else {
                    return true;
                }  
              }
            },
            "product[recurring_no_of_payments]": {
              required: function(element) {
                if ($('product[is_recurring]:checked').length) {
                    return false;
                } 
                else {
                    return true;
                }  
              }
            },
            "product[trial_price]": {
              required: function(element) {
                if ($('product[has_trial]:checked').length) {
                    return false;
                } 
                else {
                    return true;
                }  
              }
            },
            "product[trial_days]": {
              required: function(element) {
                if ($('product[has_trial]:checked').length) {
                    return false;
                } 
                else {
                    return true;
                }  
              }
            },
            "product[recurring_custom_bill_on]": {
              required: function(element) {
                if ($('product[recurring_type]') == '4')  {
                    return false;
                } 
                else {
                    return true;
                }  
              }
            },
            "product[recurring_custom_type]": {
              required: function(element) {
                if ($('product[recurring_type]') == '4')   {
                    return false;
                } 
                else {
                    return true;
                }  
              }
            }
          },  
          highlight: function(element) {
            $(element).removeClass('label.error').addClass('form-error');
          },
        });
});    