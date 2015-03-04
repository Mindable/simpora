$(document).ready(function(){

  $(".product_is_recurring").each(function (index){
    var recurring = $(this);

    if(this.checked){
      recurring.parent().parent().find('.recurring').show('');
    }
    else{
      recurring.parent().parent().find('.recurring').hide();
      recurring.parent().parent().find('.recurring_custom_bill_on').hide();
      recurring.parent().parent().find('.recurring_custom_type').hide();
    }
  });

  $('.bulk-products').on('click', '.product_is_recurring', function(e){

      var recurring = $(e.target);

      if(this.checked){
        recurring.parent().parent().find('.recurring').show('slow');
      }
      else{
        recurring.parent().parent().find('.recurring').hide('slow');
      }
  });


  $(".product_trial").each(function (index){
    var trial = $(this);

    if(this.checked){
      trial.parent().parent().find('.product_trial_price').show('slow');
      trial.parent().parent().find('.product_trial_days').show('slow');
    }
    else{
      trial.parent().parent().find('.product_trial_price').hide();
      trial.parent().parent().find('.product_trial_days').hide();
    }
  });

  $('.bulk-products').on('click', '.product_trial', function(e){
    var trial = $(e.target);

    if(this.checked){
      trial.parent().parent().find('.product_trial_price').show('slow');
      trial.parent().parent().find('.product_trial_days').show('slow');
    }
    else{
      trial.parent().parent().find('.product_trial_price').hide('slow');
      trial.parent().parent().find('.product_trial_days').hide('slow');
    }
  });

  $('.bulk-products').on('change', '.product_recurring_type', function(e){
    var custom = $(e.target);
    if (custom.val() == "4"){
      custom.parent().find('.recurring_custom_bill_on').show('slow');
      custom.parent().find('.recurring_custom_type').show('slow');
    }
    else{
      custom.parent().find('.recurring_custom_bill_on').hide('slow');
      custom.parent().find('.recurring_custom_type').hide('slow');
    }
  });

  $('.bulk-products').on('click', '.batch-new-category', function(e){
    var category = $(e.target);
    category.parent('.product_category').hide();
    category.parent('.add_new_category').hide();
    category.parent().siblings('.save-category').show();
  });


  $('.bulk-products').on('click', '.save-category-btn', function(e){
    var new_category = $(e.target);
    var new_category_name = new_category.parent().find('.save-category-field');
    var category_select_parent = new_category.parent().parent().find('.product_category');
    if (new_category_name.val() == ""){
      new_category_name.addClass('form-error');
    }
    else{
      $.ajax({
        url: "/admins/categories",
        type:"POST",
        data: {"category": {"name": new_category_name.val()}},
        success: function(data) {
          $('.save-category').hide();
          $('.product_category').show();
          $('.add_new_category').show();
          $(".list-of-categories").append("<option value="+data+">" + new_category_name.val()+ "<option>");
          category_select_parent.find(".list-of-categories option[value="+data+"]").prop('selected', true);
        }
      });
    }
  });


  $('.single-product').on('click', '.batch-new-category', function(e){
    var category = $(e.target);
    category.parent('.product_category').hide();
    category.parent('.add_new_category').hide();
    category.parent().siblings('.save-category').show();
  });


  $('.single-product').on('click', '.save-category-btn', function(e){  
    var new_category = $(e.target);
    var new_category_name = new_category.parent().find('.save-category-field');
    var category_select_parent = new_category.parent().parent().find('.product_category');  
    if (new_category_name.val() == ""){
      new_category_name.addClass('form-error');
    }
    else{
      $.ajax({
        url: "/admins/categories",
        type:"POST",
        dataType:'json',
        data: {"category": {"name": new_category_name.val()}},
        success: function(data) {
          $('.save-category').hide();
          $('.product_category').show();
          $('.add_new_category').show();
          $(".list-of-categories").append("<option value="+data+">" + new_category_name.val()+ "<option>");
          category_select_parent.find(".list-of-categories option[value="+data+"]").prop('selected', true);
        }
      });
    }
  });

  $('.single-product').on('keypress','.save-category-field', function(e){
    $(this).removeClass('form-error');
  });

  $('.bulk-products').on('keypress','.save-category-field', function(e){
    $(this).removeClass('form-error');
  });

});

