import { Text, View, StyleSheet, TextInput, TouchableOpacity,  FlatList, Image} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import {SearchBar } from 'react-native'

class Search extends Component {
    constructor(props){
        super(props)
        this.state={
          data: [],
          id:'', 
          resultados: [],
          users: [], 
          loading: false,
          busqueda: '',
        }
    }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(doc => {
          let resultados = [];
          doc.forEach(doc => {
            resultados.push({
                id: doc.id, 
                data: doc.data()
            })
            
          })
          this.setState(
            {data: resultados}
          )
         
        })
    }

    buscar(text){
    
        let usersFilter = this.state.data.filter(elm =>
        {  
          
          
         return elm.data.usuario.toUpperCase().includes(text.toUpperCase())})

         console.log(usersFilter);
         this.setState({
           users: usersFilter,
           user: text,
        })
    }

   render() {
  
    return( 
        <View style={styles.container}>
            <Image style={styles.image}
                source={require('../../../assets/Selfie.png')}
                resizeMode = 'contain' 
            ></Image> 
            <TextInput style={styles.input}
              onChangeText={ text => this.setState( {busqueda:text} )}
              placeholder='¿A quién estas buscando?'
              value={this.state.busqueda}>
            </TextInput>

            <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
                <Text style={styles.button}> Buscar</Text>
            </TouchableOpacity>

            <FlatList
              data={this.state.users}
              keyExtractor={(item) => item.id}
              renderItem= {({item}) => <View>
                
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserProfile', {
                 
                 
                    email: item.data.email
                  })}>
                  <Text style={styles.textUser}>{item.data.usuario}</Text>
                </TouchableOpacity>  
                
                </View>}
            /> 
             
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },

  input:{
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
  },

  button:{
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    fontWeight: 'bold',
    color:'white',
    fontSize: 17
  },

  textUser:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },
  image:{
    height: 130,
    width:130,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 500,
    alignSelf: 'center'
  },
})

export default Search;