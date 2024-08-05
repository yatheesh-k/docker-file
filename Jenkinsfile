pipeline {
    agent any
    tools
    {
     nodejs 'nodejs22'
    }

    environment {
        NEXUS_USER = 'admin'
        NEXUS_PASS = 'priya'
        RELEASE_REPO = 'arzoo01-release'
        SONARSERVER = 'sonarserver'
        NEXUS_IP = '172.31.46.99' 
        NEXUS_PORT = '8081'
    
        NEXUS_LOGIN = 'nexuslogin'
    }

    stages {
        stage('install'){
            steps {
                sh 'npm install'
            }
            
        }
	 stage('build'){
            steps {
                sh 'npm run build'
            }

        }
	        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARSERVER) {
		    sh 'scanner'
                    sh 'npm run sonar'
                }
            }
        }


    }        
}
