<template>
  <div>
    <div class="about">
      <h1>Tramalyse</h1>
      <p>
        Tramalyse is an app developed with Vue framework for the analysis of GPS
        data from a tram vehicle. This software allows user to load a GPS file
        in
        <code>.gpx</code> format and analyse the drive profile, visualizing the
        trams speed, altitude, and accuracy according to the GPS device.
      </p>
      <p>
        Stop to Stop analysis can be further used to view the drive profile
        between tram stops - sections of a line representing a small piece of
        the overall run. Those can be used to identify critical places on the
        line, or detect special events like rapid or unexpected braking.
      </p>
      <p>
        App currently mainly works with dataset from tram line 1 in the city of
        Bratislava, Slovakia. Data provided for this project can be also viewed
        in the app in 4 preset files. Other <code>.gpx</code> files can also be
        imported, though the functionality of this tool might be limited.
      </p>
      <hr />
      <h2>How to use</h2>
      <p>
        To use this app, user can choose to load from preset files, or use the
        &quot;Upload a file&hellip;&quot; button to upload a differnet .gpx
        file. Upon loading, the file gets plotted into a map, and a data card
        gets created bellow. This card contains various information about the
        GPS recording, along with two graphs - speed / distance and elevation /
        distance. Upon hovering the cursor on one of the graphs, a focus
        information is also shown, giving the user information about immediate
        speed at the exact point.
      </p>
      <p>
        A button for stop to stop analysis is present bellow the GPS recording
        information. After clicking the button, the stop to stop section are
        abstracted for the GPS data and plotted into separate maps alond with
        stop and section information. This allows the user to view smaller
        sections of GPS data, in greater detail. The focus information of those
        sections gets also plotted into the map.
      </p>
      <hr />
      <h2>Preset files</h2>
      <p>
        Several preset files are provided for the user, to create a better
        understanding of the problem, from a simple section to a whole run on
        the line.
      </p>
      <h3>Preset file 1: Úrad vlády SR - STU</h3>
      <p>
        A GPS data file containg only a section between two stops. No
        significant anomalies can be found in the recording.
      </p>
      <h3>Preset file 2: Nám. Ľ. Štúra - Hlavná Stanica</h3>
      <p>
        A section of the line returning to Hlavná Stanica. Several places with
        horizontal accuracy reading worsening can be seen along the trams
        journey, mostly in places with high building surounding the track (near
        Šafárikovo nám.)
      </p>
      <h3>Preset file 3: Hlavná Stanica - Hlavná Stanica</h3>
      <p>
        Preset conating the whole run on the line. Several recording
        innacuracies can be spotted, allong the same sections of track as with
        previous prestet file.
      </p>
      <h3>Preset file 4: Hlavná Stanica - Depo Jurajov Dvor</h3>
      <p>
        A file with the end of tram service when the tram headed for the depo.
        The line is different from other recordings, and contains different
        sections. Most notably, there is a GPS recording outage between stops
        Česká and Kuchajda. A crossing bellow a train bridge is present between
        stops Kuchajda and Odborárska, showing a dip in accuracy reading, also
        showing the speed innacurate for roughly 28 metres. Similar innacuracy
        is also in the next section, where there is a pipeline above track. At
        the end the tram also entered a depo hall, showing innacurate readings
        when under roof.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
  created() {
    document.title = "Tramalyse";
  },
});
</script>

<style lang="scss" scoped>
.about {
  max-width: 1000px;
  width: auto;
  margin: auto;

  p {
    text-align: justify;
  }

  h2,
  h3 {
    margin-top: 20px;
    margin-bottom: 0px;
    text-align: left;
  }
}
</style>
