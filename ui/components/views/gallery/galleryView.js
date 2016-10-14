import React, { Component } from 'react';
import {
  View,
  Dimensions,
  CameraRoll,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native';

export default class galleryView extends Component {
  constructor() {
    super();
    this.state = {
      imgList : [],
      selected : null
    };
  }

  componentWillMount() {
    CameraRoll
      .getPhotos({first: 100})
      .then(result => {
        console.log(result);
        this.setState({
          imgList: this.getImageUrl(result),
          selected: result.edges.length > 0 && result.edges[0].node,
        }) ;
      });
  }

  getImageUrl(result) {
    return result.edges.map(edge => edge.node);
  }
  
  selectImg(edge, event) {
    this.setState({ selected: edge });
  }

  render() {
    const {selected} = this.state;
    return (
      <View>
        <View style={{flex:1}}>
          {
            selected && 
            <Image 
                style={{flex:1, height: Dimensions.get('window').height * 0.5}}
                source={{ uri : selected.image.uri}}
            />
          } 
        </View>
      <ScrollView >
        <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}} >
          {
            this.state.imgList.map(edge => (
              <TouchableHighlight 
                onPress={this.selectImg.bind(this, edge)} 
                key={ edge.image.id || edge.timestamp } 
                style={{width:100,height:100,margin:5}}
              >
                <Image 
                  style={{width:100,height:100}} 
                  source={{ uri: edge.image.uri }} 
                /> 
              </TouchableHighlight>
              )
            )
          }
        </View>
      </ScrollView>
    </View>
    );
  }
}


