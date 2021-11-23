/**
 * @api {GET} /admin/drivers?page=1 Get list of drivers
 * @apiName Get drivers
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiSuccess {string} message success message
 * @apiSuccess {Array} payload Array containing list of drivers check the success output for sample objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": [{
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "photo": "https://firebase.com",
 *                    "localPhoneNumber": "0844303308494",
 *                    "driverLicense": "88484938484848",
 *                    "taxiLicense": "84848483838838",
 *                    "driverLicensePhoto": "https://firebase.com",
 *                    "gender": "male",
 *                    "accountType": "user",
 *                    "phoneNumber": "+234884430330",
 *                    "isVerified": true,
 *                    "isAvailable": true,
 *                    "isPicker": true,
 *                    "guarrantorInformation":{
 *                           "fullName": "Victor Glama",
 *                           "phoneNumber": "08034839438",
 *                           "address": GF2 Gwari road,
 *                           "ID": "848iudjdjj",
 *                           "IDType": "nin",
 *                           "addressOfPlaceOfWork": "dixre enterprise",
 *                           "email": "example@gmail.com",
 *                           "placeOfWork":"dixre enterprice kano road by ibadan street Nasara plaza",
 *                           "positionAtWork":"CMO"
 *                        }
 *                  },
 *                    ....
 *                 ]
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
