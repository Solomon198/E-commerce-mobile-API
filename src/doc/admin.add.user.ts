/**
 * @api {POST} /admin/add-user Register a user
 * @apiName Register a user
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} phoneNumber users phone number.
 * @apiParam {string} firstName user first name
 * @apiParam {string} lastName user last name
 * @apiParam {string} gender user gender ---> male or female
 * @apiParam {string} password users account password, mininum should be 6 and should contain uppercase and lower case with at least a special character and a number.
 * @apiParam {string} countryCode two letter country code of user in uppercase e.g NG for Nigeria.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload The information of the user.
 * @apiSuccess {string} payload.userId the ID of the user
 * @apiSuccess {string} payload.firstName user first name
 * @apiSuccess {string} payload.lastName user last name
 * @apiSuccess {string} payload.gender users gender
 * @apiSuccess {string} payload.phoneNumber users phone number
 * @apiSuccess {boolean} payload.isVerified user verification status
 * @apiSuccess {boolean} payload.isAvailable user availability status
 * @apiSuccess {boolean} payload.isPicker Specify if user is a picker or not
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
 *                    "isPicker": false
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
 *
 *
 * @apiError UserExist The user already exist.
 * @apiErrorExample User-Exist:
 *     HTTP/1.1 409 Conflict
 *     {
 *        "message": "describes reason for error",
 *        "error": "USER.EXIST"
 *     }
 *
 */
