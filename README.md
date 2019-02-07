# aplicacionesMultimedia
Proyectos Aplicaciones Multimedia

Comandos GIT

git status  estado del repo
git log   Muestra log de commits
git add .   añado todos los archivos modificiados
git commit -m "mensaje"     hago commit con 										mensaje

git branch		Compruebo las ramas
git branch "nombre rama nueva"   creo rama
git checkout "nombre rama"  cambiar a la rama
git diff "archivo"  

Si estoy trabajando en una rama y quiero hacer merge a la master:
(en la propia rama)

git add "archivo"
git commit -m "mensaje"
git push origin "nombre de la rama"  Con el nombre de la 											rama que quiero 													mergear a master
Este último comando sólo se hace para el primer commit, si quiero hacer mas a partir de este uso git push

Una vez hecho esto, voy a GITHUB(web) y solícito un PULL REQUEST para ver que está todo bien y no hay errores
