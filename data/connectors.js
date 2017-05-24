import Mongoose from 'mongoose';
import Sequelize from 'sequelize';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const mongo = Mongoose.connect('mongodb://localhost/views');

const AuthorModel = db.define('author', {
  firstName: {type: Sequelize.STRING},
  lastName: {type: Sequelize.STRING},
});

const PostModel = db.define('post', {
  title: {type: Sequelize.STRING},
  text: {type: Sequelize.STRING},
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

const ViewSchema = Mongoose.Schema({
                                     postId: Number,
                                     views: Number,
                                   });

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({force: true}).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
                                firstName: casual.first_name,
                                lastName: casual.last_name,
                              }).then((author) => {
      return author.createPost({
                                 title: `A post by ${author.firstName}`,
                                 text: casual.sentences(3),
                               }).then((post) => { // <- the new part starts here
        // create some View mocks
        return View.update(
          {postId: post.id},
          {views: casual.integer(0, 100)},
          {upsert: true});
      });
    });
  });
});

const View = Mongoose.model('views', ViewSchema);
const Author = db.models.author;
const Post = db.models.post;
const FortuneCookie = {
  getOne() {
    return rp('http://fortunecookieapi.herokuapp.com/v1/fortunes')
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res[0].message;
      });
  }
};

export {Author, Post, View, FortuneCookie};