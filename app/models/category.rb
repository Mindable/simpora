class Category < ActiveRecord::Base
  has_and_belongs_to_many :products, join_table: :product_categories

  accepts_nested_attributes_for :products 
  
  validates :name, presence: true
  validates :name, uniqueness: {case_insensitive: true, allow_blank: true}
end
