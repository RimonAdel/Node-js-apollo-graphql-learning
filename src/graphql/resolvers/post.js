export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      let posts = await Post.find();
      return posts;
    },
    getPostByID: async (_, {id}, {Post}) =>{
      let post = await Post.findById(id);
      return post;
    }
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post }) => {
      let result = await Post.create(newPost);
      return result;
    },

    editPostByID: async (_, { updatedPost, id }, { Post }) => {
      let editedPost = await Post.findByIdAndUpdate(
        id,
        { ...updatedPost },
        { new: true }
      );
      return editedPost;
    },

    deletePostById: async (_, { id }, { Post }) => {
      let deletePost = await Post.findByIdAndDelete(id);
      return {
        id: deletePost.id,
        message: `post with id: ${deletePost.id} has been deleted`,
        success: true,
      };
    },
  },
};
