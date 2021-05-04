def gitUrl = 'https://github.com/Naz513/test2'
def gitBranch = 'main'
def artifactoryServerId = 'ARTIFACTORY_SERVER'
def artifactoryServerUrl = 'https://msitest.jfrog.io/artifactory'
def artifactoryServerCredentialsId = 'jfrog_id'
def artifactoryRepository = 'docker-local'
def artifactoryPromotedRepository = 'docker-dev'
def artifactoryDockerRegistry = 'msitest.jfrog.io'
def imageName = 'testimage'

pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git url: gitUrl, branch: gitBranch
            }
        }
        stage('Artifactory configuration') {
            steps {
                rtServer(
                    id: artifactoryServerId,
                    url: artifactoryServerUrl,
                    credentialsId: artifactoryServerCredentialsId
                )
            }
        }
        stage('Build docker image') {
            steps {
                script {
                    docker.build(artifactoryDockerRegistry + "/docker-local/" + imageName + ":${env.BUILD_ID}")
                }
            }
        }
        stage('Push Image to Artifactory') {
            steps {
                rtDockerPush(
                    serverId: artifactoryServerId,
                    image: artifactoryDockerRegistry + "/docker-local/" + imageName + ":${env.BUILD_ID}",
                    targetRepo: artifactoryRepository
                )
            }
        }
        stage('Publish build info') {
            steps {
                rtPublishBuildInfo(
                    serverId: artifactoryServerId
                )
            }
        }
        stage('Xray scan') {
            steps {
                xrayScan(
                    serverId: artifactoryServerId,
                    failBuild: true
                )
            }
        }
        stage ('Promotion') {
            steps {
                rtPromote (
                    serverId: artifactoryServerId,
                    targetRepo: artifactoryPromotedRepository,
                    sourceRepo: artifactoryRepository
                )
            }
        }
    }
}