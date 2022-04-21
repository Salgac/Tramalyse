# Tramalyse

Tramalyse is an app developed with Vue framework for the analysis of GPS data from a tram vehicle. This software allows user to load a GPS file in `.gpx` format and analyse the drive profile, visualizing the trams speed, altitude, and accuracy according to the GPS device. \
Stop to Stop analysis can be further used to view the drive profile between tram stops - sections of a line representing a small piece of the overall run. Those can be used to identify critical places on the line, or detect special events like rapid or unexpected braking.

App currently mainly works with dataset from tram line 1 in the city of Bratislava, Slovakia. Data provided for this project can be also viewed in the app in 4 preset files. Other `.gpx` files can also be imported, though the functionality of this tool might be limited.

## How to use

To use this app, user can choose to load from preset files, or use the "Upload a file&hellip;" button to upload a differnet .gpx file. Upon loading, the file gets plotted into a map, and a data card gets created bellow. This card contains various information about the GPS recording, along with two graphs - speed / distance and elevation / distance. Upon hovering the cursor on one of the graphs, a focus information is also shown, giving the user information about immediate speed at the exact point. 

A button for stop to stop analysis is present bellow the GPS recording information. After clicking the button, the stop to stop section are abstracted for the GPS data and plotted into separate maps alond with stop and section information. This allows the user to view smaller sections of GPS data, in greater detail. The focus information of those sections gets also plotted into the map.

## Preset files

Several  preset files are provided for the user, to create a better understanding of the problem, from a simple section to a whole run on the line.

### Preset file 1: Úrad vlády SR - STU

A GPS data file containg only a section between two stops. No significant anomalies can be found in the recording.

### Preset file 2: Nám. Ľ. Štúra - Hlavná Stanica

A section of the line returning to Hlavná Stanica. Several places with horizontal accuracy reading worsening can be seen along the trams journey, mostly in places with high building surounding the track (near Šafárikovo nám.)

### Preset file 3: Hlavná Stanica - Hlavná Stanica

Preset conating the whole run on the line. Several recording innacuracies can be spotted, allong the same sections of track as with previous prestet file.

### Preset file 4: Hlavná Stanica - Depo Jurajov Dvor

A file with the end of tram service when the tram headed for the depo. The line is different from other recordings, and contains different sections. Most notably, there is a GPS recording outage between stops Česká and Kuchajda. A crossing bellow a train bridge is present between stops Kuchajda and Odborárska, showing a dip in accuracy reading, also showing the speed innacurate for roughly 28 metres. Similar innacuracy is also in the next section, where there is a pipeline above track. At the end the tram also entered a depo hall, showing innacurate readings when under roof.
