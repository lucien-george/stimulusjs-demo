class PostsController < ApplicationController
  before_action :set_posts, only: [:index, :create]

  def index
    @post = Post.new
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to posts_path
    else
      render :index
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end

  def set_posts
    @posts = Post.all
  end
end
