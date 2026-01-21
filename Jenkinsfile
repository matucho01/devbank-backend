pipeline {
  agent { label 'ec2-agent1' }  

  tools {
    nodejs 'node25'              
  }

  environment {
    IMAGE_REPO = "matucho01/devbank-backend"
    IMAGE_TAG  = "v${BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker version'
        sh 'docker build -t ${IMAGE_REPO}:${IMAGE_TAG} .'
      }
    }

    stage('Docker Push') {
      steps {
        // Crea en Jenkins un credential "Username with password"
        // username: matucho01
        // password: <TU DOCKERHUB TOKEN>
        // ID sugerido: dockerhub-matucho01
        withCredentials([usernamePassword(credentialsId: 'dockerhub-matucho01', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh '''
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push ${IMAGE_REPO}:${IMAGE_TAG}
          '''
        }
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
      cleanWs()
    }
  }
}
