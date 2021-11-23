/**
 * @api {post} /verify/code Verify token and pin
 * @apiName Token-Verification
 * @apiGroup Verification
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} pin The verification Pin sent to phone number via call/sms.
 * @apiParam {string} token token generated when pin was sent to phone number.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} payload  An object which contains verifcation information.
 * @apiSuccess {String} payload.accessToken  Access token to get resources from any service.
 * @apiSuccess {String} payload.refreshToken Token used to generate accessToken when expired, must be stored securely.
 * @apiSuccess {Object} payload.user The user information
 * @apiSuccess {String} payload.user.userId id of the user
 * @apiSuccess {String} payload.user.firstName firstname of the user
 * @apiSuccess {String} payload.user.lastName lastname of the user
 * @apiSuccess {String} payload.user.gender the gender of the user
 * @apiSuccess {String} payload.user.accountType account type of the user
 * @apiSuccess {String} payload.user.isVerified verification status of the user
 * @apiSuccess {String} payload.user.phoneNumber phone number of the user
 * @apiSuccess {String} payload.user.isAvailable availability of the user
 * @apiSuccess {String} payload.user.isPicker is the use a driver
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *        "payload": {
 *             "user":{
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "accountType": "user",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": true,
 *                    "isAvailable": true,
 *                    "isPicker": true
 *              }
 *             "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTExNDYyMjJ9.qJGAtvbWNm9xOJRmcV9Te27E5WdTdE9mn7EAd8bdqKA",
 *             "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1ZlcmlmaWVkIjpmYWxzZSwiX2lkIjoiNjAwMzQ4MTkzZGE5YzRmODJmODVlNDQ1IiwiZW1haWwiOiIgIiwicGhvbmUiOiIrMjM0OTA1MDcwOTQ0NCIsInVzZXJJZCI6IjYwMDM0ODE5M2RhOWM0ZjgyZjg1ZTQ0NSIsInNhbHQiOiIkMmEkMTAkMGgwVEp3T3hBTEhhQWN0SzNrMHV4ZSIsImhhc2giOiIkMmEkMTAkMGgwVEp3T3hBTEhhQWN0SzNrMHV4ZXlWYmprYzg3NzJrMGpKQzdySFZETGV0V3o1UnV1ODIiLCJfX3YiOjAsImlhdCI6MTYxMTE0NjIyMn0.XbH6yNfSt3yjSV7MeokOcqRBwBh6xil8s9JdATGoXx4"
 *                }
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | INVALID.INPUT",
 *        "message": "describes reason for error"
 *     }
 *
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "describes reason for error"
 *     }
 *
 * @apiError UserUnauthorized The user is not unauthorized.
 * @apiErrorExample UnAuthorized:
 *     HTTP/1.1 401 Unauthorized request
 *     {
 *        "message": "describes reason for error",
 *        "error": "UNAUTHORIZED.REQUEST"
 *     }
 *
 *
 * @apiError Pin-Trial-Exceeded Maximum trial of pin exceeded.
 * @apiErrorExample Pin-Trial-Exceeded:
 *     HTTP/1.1 403 FORBIDDEN
 *     {
 *        "error": "MAX.TRIALS.EXCEEDED",
 *        "mesage": "describes reason for error"
 *     }
 *
 */
