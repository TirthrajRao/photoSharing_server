const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const userValidation = require('./../validation/userValidation');
const fileUpload = require('../middleware/fileUpload');
const withAuth = require('../middleware/withAuth');

router.post('/signUp', [userValidation.addUser], userController.addUser);
router.post('/login', [userValidation.login], userController.login);
router.post('/facebooklogin', [userValidation.fbLogin], userController.checkAvailability);

router.use([withAuth]);
router.route('/user')
    .get(userController.getAllUser)
    .put([fileUpload.upload('profilePhoto'), userValidation.upadteUser], userController.updateUser)
    .delete(userController.deleteUserById)


router.post('/follow', [userValidation.follow], userController.addFriend);
router.post('/unfollow', [userValidation.unfollow], userController.removeFriend);
router.post('/search', [userValidation.searchUser], userController.searchUser);
// router.post('/auth/facebook',userController.facebook);
// router.post('/auth/facebook', userController.passport.authenticate('facebook', {scope: ['email']}));
router.get('/get-single-user/:userId', userController.getSingleUser);
router.get('/get-my-friends/:userId', userController.getMyAllFriendsById);
router.get('/get-my-followers/:userId', userController.getMyFollowersById);
router.put('/logout/:userId',userController.logOut);

module.exports = router;
