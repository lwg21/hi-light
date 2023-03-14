class Tag < ApplicationRecord
  belongs_to :user
  has_many :hi_tags, dependent: :destroy
  has_many :highlights, through: :hi_tags
  validates :name, presence: true, uniqueness: { scope: :user }

  include PgSearch::Model
  pg_search_scope :search_by_tag_name,
    against: [ :name ],
    using: {
      tsearch: { prefix: true }
    }
end
