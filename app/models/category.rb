class Category < ActiveRecord::Base
  has_and_belongs_to_many :products, join_table: :product_categories

  accepts_nested_attributes_for :products 
  
  validates :name, presence: true
end
