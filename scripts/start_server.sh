#!/bin/bash
cd /home/ec2-user/launch-code-comet
serve -s dist -l 8080 &  # Serves the React app's dist folder
