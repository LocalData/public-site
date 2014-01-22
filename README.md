LocalData public site at [localdata.com](http://localdata.com/)

Build locally
=======

Install jekyll:

`gem install jekyll`

For best results, host using your built-in Apache or ngingx setup. Create a `_localconfig.yml` file to configure your base URL:

```
url: http://localhost/~username/path/localdata.com/_site
```

Watch the directory for changes:

`sass --watch css/sass/styles.scss:css/app.css`

and

`jekyll build -w --config _config.yml,_localconfig.yml --drafts`

View through your local server: [http://localhost/~username/path/localdata.com/_site/](http://localhost/~username/path/localdata.com/_site/)
