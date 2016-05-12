# todarty
Art generation with today’s news.

## Ideas
- Adapt colours based on feeling
- Adapt image sizes according to its scores
- Proportional according to feeling
- Get the image size according to the feeling
- Get main palette of image
- Promisify stuff
- Filters
  - http://camanjs.com
- Gradient with feeling colours
- Soft landscapse
  - https://twitter.com/softlandscapes

## Typical news object from New York Times
```json
{
  "section": "World",
  "subsection": "Americas",
  "title": "Judge in Mexico Says El Chapo Can Be Extradited to U.S.",
  "abstract": "The ruling puts the drug kingpin Joaquín Guzmán Loera, who has escaped from Mexican prisons twice, one step closer to prison in the United States.",
  "url": "http://www.nytimes.com/2016/05/10/world/americas/mexico-el-chapo-joaquin-loera-guzman.html",
  "byline": "By AZAM AHMED and PAULINA VILLEGAS",
  "item_type": "Article",
  "updated_date": "2016-05-09T13:02:16-5:00",
  "created_date": "2016-05-09T13:02:17-5:00",
  "published_date": "2016-05-10T00:00:00-5:00",
  "material_type_facet": "News",
  "kicker": "",
  "des_facet": [
    "Drug Abuse and Traffic",
    "Prison Escapes"
  ],
  "org_facet": "",
  "per_facet": "",
  "geo_facet": [
    "Sinaloa (Mexico)",
    "Mexico"
  ],
  "multimedia": [
    {
      "url": "https://static01.nyt.com/images/2016/05/10/world/10chapo-web/10chapo-web-thumbStandard.jpg",
      "format": "Standard Thumbnail",
      "height": 75,
      "width": 75,
      "type": "image",
      "subtype": "photo",
      "caption": "Soldiers in Mexico transporting Joaquín Guzmán Loera, known as El Chapo, back to prison in January.",
      "copyright": "Rebecca Blackwell/Associated Press"
    },
    {
      "url": "https://static01.nyt.com/images/2016/05/10/world/10chapo-web/10chapo-web-thumbLarge.jpg",
      "format": "thumbLarge",
      "height": 150,
      "width": 150,
      "type": "image",
      "subtype": "photo",
      "caption": "Soldiers in Mexico transporting Joaquín Guzmán Loera, known as El Chapo, back to prison in January.",
      "copyright": "Rebecca Blackwell/Associated Press"
    },
    {
      "url": "https://static01.nyt.com/images/2016/05/10/world/10chapo-web/10chapo-web-articleInline.jpg",
      "format": "Normal",
      "height": 130,
      "width": 190,
      "type": "image",
      "subtype": "photo",
      "caption": "Soldiers in Mexico transporting Joaquín Guzmán Loera, known as El Chapo, back to prison in January.",
      "copyright": "Rebecca Blackwell/Associated Press"
    },
    {
      "url": "https://static01.nyt.com/images/2016/05/10/world/10chapo-web/10chapo-web-mediumThreeByTwo210.jpg",
      "format": "mediumThreeByTwo210",
      "height": 140,
      "width": 210,
      "type": "image",
      "subtype": "photo",
      "caption": "Soldiers in Mexico transporting Joaquín Guzmán Loera, known as El Chapo, back to prison in January.",
      "copyright": "Rebecca Blackwell/Associated Press"
    },
    {
      "url": "https://static01.nyt.com/images/2016/05/10/world/10chapo-web/10chapo-web-superJumbo.jpg",
      "format": "superJumbo",
      "height": 1368,
      "width": 2000,
      "type": "image",
      "subtype": "photo",
      "caption": "Soldiers in Mexico transporting Joaquín Guzmán Loera, known as El Chapo, back to prison in January.",
      "copyright": "Rebecca Blackwell/Associated Press"
    }
  ]
}
```
