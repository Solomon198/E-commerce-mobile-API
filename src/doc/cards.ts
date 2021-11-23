/**
 * @api {POST} /card add a valid card
 * @apiName AddCard
 * @apiGroup Card
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 * @apiDescription Connects a credit card to a user account i.e both driver and user, NOTE please use the card api's  end point to check if the user already have a card  before attempting to adding a card to avoid charging a user and the card wont be added.
 *
 * @apiParam {string} cardNumber the card number
 * @apiParam {string} userId id of the user
 * @apiParam {string} reference the reference code when the card was charged initially usually #50, the reference code will be use to refund back the user money
 * @apiParam {string} email email address of the user
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {Object} payload object containing card information
 * @apiSuccess {string} payload.authorization Authorization code from payment platform
 * @apiSuccess {string} payload.cardNumber User Card number
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":{
 *         "authorization": "848dAz48.84",
 *         "cardNumber": "134585859494849",
 *        }
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
