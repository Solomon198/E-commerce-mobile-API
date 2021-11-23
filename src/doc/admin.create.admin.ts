/**
 * @api {POST} /admin/create-admin Register an Admin
 * @apiName Register an Admin
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} phoneNumber admin phone number.
 * @apiParam {string} firstName admin first name
 * @apiParam {string} [photo] admin photo
 * @apiParam {string} lastName admin last name
 * @apiParam {string} gender admin gender ---> male or female
 * @apiParam {string} password admins account password, mininum should be 6 and should contain uppercase and lower case with at least a special character and a number.
 * @apiParam {string} countryCode two letter country code of admin in uppercase e.g NG for Nigeria.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload The information of the admin.
 * @apiSuccess {string} payload.userId the ID of the admin
 * @apiSuccess {string} payload.firstName admin first name
 * @apiSuccess {string} payload.lastName admin last name
 * @apiSuccess {string} payload.gender admins gender
 * @apiSuccess {string} payload.phoneNumber admins phone number
 * @apiSuccess {boolean} payload.isVerified admin verification status
 * @apiSuccess {boolean} payload.isAvailable admin availability status
 * @apiSuccess {boolean} payload.isPicker Specify if admin is a picker or not
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
