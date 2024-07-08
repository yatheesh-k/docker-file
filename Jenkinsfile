pipeline{
    agent any
    stages{
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('test') {
        step { 
            sh './jenkins/scripts/test.sh'
        }
    }
    }
}

            
