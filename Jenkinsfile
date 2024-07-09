pipeline{
    agent any
    stages{
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('test') {
        steps { 
            sh 'npm test'
        }
    }
    post {
        always {
            // cleanup steps, if any
            }
        }
    }
}

            
