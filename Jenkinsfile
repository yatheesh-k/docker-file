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
            sh 'echo "Always do cleanup actions here"'
        }
        success{
            sh 'echo "Pipeline succeeded"'
        }
        failure {
            sh 'echo "pipeline failed"'
        }
        
            }
        }
    }


            
