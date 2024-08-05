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
	sonar.projectKey=arzoo01
sonar.projectName=arzoo01
sonar.projectVersion=0.0.0

sonar.sources=src
sonar.tests=tests


sonar.host.url=http://172.31.47.80:9000
sonar.login=your-sonartoken
		    sh 'scanner'
                    sh 'npm run sonar'
                }
            }
        }


    }        
}
