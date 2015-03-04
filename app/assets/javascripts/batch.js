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

});