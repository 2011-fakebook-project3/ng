# Start up documentation
Steps
<ol>
<li>

Clone each repo from [here](https://github.com/2011-fakebook-project3)

<li>

Run the following dotnet commands to set up the connection strings to the posts database and profile database

```
dotnet user-secrets set BlobStorage:ConnectionString "DefaultEndpointsProtocol=https;AccountName=nickescalonap3storage;AccountKey=<redacted>;EndpointSuffix=core.windows.net" -p posts/Fakebook.Posts/Fakebook.Posts.RestApi/
```

```
dotnet user-secrets set BlobStorage:ConnectionString "DefaultEndpointsProtocol=https;AccountName=nickescalonap3storage;AccountKey=<redacted>;EndpointSuffix=core.windows.net" -p profile/Fakebook.Profile/Fakebook.Profile.RestApi/
```

<li>

Install dependencies for the Angular front-end 
```
cd ng/fakebook
npm install

```

<li>

Tear down and set up containers for the databases in Docker files
```
cd ../..
cd profile
docker-compose down -v
cd ..
cd notifications
docker-compose down -v
cd ..
cd posts
docker-compose down -v
cd ..
```

```
cd profile
docker-compose up --build -d
cd ..
cd notifications
docker-compose up --build -d
cd ..
cd posts
docker-compose up --build -d
cd ..
```
 
<li>

Run each project seperately in new terminal window in base organization folder to start each project:

```
cd ng/fakebook
ng serve --open

cd ../..

dotnet run -p posts/Fakebook.Posts/Fakebook.Posts.RestApi/

dotnet run -p notifications/FakebookNotifications/FakebookNotifications.WebApi/

dotnet run -p profile/Fakebook.Profile/Fakebook.Profile.RestApi/
```
</ol>