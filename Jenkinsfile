pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
         }
	 environment {
        NEXUS_URL = 'http://52.206.80.91:8081/repository/react' // Base URL for Nexus
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
	  
           stage('Tar Files') {
            steps {
                sh 'tar -czvf dist-${BUILD_ID}.tar.gz dist'
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
                def file = "dist-${env.BUILD_ID}.tar.gz"
                def filePath = "${env.WORKSPACE}/${file}"
                
                // Ensure file exists before attempting to upload
                if (!fileExists(filePath)) {
                    error "Artifact file ${file} does not exist in the workspace."
                }

                // Upload the file using HTTP Request Plugin
                retry(3) { // Retry up to 3 times in case of failure
                    def response = httpRequest(
                        httpMode: 'PUT',
                        acceptType: 'APPLICATION_JSON',
                        contentType: 'APPLICATION_OCTETSTREAM',
                        consoleLogResponseBody: true,
                        url: "${env.NEXUS_URL}/${file}",
                        authentication: env.NEXUS_CREDENTIALS_ID,
                        requestBody: readFile(filePath),
                        timeout: 600 // Set a timeout of 10 minutes
                    )
                    
                    // Check response code
                    if (response.status != 201) { // 201 Created is a common successful response for PUT
                        error "Failed to upload artifact: HTTP ${response.status}"
                    }
                    
                    echo "Artifact uploaded successfully with HTTP ${response.status}"
                }

                // Clean up local file
                sh "rm -f ${filePath}"
            }
        }
    }
}

    }
}
