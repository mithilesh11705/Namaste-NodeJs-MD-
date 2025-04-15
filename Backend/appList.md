# DevTinder Apis

## authRouter

-POST /signup
-POST /login
-POST /logout

## ProfileRouter

-GET /profile
-PATCH /profile/edit
-PATCH /profile/password

## connectionRouter

-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId

-POST#5RKYKQ

-POST /request/review/accepted/:userId
-POST /request/review/rejected/:userId

## userRouter

-GET /user/connections
-GET /user/requests/received
-GET /user/feed

status:ignore,interested,accepted,rejected,
