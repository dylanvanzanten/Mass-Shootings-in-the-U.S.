## ***Visualization about mass shootings in the US*** 🔫💀
![Final version](preview.png)

## ***Short description***
This is part A of project Information Design that I've made about the mass shootings in the US.

---

## ***Background*** ℹ️
In this assignment I've created an interactive visualizations about the mass shootings in the US between 1966 and 2017. The user can see more information about the shooting and also can see how much of the shootings are done by race and which state it occured.

---

## ***Workflow*** 💪
* 📡 Finding the data.
* 📊 Display, displaying the data inside the chart(s).
* 🎬 Interactive, make the chart(s) interactive with events.
* 💡 Animate, make some elements look nicer.

---

### ***Data*** #️⃣
The data I got from __[Kaggle](https://www.kaggle.com/carlosparadis/last-50-years-us-mass-shootings/data)__. Kaggle is a platform for predictive modelling and analytics competitions in which companies and researchers post data and statisticians and data miners compete to produce the best models for predicting and describing the data. The data contains a couple of columns which you can see below:
* __Title:__ title of the event.
* __Location:__ location of the event.
* __Date:__ date of the event.
* __Summary:__ summary of the event.
* __Fatalities:__ amount of fatalities.
* __Injured:__ amount of injured.
* __Total victims:__ total amount of victims.
* __Mental health issues:__ if the suspect has mental issues.
* __Race:__ what race the suspect is.
* __Gender:__ gender of the suspect.
* __Latitude:__ position of the event.
* __Longitude:__ position of the event.

#### ***Loading in the data*** 📡
I downloaded the `.csv` file and then looked into the file. The file looked like this:

##### ***Map data***
| Title | Location | Date | Summary | Fatalities | Injured | Total victims | Mental Health Issues | Race | Gender | Latitude | Longitude |
| ------------------------------------ | ---------------- | --------- | ------------------------------ | ---| --- | --- | ------- | ----- | ---- | --------- | ----------- |
| Las Vegas Strip mass shooting        | Las Vegas NV     | 10/1/2017 | Short description of the event | 58 | 527 | 585 | Unclear | White | Male | 36.181271 | -115.134132 |
| San Francisco UPS shooting           | San Francisco CA | 6/14/2017 | Short description of the event | 3  | 2   | 5   | Yes     | Asian | Male | 37.76559  | 122.406124  |  
| Pennsylvania supermarket shooting    | Tunkhannock PA   | 6/7/2017  | Short description of the event | 3  | 0   | 3   | Unclear | White | Male | 41.538688 | -75.946588  | 
| Florida awning manufacturer shooting | Orlando FL       | 6/5/2017  | Short description of the event | 5  | 0   | 5   | Unclear | White | Male | 28.538335 | -81.379236  | 
| Rural Ohio nursing home shooting     | Kirkersville OH  | 5/12/2017 | Short description of the event | 3  | 0   | 3   | Yes     | White | Male | 39.959508 | -82.595718  | 

##### ***Pie chart data***
| Race | Percentage |
| ------------- | ---- |
| Caucasian     | 44.7 |
| Afro American | 26.7 | 
| Latino’s      | 8.0  | 
| Asians        | 3.9  | 
| Other         | 2.6  |
| Unknown       | 9.9  |

##### ***Bubble chart data***
| id | value |
| ---------- | -- |
| Alabama    | 11 |
| Alaska     | 1  | 
| Arizona    | 13 | 
| Arkansas   | 2  | 
| California | 36 |

---

### ***Directory*** (emoji)
Here below you can see the directory:
                                              
    dev                                             # Main directory (emoji)
    │── index.html                                  # Main file where everything is being loaded in (emoji)
    │── data                                        # Directory for the data (emoji)
    |   ├── data.csv                                # Data that is being used for the map (emoji)
    |   ├── shootingsperrace.csv                    # Data that is being used for the pie chart (emoji)
    |   └── shootingsperstate.csv                   # Data that is being used for the bubble chart (emoji)
    |   
    |── src                                         # Directory for the css, js, fonts etc (emoji)
    |   ├── css                                     # Directory for the css (emoji)
    |   |   ├── index.css                           # Main css (emoji)
    |   |   ├── font-awesome.min.css                # Fontawesome css (emoji)
    |   |   └── reset.min.css                       # Reset css by Eric Meyer (emoji)
    |   |     
    |   ├── fonts                                   # Main directory for the fonts (emoji)
    |   |   ├── fontawesome-webfont.eot             # Fontawesome font (emoji)
    |   |   ├── fontawesome-webfont.svg             # Fontawesome font (emoji)
    |   |   ├── fontawesome-webfont.ttf             # Fontawesome font (emoji)
    |   |   ├── fontawesome-webfont.woff            # Fontawesome font (emoji)
    |   |   ├── fontawesome-webfont.woff2           # Fontawesome font (emoji)
    |   |   └── FontAwesome.eot                     # Fontawesome font (emoji)
    |   |
    |   └── js                                      # Directory fot the javascript (emoji)
    |       ├── index.js                            # Main javascript
    |       ├── bubblechart.js                      # Javascript fot the bubble chart (emoji)
    |       ├── map.js                              # Javascript for the map (emoji)
    |       └── piechart.js                         # Javascript for the pie chart (emoji)
    |
    └── README.md                                   # Readme.md

---

### ***Steps*** 🚶‍♂️
1. Started with the map 🗺️
I've first started with the map to show the locations where the mass shootings took place via dots. The dots give the size how many victims where killed. For the map I've used the following example from the __[bl.ocks](https://bl.ocks.org/mbostock/4090848)__. This is a basic map where the states have being rendered by an __[.JSON](https://d3js.org/us-10m.v1.json)__ file. Here below you can see basic code:

```javascript
svgMap.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", path);
// Append a path to the group object.
svgMap.append("path")
    // Give the path a classname.
    .attr("class", "state-borders")
    .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
        return a !== b;
    })));
```

I changed and added a couple of code to the map. The map didn't have any dots, so I added the following code to add dots to the map:

```javascript
// Select all the circles and link the data to it.
svgMap.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    // Set the radius to the amount of fatalities.
    .attr("r", function (d) {
        return d.Fatalities;
    })
    // Set the cx of the circle the latitude where it is being located.
    .attr("cx", function (d) {
        //Use latitude as x-axis.
        return d.Latitude;
    })
    // Set the cx of the circle the longitude where it is being located.
    .attr("cy", function (d) {
        //Use longitude as y-axis.
        return d.Longitude;
    })
    // Give the circles a color.
    .style("fill", "pink")
```

You can see that I've already added some data to my dots. The dots have the coördinates included (the latitude and longitude!) and furthermore I set the size (radius) of the dots with the amount of fatalities that have been at the location. Now you can see the different sizes and the difference between the shootings at each location pinpointed on the map. I also changed the names per chart (which you can see at every piece of code that I will show), because if I kept them the same they won't show op the screen "but they will in the inspector!" - yes that's true, but we don't have a (emoji) with the chart then do we? (emoji).

NOG TOEVOEGEN





2. Started with the pie chart 🍰
After I've finished with the map I went to create the pie chart. I took the example from __[bl.ocks](https://bl.ocks.org/mbostock/3887235)__. In the pie chart I want to show the how much a mass shooting was executed by person sorted per race. So first of all I need to add different colors per race. I've added the following code to give per race a color:

```javascript
// Set range of colors for the pie chart.
var colorPie = d3.scaleOrdinal()
    .range(["#E0E4CC", "#D6DAC2", "#7BB0A6", "#7BB0A6", "#92F22A", "#64DDBB"])
```

NOG TOEVOEGEN



I've added a legend to the pie chart. I used this from __[one of my previous assessments](https://dylanvanzanten.github.io/fe3-assessment-3/)__ for the subject Frontend3. 


3. Started with the bubble chart (emoji)
NOG TOEVOEGEN




4. Adding text to support the charts (emoji)
NOG TOEVOEGEN




5. Adding style & place the charts (emoji)
So now when I've done all the charts I went to focus on the styling of the page. First I set up the `index.html` correctly (so that it's semantic correct (emoji)). I used most HTML5 coding to setup the page.

The page directory is like this:

    body                                               # The body (emoji)
    │── header                                         # Header for the intro (emoji)
    │    ├── div                                       # Div (emoji)
    │    │    ├── h2                                   # h2 text (emoji)
    │    │    ├── h1                                   # h1 text (emoji)
    │    │    └── h6                                   # h6 text (emoji)
    │    │
    │    └── button
    │                              
    └── main                                           # Main (container) (emoji)
        └── section                                    # Section (container for the charts) (emoji)
            ├── h1                                     # h1 text (emoji)
            └── svg                                    # The chart (emoji)             

I seperated each chart into a `<section>` that is looks like this:

```html
<section>
    <h1>Mass shootings in the US</h1>
    <svg class="svgMap"></svg>
</section>
<section>
    <h1>Total mass shootings per race</h1>
    <svg class="svgPie"></svg>
</section>
<section>
    <h1>Total mass shootings per state</h1>
    <svg class="svgBubble"></svg>
</section>
```




---




## ***Thoughts*** 💭


---

## ***Things that can lift up the quality and usability*** 🏆
* Adding more interactivity to the pie and bubble chart by seeing a animation when you reach the section when you scroll.
* 

---

## ***Features***
* __[D3](https://d3js.org/)__
* __[D3 .csv](https://github.com/d3/d3/wiki/CSV)__
* __[D3 transition](https://github.com/d3/d3-transition/blob/master/README.md#transition)__
* __[D3 select](https://github.com/d3/d3-selection/blob/master/README.md#select)__
* __[D3 selectAll](https://github.com/d3/d3-selection/blob/master/README.md#selectAll)__
* __[Selection append](https://github.com/d3/d3-selection/blob/master/README.md#selection_append)__
* __[Selection attr](https://github.com/d3/d3-selection/blob/master/README.md#selection_attr)__
* __[Selection enter](https://github.com/d3/d3-selection/blob/master/README.md#selection_enter)__

## ***Sources***
* __[Data from Kaggle](https://www.kaggle.com/carlosparadis/last-50-years-us-mass-shootings/data)__
* __[Author](https://b.locks.org/mbostock)__
* __[Map](https://bl.ocks.org/mbostock/4090848)__
* __[Simple Pie Chart](https://bl.ocks.org/mbostock/3887235)__
* __[Bubble chart](https://bl.ocks.org/mbostock/3887235)__
* __[Bubble chart tutorial](https://www.youtube.com/watch?v=gda35eYXBJc&t=15)__
* __[Let's make a Pie Chart with D3.js](http://www.cagrimmett.com/til/2016/08/19/d3-pie-chart.html)__
* __[Simple tooltip in d3.v4](https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73)__
* __[Axis labels in d3.v4](https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e)__
* __[D3js set x-axis tick position](https://stackoverflow.com/questions/43840134/d3js-set-x-axis-tick-position)__
* __[Show/ hide elements on mouse click](http://bl.ocks.org/d3noob/5d621a60e2d1d02086bf)__
* __[Add a transition to a D3 scatterplot](https://stackoverflow.com/questions/27950920/add-a-transition-to-a-d3j-scatter-plot)__
* __[How to add a nice legend to a d3 pie chart](https://stackoverflow.com/questions/32298837/how-to-add-a-nice-legend-to-a-d3-pie-chart)__

## ***License***
All the rights go to __[Mike Bostock](https://b.locks.org/mbostock)__ and __[D3](https://d3js.org/)__. And also al rights to __[Kaggle](https://www.kaggle.com/carlosparadis/last-50-years-us-mass-shootings/data)__ for the data that I've being using.

MIT © Dylan van Zanten