class PostsController < ApplicationController
  before_action :set_posts, only: %i[index create]

  def index
    @post = Post.new
    respond_to do |format|
      format.html
      format.json do
        render json: {
          entries: render_to_string(partial: 'posts/posts', formats: [:html], locals: { posts: @posts }),
          pagination: view_context.pagy_nav(@pagy)
        }
      end
    end
  end

  def show
    @post = Post.find(params[:id])
    render partial: 'modal_content', locals: { post: @post }
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: { success: true }
    else
      render json: {
        success: false,
        form: render_to_string(partial: 'form', locals: { post: @post })
      }
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end

  def set_posts
    @pagy, @posts = pagy(Post.order(created_at: :desc))
  end
end
