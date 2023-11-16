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
//on snapshot recibe un callback, el parametro va a tener la inf. q trajo de firebase
// dentro de ese callback creamos una variable para ir llenando la info con lo que nos trae firebase
//la info que nos trae firebase es un array con muchas cosas de las cuales solo queremos algunas
    componentDidMount(){
      db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
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
    // logout(){
    //   auth.signOut();
    //   this.props.navigation.navigate('Login')
//   }


  render() {
    console.log(this.state.posteos)
    return (
      <View>
        {/* <Image style={styles.image}
          source={require('../../../assets/favicon.png')}
          resizeMode = 'contain' 
        ></Image> */}
        <Text style={styles.title}> HOME PAGE</Text>
        <ScrollView>
            <View style={styles.subcontainer}>
                <FlatList 
                data = {this.state.posteos}
                keyExtractor = {(item) => item.id.toString()}
                renderItem = {(item) => <Post navigation={this.props.navigation} data={item.item.data} id={item.item.id} />} 
          />
            </View>
            </ScrollView>
        </View>
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
    height: 40,
    marginTop: 5,
    marginBottom: 10
  },
  title:{
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#0095F6',
}
})

export default Home