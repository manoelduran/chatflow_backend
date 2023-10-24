#!/bin/sh

# Remove qualquer arquivo 'temp_docker.sh' existente para começar do zero
rm -rf ./temp_docker.sh

# Cria um novo arquivo de script shell e adiciona a linha de shebang para indicar que é um script shell
echo "#!/bin/sh" > ./temp_docker.sh

# Torna o script 'temp_docker.sh' executável
chmod +x ./temp_docker.sh

# Define uma variável 'containers' com um comando para parar e remover contêineres Docker
containers=$(docker ps -a --format "{{.Names}}")
if [ -n "$containers" ]; then
  for container in $containers; do
    if [ "$container" = "flimed_postgres" ] || [ "$container" = "flimed_mongo" ] || [ "$container" = "redis" ]; then
      echo "Preservando contêiner $container"
    else
      docker stop $container
      docker rm $container
    fi
  done
fi

# Define uma variável 'images' com um comando para listar imagens Docker
images=$(docker image ls --format "{{.Repository}}")
if [ -n "$images" ]; then
  for image in $images; do
    if [ "$image" = "postgres" ] || [ "$image" = "mongo" ] || [ "$image" = "redis" ]; then
      echo "Preservando imagem $image"
    else
      docker image rm --force $image
    fi
  done
fi

# Define uma variável 'volumes' com um comando para remover volumes Docker
volumes=$(docker volume ls -q)
if [ -n "$volumes" ]; then
  for volume in $volumes; do
    volume_labels=$(docker volume inspect --format '{{.Labels}}' $volume)
   if [ "$volume_labels" = "database=postgresql" ] || [ "$volume_labels" = "database=mongo" ] || [ "$volume_labels" = "database=redis" ]; then
  echo "Preservando volume $volume"
else
  docker volume rm --force $volume
fi
  done
fi

# Remove o arquivo temporário 'temp_docker.sh' após a execução
rm -rf ./temp_docker.sh