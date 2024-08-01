pipeline
{
    agent any
    tools
        {

            maven 'maven3'           
            nodejs 'nodejs12'
        }
        environment {
        SNAP_REPO = 'arzoo01-snapshot'
        NEXUS_USER = 'admin'
        NEXUS_PASS = 'priya'
        RELEASE_REPO = 'arzoo01-release'
        NEXUS_IP ='52.202.179.222'
        NEXUS_PORT = '8081'
        NEXUS_LOGIN = 'nexuslogin'
        SONARSERVER = 'sonarserver'
        SONARSCANNER = 'scanner'
    }

        stages{
            stage('install dependencies'){
                steps
                {
                    sh 'npm install'
                }
            }
            stage('Build') {
                  steps
                   {
                   sh 'npm run build'
                   }
            }
            stage('Run Tests') {
                  steps
                   {
                     sh 'npm test'
                   }
            }
           stage('SonarQube Analysis') {
                  steps
                   {
                      withSonarQubeEnv(sonarserver) {
                      sh 'npm run sonar'
                    }
                }
            }
            stage ("Quality Gate") {
                steps 
                    {
                       timeout(time:5, unit: 'MINUTES') {
                       waitForQualityGate abortPipeline: true
                       }
                    }  
            }
            stage('Archive Artifacts') {
                  steps
                   {
                   archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
                   }
            }
            stage('Deploy') {
                 steps
                 {
                    echo 'Deploying application...'
                 }
            }
            stage('Publish to Nexus') {
                  steps 
                    {
                    sh '''curl -v -u admin:priya\
                        --upload-file build/arzoo01 \
                        http://52.202.179.222/arzoo01/'''                   
                   }
            }
             
            stage('Clean Up') {
                 steps
                  {
                    sh 'rm -rf build/'
                  }
            }
            
        }
        post {
        always {
            
               junit '**/test-results/*.xml'
            
             }
        success {
               echo 'Pipeline succeeded!'
                }
        failure {
               echo 'Pipeline failed!'
               }
        }
}
