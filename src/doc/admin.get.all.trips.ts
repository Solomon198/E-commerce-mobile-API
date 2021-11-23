/**
 * @api {get} /admin/all-deliveries?status=3 Get all completed or cancelled deliveries
 * @apiName Get deliveries by status
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} status specify if the trips to be retrieved is completed or cancelled trips which are represented by number of either 3 or 4 respectively
 *
 * @apiSuccess {String} message describes the success of the action performed.
 * @apiSuccess {Object[]} payload returns created parcel.
 * @apiSuccess {Object} payload.parcelPicker parcelPicker user information
 * @apiSuccess {Object} payload.parcelOwner parcelOwner user information
 * @apiSucess  {Date}   payload.date date parcel was created
 * @apiSuccess {Date}   payload.parcelDeliveryAcceptedTime date parcel delivery was accepted
 * @apiSuccess {string} payload.parcelDescription description of parcel
 * @apiSuccess {Number[]} payload.parcelLocation longitude and latitude of pickup of parcel
 * @apiSuccess {Number[]} payload.parcelDestination longitude and latitude of parcel destination
 * @apiSuccess {Number}   payload.parcelCalculatedDistance distance between pickup location and pickup destination in kmGetCards
 * @apiSuccess {Number} payload.parcelPickUpPrice amount for delivering parcel base on distance in kobo
 * @apiSuccess {string} payload.parcelStatus state of the parcel since time created which can be either NOT-PICKED,PICKUP-ACCEPTED,PICKUP-DELIVERED and DELIVERY-CONFIRMED
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":[{
 *
 *               "parcelPicker": {
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "accountType": "user",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": true,
 *                    "isAvailable": true,
 *                    "isPicker": true
 *                },
 *               "parcelOwner": {
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "accountType": "user",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": true,
 *                    "isAvailable": true,
 *                    "isPicker": false
 *                },
 *               "date": Thu Feb 25 2021 15:29:29 GMT-0500 (Eastern Standard Time) {},
 *               "parcelDeliveryAcceptedTime": Thu Feb 25 2021 15:29:29 GMT-0500 (Eastern Standard Time) {},
 *               "parcelDescription": "parcel description",
 *               "parcelLocation": [84.8484,-2.40444],
 *               "parcelDestination": [84.488,94.49],
 *               "parcelCalculatedDistance": 200,
 *               "parcelPickUpPrice": 4000,
 *               "parcelStatus":  "NOT-PICKED" |  "PICKUP-ACCEPTED" | "PICKUP-DELIVERED" | "DELIVERY-CONFIRMED"
 *
 *          }]
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
