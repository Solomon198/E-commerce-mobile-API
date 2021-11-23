/**
 * @api {put} /update/user/profile Update user profile
 * @apiName UpdateUserProfile
 * @apiGroup Update
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 *
 * @apiParam {string} userId user id of the account to be updated
 * @apiParam {Objects} updates user information passing all allow properties and value
 * @apiParam {string}  [updates.photo] update user profile information
 *
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload The information of the driver.
 * @apiSuccess {string} payload.userId the ID of the driver
 * @apiSuccess {string} payload.firstName driver first name
 * @apiSuccess {string} payload.lastName driver last name
 * @apiSuccess {string} payload.gender driver gender
 * @apiSuccess {string} payload.phoneNumber driver phone number
 * @apiSuccess {boolean} payload.isVerified driver verification status
 * @apiSuccess {boolean} payload.isAvailable driver availability status
 * @apiSuccess {boolean} payload.isPicker Specify if driver is a picker or not
 * @apiSuccess {string} payload.isActiviated driver activation status
 * @apiSuccess {string} payload.photo driver profilePhoto
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": false,
 *                    "isAvailable": true,
 *                    "isPicker": false,
 *                    "photo":"https://urltophoto.com",
 *                    "isActivated":"true",
 *
 *         }
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | PASSWORD.STRENGTH.WEEK | INVALID.INPUT",
 *        "message": "describes reason for error"
 *     }
 *
 *
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "describes reason for error"
 *     }
 */
