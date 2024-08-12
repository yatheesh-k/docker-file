pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
         }
	 environment {
        NEXUS_URL = 'http://52.205.56.78:8081/' // Base URL for Nexus
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
	    stage('Create Tar File') {
            steps {
                // Change the following path based on where your build outputs are located
                sh 'tar -czvf arzoo01.tar.gz -C dist .'
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
	
        stage('Publish to Nexus') {
            steps {
               script{
		        sh 'ls -la arzoo01.tar.gz'
		       
	               
		  nexusArtifactUploader(
		     credentialsId: env.NEXUS_CREDENTIALS_ID,
                     nexusUrl: "${env.NEXUS_URL}",
                     nexusVersion: 'nexus2',
                    repository: 'reactappl/',
		
		    artifacts: [
		    [artifactId: 'arzoo01',
		     	//  version: "${env.BUILD_ID}-${env.BUILD_TIMESTAMP}",
		     classifier: '',    
			        
                            file: '/var/lib/jenkins/workspace/react/arzoo01.tar.gz',
                            type: 'tar']
			    ]
			    )
		       
                }
            }
        }
    }

}
