pipeline {
    agent any

    tools {
        nodejs 'nodejs22' 
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/lakshmipriyapbt/arzoo01'
            }
        }

        stage('Install Dependencies') {
            steps {
                node {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                node {
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONARQUBE = credentials('sonartoken') // Add SonarQube token as Jenkins credential
            }
            steps {
                node {
                    sh 'npm install -g sonarqube-scanner'
                    sh '''
                       scanner \
                       -Dsonar.projectKey=arzoo01 \
                       -Dsonar.sources=. \
                       -Dsonar.host.url=http://172.31.47.80 \
                       -Dsonar.login=$SONARQUBE
                    '''
                }
            }
        }

        stage('Publish to Nexus') {
            steps {
                node {
                    def artifactId = 'arzoo01'
                    def version = '1.0.0'
                    def file = 'build.zip'
                    
                    sh "zip -r ${file} build/"
                    
                    nexusArtifactUploader artifacts: [
                        [artifactId: artifactId, file: file, type: 'zip', version: version]
                    ],
                    credentialsId: 'NEXUS_USER = credentials('admin') ,NEXUS_PASS = credentials('priya')'
 
                    groupId: 'com.arzoo01',
                    nexusUrl: 'http://172.31.46.99',
                    nexusVersion: 'nexus2',
                    repository: 'reactappl'
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after the build
        }
    }
}


