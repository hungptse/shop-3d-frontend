pipeline {
    agent any 
    stages {
        // stage('Change dir'){
        //     steps {
        //         sh 'cd /var/lib/jenkins/workspace/resume-ci@script'
        //     }
        // }
        stage('Install') { 
            steps {
                sh  'npm install'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run build'
            }
        }
        stage('Release') { 
            steps {
                sh 'npm run start:prod'
            }
        }
        // stage('Test') { 
        //     steps {
        //         // 
        //     }
        // }
        // stage('Deploy') { 
        //     steps {
        //         // 
        //     }
        // }
    }
}