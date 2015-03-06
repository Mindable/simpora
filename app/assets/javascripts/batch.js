$(document).ready(function(){

  // setup best in place
  $(".best_in_place").best_in_place();
  $('.edit-category').on('click', function() {
    $('#best_in_place_category_' + $(this).data('id') + '_name').click();
  });

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
          $(".list-of-categories").append("<option value="+data.id+">" + new_category_name.val()+ "<option>");
          category_select_parent.find(".list-of-categories option[value="+data.id+"]").prop('selected', true);
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
          $(".list-of-categories").append("<option value="+data.id+">" + new_category_name.val()+ "<option>");
          category_select_parent.find(".list-of-categories option[value="+data.id+"]").prop('selected', true);
        },
      });
    }
  });



  $('.listing-table').on('click', '.batch-new-category', function(e){
    var category = $(e.target);
    category.parent().find('.save-category').show();
    $('#myModal').modal('show')
  });

  $('.listing-table').on('click', '.save-category-btn', function(e){  
    var new_category = $(e.target);
    var new_category_name = new_category.parent().find('.save-category-field'); 
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
          window.location.href = '/admins/categories/';     
        },
        error: function (){
          new_category_name.addClass('form-error');
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


  $(".all-products").each(function (index){
    var all_products = $(this);

    if(this.checked){
      all_products.parent().find('.select-product').prop('checked', true);
    }
    else{
      all_products.parent().find('.select-product').prop('checked', false);
    }
  });

  $('.listing-table').on('click', '.all-products', function(e){
    var all_products = $(e.target);

    if(this.checked){
      $('.select-product').prop('checked', true);
      $('.check-box-update').show()
    }
    else{
      $('.select-product').prop('checked', false);
      $('.check-box-update').hide()
    }
  });


  $('.listing-table').on('click', '.select-product', function(e){
    var selected_product = $(e.target);

    if(this.checked  && $('.all-products').not(":checked")){
      $('.check-box-update').show()
    }
  });

  $('.product-delete-btn').on('click', function(e){
    var action_type = $(e.target);
    e.preventDefault(); 
    getAllCheckedProductIds();  
    $('#product_ids').val(getAllCheckedProductIds);
    $('#action_type').val(action_type.val());
    $('#delet_form').unbind().submit(); 
   });

  function getAllCheckedProductIds(){
    var checked = []; 
    $('.select-product').map(function() {
        if (this.checked) 
        checked.push(this.value);
    });
    return checked;
  }

});
