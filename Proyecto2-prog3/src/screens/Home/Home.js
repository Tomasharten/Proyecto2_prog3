import { FlatList, Image, View, StyleSheet, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor(){
        super()
        this.state={
            posteos: []
        }
    }
//usamos on snapshot para traer lo que esta en firebase
    componentDidMount(){
      db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
          const data = doc.data();
          console.log("Datos del post recuperados:", data); // Agrega este log
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          posteos: posts
        })
      })
    }


  render() {
    console.log(this.state.posteos)
    return (
      <ScrollView>
      <View>
         <Image style={styles.image}
          source={require('../../../assets/Selfie.png')}
          resizeMode = 'contain' 
        ></Image> 
        <Text style={styles.title}> HOME PAGE </Text>
        
            <View style={styles.subcontainer}>
                <FlatList  
                data = {this.state.posteos}
                keyExtractor = {(item) => item.id.toString()}
                renderItem = {(item) => <Post navigation={this.props.navigation} data={item.item.data} id={item.item.id} />} 
                />                
            </View>
          </View>

        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  subcontainer:{
    flex:5
  },
  image:{
    height: 130,
    width:130,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 500,
    alignSelf: 'center'
  },
  title:{
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'green',
}
})

export default Home