import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import superagent from 'superagent';

const mapStyles = {
  width: '100%',
  height: '80%'
};

export class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      activeMarker: {},
    };
  }

  componentWillMount() {
    superagent
      .get('http://localhost:12059/react-interview/getLowesStores')
      .then(res => {
        this.setState({data: res.body});
      })
  }
  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {}
      })
    }
  };
  showMarker() {
    if(this.state.data) {
      return this.state.data.map((store) => {
        return <Marker key={`${store.name}-${store.number}`}
          id={`${store.name}-${store.number}`}
          onClick={this.onMarkerClick}
          position={{
            lat: store.geometry.location.lat,
            lng: store.geometry.location.lng
          }}
          icon={{url: require('../lowes-icon.png'),}} name={store.name} number={store.number}/>
      });
    }
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
         lat: 35.12,
         lng: -80.62
        }}
        onClick={this.onMapClicked}
      >
        {this.showMarker()}
        <InfoWindow
          visible={this.state.showingInfoWindow}
          marker={this.state.activeMarker}>
            <div>
              <h3>{`Store name: ${this.state.activeMarker.name}`}</h3>
              <h3>{`Store number: ${this.state.activeMarker.number}`}</h3>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBPfXL5uytbPSX2eSMfyRFNWN_b1IGy0Z8'
})(Location);
