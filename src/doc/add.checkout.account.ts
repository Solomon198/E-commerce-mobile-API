/**
 * @api {PUT} /resources/add-checkout-account Add account that driver can request withdrawal to.
 * @apiName Add Withdrawal Account
 * @apiGroup Resources
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} account_name  Name of drivers bank account
 * @apiParam {string} account_number Account number of user
 * @apiParam {string} bank_code The bank code associated with account number
 * @apiParam {string} userId id of the driver to add account
 * @apiParam {string} password user password to confirm users action
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {string} payload Information about account added
 * @apiSuccess {string} payload.bank_code bank code
 * @apiSuccess {string} payload.account_name Account name of account
 * @apiSuccess {string} payload.account_number Account number
 * @apiSuccess {string} payload.bank_name bank name
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *            "account_number":"8585848484",
 *             "bank_code":"056",
 *            "account_name":"Mandes Chris",
 *            "bank_name": "Guarrantee Trus Bank",
 * }
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
