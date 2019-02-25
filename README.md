# README

## Temps L

*Accessoires de cuisine et astuces pour la maison : TEMPS L*

## Alias service internet archive

rm -rf remote_alias && ln -s '/Volumes/service internetArchives$/NEWSLETTERS/TRIGGER/RELANCE_PANIER/TEMPSL' remote_alias

## Persona 

- fotolia ref : 42170699
- [ Suivre ce lien ]( https://fr.fotolia.com/Search/Model/122507797?offset=200 )

## Intégration

- type responsive

- Dimensions
  - desktop
    - \> 480w = direction display row on 636w && < 480w = display column on 320w
  - mobile
    - @media only screen and (max-width: 480px),(max-device-width: 1024px) and (orientation : portrait)

## Color

<table>
  <tr>
    <td>Primary</td>
    <td>Secondary</td>
    <td>Tertiary</td>
  </tr>
  <tr>
    <td style="background-color: #FF0054;" >&nbsp;</td>
    <td style="background-color: #FAD5E1;" >&nbsp;</td>
    <td style="background-color: #B41F1E;" >&nbsp;</td>
  </tr>
</table>

## main nav item

<table>
  <tr>
    <td>CUISINE</td> 
    <td>ENTRETIEN &<br />RANGEMENT</td> 
    <td>SANTE &<br />BEAUTE</td> 
    <td>MAISON &<br />DECO</td> 
    <td>LOISIRS</td> 
    <td>VETEMENTS &<br />ACCESSOIRES</td> 
    <td>BONNES<br />AFFAIRES</td>
  </tr>
</table>

```css
.nav {
font-family: Georgia, 'Times New Roman', Times, serif;
}
```

## Quick get nav item text

```js
const txtAry = Array.from(document.querySelectorAll('.nav a'))
txtAry.map( (i) => console.log( i.innerHTML.replace(/&amp;/g,'&') ) )
```

