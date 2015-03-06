$(document).ready(function(){
  
 $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
    e.stopPropagation();
  });

  $('.dropdown').on('change', 'input[type="checkbox"]', function(){

    $('input[type="checkbox"]').not(this).prop('checked', false);
  });









  $('.dropdown').on('click', '#dropdown-category-box', function(){  
    if($(this).is(":checked")) {
      var returnVal = confirm("Category");
      $('#dropdown-menu').show('slow');
    }
  });




  $('.dropdown').on('change', '#dropdown-recurring-box', function(){    
    if($(this).is(":checked")) {
      var returnVal = confirm("recurring");
    }
  });

  $('.dropdown').on('change', '#dropdown-status-box', function(){
    if($(this).is(":checked")) {
      var returnVal = confirm("Status");
    }
  });

  $("#product_search select").change(function(){
    $(this).parents("form").submit();
  })
  
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

  $('.single-product').on('click', '.product_is_recurring', function(e){

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

  $('.single-product').on('click', '.product_trial', function(e){
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

  $('.single-product').on('change', '.product_recurring_type', function(e){
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


  $('.dropdown-menu').on('click', '.category_search', function(e){
    var category = $(e.target);
    e.preventDefault();
    $('#category_id').val(category.val());
    $('#search_form').unbind().submit(); 
  });

  $('.dropdown-menu1').on('click', '.category_search', function(e){
    var category = $(e.target);
    e.preventDefault();
    $('#category_id').val(category.val());
    $('#search_form').unbind().submit(); 
  });


  $('.dropdown-menu').on('click', '.status_search', function(e){
    var status = $(e.target);
    e.preventDefault();
    $('#q_status_eq').val(status.val());
    $('#search_form').unbind().submit(); 
  });


  $('.dropdown-menu').on('click', '.recurring_search', function(e){
    var status = $(e.target);
    e.preventDefault();
    $('#q_is_recurring_eq').val(status.val());
    $('#search_form').unbind().submit(); 
  });

});