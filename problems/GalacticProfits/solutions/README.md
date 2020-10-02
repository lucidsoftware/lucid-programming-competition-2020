# Running the Csharp solution on Linux
It's easy. On Ubuntu you can just do this:
```
wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```

Then something like this:
```
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-3.1
```

For the latest instructions visit <https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu#1804->
