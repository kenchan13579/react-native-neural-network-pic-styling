import React, { Component } from 'react' ;
import Camera from 'react-native-camera';
import GalleryView from "../gallery/galleryView";
import {
  Dimensions,
  Image,
  TouchableHighlight,
  Text,
  View,
  CameraRoll
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CameraView extends Component {
  constructor() {
    super();
    this.state = {
      camRollImg: ""
    };
  }
  componentDidMount() {
    CameraRoll
    .getPhotos({first: 1})
    .then((data) => {

      if (data.edges === null || data.edges.length === 0) {
        return ;
      } 
      this.setState({camRollImg: data.edges[0].node.image.uri});
    })
    .catch((e) => {
      console.error(e);
    });
  }
  goToCameraRoll() {
    this.props.navigator.push({
      title: 'Gallery',
      component: GalleryView,
      navigationBarHidden:false,
    });
  }
  _renderImage() {
    if (!this.state.camRollImg) {
     return null; 
    }

   return (
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableHighlight style={ { marginRight:20 } } onPress={this.goToCameraRoll.bind(this)}>
          <Image source={{ uri: this.state.camRollImg }} style={{width: 50,height: 50}}/>
        </TouchableHighlight>
      </View>
    );
  }

  takePicture() {
    this.camera
      .capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View>
        <View style={{ marginTop:50, height: Dimensions.get('window').height * 0.6}}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={{
              flex: 1,
              width: Dimensions.get('window').width
            }}
            aspect={Camera.constants.Aspect.fill}>
          </Camera>
        </View>
        <View style={{padding:15,flex:1, flexDirection: 'row', justifyContent: 'space-between',height: 60}}>
          <TouchableHighlight >
            <Icon 
              name='bolt'
              size={30}
              color='black'
            />
          </TouchableHighlight>

          <TouchableHighlight >
            <Icon 
              name='refresh'
              size={30}
              color='black'
            />
          </TouchableHighlight>
        </View>

        <View style={{height:80 }}>
          <TouchableHighlight style={{alignItems: 'center'}} onPress={this.takePicture.bind(this)}>
            <View style={{borderWidth:1, height:64, width:64, backgroundColor:'#f0f0f0' ,borderRadius: 64}} >
            </View>
          </TouchableHighlight> 
        </View>

        {this._renderImage()}
    </View>
    );
  }
}

const temp = {
  cam: {
    height: '30%'
  }
};

export default CameraView;
