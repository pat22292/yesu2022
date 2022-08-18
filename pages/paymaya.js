import { useEffect } from 'react'
import paymaya from 'paymaya-js-sdk';


function CheckEmail() {


    const exampleCheckoutObject = {
        "totalAmount": {
            "value": 100,
            "currency": "PHP",
            "details": {
                "discount": 0,
                "serviceCharge": 0,
                "shippingFee": 0,
                "tax": 0,
                "subtotal": 100
            }
        },
        "buyer": {
            "firstName": "Patrick",
            "middleName": "Pogi na",
            "lastName": "Pogi",
            "birthday": "1992-10-24",
            "customerSince": "1992-10-24",
            "sex": "M",
            "contact": {
                "phone": "+639181008888",
                "email": "merchant@merchantsite.com"
            },
            "shippingAddress": {
                "firstName": "John",
                "middleName": "Paul",
                "lastName": "Doe",
                "phone": "+639181008888",
                "email": "merchant@merchantsite.com",
                "line1": "6F Launchpad",
                "line2": "Reliance Street",
                "city": "Mandaluyong City",
                "state": "Metro Manila",
                "zipCode": "1552",
                "countryCode": "PH",
                "shippingType": "ST" // ST - for standard, SD - for same day
            },
            "billingAddress": {
                "line1": "6F Launchpad",
                "line2": "Reliance Street",
                "city": "Mandaluyong City",
                "state": "Metro Manila",
                "zipCode": "1552",
                "countryCode": "PH"
            }
        },
        "items": [
            {
                "name": "Canvas Slip Ons",
                "quantity": 1,
                "code": "CVG-096732",
                "description": "Shoes",
                "amount": {
                    "value": 100,
                    "details": {
                        "discount": 0,
                        "serviceCharge": 0,
                        "shippingFee": 0,
                        "tax": 0,
                        "subtotal": 100
                    }
                },
                "totalAmount": {
                    "value": 100,
                    "details": {
                        "discount": 0,
                        "serviceCharge": 0,
                        "shippingFee": 0,
                        "tax": 0,
                        "subtotal": 100
                    }
                }
            }
        ],
        "redirectUrl": {
            "success": "https://www.merchantsite.com/success",
            "failure": "https://www.merchantsite.com/failure",
            "cancel": "https://www.merchantsite.com/cancel"
        },
        "requestReferenceNumber": "1551191039",
        "metadata": {}
    };
    useEffect(() => {
        paymaya.init('pk-lNAUk1jk7VPnf7koOT1uoGJoZJjmAxrbjpj6urB8EIA', true);
        paymaya.createCheckout(exampleCheckoutObject);
    }, []);



    return (

        <div className="h-screen m-auto flex flex-wrap content-center" >
            <h1>This is for Paymaya</h1>
        </div>

    )

}

export default CheckEmail
