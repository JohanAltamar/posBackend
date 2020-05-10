const { Router } = require('express')
const router = Router();

const {getUsers, createUser, getUserById, updateUser, deleteUser, loginUser, getUsersStartedWith} = require('../controllers/users.controller');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/login')
  .post(loginUser); //Query to check username and password

router.route('/regex')
  .get(getUsersStartedWith)

router.route("/:_id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
