/**
 * @api {POST} /resources/request-withdrawal process driver withdrawal
 * @apiName Process Driver Withdrawal
 * @apiGroup Resources
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiParam {string} userId id of the user
 * @apiParam {string} amount amount to withdrawal
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {string} payload Contains the information about user account
 * @apiSuccess {string} payload.account_name Drivers bank account name
 * @apiSuccess {string} payload.account_number Drivers bank account number
 * @apiSuccess {string} payload.bank_code Drivers bank code
 * @apiSuccess {string} payload.userId Drivers id
 * @apiSuccess {string} payload.amount Drivers account balance
 * @apiSuccess {string} payload.bank_name Name of bank
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *             "userId": "48484848",
 *             "account_name": "Doggy Dog",
 *             "account_number": "85484838383",
 *             "bank_code" : "84",
 *             "amount": "844",
 *             "bank_name": "Guarrante trust Bank"
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
 *
 */
