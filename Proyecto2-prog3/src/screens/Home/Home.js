import { FlatList, Image, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Home extends Component {
    constructor(){
        super()
        this.state={
            posteos: []
        }
    }

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

  render() {
    return (
      <View /*style={styles.container}*/ >
        <Image /*style={styles.image}*/
          source={require('../../../assets/logo.png')}
          resizeMode = 'contain'
        />
        
        <View /*style={styles.subcontainer}*/>
          <FlatList 
          data = {this.state.posteos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {(item) => <Post navigation={this.props.navigation} data={item.item.data} id={item.item.id} />} 
          />
        </View>
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container:{
//     flex: 1
//   },
//   subcontainer:{
//     flex:5
//   },
//   image:{
//     height: 40,
//     marginTop: 5,
//     marginBottom: 10
//   }
// })

export default Home