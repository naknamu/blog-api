console.log(
  "This script populates some test categories and items to your database." +
    'Specified database as argument - e.g.: node populateDB "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/musical-instrument?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Post = require("./model/post");
const User = require("./model/user");
const Comment = require("./model/comment");
const Category = require("./model/category");
const Tag = require("./model/tag");

const posts = [];
const users = [];
const comments = [];
const categories = [];
const tags = [];

// Connect to mongodb
const mongoose = require("mongoose");
const { post } = require("./routes/api");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createTags();
  await createPosts();
  await createComments();
  await createUser();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

/*** BLOG POST ***/

async function postCreate(title, content, category, tags, published) {
  postDetail = {
    title,
    content,
    category,
    tags,
    published,
  };

  const post = new Post(postDetail);
  await post.save();
  posts.push(post);
  console.log(`Added post: ${title}`);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(
      "Web Development Unleashed: Tips and Strategies for Starting Your Career",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categories[0],
      tags[0],
      true
    ),
    postCreate(
      "From Zero to Hero: How to Build a Successful Web Development Career",
      "Turpis egestas maecenas pharetra convallis posuere morbi leo. Ultrices sagittis orci a scelerisque. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Facilisis magna etiam tempor orci eu. Non diam phasellus vestibulum lorem sed risus. Lectus urna duis convallis convallis tellus id interdum velit. Condimentum lacinia quis vel eros donec. Dis parturient montes nascetur ridiculus mus mauris vitae. Sed viverra tellus in hac habitasse platea. Dui accumsan sit amet nulla facilisi.",
      categories[0],
      tags[1],
      false
    ),
  ]);
}

/*** CATEGORY ***/

async function categoryCreate(name, detail) {
  categoryDetail = {
    name,
    detail,
  };

  const category = new Category(categoryDetail);
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      "Web Development",
      "Pharetra pharetra massa massa ultricies mi quis. Augue mauris augue neque gravida."
    ),
  ]);
}

/*** TAG ***/

async function tagCreate(name, detail) {
  tagDetail = {
    name,
    detail,
  };

  const tag = new Tag(tagDetail);
  await tag.save();
  tags.push(tag);
  console.log(`Added tag: ${name}`);
}

async function createTags() {
  console.log("Adding tags");
  await Promise.all([
    tagCreate(
      "Nodejs",
      "Aenean et tortor at risus viverra. Arcu dui vivamus arcu felis bibendum ut."
    ),
    tagCreate(
      "Express",
      "Diam sit amet nisl suscipit adipiscing bibendum est."
    ),
  ]);
}

/*** COMMENT ***/

async function commentCreate(name, message, blogPost) {
  commentDetail = {
    name,
    message,
    blogPost,
  };

  const comment = new Comment(commentDetail);
  await comment.save();
  comments.push(comment);
  console.log(`Added comment: ${name}`);
}

async function createComments() {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(
      "John Doe",
      "Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Quam elementum pulvinar etiam non quam lacus.",
      posts[0]
    ),
    commentCreate(
      "Marie Curie",
      "Dui accumsan sit amet nulla facilisi.",
      posts[1]
    ),
  ]);
}

/*** USER ***/

async function userCreate(email, password) {
  userDetail = {
    email,
    password,
  };

  const user = new User(userDetail);
  await user.save();
  users.push(user);
  console.log(`Added user: ${email}`);
}

async function createUser() {
  console.log("Adding user");
  await Promise.all([userCreate("jdv@gmail.com", "test101")]);
}
