mvn compile jib:build -D image=gcr.io/commerce-tools-b2b-services/mirake-ct-order-subscription

gcloud run deploy mirake-ct-order-subscription-service --image gcr.io/commerce-tools-b2b-services/mirake-ct-order-subscription --allow-unauthenticated
