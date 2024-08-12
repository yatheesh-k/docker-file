pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
         }
	 environment {
        NEXUS_URL = 'http://54.167.214.19:8081/' // Base URL for Nexus
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
                    repository: 'reactappl',
		
		    artifacts: [
		    [artifactId: 'arzoo01',
		     	  version: '1.0',
		     classifier: '',    
			        
                            file: 'arzoo01.tar.gz',
                            type: '.tar']
			    ]
			    )
		       
                }
            }
        }
    }

}
