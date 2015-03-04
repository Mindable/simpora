class CategoriesController < AdminsController
  

  def create
    @category = Category.new(category_params)
    if @category.save
      @category
    else
      @error = @category.errors.full_messages.to_sentence
    end    
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

end
