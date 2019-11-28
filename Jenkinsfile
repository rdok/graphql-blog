pipeline {
    agent { label "linux" }
    triggers { cron('H H(18-19) * * *') }
    options { buildDiscarder( logRotator( numToKeepStr: '5' ) ) }
    environment {
        VIRTUAL_HOST = 'graphql-blog.rdok.dev'
        GRAPHQL_BLOG_API_URL = 'https://api.graphql-blog.rdok.dev'
        VIRTUAL_PORT = '3008'
        LETSENCRYPT_HOST = 'graphql-blog.rdok.dev'
        LETSENCRYPT_EMAIL = credentials('rdok-email')
        DEFAULT_EMAIL = credentials('rdok-email')
        COMPOSE_PROJECT_NAME = 'graphql-blog'
    }
    stages {
        stage('Test') {
            steps {
                sh '''#!/bin/bash
                    docker run -e CI=true --rm -v $(pwd):/app -w /app \
                        node:12-alpine sh -c "
                            yarn install
                            yarn run test  --coverage --coverageDirectory='./report' --ci
                        "
                '''
            }
        }
        stage('Build & Deploy') {
           agent { label "rdok.dev" }
           steps {
               ansiColor('xterm') {
                 sh '''#!/bin/bash
                   ./docker/deploy.sh
                 '''
               }
           }
        }
        stage('Health Check') {
            options { skipDefaultCheckout() }
            steps { build 'client-health-check' }
        }
    }
    post {
        failure {
            slackSend color: '#FF0000',
                message: "@here Deployment failed: <${env.BUILD_URL}console | ${env.JOB_NAME}#${env.BUILD_NUMBER}>"
        }
        fixed {
            slackSend color: 'good',
                message: "@here Deployment fixed: <${env.BUILD_URL}console | ${env.JOB_NAME}#${env.BUILD_NUMBER}>"
        }
        success {
            slackSend message: "Deployed: <${env.BUILD_URL}console | ${env.JOB_NAME}#${env.BUILD_NUMBER}>"
        }
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: false,
                reportFiles: 'index.html',
                reportName: 'Coverage Report',
                reportDir: 'report/lcov-report/'
            ])
        }
    }
}