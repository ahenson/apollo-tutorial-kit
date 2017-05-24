const typeDefinitions = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String 
  text: String
  views: Int
  author: Author
}

type Query {
  author(firstName: String, lastName: String): Author
  getFortuneCookie: String # we'll use this later
}

schema {
  query: Query
}

`;

export default [typeDefinitions];
