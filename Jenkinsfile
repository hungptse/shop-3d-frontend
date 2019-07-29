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
            steps {
                sh  'npm install -g serve'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run build'
            }
        }
        stage('Release') { 
            steps {
                sh 'serve -s build'
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