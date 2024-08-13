pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
         }
	 environment {
        NEXUS_URL = 'http://https://52.206.80.91/:8081/' // Base URL for Nexus
        NEXUS_CREDENTIALS_ID = 'nexuslogin' // Jenkins credentials ID for Nexus
    }

    stages {
        stage('Checkout') {
            steps {
                git branch:'main',url:'https://github.com/lakshmipriyapbt/arzoo01.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                
                    sh 'npm install'
                
            }
        }

        stage('Build') {
            steps {
                
                    sh 'npm run build'
		    
                
            }
 
}
	   stage('Zip Dist Directory') {
            steps {
                sh '''
                zip -r dist-${BUILD_ID}.zip dist
                '''
            }
        }

	stage('SonarQube Analysis') {
            environment {
	        scannerHome = tool 'scanner' 
                SONARQUBE = credentials('sonartoken') // Add SonarQube token as Jenkins credential
            }
	   
            steps {
                
                    withSonarQubeEnv('sonarserver') {
                    sh '''
		    /var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/scanner/bin/sonar-scanner \
			  -Dsonar.projectKey=arzoo01 \
			  -Dsonar.projectName=arzoo01 \
			  -Dsonar.projectVersion=1.0 \
			  -Dsonar.sources=src
      
			  '''
		    }
                
                    }
	}
	
        stage('Upload Artifacts to Nexus') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.NEXUS_CREDENTIALS_ID, passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USERNAME')]) {
                    script {
                        def file = "dist-${env.BUILD_ID}.zip"
                        // Upload the file using HTTP Request Plugin
                        httpRequest(
                            httpMode: 'PUT',
                            acceptType: 'APPLICATION_JSON',
                            contentType: 'APPLICATION_OCTETSTREAM',
                            consoleLogResponseBody: true,
                            url: "${env.NEXUS_URL}${file}",
                            authentication: 'nexus',
                            requestBody: readFile(file)
                        )
                        sh 'rm -rf dist-${BUILD_ID}.zip'
                    }
                }
            }
	} 
    }
}
