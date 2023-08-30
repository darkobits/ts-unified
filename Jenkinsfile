library 'shared-library@master'

pipeline {
    agent {
        kubernetes {
            yaml libraryResource('podtemplates/template.yaml').replace("{container}",'javascript').replace("{tag}",'2.1.0')
            defaultContainer 'javascript'
        }
    }

    options {
        disableConcurrentBuilds()
        timeout(time: 15, unit: 'MINUTES')
    }

    stages {
        stage('setup') {
            steps {
                withCredentials([string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN')]) {
                    sh(label: 'Create .npmrc', script: "echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' >> .npmrc")
                }
            }
        }

        stage('install') {
            steps {
                sh(label: 'Install dependencies', script: 'npm ci')
            }
        }
    }
}