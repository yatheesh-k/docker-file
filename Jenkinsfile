pipeline {
    agent any

    tools {
        nodejs 'nodejs22'
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
		       def file = 'arzoo01.tar.gz'
		        sh "ls -la ${file}"
		        
	               
		  nexusArtifactUploader(
                    credentialsId: 'nexuslogin',                   
                    nexusUrl: 'http://54.167.214.19:8081/${file}',
                    nexusVersion: 'nexus2',
                    repository: 'reactappl',
		    artifacts: [
		    [artifactId: 'arzoo01',
		     classifier: '',
		     
		
		        
                            file: 'arzoo01.tar.gz',
                            type: 'tar.gz']
			    ]
			    )
		       sh "rm -rf ${file}"
                }
            }
        }
    }

}
