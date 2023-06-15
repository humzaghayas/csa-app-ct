export const REPEAT_ENUM = {
    "Every month":"month",
    "Every 2 months":"2month",
    "Every 3 months":"3month",
}

export const getRepeatOptions = Object.keys(REPEAT_ENUM).map(
    (key) => ({
      label: key,
      value: REPEAT_ENUM[key],
  }));

export const getCartOptions = (carts,selectedCartId) =>(
    carts?.map(cart=>{
        return {
            value:cart?.id,
            label:cart?.createdAt,
            isDisabled:carts.filter(e=>e.id==selectedCartId)[0]?.id ? true : false
        }
    })
)

export const SAMPLE_RESULTS = {
    "results": [
        {
            "id": "6483205f09d32309d690716b",
            "value": {
                "_id": "6483205f09d32309d690716b",
                "id": "",
                "scheduleDate": "2023-02-06T00:00:00.000Z",
                "repeat": "month",
                "customerId": "3ab83880-cdd6-4b1b-bb30-3f8945794f2d",
                "cartId": "bc29a1c6-e68d-4b4b-b2cc-046ac9012781",
                "isActive": false,
                "createdBy": "ahsan.ali",
                "createdAt": "2023-06-09T12:51:43.627Z",
                "lastModifiedAt": "2023-06-09T12:51:43.627Z",
                "__v": 0
            }
        },
        {
            "id": "647db3db7557a18325a62f73",
            "value": {
                "_id": "647db3db7557a18325a62f73",
                "scheduleDate": "2023-02-06T00:00:00.000Z",
                "repeat": "month",
                "duration": 4,
                "customerId": "3ab83880-cdd6-4b1b-bb30-3f8945794f2d",
                "cartId": "bc29a1c6-e68d-4b4b-b2cc-046ac9012781",
                "isActive": false,
                "lastOrderDate": "2023-02-06T00:00:00.000Z",
                "createdBy": "ahsan.ali",
                "createdAt": "2023-06-05T10:07:23.039Z",
                "lastModifiedAt": "2023-06-09T12:45:22.660Z",
                "__v": 0,
                "id": "647db3db7557a18325a62f73"
            }
        },
        {
            "id": "647da71b401543acaeab3632",
            "value": {
                "_id": "647da71b401543acaeab3632",
                "scheduleDate": "2023-02-06T00:00:00.000Z",
                "repeat": "month",
                "duration": 4,
                "customerId": "3ab83880-cdd6-4b1b-bb30-3f8945794f2d",
                "cartId": "bc29a1c6-e68d-4b4b-b2cc-046ac9012781",
                "isActive": true,
                "lastOrderDate": "2023-02-06T00:00:00.000Z",
                "createdBy": "ahsan.ali",
                "createdAt": "2023-06-05T09:12:59.991Z",
                "lastModifiedAt": "2023-06-05T09:12:59.991Z",
                "__v": 0
            }
        }
    ],
    "total": 3,
    "limit": 10,
    "offset": 0,
    "count": 3
}

export const getScheduleFormValue = async (schedule) =>(
    {
        ...schedule.value,
        id:schedule?.id,
    }
) 

export const getScheduleEmptyFormValue = async () =>(
    {
        cartId:"",
        isActive:true,
        repeat:{},
        scheduleDate:"",
    }
)