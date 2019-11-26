pipeline {
    agent { label "rdok.dev" }
    triggers { cron('H H(18-19) * * *') }
    options { buildDiscarder( logRotator( numToKeepStr: '5' ) ) }
    environment {
        VIRTUAL_HOST = 'graphql-blog.rdok.dev'
        VIRTUAL_PORT = '3008'
        LETSENCRYPT_HOST = 'graphql-blog.rdok.dev'
        LETSENCRYPT_EMAIL = credentials('rdok-email')
        DEFAULT_EMAIL = credentials('rdok-email')
        COMPOSE_PROJECT_NAME = 'graphql-blog'
    }
    stages {
        stage('Deploy') {
           agent { label "rdok.dev" }
           steps { ansiColor('xterm') {
              sh '''#!/bin/bash
                docker-compose -p . -f ./docker/docker-compose.yml build --pull
                docker-compose -p . -f ./docker/docker-compose.yml down --remove-orphans
                docker-compose -p . -f ./docker/docker-compose.yml up -d
               '''
        } } }
        stage('Health Check') {
            agent { label "linux" }
            options { skipDefaultCheckout() }
            steps { build 'graphql-blog' }
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
    }
}