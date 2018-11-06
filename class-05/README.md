# FEW 1.2 - Class 5

## Oregon Trail Tutorial

Lets start a new game. This game is a classic text adventure game: [Oregon Trail](https://en.wikipedia.org/wiki/The_Oregon_Trail_(series)). Did you catch the bit about "historical probabilities". This game has a lot in common with the Heard Immunity project and data science. 

You will use this project to further explore JavaScript. 

You will also use this project to practice your skills as a software developer.

## Oregon Trail

I got a tip from the VC guys that text adventure games are making a come back! Quick drop everything and do this tutorial:

https://gamedevacademy.org/js13kgames-tutorial/

## Challenges 

Imagine this is a code base you inherited from another developer or it's been handed to you as part of a new position. It will be your job to find bugs and fix them, refactor existing code, update code, and implement new features. 

Generally speaking you need to understand the code here. Obviously you won't understand at first glance. It will take time and work to get to a place where you feel confident. The best way to get into this is to start small and work in areas you understand and then expand. 

- **Challenge 1**: Get familiar with the code base
  1. Complete the [tutorial](https://gamedevacademy.org/js13kgames-tutorial/)
  2. Play the game a few times. You want to understand how the game works so you can understand the code. As you play keep an eye out for errors in the console. 
  3. Fix any errors your may find. 

- **Challenge 2**: 
  1. Use the images below or replace them with your own. Look through the HTML and find the img tags. There are two. One displays a wagon/caravan and other displays some trees. Replace these with the images below. 

You can use these images: 

<figure>
  <figcaption>
    Wagon Image
  </figcaption>
  <img src="images/wagon.png">
</figure>

<figure>
  <figcaption>
    Trees Image
  </figcaption>
  <img src="images/Trees.png">
</figure>

- **Challenge 3**: Add a heading
  1. The game doesn't have a heading. Add one. This may cause some problems with the layout you can resolve those later.

- **Challenge 4**: 
  1. The stylesheet is not that great. Make a few changes. Adjust the font and background colors to your liking. 

## Stretch Challenges 

- **Stretch Challenge**: 
  1. Work with the style sheet. Use the inspector and find some things that need adjustment. Make adjustments in the inspector. Use the inspector to find the location of these styles in the styles sheet and then make the changes. 
  2. The game has many messages that appear. These tell the story. All of the events are in 'Events.js' in `OregonH.Event.eventTypes`. This array holds objects describing events that can occur. Look at the events closely. Copy an event and change some properties. Test the game and see your event. 
  3. The game displays a two special events where the player has to answer a question in a dialog box. These are Attacks, and Shops. The dialog box could use some work on the style. These boxes are `div#shop` and `div#attack`.   
    - `div#attack` a couple buttons. You can style style these and the text in `div#attack-description`
    - `div#shop` is more complicated. There is a button you can style. The products you can buy are generated dynamically so you can't see them in the source code. To get an idea of what you can work with play the game until the shop appears, then inspect the shop div. Inside `div#prods` you'll see a list of `div.product`. Style this class. It's probably easiest to play with styles in the inspector so you can see how it appears in the browser. 
  4. The layout is very rudimentry. There are 5 boxes these are all inside `div#journey`. They are: 
    - `div#stats-area`
    - `div#update-area`
    - `div#shop`
    - `div#attack`
    - `div#progress-area`
    - `div#shop` and `div#attack` only appear when needed by the game. Use Grid or Flex Box to arrange these elements. Currently all of these use Float. You'll want to remove float from their style rules. 
  5. `div#stats-area` displays the Caravan stats. Styles would help make this more interesting and easier to read. This element is made of a collection of `div.stat`. Each of these divs contains some text that acts as a label and a `span.stat-value`. Currently the label and value look the same. Giving the label and value different font styles would create information hierarchy. 
  6. If you changed the layout and made it look good on the desktop, add some styles to make it work on mobile. Mobile games are popular!
  7. Add a background image. 

  