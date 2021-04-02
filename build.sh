rm -rf dist/pandorafms-datasource
mkdir -p dist/pandorafms-datasource
cp -a src/* dist/pandorafms-datasource/
cp LICENSE README.md dist/pandorafms-datasource
cd dist
zip -r pandorafms-datasource.zip pandorafms-datasource/
cd -
