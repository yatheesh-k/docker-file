pipeline
{
    agent any
    tools
        {

            maven 'maven3'           
            nodejs 'nodejs12'
        }
        environment {
	NODE_VERSION = 'nodejs12' 
        SNAP_REPO = 'arzoo01-snapshot'
        NEXUS_USER = 'admin'
        NEXUS_PASS = 'priya'
        RELEASE_REPO = 'arzoo01-release'
<<<<<<< HEAD
        NEXUS_IP ='54.147.90.100'
=======
        NEXUS_IP = '54.166.207.7'
>>>>>>> c292c081624879cef08aaabf6f258e1eee025b22
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
                      withSonarQubeEnv(SONARSERVER) {
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
                    sh """curl -v -u admin:priya\
                        --upload-file build/arzoo01 \
<<<<<<< HEAD
                        http://54.147.90.100:8081/arzoo01/"""         
=======
                        http://54.166.207.7:8081/arzoo01/'''                   
>>>>>>> c292c081624879cef08aaabf6f258e1eee025b22
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
