class CategoriesController < AdminsController
  

  def index
     products_count = params.fetch(:q, {}).fetch(:products_name_eq, nil)
    if products_count.present?
      category = Category.having_product_count_of(products_count)
      @q = category.search(products_count)
      @categories = @q.result.paginate(page: params[:page], per_page: 10).order("created_at DESC")

    else 
      @q = Category.ransack(params[:q])
      @categories = @q.result(distict: true).paginate(page: params[:page], per_page: 10).order("created_at DESC")
    end
  end

  def create
    @category = Category.where(name: params[:category][:name]).first_or_create
    respond_to do |format|  
      format.json { render json: {id: @category.id} }  
    end  
  end

  def update
    @category = Category.find(params[:id])

    respond_to do |format|
      if @category.update_attributes(category_params)
        format.json { respond_with_bip(@category) }
      else
        format.json { respond_with_bip(@category) }
      end
    end
  end
    
  def destroy
    @category = Category.find(params[:id])
    @category.destroy
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

end
