class Product < ActiveRecord::Base
  has_and_belongs_to_many :categories, join_table: :product_categories
  has_and_belongs_to_many :orders, join_table: :order_products
  belongs_to :admins

  validates :name, :description, :categories, :status, :price, presence: true
  validates :recurring_type, :recurring_no_of_payments, presence: true, if: :is_recurring_billing?
  validates :recurring_custom_type, :recurring_custom_bill_on, presence: true, if: :is_recurring_custom_billing?
  validates :trial_price, :trial_days, presence: true, if: :free_trial_allowed?

  STATUS_VALUES = { active: 1, inactive: 2, archived: 3 }
  RECUURING_BILLING_TYPE = { :Weekly => 1,  :Monthly => 2, :Quaterly => 3, :Custom => 4}
  RECUURING_CUSTOME_TYPE = {:Days => 1, :Weeks => 2, :Months => 3}

  default_scope { order('created_at DESC') }




  def self.search(search)
    if search
      self.where("name like ?", "%#{search}%")
    else
      self.all
    end
  end

  def is_recurring_billing?
    is_recurring?
  end

  def is_recurring_custom_billing?
    recurring_type == RECUURING_BILLING_TYPE[:Custom]
  end

  def free_trial_allowed?
    has_trial?
  end

end
