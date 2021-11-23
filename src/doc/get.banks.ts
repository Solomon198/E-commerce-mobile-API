/**
 * @api {GET} /resources/banks Get banks
 * @apiName Get Banks
 * @apiGroup Resources
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {Array} payload object containing banks
 * @apiSuccess {string} payload.name name of bank
 * @apiSuccess {string} payload.code code of bank
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":
 *            [ {
 *                   "name": "Abbey Mortgage Bank",
 *                   "slug": "abbey-mortgage-bank",
 *                   "code": "801",
 *                   "longcode": "",
 *                   "gateway": null,
 *                   "pay_with_bank": false,
 *                   "active": true,
 *                   "is_deleted": false,
 *                   "country": "Nigeria",
 *                   "currency": "NGN",
 *                   "type": "nuban",
 *                   "id": 174,
 *                   "createdAt": "2020-12-07T16:19:09.000Z",
 *                   "updatedAt": "2020-12-07T16:19:19.000Z"]
 *
 *
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
