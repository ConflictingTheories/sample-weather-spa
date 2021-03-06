# Sample Weather SPA (React) aka Chaos Weather
This is a sample weather app. Showcasing some React experience. This was done for a job application.

## Dependencies (to deploy)
The Following Technologies are required to run and deploy NERD:
- Docker / Docker-Compose

## Deployment
Please see the following instructions for deploying locally.

First, set your configurations for your environment variables in the `.env` file (see `.env-sample`) and then proceed with the following depending on your OS:

### Windows
Please run the following:

        > . scripts/windows/install.ps1 
        > . scripts/windows/migrate.ps1 # Please note Database must be ready
        > . scripts/windows/seed.ps1 # Ditto

### Linux / Mac
Please run the following:

        $ bash scripts/nix/install.sh
        $ bash scripts/nix/migrate.sh # Please note Database must be ready
        $ bash scripts/nix/seed.sh # Ditto

The above will initialize the Database - then you can perform manual updates and migrations from there. Additionally:

### Windows
Please run the following:

        > . scripts/windows/refresh.ps1 # Build New Frontend
        > . scripts/windows/build.ps1 # Build New Image
        > . scripts/windows/start.ps1 # Replace Image
        

### Linux / Mac
Please run the following:

        $ bash scripts/nix/refresh.sh # Build New Frontend
        $ bash scripts/nix/build.sh # Build New Image
        $ bash scripts/nix/start.sh # Replace Image
        
## Usage
Once the deployment has finished, it should if successful, now be running and accessible from your Browser:

        http://localhost/

__Note__: Also exposed via the default port: `8081`

## License
MIT License - See License File for more details.