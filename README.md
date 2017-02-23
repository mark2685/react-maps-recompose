# react-maps-recompose

## Description
A Google Maps library built in React, utilizing recompose.

## Table of Contents
* [Inspiration](#inspiration)
* [Roadmap](#roadmap)
* [Component Structure](#component-structure)
* [Components](#components)

## Inspiration
* [google-maps-react (simplest solution)](https://github.com/fullstackreact/google-maps-react)
* [react-google-maps (complex solution)](https://github.com/tomchentw/react-google-maps)
* [google-map-react](https://github.com/istarkov/google-map-react)

## Roadmap:
* Externalize Googles methods for ore components
* Externalize Googles events for core components:
* Examples
	* Convert to React Storybook
	* Upload to Github.io
* Swap out Sample Data with better (not roofshoot specific) data.
* Write Tests

### Turn this into an NPM package
* renderNothingButChildren (extend compose' `renderNothing` method so that it renders children)

## Components

### `<GoogleMap />`
#### Props:
* googleMapURL:
* mapOptions: https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions

### `<Marker />`
#### Props:

### `<MarkerWithLabel />`
#### Props:

### `<InfoWindow />`
#### Props:

### `<MarkerClusterer />`
#### Props:
