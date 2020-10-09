import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'new-leaderboard',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-express',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      HACKERRANK_AUTH: "",
      CONTEST_SLUG: "the-krrg-challenge",
    },
    region: 'us-east-2' /* The Ohio */
  },
  functions: {
    leaderboard: {
      handler: 'handler.api',
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          },
        },{
          http: {
            method: 'ANY',
            path: '/{proxy+}',
          }
        }
      ]
    }
  },
}

module.exports = serverlessConfiguration;
