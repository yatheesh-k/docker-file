pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    

        stages('Cleanup') {
            steps {
                script {
                    echo 'Stopping and removing old containers...'
                    def containers = sh(script: 'docker ps -aq -f name=my-app-container', returnStdout: true).trim()
                    if (containers) {
                        sh "docker stop ${containers}"
                        sh "docker rm ${containers}"
                    } else {
                        echo 'old containers to remove.'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t my-react-app .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d --name my-app-container -p 80:80 my-react-app'
            }
        }
    }
}

     
