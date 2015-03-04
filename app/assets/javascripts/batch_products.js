function submitBatch(){
  var batch = {};
  batch['products'] = []
  $('.form-batch').each(function(){
    jQuery.validator.messages.required = "";
    $(this).validate({
      rules: {
        "product[name]": {
        required: true
        },
        "product[description]": {
        required: true,
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
    $(this).valid();

    var list = $(this).serializeJSON();
    batch['products'].push(list);
  });
  $.ajax({
    url:'validate_batch',
     type:"POST",
     dataType:'json',
     data: batch,
     processData: true,
    success: function (response){
      if (response.success == false){ 
      }
      else{
        $.ajax({
          url:'/admins/products/',
           type:"POST",
           dataType:'json',
           data: batch,
           processData: true,
          success: function (response){ 
            window.location.href = '/admins/products/';
          },
          error: function (xhr, status){
            alert(xhr.error);
          }
        });
      }

    },
    error: function (xhr, status){
      alert(xhr.error);
    }
  });
}

function addNewCategory(add_new) {
  $(add_new).parent('.product_category').hide();
  $(add_new).parent('.add_new_category').hide();
  $(add_new).parent().siblings('.save-category').show();
}

function saveCategory() {
  var new_category = $("#new-category-field").val();
  $.ajax({
      url: "/admins/categories",
      type:"POST",
      data: {"category": {"name": new_category}},
      success: function(data) {
      }
  });
}


      