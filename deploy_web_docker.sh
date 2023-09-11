#!/bin/bash

# Atualizar o sistema
sudo apt-get update -y
sudo apt-get install docker.io -y

# Parar e remover contêineres anteriores
sudo docker stop eventitask-app
sudo docker remove eventitask-app
sudo docker rmi $(sudo docker images -q) -f

rm -fr eventitask/

# Clonar o repositório e construir a imagem Docker
git clone https://github.com/vitorgoncalvess/eventitask.git
cd eventitask/
sudo docker build -t eventitask-app .

# Rodar o contêiner
sudo docker run -d --name eventitask-app -p 80:3000 eventitask-app