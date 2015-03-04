class ProductsController < AdminsController
  
  def index
    @q = Product.ransack(params[:q])
    @products = @q.result(distict: true).paginate(page: params[:page], per_page: 10)
  end

  def new
    @product = Product.new
    @categories = Category.all
  end

  def batch_products
    @product = Product.new
    @categories = Category.all
  end

  def edit
    @product = Product.find(params[:id])
    @categories = Category.all 
  end

  def create 
    if params[:product].present?
      @product = Product.new(product_params)
      if @product.save
        redirect_to products_path
      else
        render 'new'
      end
    elsif params[:products].present?
      params[:products].each do |product| 
        @batch_products = Product.new(batch_product_params(product.last['product']))
        @batch_products.save
      end
      respond_to do |format|   
        format.json { render json: {:success => true} }  
      end
    end      
  end

  def add_batch
    @no_of_forms = batch_param.present? ? batch_param.to_i : 1
    @categories = Category.all
    respond_to do |format|
      format.js
    end
  end


  def validate_batch
    product_response = [] 
    params[:products].each do |product|
      @batch = Product.new(batch_product_params(product.last['product']))
      @batch.valid? ? product_response.push(message: true) :  product_response.push(message: false, counter: product.first, product_errors:  @batch.errors.full_messages)
    end
    respond_to do |format|   
      error  = product_response.detect{|pr| pr[:message] == false}
      if error.present?  
        format.json { render json: {success: false, errors: list_of_errors(product_response)}}
      else
        format.json { render json: {:success => true} }
      end   
    end
  end


  def update
    @product = Product.find(params[:id])
   
    if @product.update(product_params)
      redirect_to products_path
    else
      render 'edit'
    end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
  end

  private
  def product_params
    params.require(:product).permit(:name, :description, :category_ids, :status, :price, 
      :is_recurring, :recurring_type, :recurring_no_of_payments, :recurring_custom_bill_on, 
      :recurring_custom_type, :has_trial, :trial_price, :trial_days, :product_ids => [])
  end

  def batch_param
    params[:add_batch_products][:no_of_forms] 
  end

  def batch_product_params(params)
    ac_params = ActionController::Parameters.new(params)
    ac_params.permit(:name, :description, :price, :category_ids, :status, :is_recurring, :recurring_type, :recurring_custom_bill_on, :recurring_custom_type, :recurring_no_of_payments, :has_trial, :trial_price, :trial_days)
  end

  def list_of_errors(errors_list)
    errors = []
    messages = errors_list.each do |e|
      e[:counter].present? ? errors.push(e[:counter]) : ""
      e[:product_errors].present? ? errors.push(e[:product_errors]) : ""
    end
    errors  
  end

end
