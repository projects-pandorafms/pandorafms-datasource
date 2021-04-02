To run a test environmet, just execute from pandorafms-datasource/docker diretory a:
```
docker-compose up
```

this will rise a pandorafmd environment and a grafana container could take a couple of minutes.

The relevant ports exposed

- port 8080: pandorafms.
- port 3000: grafana.

pandora credentiasls (admin/pandora)

The pandora env is ready to connect to grafana so, just login into grafana, add datasource, select pandorafms-datasourse and fullfil the configuration options: 

- URL http://pandora/pandora_console/extensions/grafana/
- user: admin 
- pass: pandora

Then you can use the datasourse plugin in a dashboard.

Demo video fragment: https://youtu.be/PXdfWu5hVPk?t=229