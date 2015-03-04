class AddAdminIdInProduct < ActiveRecord::Migration
  def change
    add_column :products, :admin_id, :integer, index: true
  end
end
