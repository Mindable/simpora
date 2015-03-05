class CategoriesController < AdminsController
  

  def index
    @q = Category.ransack(params[:q])
    @categories = @q.result(distict: true).paginate(page: params[:page], per_page: 10)
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      @category
    else
      @error = @category.errors.full_messages.to_sentence
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
