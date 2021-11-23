/**
 * @api {POST} /card/check checks if card exist or not
 * @apiName Check Card
 * @apiGroup Card
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string}  cardNumber the user card number
 * @apiParam {string}  userId the id of the user
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {Object} payload object containing card information
 * @apiSuccess {string} payload.cardNumber User Card number
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":
 *             {
 *               "cardNumber": "134585859494849"
 *             }
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
