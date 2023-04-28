#!/bin/sh

echo "Pushing database"
yarn prisma db push

yarn dev