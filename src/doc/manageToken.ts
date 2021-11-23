/**
 * @api {post} /token/refresh Refresh accessToken
 * @apiName Token-Refresh
 * @apiGroup Verification
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} refreshToken refreshed token recieved on successful login or phone verification.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} payload  An object which contains verifcation information.
 * @apiSuccess {String} payload.accessToken  Access token to get resources from any service.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *        "payload": {
 *             "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTExNDYyMjJ9.qJGAtvbWNm9xOJRmcV9Te27E5WdTdE9mn7EAd8bdqKA",
 *                }
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.INPUT",
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
 */
