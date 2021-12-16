const UserControler = require('./controllers/UserController');
module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserControler.listUser,
  },
  {
    endpoint: '/products',
    method: 'GET',
    handler: UserControler.listUser,
  },
]