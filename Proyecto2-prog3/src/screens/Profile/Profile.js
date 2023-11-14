import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'

class Profile extends Component {
  
  constructor(){
    super()
    this.state={
      misDatos: {},
      id:'',
      posteos: [],
    }
  }

  componentDidMount(){
    db.collection('users')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(doc => {
      doc.forEach(doc => this.setState({
        id: doc.id,
        misDatos: doc.data()
      })) 
    })
    db.collection('posts')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(docs => {
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

  cerrarSesion(){
    auth.signOut()
    .then( resp => this.props.navigation.navigate('Login'))
    .catch(err => console.log(err))
  } 
  
  render() {
    return (
      <>
      <View style={styles.containerDatos}>
        <View style={styles.card}>
          <Image style={styles.image}
            source={{uri: this.state.misDatos.foto}} 
            resizeMode = 'cover'
          />
          <View style={styles.usuarioYMail}>
            <Text style={styles.textCard}>{this.state.misDatos.usuario}</Text>
            <Text style={styles.textCard}>{this.state.misDatos.email}</Text>
          </View>
        </View>      
        <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>   
        <Text style={styles.text}>Cantidad de posts: {this.state.posteos.length}</Text>
        <TouchableOpacity onPress={()=> this.cerrarSesion()}>
          <Text style={styles.botton}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.textPublicaciones}>Publicaciones:</Text>
        {this.state.posteos.length >= 1 ? 
        <View style={styles.publicaciones}>
          <FlatList 
        data = {this.state.posteos}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} // preguntar xq item.item (2 veces)
        />
        </View>
        :
        <Text>Aun no hay publicaciones</Text>
        }
      </View>
      </>
    )
  } 
}

const styles = StyleSheet.create({

  containerDatos:{
    flex: 1, 
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#E0E4EA',
  },

  publicaciones:{
    flex: 8, 
  },

  usuarioYMail:{
    flexDirection: 'column',
    width: '100%'
  },

  text:{
    textAlign: 'left',
    fontSize: 14,
  },

  textPublicaciones:{
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  },

  botton:{
    textAlign: 'center',
    backgroundColor: '#0095F6',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    fontWeight: 'bold',
    color:'#FFFFFF',
    fontSize: 17,
  },

  image:{
    height: "80%",
    width: "25%",
    borderRadius: "40%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  card:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },

  textCard:{
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: "5%",
  }


})


export default Profile