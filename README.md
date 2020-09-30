# Lucid Programming Competition 2018

## Run

```sh
wget -O /tmp/scala.deb https://downloads.lightbend.com/scala/2.12.2/scala-2.12.2.deb
sudo dpkg -i /tmp/scala.deb
sudo apt-get install -f colordiff openjdk-8-jdk-headless
```

```sh
make test-myproblem
```

## Generate descriptions

```sh
wget -O /tmp/wkhtmltox.deb https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.2.1/wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
sudo apt-get remove --purge wkhtmltopdf
sudo dpkg -i /tmp/wkhtmltox.deb
sudo apt-get install -f ruby
```

```sh
make
```
