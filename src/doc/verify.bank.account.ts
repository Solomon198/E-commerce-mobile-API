/**
 * @api {GET} /resources/verify-bank-account?bank_code="049"&account_number="488848484848" Verify bank account
 * @apiName Verify bank account
 * @apiGroup Resources
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {Object} payload object containing account information
 * @apiSuccess {string} payload.account_name name of bank account
 * @apiSuccess {string} payload.account_number account number
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *                    "account_number": "0001234567",
 *                    "account_name": "Doe Jane Loren",
 *                    "bank_id": 9
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
