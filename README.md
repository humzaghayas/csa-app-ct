# DRL Mirakl to CT Order Sync Subscription

This is a rest service which will work as CT pub/sub subscription to sync order Commercetools to Mirakl



### Requirements

- Google Cloud project
- Commercetools project
- Mirakl Project
- Maven
- Java SDK

### Environment variables

In application.properties files set up these properties:

ctp.projectKey=CT_PROJECT_KEY
ctp.clientSecret=CT_CLIENT_SECRET
ctp.clientId=CT_CLIENT_ID
ctp.authUrl=CT_AUTH_URL
ctp.apiUrl=CT_API_URL
ctp.scopes=CT_PROJECT_SCOPE

mirakl.url=MIRAKL_PROJECT_URL
mirakl.front.key=MIRAKL_FRONT_KEY
mirakl.operator.key=MIRAKL_OPERATOR_KEY

## Installation 

Set JAVA_HOME environment variable
Set MVN_HOME environment variable

mvn compile jib:build -D image=gcr.io/<<PROJECT_ID>>/<<SERVICE_NAME>>
gcloud run deploy <<SERVICE_NAME>> --image gcr.io/<<PROJECT_ID>>/<<SERVICE_NAME>> --allow-unauthenticated

gcloud iam service-accounts create <<INVOKER_NAME>> --display-name "Mirakl CT Cloud Run Pub/Sub Invoker"

gcloud run services add-iam-policy-binding <<SERVICE_NAME>> --member=serviceAccount:<<INVOKER_NAME>>@<<PROJECT_ID>>.iam.gserviceaccount.com --role=roles/run.invoker

gcloud projects add-iam-policy-binding <<PROJECT_ID>> --member=serviceAccount:service-<<PROJECT_NUMBER_FROM_GCP>>@gcp-sa-pubsub.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator

gcloud pubsub topics create <<TOPIC_NAME>>

gcloud pubsub subscriptions create mirakl-ct-order-subscription --topic mirakl-ct-order-topic --ack-deadline=600 --push-endpoint=<<URL from GCP>> --push-auth-service-account=mirake-ct-order-pubsub-invoker@<<PROJECT_ID>>.iam.gserviceaccount.com

gcloud pubsub topics set-iam-policy projects/<<PROJECT_ID>>/topics/<<TOPIC_NAME>> topic_policy1.json

Example project id and service names:

PROJECT_ID=commerce-tools-b2b-services
SERVICE_NAME =  mirake-ct-order-subscription-serv
INVOKER_NAME=mirake-ct-order-pubsub-invkr
TOPIC_NAME=mirakl-ct-order-topic