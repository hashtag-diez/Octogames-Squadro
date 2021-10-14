# Gestion des tâches et communication

>*Cette notice vise à clarifier la gestion des tâches sur Notion dans le cadre du projet Squadro et n'est en aucun cas exhautive quant à cette application. Elle s'attache à établir l'état de la tâche à chaque étape du développement, sans plus de précision, afin de faciliter la communication au sein de l'équipe, notament entre testeurs et développeurs.*

## 1. Nouvelle Tâche
Lors de sa création, une tâche:
* est placée dans la catégorie ***Prochainement***
* est nommée selon:
    * le **type de tâche**: [Feat],[Fix] ou [Hotfix]
    * un **identifiant**: numéro de la tâche
    * une **description brève** de son contenu
    * éventuellement son **domaine d'application**: [Front], [Back], [All]...

>Exemple: 
>`#4[Feat][Back]écrire la doc Express`

La tâche peut être affectée immédiatement ou plus tard. 
On lui donne un **degré de priorité** : de préférence, **on affecte directement à un développeur les tâches de priorité haute**.

>Il est possible qu'une tâche très générale soit créée à des fins de rappels, et nécessite un redécoupage ultérieur. Ce genre de tâche étant créée à titre informatif, elle ne doit pas être affectée. 

## 2.Début du développement
Lorsqu'une tâche est commencée, elle doit être glissée dans la catégorie ***En cours***

## 3.Fin de développement
Au commit final, après avoir [créé une pull request](../Gitflow/Starting%20on%20tasks.md/#4.-soumettre-la-branche-à-une-pull-request), glissez la tâche dans la catégorie ***Pull Request*** afin de **notifier les autres développeurs** pour obtenir les *Approve*s nécessaires au merge.

#### Il est demandé aux développeurs de vérifier régulièrement la catégorie *Pull Request* afin d'effectuer les reviews au plus vite.

## 4.Après le merge : Tests
Votre branche étant **passée sur la develop**, elle peut être **mise en test**. Glissez la tâche dans ***Test***. 

#### De même les testeurs sont fortement conseillés de regarder cette catégorie régulièrement. 

>*Pour les testeurs, n'hésitez pas à noter votre nom en commentaire des tâches testées afin que votre travail soit comptabilisé dans les Diagrammes de Gantt*

Au retour des testeurs:
* Votre modification **rempli les conditions requises**:
    >Elle est glissée dans ***Validé*** soit par vous, soit par le testeur. 
* Votre modification **ne donne pas le résultat escompté**:
    >Le problème vous est signalé par le testeur, vous devez **investiguer le problème** (qui ne vient pas nécessairement de votre développement) et, si cela s'avère indispensable, **reprendre à l'étape *En cours***


## 5.MEP

Lors de **Mise en Production** (ou MEP, c'est-à-dire le merge d'une release issue de la develop dans la master), il faut :
* vérifier que toutes les tâches en état ***Validé*** aient leur commit dans la release
* une fois la MEP effectuée, les déplacer dans ***Livré en production***

## Annexe 

#### Tâche hors Github

Si vous êtes chargé d'une tâche qui ne passe pas par les branches sur Github (rédaction de rapports, recherche sans documentation, etc...), passez par les étapes ***Prochainement***, ***En cours*** et ***Livré en production***.
>Attention, l'aval de vos collaborateurs est également requis entre la fin du développement et la mise en production.

#### Communication hors Notion
Il est évident que les différentes étapes de validation peuvent être effectuées via un autre média de communication (Discord ou autre). N'hésitez pas à **soliciter directement les développeurs et les testeurs aux étapes recquierant leur aval**. On gagnera ainsi un temps précieux dans l'intégration continue. 

