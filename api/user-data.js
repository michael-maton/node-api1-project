const shortid = require('shortid')

let users = [
  { id: shortid.generate(), name: 'Jon Snow', bio: "King in the North" },
  { id: shortid.generate(), name: 'Tyrion', bio: "I drink and I know things" },
]

module.exports = {
  findAll() {
    // SELECT * FROM users;
    return Promise.resolve(users)
  }, // findAll().then().catch()

  findById(id) {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find(u => u.id === id)
    return Promise.resolve(user)
  },

  create({ name, bio }) {
    // INSERT INTO users (id, name, bio) VALUES (1, 'foo', 'Foo');
    const newUser = { id: shortid.generate(), name, bio }
    users.push(newUser)
    return Promise.resolve(newUser)
  },

  update(id, changes) {
    // UPDATE users SET name = 'Foo', bio = "bar" WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    const updatedUser = { ...changes, id }
    users = users.map(u => (u.id === id) ? updatedUser : u)
    return Promise.resolve(updatedUser)
  },

  delete(id) {
    // DELETE FROM dogs WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    users = users.filter(u => u.id !== id)
    return Promise.resolve(user)
  }
}
