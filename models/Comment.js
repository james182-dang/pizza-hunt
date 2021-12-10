const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'Please reply with something!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'Please input your name for the reply!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: 'Please input a name!'
    },
    commentBody: {
        type: String,
        required: 'Please input text into the comment box!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false
  }
);

const Comment = model('Comment', CommentSchema);

// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});


module.exports = Comment;