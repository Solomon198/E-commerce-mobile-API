/**
 * @api {post} /verify/call Send call verification
 * @apiName  callVerification
 * @apiGroup Verification
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} phoneNumber users phone number.
 * @apiParam {string} countryCode two letter country code of user in uppercase e.g NG for Nigeria.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} payload  An object which contains verifcation information.
 * @apiSuccess {String} payload.token  The verification token.
 * @apiSuccess {String} payload.synchResponse A json object that contains information about the callid with <cod>callId</code> as a property of the object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *        "payload": {
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRsRm9ybWF0IjoiKzIzNDkwNTA3MDk0NDQiLCJpYXQiOjE2MTExNDYxMDB9.   qCVA9lh-g64PyMkkcDOxauU9Ok9SCNP1_ceoFc8kALI",
 *            "synchResponse": "{\"callId\":\"fbffe741-e8f4-4ad9-a41b-c3fc76e1bcef\"}"
 *                }
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample Invalid-Input:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message": "describes reason for error",
 *        "error": "INVALID.PHONE | INVALID.INPUT"
 *     }
 *
 * @apiError ServerError Internal serval error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "message": "describes reason for error",
 *        "error": "SERVER.ERROR"
 *     }
 *
 * @apiError Last Pin Requested Not timeout.
 * @apiErrorExample Pin-Not-Timeout:
 *     HTTP/1.1 403 FORBIDDEN
 *     {
 *        "error": "PIN.NOT.TIMEOUT",
 *        "mesage": "describes reason for error"
 *     }
 *
 *
 * @apiError Invalid login credential .
 * @apiErrorExample InvalidCredential:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message": "describes reason for error",
 *        "error": "INVALID.LOGIN.CREDENTIALS"
 *     }
 *
 */
