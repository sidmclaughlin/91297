# 91297 Geoserver

A fully automated GitHub workflow to deploy GeoServer, Postgres, nginx & certbot to one or more predefined [deployment environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment).

# Observations

This was an interesting assignment which mimics tasks I am familiar with, albeit in less automated ways.

The inspriation for the docker-compose file came from https://github.com/kartoza/docker-geoserver, which sets up GeoServer, Postgres, and nginx (without SSL). I added certbot to the mix and now have a fully automated setup which updates the certificate, if necessary, with each run. Initially, SSL was working for nginx, but GeoServer was still submitting in HTTP. I found the correct configuration for SSL termination in a single comment of the GitHub Issues for the repo and resolved the misconfiguration.

# CI/CD Deployment

## Prerequisites

The following tasks are out of scope for this readme, but required to use this project. For each deployment environment, get the following:

- A GitHub token to query the GitHub API
- A DigitalOcean Droplet with at least 1GB RAM, 2GB Storage (These requirements may change depending on configuration).
- SSH credentials & connection details for your Droplet
- A domain name (FQDN) with correctly configured DNS entries pointed at your Droplet(s)

## Setup

1.  Create a deployment environment. From the root of your GitHub Repository, navigate to the New Environment page.

        Settings > Environments > New Environment

    In the `Environment secrets` section, create the following secrets:

        # Droplet Username
        DO_USERNAME
        # Droplet IP Address
        DO_SERVER_IP
        # Droplet Port
        DO_SERVER_PORT
        # SSH Key used when creating the Droplet
        DO_SERVER_SSH_KEY

        # The Base64 representation of your domain name
        #   For example, 'domain.example.com' would be 'ZG9tYWluLmV4YW1wbGUuY29t' in base64
        NGINX_SERVER_NAME_BASE64

    _Repeat this setup for each environment you want to deploy._

2.  Manually trigger this workflow. In addition, the workflow will be run any time a file changes in either of the following places:

    - The workflow file, `deploy-geoserver.yaml`
    - This directory, `packages/geoserver`

    This workflow is not triggered when a deployment environment is added, so you'll need to manually run the workflow yourself.

# Manual Deployment

This package is intended to run during the CI/CD process. Manual deployment is possible, but you will have to inspect the `docker-compose.yml` to infer manual deployment steps.

# References

The following were used to generate a dynamic matrix

- GitHub Actions Dynamic Matrix - https://thekevinwang.com/2021/09/19/github-actions-dynamic-matrix/
- Dynamic Matrix Generation GitHub Actions - https://michaelheap.com/dynamic-matrix-generation-github-actions/

Deploying to Digital Ocean

- Deploy Static Site on Digitalocean with GitHub Actions - https://xenox.dev/deploy-static-site-on-digitalocean-with-github-actions/

Docker Setup on Digital OCean

- Deploying to Digital Ocean via GitHub Actions and SSH - https://docs.servicestack.net/do-github-action-mix-deployment#docker-setup

Nginx & Certbot

- HTTPS using Nginx and Let's encrypt in Docker - https://mindsers.blog/post/https-using-nginx-certbot-docker/

nginx.conf templating

- nginx config template with environment vars - https://devopsian.net/notes/docker-nginx-template-env-vars/

bash script to conditionally cd into repo directory

- https://stackoverflow.com/a/15602111

Store github secrets as base64 so they can be displayed

- Storing Base64 binary blobs as secrets - https://docs.github.com/en/actions/security-guides/encrypted-secrets#storing-base64-binary-blobs-as-secrets

Dockerized GeoServer

- docker-geoserver - https://github.com/kartoza/docker-geoserver

SSL Termination for GeoServer

- comment - https://github.com/kartoza/docker-geoserver/issues/293#issuecomment-1235755773
