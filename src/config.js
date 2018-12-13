const dev = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "forms-app-api-dev-attachmentsbucket-8qsanhm4vq0k"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://vqg2qcvwil.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_9bAs2vg8Y",
    APP_CLIENT_ID: "29b87lc4actcev1a2ethit9f9s",
    IDENTITY_POOL_ID: "us-west-2:d2bf50fd-9e0e-4d63-a950-7304e7c15a7e"
  },
  shipStation: {
    APIKEY: `${process.env.REACT_APP_SHIPSTATION_APIKEY}`
  }
};

const prod = {
  s3: {
    REGION: "YOUR_PROD_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "YOUR_PROD_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
  },
  shipStation: {
    APIKEY: `${process.env.REACT_APP_SHIPSTATION_APIKEY}`
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
